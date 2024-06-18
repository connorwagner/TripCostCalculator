using System.Net;
using TripCostCalculatorApi.Interfaces;

namespace TripCostCalculatorApi.Models;

public record ApiResponse(HttpStatusCode Status, IEnumerable<ReturnableException>? Errors = null)
    : IApiResponse
{
}

public record ApiResponse<T>(HttpStatusCode Status, T Data, IEnumerable<ReturnableException>? Errors = null)
    : ApiResponse(Status, Errors), IApiResponse<T>
{
}
