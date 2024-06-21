using System.Net;
using FluentAssertions;
using Moq;
using TripCostCalculatorApi.Controllers;
using TripCostCalculatorApi.Domain.Interfaces;
using TripCostCalculatorApi.Domain.Models;

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
        public void Should_Return_Balanced_Costs()
        {
            BalancedCosts expectedResult = new()
            {
                OwedMoney = [
                    new() {
                        Recipient = new() {
                            Name = "Member 1",
                            Spent = 12.34M
                        },
                        Giver = new() {
                            Name = "Member 2",
                            Spent = 12.34M
                        },
                        Amount = 0M
                    }
                ]
            };
            mockCostBalancer
                .Setup(m => m.BalanceCosts(It.IsAny<IEnumerable<TripMember>>()))
                .Returns(expectedResult);

            IEnumerable<TripMember> tripMembers = expectedResult.OwedMoney.SelectMany<OwedMoney, TripMember>(r => [r.Recipient, r.Giver]);
            var result = controller.BalanceCosts(tripMembers);
            result.Status.ShouldBeEquivalentTo(HttpStatusCode.OK);
            result.Data.ShouldBeEquivalentTo(expectedResult);
        }
    }
}
