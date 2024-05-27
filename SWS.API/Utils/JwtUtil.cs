namespace SWS.API.Utils;

public static class JwtUtil
{
	public static Task<IEnumerable<Claim>> ValidateToken(IConfiguration configuration, string token)
	{
		var tokenHandler = new JwtSecurityTokenHandler();

		var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration.GetValue<string>("jwtSecretKey")!));

		var validationParameters = new TokenValidationParameters
		{
			ValidateIssuerSigningKey = true,
			IssuerSigningKey = key,
			ValidateIssuer = false,
			ValidateAudience = false,
			ClockSkew = TimeSpan.Zero
		};

		var claimsPrincipal = tokenHandler.ValidateToken(token, validationParameters, out var validatedToken);

		return Task.FromResult(claimsPrincipal.Claims);
	}
}
