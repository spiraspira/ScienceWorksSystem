Log.Logger = new LoggerConfiguration()
	.MinimumLevel.Override("Microsoft", LogEventLevel.Information)
	.Enrich.FromLogContext()
	.WriteTo.Console()
	.CreateLogger();

var builder = WebApplication.CreateBuilder(args);

//builder.Services.AddAutoMapper(typeof(SWS.API.Mapper.MappingProfile), typeof(SWS.BLL.Mapper.MappingProfile));
builder.Services.AddBusinessLogic(builder.Configuration);
builder.Services.AddControllers().AddNewtonsoftJson(options => options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSerilog();
builder.Services.AddSwaggerGen();
builder.Services.AddValidatorsFromAssembly(Assembly.Load("TourAgency.API"));
builder.Services.AddCors();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

app.UseCors(corsPolicyBuilder => corsPolicyBuilder
	.AllowAnyOrigin()
	.AllowAnyMethod()
	.AllowAnyHeader());

//app.UseMiddleware<SWS.API.Middleware.ExceptionHandlerMiddleware>();
app.UseHttpsRedirection();

app.MapControllers();

app.Run();