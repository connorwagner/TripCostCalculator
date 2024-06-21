namespace TripCostCalculatorApi.Domain.Models;

public record OwedMoney
{
    public required TripMember Recipient { get; set; }
    public required TripMember Giver { get; set; }
    public required decimal Amount { get; set; }
}
