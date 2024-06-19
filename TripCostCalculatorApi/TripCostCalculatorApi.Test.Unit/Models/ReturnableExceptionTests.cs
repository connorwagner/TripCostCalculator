using FluentAssertions;
using TripCostCalculatorApi.Models;

namespace TripCostCalculatorApi.Test.Unit.Models;

public class ReturnableErrorTests
{
    [Fact]
    public void Should_Include_Exception_Type()
    {
        var exception = new Exception();

        var subject = new ReturnableException(exception);

        subject.Type.Should().BeEquivalentTo("System.Exception");
    }

    [Fact]
    public void Should_Include_Exception_Message()
    {
        var exception = new Exception("test exception message");

        var subject = new ReturnableException(exception);

        subject.Message.Should().BeEquivalentTo("test exception message");
    }

    [Fact]
    public void Should_Include_Exception_Source()
    {
        var exception = new Exception() { Source = "test exception source" };

        var subject = new ReturnableException(exception);

        subject.Source.Should().BeEquivalentTo("test exception source");
    }

    [Theory]
    [InlineData(true)]
    [InlineData(false)]
    public void Should_Include_Exception_StackTrace(bool shouldIncludeStackTrace)
    {
        try
        {
            // Throw to ensure a stack trace is added to the exception
            throw new Exception();
        }
        catch (Exception e)
        {
            var subject = new ReturnableException(e, includeStackTrace: shouldIncludeStackTrace);

            if (shouldIncludeStackTrace)
            {
                // Testing for an exact stack trace is fragile because it
                // would need to be modified. A simple check for the file
                // name is safer and gets the majority of the value of the test.
                subject.StackTrace.Should().Contain("ReturnableExceptionTests.cs");
            }
            else
            {
                subject.StackTrace.Should().BeNull();
            }
        }
    }

    [Theory]
    [InlineData(true)]
    [InlineData(false)]
    public void Should_Include_InnerException(bool shouldIncludeInnerException)
    {
        var innerException = new Exception("inner");
        var exception = new Exception("outer", innerException);

        var subject = new ReturnableException(exception, includeInnerException: shouldIncludeInnerException);

        if (shouldIncludeInnerException)
        {
            subject.InnerException!.Message.Should().BeEquivalentTo("inner");
        }
        else
        {
            subject.InnerException.Should().BeNull();
        }
    }
}
