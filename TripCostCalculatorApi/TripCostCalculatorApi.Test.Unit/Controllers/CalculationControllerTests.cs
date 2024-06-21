using FluentAssertions;
using Moq;
using TripCostCalculatorApi.Controllers;
using TripCostCalculatorApi.Domain.Interfaces;

namespace TripCostCalculatorApi.Test.Unit.Controllers;

public class CalculationControllerTests
{
    public class BalanceCostsTests
    {
        private readonly CalculationController controller;

        private readonly Mock<ICostBalancerService> mockCostBalancer;

        public BalanceCostsTests()
        {
            mockCostBalancer = new();
            controller = new(mockCostBalancer.Object);
        }

        [Fact]
        public void Should_Return_ApiResponse()
        {
            false.Should().BeTrue();
        }
    }
}
