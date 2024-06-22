using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using TripCostCalculatorApi.Interfaces;

namespace TripCostCalculatorApi.Models;

#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider adding the 'required' modifier or declaring as nullable.
public class ApiRequestBody<T> : IApiRequestBody<T>
{
    [Required]
    [JsonRequired]
    public T Data { get; set; }
}
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider adding the 'required' modifier or declaring as nullable.
