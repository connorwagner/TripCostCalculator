namespace TripCostCalculatorApi.Domain.Models;

public record BalancedCosts
{
    public required IEnumerable<OwedMoney> OwedMoney { get; set; }
}
