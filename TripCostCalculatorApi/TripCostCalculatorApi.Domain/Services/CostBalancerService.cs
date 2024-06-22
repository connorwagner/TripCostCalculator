using TripCostCalculatorApi.Domain.Interfaces;
using TripCostCalculatorApi.Domain.Models;

namespace TripCostCalculatorApi.Domain.Services;

public class CostBalancerService : ICostBalancerService
{
    public BalancedCosts BalanceCosts(IEnumerable<TripMember> tripMembers)
    {
        var totalCost = tripMembers.Sum(m => m.Spent);
        var averageCost = RoundToDecimalPlaces(tripMembers.Average(m => m.Spent), decimals: 2);

        var recipients = tripMembers
                            .Where(m => m.Spent > averageCost)
                            .OrderByDescending(m => m.Spent)
                            .ToList();
        var givers = tripMembers
                        .Where(m => m.Spent < averageCost)
                        .OrderBy(m => m.Spent)
                        .ToList();

        var results = new List<OwedMoney>();
        while (recipients.Count > 0 && givers.Count > 0)
        {
            var giver = givers.First();
            var recipient = recipients.First();

            var amount = Math.Min(
                averageCost - giver.Spent,
                recipient.Spent - averageCost
            );

            results.Add(new()
            {
                Recipient = recipient,
                Giver = giver,
                Amount = amount
            });

            giver.Spent += amount;
            recipient.Spent -= amount;

            if (giver.Spent >= averageCost)
            {
                givers.Remove(giver);
            }
            if (recipient.Spent <= averageCost)
            {
                recipients.Remove(recipient);
            }
        }

        return new()
        {
            OwedMoney = results,
            TotalCost = totalCost,
            CostPerPerson = averageCost
        };
    }

    private static decimal RoundToDecimalPlaces(decimal value, int decimals)
    {
        // Round down rather than to nearest because the goal is to _exchange_
        // the minimal amount of money
        return Math.Round(value, decimals, MidpointRounding.ToZero);
    }
}
