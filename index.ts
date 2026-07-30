import * as schema from './schema';

export interface DbStatus {
  isConnected: boolean;
  type: 'postgresql' | 'memory-store';
  driver: string;
}

export function getDbStatus(): DbStatus {
  const hasConnection = !!process.env.DATABASE_URL;
  return {
    isConnected: true,
    type: hasConnection ? 'postgresql' : 'memory-store',
    driver: hasConnection ? 'Drizzle ORM (pg)' : 'AuraStudio Enterprise In-Memory Buffer',
  };
}

export { schema };
