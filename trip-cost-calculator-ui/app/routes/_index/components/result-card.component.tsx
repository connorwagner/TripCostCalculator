import Card from "~/components/card.component";
import { BalancedCosts } from "~/models/balanced-costs.model";
import { FormatterService } from "~/services/formatter.service";

export type ResultCardProps = {
  balancedCosts: BalancedCosts;
};

export default function ResultCard({ balancedCosts }: ResultCardProps) {
  return (
    <Card className="mb-4">
      <p className="text-center mb-4">
        Total spent: {FormatterService.formatMoney(balancedCosts.totalCost)}
      </p>
      <p className="text-center mb-4">
        Total cost per person:{" "}
        {FormatterService.formatMoney(balancedCosts.costPerPerson)}
      </p>
      {balancedCosts.owedMoney.map((owed, idx) => (
        <Card
          colorClass={`bg-white ${
            idx < balancedCosts.owedMoney.length - 1 ? "mb-4" : ""
          }`}
          key={`${owed.giver.name}-${owed.recipient.name}`}
        >
          <p className="text-center">
            {owed.giver.name} owes {owed.recipient.name}{" "}
            {FormatterService.formatMoney(owed.amount)}
          </p>
        </Card>
      ))}
    </Card>
  );
}
