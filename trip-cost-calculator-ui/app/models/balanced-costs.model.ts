import { TripMember } from "./trip-member.model";

export interface BalancedCosts {
  owedMoney: OwedMoney[];
  totalCost: number;
  costPerPerson: number;
}

export interface OwedMoney {
  recipient: TripMember;
  giver: TripMember;
  amount: number;
}
