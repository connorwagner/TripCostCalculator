using System.Text.RegularExpressions;

namespace TripCostCalculatorApi.Configuration;

public partial class KebabCaseParameterTransformer : IOutboundParameterTransformer
{
    public string? TransformOutbound(object? value)
    {
        var stringValue = value?.ToString();
        if (stringValue == null)
        {
            return null;
        }

        return CamelPascalCaseRegex().Replace(stringValue, "$1-$2").ToLower();
    }

    [GeneratedRegex("([a-z0-9])([A-Z])")]
    private static partial Regex CamelPascalCaseRegex();
}
