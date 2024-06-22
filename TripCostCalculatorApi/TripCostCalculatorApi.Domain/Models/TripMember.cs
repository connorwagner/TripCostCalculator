using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace TripCostCalculatorApi.Domain.Models;

#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider adding the 'required' modifier or declaring as nullable.
public record TripMember
{
    [Required]
    [JsonRequired]
    public string Name { get; set; }

    [Required]
    [JsonRequired]
    public decimal Spent { get; set; }
}
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider adding the 'required' modifier or declaring as nullable.
