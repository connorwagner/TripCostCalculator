using FluentAssertions;
using TripCostCalculatorApi.Configuration;

namespace TripCostCalculatorApi.Test.Unit.Configuration;

public class KebabCaseParameterTransformerTests
{
    public class TransformOutboundTests
    {
        private readonly KebabCaseParameterTransformer subject = new();

        [Fact]
        public void TransformOutbound_Should_Convert_PascalCase_To_KebabCase()
        {
            var input = "MultiPartControllerName";
            var expected = "multi-part-controller-name";

            var result = subject.TransformOutbound(input);
            result.Should().BeEquivalentTo(expected);
        }
    }
}
