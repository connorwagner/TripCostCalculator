using System.Buffers;
using System.Text;
using System.Text.Json;
using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Moq;
using TripCostCalculatorApi.Middleware;
using TripCostCalculatorApi.Models;

namespace TripCostCalculatorApi.Test.Unit.Middleware;

public class StatusCodeRewriterMiddlewareTests
{
    private readonly Mock<RequestDelegate> nextMock;
    private readonly StatusCodeRewriterMiddleware subject;

    private HttpContext? context;

    public StatusCodeRewriterMiddlewareTests()
    {
        nextMock = new();
        subject = new(nextMock.Object);

        ConfigureEndpointReturn(200);
    }

    [Fact]
    public async Task InvokeAsync_Should_Update_StatusCode()
    {
        var expectedCode = 204;
        ConfigureEndpointReturn(expectedCode);

        await subject.InvokeAsync(context!);

        context!.Response.StatusCode.ShouldBeEquivalentTo(expectedCode);
    }

    [Fact]
    public async Task InvokeAsync_Should_Catch_Exceptions()
    {
        nextMock
            .Setup(x => x(It.IsAny<HttpContext>()))
            .ThrowsAsync(new Exception("Text exception"));

        await subject.InvokeAsync(context!);

        context!.Response.StatusCode.ShouldBeEquivalentTo(500);
    }

    private readonly JsonSerializerOptions jsonOptions = new(JsonSerializerDefaults.Web)
    {
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase
    };

    private void ConfigureEndpointReturn(int statusCode, Exception? exception = null)
    {
        context = new DefaultHttpContext();

        var content = new ApiResponse(statusCode, exception == null ? null : [exception]);
        var contentJson = JsonSerializer.Serialize(content, jsonOptions);

        nextMock
            .Setup(x => x(It.IsAny<HttpContext>()))
            .Callback<HttpContext>(c =>
                WriteToStream(contentJson, c.Response.Body));
    }

    private static void WriteToStream(string content, Stream stream)
    {
        using var writer = new StreamWriter(stream, leaveOpen: true);
        writer.Write(content);
    }
}
