import Card from "~/components/card.component";
import { BalancedCosts } from "~/models/balanced-costs.model";

export type ResultCardProps = {
  balancedCosts: BalancedCosts;
};

export default function ResultCard({ balancedCosts }: ResultCardProps) {
  return (
    <Card className="mb-4">
      {balancedCosts.owedMoney.map((owed, idx) => (
        <Card
          colorClass={`bg-white ${
            idx < balancedCosts.owedMoney.length - 1 ? "mb-4" : ""
          }`}
          key={`${owed.giver.name}-${owed.recipient.name}`}
        >
          <p>
            {owed.giver.name} owes {owed.recipient.name} ${owed.amount}
          </p>
        </Card>
      ))}
    </Card>
  );
}
