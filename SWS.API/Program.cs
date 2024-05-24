Log.Logger = new LoggerConfiguration()
	.WriteTo.Console()
	.MinimumLevel.Debug()
	.CreateLogger();

var builder = WebApplication.CreateBuilder(args);

var jwtSecretKey = builder.Configuration.GetValue<string>("jwtSecretKey");

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
	.AddJwtBearer(options =>
	{
		options.TokenValidationParameters = new TokenValidationParameters
		{
			ValidateIssuerSigningKey = true,
			IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSecretKey!)),
			ValidateIssuer = false,
			ValidateAudience = false
		};
	});
builder.Services.AddAutoMapper(typeof(SWS.API.Mapper.MappingProfile), typeof(SWS.BLL.Mapper.MappingProfile));
builder.Services.AddBusinessLogic(builder.Configuration);
builder.Services.AddControllers().AddNewtonsoftJson(options => options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSerilog();
builder.Services.AddSwaggerGen();
builder.Services.AddValidatorsFromAssembly(Assembly.Load("SWS.API"));
builder.Services.AddCors();
builder.Services.AddHttpContextAccessor();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

app.UseSerilogRequestLogging();
app.UseCors(corsPolicyBuilder => corsPolicyBuilder
	.AllowAnyOrigin()
	.AllowAnyMethod()
	.AllowAnyHeader());
app.UseMiddleware<SWS.API.Middleware.ExceptionHandlerMiddleware>();
app.UseHttpsRedirection();
app.MapControllers();

app.Run();