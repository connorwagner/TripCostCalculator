namespace TripCostCalculatorApi.Domain.Models;

public record BalancedCosts
{
    public required IEnumerable<OwedMoney> OwedMoney { get; set; }
    public required decimal TotalCost { get; set; }
    public required decimal CostPerPerson { get; set; }
}
