namespace TripCostCalculatorApi.Domain.Models;

public record TripMember
{
    public required string Name { get; set; }
    public required decimal Spent { get; set; }
}
