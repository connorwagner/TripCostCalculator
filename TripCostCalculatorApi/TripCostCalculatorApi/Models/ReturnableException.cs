using System.Text.Json.Serialization;

namespace TripCostCalculatorApi.Models;

[Serializable]
public class ReturnableException
{
    public string? Type { get; }
    public string? Message { get; }
    public string? Source { get; }
    public string? StackTrace { get; }
    public ReturnableException? InnerException { get; }

    [JsonConstructor]
    public ReturnableException() { }

    public ReturnableException(Exception exception, bool includeInnerException = true, bool includeStackTrace = false)
    {
        ArgumentNullException.ThrowIfNull(exception);

        Type = exception.GetType().FullName;
        Message = exception.Message;
        Source = exception.Source;
        StackTrace = includeStackTrace ? exception.StackTrace : null;
        if (includeInnerException && exception.InnerException is not null)
        {
            InnerException = new ReturnableException(exception.InnerException, includeInnerException, includeStackTrace);
        }
    }
}