using System.Net;
using System.Text.Json.Serialization;
using TripCostCalculatorApi.Interfaces;

namespace TripCostCalculatorApi.Models;

public class ApiResponse : IApiResponse
{
    [JsonConstructor]
    public ApiResponse() { }

    public ApiResponse(int status, IEnumerable<Exception>? errors = null)
    {
        Status = status;
        Errors = errors?.Select(e => new ReturnableException(e));
    }

    public ApiResponse(HttpStatusCode status, IEnumerable<Exception>? errors = null)
        : this((int)status, errors)
    {
    }

    public int Status { get; set; }

    public IEnumerable<ReturnableException>? Errors { get; set; }
}

public class ApiResponse<T>(int status, T? data, IEnumerable<Exception>? errors = null)
    : ApiResponse(status, errors), IApiResponse<T>
{
    public ApiResponse(HttpStatusCode status, T? data, IEnumerable<Exception>? errors = null)
        : this((int)status, data, errors)
    {
    }

    public T? Data { get; set; } = data;
}
