using System.Net;
using Microsoft.AspNetCore.Mvc;
using TripCostCalculatorApi.Interfaces;
using TripCostCalculatorApi.Models;

namespace TripCostCalculatorApi.Controllers;

[ApiController]
[Route("[controller]/v1")]
public class HealthController : ControllerBase
{
    [HttpGet]
    [Route("api")]
    [ProducesResponseType(typeof(IApiResponse), ((int)HttpStatusCode.OK))]
    public IApiResponse ApiHealth()
    {
        var errors = new List<Exception> { new ArgumentOutOfRangeException() };
        return new ApiResponse(HttpStatusCode.InternalServerError, errors);
    }
}
