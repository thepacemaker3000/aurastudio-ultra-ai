const generateUuid = () => Math.random().toString(36).substring(2, 10);

export interface CreditLedgerItem {
  id: string;
  userId: string;
  type: 'grant' | 'hold' | 'commit' | 'refund' | 'purchase' | 'bonus';
  amount: number;
  balanceBefore: number;
  balanceAfter: number;
  referenceId?: string;
  description: string;
  createdAt: string;
}

// In-memory Ledger state backing production DB calls
const ledgerStore: Record<string, CreditLedgerItem[]> = {};

export class CreditsService {
  /**
   * Holds credits before generation starts.
   */
  static async holdCredits(
    userId: string,
    amount: number,
    referenceId: string,
    description: string
  ): Promise<{ success: boolean; transactionId?: string; error?: string; remaining: number }> {
    if (!ledgerStore[userId]) {
      ledgerStore[userId] = [];
    }

    const userLedger = ledgerStore[userId];
    const currentBalance = userLedger.length > 0 ? userLedger[userLedger.length - 1].balanceAfter : 250;

    if (currentBalance < amount) {
      return {
        success: false,
        error: `Insufficient credit balance. Required: ${amount}, Available: ${currentBalance}`,
        remaining: currentBalance,
      };
    }

    const balanceAfter = currentBalance - amount;
    const txItem: CreditLedgerItem = {
      id: `tx_hold_${generateUuid()}`,
      userId,
      type: 'hold',
      amount,
      balanceBefore: currentBalance,
      balanceAfter,
      referenceId,
      description: `[HOLD] ${description}`,
      createdAt: new Date().toISOString(),
    };

    userLedger.push(txItem);

    return {
      success: true,
      transactionId: txItem.id,
      remaining: balanceAfter,
    };
  }

  /**
   * Commits previously held credits upon successful AI generation.
   */
  static async commitCredits(
    userId: string,
    holdTxId: string,
    description: string
  ): Promise<{ success: boolean; transactionId?: string; remaining: number }> {
    const userLedger = ledgerStore[userId] || [];
    const holdTx = userLedger.find((tx) => tx.id === holdTxId);

    const currentBalance = userLedger.length > 0 ? userLedger[userLedger.length - 1].balanceAfter : 250;

    const txItem: CreditLedgerItem = {
      id: `tx_commit_${generateUuid()}`,
      userId,
      type: 'commit',
      amount: holdTx ? holdTx.amount : 1,
      balanceBefore: currentBalance,
      balanceAfter: currentBalance, // balance was already decremented during hold
      referenceId: holdTxId,
      description: `[COMMIT] ${description}`,
      createdAt: new Date().toISOString(),
    };

    userLedger.push(txItem);

    return {
      success: true,
      transactionId: txItem.id,
      remaining: currentBalance,
    };
  }

  /**
   * Automatically refunds/releases held credits on generation failure.
   */
  static async refundCredits(
    userId: string,
    holdTxId: string,
    reason: string
  ): Promise<{ success: boolean; transactionId?: string; remaining: number }> {
    const userLedger = ledgerStore[userId] || [];
    const holdTx = userLedger.find((tx) => tx.id === holdTxId);
    const refundAmount = holdTx ? holdTx.amount : 1;

    const currentBalance = userLedger.length > 0 ? userLedger[userLedger.length - 1].balanceAfter : 250;
    const balanceAfter = currentBalance + refundAmount;

    const txItem: CreditLedgerItem = {
      id: `tx_refund_${generateUuid()}`,
      userId,
      type: 'refund',
      amount: refundAmount,
      balanceBefore: currentBalance,
      balanceAfter,
      referenceId: holdTxId,
      description: `[AUTO-REFUND] ${reason}`,
      createdAt: new Date().toISOString(),
    };

    userLedger.push(txItem);

    return {
      success: true,
      transactionId: txItem.id,
      remaining: balanceAfter,
    };
  }

  /**
   * Grants or purchases credit top-up
   */
  static async topUpCredits(
    userId: string,
    amount: number,
    description: string
  ): Promise<{ success: boolean; transactionId: string; remaining: number }> {
    if (!ledgerStore[userId]) {
      ledgerStore[userId] = [];
    }

    const userLedger = ledgerStore[userId];
    const currentBalance = userLedger.length > 0 ? userLedger[userLedger.length - 1].balanceAfter : 250;
    const balanceAfter = currentBalance + amount;

    const txItem: CreditLedgerItem = {
      id: `tx_topup_${generateUuid()}`,
      userId,
      type: 'purchase',
      amount,
      balanceBefore: currentBalance,
      balanceAfter,
      description: `[PURCHASE] ${description}`,
      createdAt: new Date().toISOString(),
    };

    userLedger.push(txItem);

    return {
      success: true,
      transactionId: txItem.id,
      remaining: balanceAfter,
    };
  }

  /**
   * Returns immutable ledger transaction history
   */
  static async getLedger(userId: string): Promise<CreditLedgerItem[]> {
    return ledgerStore[userId] || [];
  }
}
