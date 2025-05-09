export interface Deposit {
  round: number;
  address: string;
  amount: number;
  timestamp: string;
}

export interface PayoutSchedule {
  round: number;
  address: string;
  name: string;
  paid: boolean;
  amount: number;
  timestamp: string;
}

export interface JamaeyaGroup {
  id: string;
  name: string;
  memberCount: number;
  amount: number;
  interval: 'weekly' | 'monthly';
  payoutOrder: 'fixed' | 'random';
  inviteCode: string;
  currentRound: number;
  totalRounds: number;
  nextPaymentDate: string;
  deposits: Deposit[];
  payoutSchedule: PayoutSchedule[];
}