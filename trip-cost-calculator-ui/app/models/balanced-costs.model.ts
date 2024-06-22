import { TripMember } from "./trip-member.model";

export interface BalancedCosts {
  owedMoney: OwedMoney[];
}

export interface OwedMoney {
  recipient: TripMember;
  giver: TripMember;
  amount: number;
}
