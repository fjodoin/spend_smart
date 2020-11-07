import { Company } from './company';

export interface Expense {
  id: number;
  company: Company;
  amount: number;
  date: Date;
  type: string;
}
