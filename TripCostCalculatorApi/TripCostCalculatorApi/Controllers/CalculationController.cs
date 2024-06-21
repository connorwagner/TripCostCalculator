using System.Net;
using Microsoft.AspNetCore.Mvc;
using TripCostCalculatorApi.Domain.Interfaces;
using TripCostCalculatorApi.Domain.Models;
using TripCostCalculatorApi.Interfaces;
using TripCostCalculatorApi.Models;

namespace TripCostCalculatorApi.Controllers;

[ApiController]
[Route("[controller]/v1")]
public class CalculationController(ICostBalancerService costBalancerService) : ControllerBase
{
    [HttpPost] // This would be a great candidate for the proposed QUERY method
    [Route("balance-costs")]
    [ProducesResponseType(typeof(IApiResponse<BalancedCosts>), (int)HttpStatusCode.OK)]
    public IApiResponse<BalancedCosts> BalanceCosts([FromBody] TripMember[] tripMembers)
    {
        var result = costBalancerService.BalanceCosts(tripMembers);

        return new ApiResponse<BalancedCosts>(
            HttpStatusCode.OK,
            result
        );
    }
}
