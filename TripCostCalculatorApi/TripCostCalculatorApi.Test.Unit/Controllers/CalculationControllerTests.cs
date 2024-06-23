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
                            Expenses = [12.34M]
                        },
                        Giver = new() {
                            Name = "Member 2",
                            Expenses = [12.34M]
                        },
                        Amount = 0M
                    }
                ],
                TotalCost = 24.68M,
                CostPerPerson = 12.34M
            };
            mockCostBalancer
                .Setup(m => m.BalanceCosts(It.IsAny<IEnumerable<TripMember>>()))
                .Returns(expectedResult);

            IEnumerable<TripMember> tripMembers = expectedResult.OwedMoney.SelectMany<OwedMoney, TripMember>(r => [r.Recipient, r.Giver]);
            var result = controller.BalanceCosts(new CalculationController.BalanceCostsApiRequestBody { Data = tripMembers });
            result.Status.ShouldBeEquivalentTo(HttpStatusCode.OK);
            result.Data.ShouldBeEquivalentTo(expectedResult);
        }

        [Fact]
        public void Should_Validate_TripMembers_Names()
        {
            IEnumerable<TripMember> tripMembers = [
                new() {
                    Name = "Member 1",
                    Expenses = [12.34M]
                },
                new() {
                    Name = " ",
                    Expenses = [12.34M]
                }
            ];
            var result = controller.BalanceCosts(new CalculationController.BalanceCostsApiRequestBody { Data = tripMembers });

            result.Status.ShouldBeEquivalentTo(HttpStatusCode.BadRequest);
            var error = result.Errors!.First();
            error.Message.Should().Contain("All Trip Members must have a name");
        }

        [Fact]
        public void Should_Validate_TripMembers_Spends()
        {
            IEnumerable<TripMember> tripMembers = [
                new() {
                    Name = "Member 1",
                    Expenses = [12.34M]
                },
                new() {
                    Name = "Member 2",
                    Expenses = [-12.34M]
                }
            ];
            var result = controller.BalanceCosts(new CalculationController.BalanceCostsApiRequestBody { Data = tripMembers });

            result.Status.ShouldBeEquivalentTo(HttpStatusCode.BadRequest);
            var error = result.Errors!.First();
            error.Message.Should().Contain("Trip Members cannot have a negative amount spent");
        }

        [Fact]
        public void Should_Validate_TripMembers_Names_And_Spends()
        {
            IEnumerable<TripMember> tripMembers = [
                new() {
                    Name = "",
                    Expenses = [12.34M]
                },
                new() {
                    Name = "Member 2",
                    Expenses = [-12.34M]
                }
            ];
            var result = controller.BalanceCosts(new CalculationController.BalanceCostsApiRequestBody { Data = tripMembers });

            result.Status.ShouldBeEquivalentTo(HttpStatusCode.BadRequest);

            var error = result.Errors!.First(e => e.Message!.Contains("name"));
            error.Message.Should().Contain("All Trip Members must have a name");

            error = result.Errors!.First(e => e.Message!.Contains("amount"));
            error.Message.Should().Contain("Trip Members cannot have a negative amount spent");
        }
    }
}
