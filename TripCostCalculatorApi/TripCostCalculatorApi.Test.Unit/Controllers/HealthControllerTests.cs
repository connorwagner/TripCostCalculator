using System.Net;
using FluentAssertions;
using TripCostCalculatorApi.Controllers;

namespace TripCostCalculatorApi.Test.Unit.Controllers;

public class HealthControllerTests
{
    public class ApiHealthTests
    {
        private readonly HealthController controller = new();

        [Fact]
        public void Should_Return_ApiResponse()
        {
            var result = controller.ApiHealth();
            result.Status.ShouldBeEquivalentTo(HttpStatusCode.OK);
            result.Errors.Should().BeNull();
        }
    }
}
