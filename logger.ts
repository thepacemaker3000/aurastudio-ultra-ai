export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface LogContext {
  requestId?: string;
  module?: string;
  service?: string;
  userId?: string;
  durationMs?: number;
  [key: string]: any;
}

class Logger {
  private formatMessage(level: LogLevel, message: string, context?: LogContext): string {
    const timestamp = new Date().toISOString();
    const reqIdStr = context?.requestId ? `[ReqID: ${context.requestId}]` : '';
    const moduleStr = context?.module ? `[${context.module}]` : '[Server]';
    const durationStr = context?.durationMs !== undefined ? ` (${context.durationMs}ms)` : '';

    return `${timestamp} [${level.toUpperCase()}] ${moduleStr}${reqIdStr} ${message}${durationStr}`;
  }

  public info(message: string, context?: LogContext) {
    const formatted = this.formatMessage('info', message, context);
    console.log(formatted, context?.meta ? JSON.stringify(context.meta) : '');
  }

  public warn(message: string, context?: LogContext) {
    const formatted = this.formatMessage('warn', message, context);
    console.warn(formatted, context?.error || '');
  }

  public error(message: string, context?: LogContext) {
    const formatted = this.formatMessage('error', message, context);
    console.error(formatted, context?.error || '');
  }

  public debug(message: string, context?: LogContext) {
    if (process.env.NODE_ENV !== 'production') {
      const formatted = this.formatMessage('debug', message, context);
      console.debug(formatted);
    }
  }
}

export const logger = new Logger();
