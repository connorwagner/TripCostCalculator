using System.Net;
using System.Text.Json;
using TripCostCalculatorApi.Models;

namespace TripCostCalculatorApi.Middleware;

public class StatusCodeRewriterMiddleware(RequestDelegate next)
{
    private readonly JsonSerializerOptions jsonOptions = new(JsonSerializerDefaults.Web)
    {
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase
    };

    public async Task InvokeAsync(HttpContext context)
    {
        var originalResponseBodyStream = context.Response.Body;

        try
        {
            using var memoryStream = new MemoryStream();
            context.Response.Body = memoryStream;

            await next(context);

            memoryStream.Position = 0;
            using var reader = new StreamReader(memoryStream);
            var responseBodyStr = await reader.ReadToEndAsync();

            var responseBody = JsonSerializer.Deserialize<ApiResponse>(responseBodyStr, jsonOptions);
            var desiredStatus = responseBody?.Status;
            if (desiredStatus != null)
            {
                context.Response.StatusCode = (int)desiredStatus;
            }

            memoryStream.Position = 0;
            await memoryStream.CopyToAsync(originalResponseBodyStream);
        }
        catch (Exception e)
        {
            var newBody = new ApiResponse(HttpStatusCode.InternalServerError, [e]);
            var newBodyStr = JsonSerializer.Serialize(newBody);

            using var memoryStream = new MemoryStream();
            using var writer = new StreamWriter(memoryStream);
            await writer.WriteAsync(newBodyStr);

            memoryStream.Position = 0;
            await memoryStream.CopyToAsync(originalResponseBodyStream);

            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
        }
        finally
        {
            context.Response.Body = originalResponseBodyStream;
        }
    }
}
