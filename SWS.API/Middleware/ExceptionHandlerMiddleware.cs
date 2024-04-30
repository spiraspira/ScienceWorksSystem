namespace SWS.API.Middleware;

public class ExceptionHandlerMiddleware(RequestDelegate next, ILogger<ExceptionHandlerMiddleware> logger)
{
	public async Task InvokeAsync(HttpContext context)
	{
		try
		{
			await next.Invoke(context);
		}
		catch (Exception ex)
		{
			const int statusCode = (int)HttpStatusCode.InternalServerError;

			var result = JsonConvert.SerializeObject(new
			{
				StatusCode = statusCode,
				ErrorMessage = ex.Message
			});

			context.Response.ContentType = "application/json";

			context.Response.StatusCode = statusCode;

			logger.LogError(ex, "An unhandled exception occurred: {ExceptionMessage}", ex.Message);

			await context.Response.WriteAsync(result);
		}
	}
}