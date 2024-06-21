using TripCostCalculatorApi.Models;

namespace TripCostCalculatorApi.Interfaces;

public interface IApiResponse
{
    public int Status { get; }
    public IEnumerable<ReturnableException>? Errors { get; }
}

public interface IApiResponse<T> : IApiResponse
{
    public T? Data { get; }
}
