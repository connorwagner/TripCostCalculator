using System.ComponentModel.DataAnnotations;
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
    public class BalanceCostsApiRequestBody : ApiRequestBody<IEnumerable<TripMember>> { }

    [HttpPost] // This would be a great candidate for the proposed QUERY method
    [Route("balance-costs")]
    [ProducesResponseType(typeof(IApiResponse<BalancedCosts>), (int)HttpStatusCode.OK)]
    [ProducesResponseType(typeof(IApiResponse<BalancedCosts>), (int)HttpStatusCode.BadRequest)]
    public IApiResponse<BalancedCosts> BalanceCosts(
        [Required][FromBody] BalanceCostsApiRequestBody body
    )
    {
        var validationErrorResponse = GetValidationErrors(body);
        if (validationErrorResponse != null)
        {
            return validationErrorResponse;
        }

        var tripMembers = body.Data;
        var result = costBalancerService.BalanceCosts(tripMembers);

        return new ApiResponse<BalancedCosts>(
            HttpStatusCode.OK,
            result
        );
    }

    private static ApiResponse<BalancedCosts>? GetValidationErrors(BalanceCostsApiRequestBody body)
    {
        var tripMembers = body.Data;

        if (tripMembers.Any(m => string.IsNullOrWhiteSpace(m.Name)))
        {
            return new(HttpStatusCode.BadRequest, null, [new ArgumentException("All Trip Members must have a name", "data[].name")]);
        }

        if (tripMembers.Any(m => m.Spent < 0))
        {
            return new(HttpStatusCode.BadRequest, null, [new ArgumentException("Trip Members cannot have a negative amount spent", "data[].spent")]);
        }

        return null;
    }
}
