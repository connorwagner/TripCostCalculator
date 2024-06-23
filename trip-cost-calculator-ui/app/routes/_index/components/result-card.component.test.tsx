import { BalancedCosts } from "~/models/balanced-costs.model";
import ResultCard from "./result-card.component";
import { render, screen } from "@testing-library/react";
import { FormatterService } from "~/services/formatter.service";

describe("ResultCard", () => {
  const balancedCosts: BalancedCosts = {
    owedMoney: [
      {
        recipient: { name: "Member 1", expenses: [12.34] },
        giver: { name: "Member 2", expenses: [12.34] },
        amount: 1.23,
      },
      {
        recipient: { name: "Member 1", expenses: [12.34] },
        giver: { name: "Member 3", expenses: [12.34] },
        amount: 2.34,
      },
    ],
    totalCost: 37.02,
    costPerPerson: 12.34,
  };

  it("should display the total spent", async () => {
    render(<ResultCard balancedCosts={balancedCosts} />);

    const totalCost = await screen.findByText(
      `Total spent: ${FormatterService.formatMoney(balancedCosts.totalCost)}`
    );
    expect(totalCost).toBeDefined();
  });

  it("should display the total cost per person", async () => {
    render(<ResultCard balancedCosts={balancedCosts} />);

    const totalCost = await screen.findByText(
      `Total cost per person: ${FormatterService.formatMoney(
        balancedCosts.costPerPerson
      )}`
    );
    expect(totalCost).toBeDefined();
  });

  it("should show who owes whom and how much", async () => {
    render(<ResultCard balancedCosts={balancedCosts} />);

    for (const owedMoney of balancedCosts.owedMoney) {
      const row = await screen.findByText(
        `${owedMoney.giver.name} owes ${
          owedMoney.recipient.name
        } ${FormatterService.formatMoney(owedMoney.amount)}`
      );
      expect(row).toBeDefined();
    }
  });
});
