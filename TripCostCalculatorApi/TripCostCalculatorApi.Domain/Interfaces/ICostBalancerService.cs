using TripCostCalculatorApi.Domain.Models;

namespace TripCostCalculatorApi.Domain.Interfaces;

public interface ICostBalancerService
{
    BalancedCosts BalanceCosts(IEnumerable<TripMember> tripMembers);
}
