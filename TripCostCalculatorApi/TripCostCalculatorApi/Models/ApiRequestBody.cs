using TripCostCalculatorApi.Interfaces;

namespace TripCostCalculatorApi.Models;

public class ApiRequestBody<T> : IApiRequestBody<T>
{
    public required T Data { get; set; }
}
