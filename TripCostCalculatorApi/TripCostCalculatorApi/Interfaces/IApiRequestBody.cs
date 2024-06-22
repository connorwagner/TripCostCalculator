namespace TripCostCalculatorApi.Interfaces;

public interface IApiRequestBody<T>
{
    T Data { get; set; }
}
