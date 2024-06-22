using FluentAssertions;
using TripCostCalculatorApi.Domain.Models;
using TripCostCalculatorApi.Domain.Services;

namespace TripCostCalculatorApi.Domain.Test.Unit.Services;

public class CostBalancerServiceTests
{
    public class BalanceCostsTests
    {
        private readonly CostBalancerService subject = new();

        [Fact]
        public void Should_Balance_2_Costs()
        {
            // Total cost: 69.12
            // Average cost: 34.56
            // Jacob owes Kyle: 34.56 - 12.34 = 22.22 = 56.78 - 34.56
            IEnumerable<TripMember> members = [
                new() { Name="Jacob", Spent=12.34M },
                new() { Name="Kyle", Spent=56.78M }
            ];
            var result = subject.BalanceCosts(members);

            result.TotalCost.ShouldBeEquivalentTo(69.12M);
            result.CostPerPerson.ShouldBeEquivalentTo(34.56M);
            result.OwedMoney.Should().HaveCount(1);

            var owed = result.OwedMoney.First(o => o.Giver.Name == "Jacob");
            owed.Giver.Name.ShouldBeEquivalentTo("Jacob");
            owed.Recipient.Name.ShouldBeEquivalentTo("Kyle");
            owed.Amount.ShouldBeEquivalentTo(22.22M);
        }

        [Fact]
        public void Should_Balance_3_Costs()
        {
            // Total cost: 217.18
            // Average cost: 72.39 (and 1/3)
            // Louis owes David: 72.39 - 53.54 = 18.85
            // Carter owes David: 72.39 - 50.23 = 18.85
            IEnumerable<TripMember> members = [
                new() { Name="Louis", Spent=53.54M },
                new() { Name="Carter", Spent=50.23M },
                new() { Name="David", Spent=113.41M }
            ];
            var result = subject.BalanceCosts(members);

            result.TotalCost.ShouldBeEquivalentTo(217.18M);
            result.CostPerPerson.ShouldBeEquivalentTo(72.39M);
            result.OwedMoney.Should().HaveCount(2);

            var owed = result.OwedMoney.First(o => o.Giver.Name == "Louis");
            owed.Giver.Name.ShouldBeEquivalentTo("Louis");
            owed.Recipient.Name.ShouldBeEquivalentTo("David");
            owed.Amount.ShouldBeEquivalentTo(18.85M);

            owed = result.OwedMoney.First(o => o.Giver.Name == "Carter");
            owed.Giver.Name.ShouldBeEquivalentTo("Carter");
            owed.Recipient.Name.ShouldBeEquivalentTo("David");
            owed.Amount.ShouldBeEquivalentTo(22.16M);
        }

        [Fact]
        public void Should_Balance_3_Highly_Varied_Costs()
        {
            // Total cost: 1,643.18
            // Average cost: 547.72 (and 2/3)
            // Noah owes Caleb: 547.72 - 3.54 = 544.18
            // Deangelo owes Caleb: 547.72 - 500.23 = 47.49
            IEnumerable<TripMember> members = [
                new() { Name="Noah", Spent=3.54M },
                new() { Name="Deangelo", Spent=500.23M },
                new() { Name="Caleb", Spent=1139.41M }
            ];
            var result = subject.BalanceCosts(members);

            result.TotalCost.ShouldBeEquivalentTo(1_643.18M);
            result.CostPerPerson.ShouldBeEquivalentTo(547.72M);
            result.OwedMoney.Should().HaveCount(2);

            var owed = result.OwedMoney.First(o => o.Giver.Name == "Noah");
            owed.Giver.Name.ShouldBeEquivalentTo("Noah");
            owed.Recipient.Name.ShouldBeEquivalentTo("Caleb");
            owed.Amount.ShouldBeEquivalentTo(544.18M);

            owed = result.OwedMoney.First(o => o.Giver.Name == "Deangelo");
            owed.Giver.Name.ShouldBeEquivalentTo("Deangelo");
            owed.Recipient.Name.ShouldBeEquivalentTo("Caleb");
            owed.Amount.ShouldBeEquivalentTo(47.49M);
        }

        [Fact]
        public void Should_Balance_4_Costs_With_Multiple_Recipients()
        {
            // Total cost: 100
            // Average cost: 25
            // Jim owes Joy: 25 - 10 = 15
            //  Jim total: 10 + 15 = 25
            //  Joy total: 40 - 15 = 25
            // Jon owes Joe: 25 - 20 = 5
            //  Jon total: 20 + 5 = 25
            //  Joe total: 30 - 5 = 25
            IEnumerable<TripMember> members = [
                new() { Name="Jim", Spent=10M },
                new() { Name="Jon", Spent=20M },
                new() { Name="Joe", Spent=30M },
                new() { Name="Joy", Spent=40M }
            ];
            var result = subject.BalanceCosts(members);

            result.TotalCost.ShouldBeEquivalentTo(100M);
            result.CostPerPerson.ShouldBeEquivalentTo(25M);
            result.OwedMoney.Should().HaveCount(2);

            var owed = result.OwedMoney.First(o => o.Giver.Name == "Jim");
            owed.Giver.Name.ShouldBeEquivalentTo("Jim");
            owed.Recipient.Name.ShouldBeEquivalentTo("Joy");
            owed.Amount.ShouldBeEquivalentTo(15M);

            owed = result.OwedMoney.First(o => o.Giver.Name == "Jon");
            owed.Giver.Name.ShouldBeEquivalentTo("Jon");
            owed.Recipient.Name.ShouldBeEquivalentTo("Joe");
            owed.Amount.ShouldBeEquivalentTo(5M);
        }

        [Fact]
        public void Should_Balance_5_Costs_With_Multiple_Partial_Recipients()
        {
            // Total cost: 170
            // Average cost: 34
            // Jim owes Jon: 42 - 34 = 8
            //  Jim total: 0 + 8 = 8
            //  Jon total: 42 - 8 = 34
            // Jim owes Joe: 40 - 34 = 6
            //  Jim total: 8 + 6 = 14
            //  Joe total: 40 - 6 = 34
            // Jim owes Jay: 43 - 34 = 9
            //  Jim total: 14 + 9 = 23
            //  Jay total: 43 - 9 = 34
            // Jim owes Joy: 45 - 34 = 11
            //  Jim total: 23 + 11 = 34
            //  Joy total: 45 - 11 = 34
            IEnumerable<TripMember> members = [
                new() { Name="Jim", Spent=0M },
                new() { Name="Jon", Spent=42M },
                new() { Name="Joe", Spent=40M },
                new() { Name="Jay", Spent=43M },
                new() { Name="Joy", Spent=45M }
            ];
            var result = subject.BalanceCosts(members);

            result.TotalCost.ShouldBeEquivalentTo(170M);
            result.CostPerPerson.ShouldBeEquivalentTo(34M);
            result.OwedMoney.Should().HaveCount(4);

            var owed = result.OwedMoney.First(o => o.Recipient.Name == "Jon");
            owed.Giver.Name.ShouldBeEquivalentTo("Jim");
            owed.Recipient.Name.ShouldBeEquivalentTo("Jon");
            owed.Amount.ShouldBeEquivalentTo(8M);

            owed = result.OwedMoney.First(o => o.Recipient.Name == "Joe");
            owed.Giver.Name.ShouldBeEquivalentTo("Jim");
            owed.Recipient.Name.ShouldBeEquivalentTo("Joe");
            owed.Amount.ShouldBeEquivalentTo(6M);

            owed = result.OwedMoney.First(o => o.Recipient.Name == "Jay");
            owed.Giver.Name.ShouldBeEquivalentTo("Jim");
            owed.Recipient.Name.ShouldBeEquivalentTo("Jay");
            owed.Amount.ShouldBeEquivalentTo(9M);

            owed = result.OwedMoney.First(o => o.Recipient.Name == "Joy");
            owed.Giver.Name.ShouldBeEquivalentTo("Jim");
            owed.Recipient.Name.ShouldBeEquivalentTo("Joy");
            owed.Amount.ShouldBeEquivalentTo(11M);
        }
    }
}
