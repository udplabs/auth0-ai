import { tool } from 'ai';
import { z } from 'zod';

export const getWeather = tool<
	{ latitude: number; longitude: number },
	Chat.Tools.Response<WeatherAtLocationData>
>({
	description: 'Get the current weather at a location',
	inputSchema: z.object({
		latitude: z.number(),
		longitude: z.number(),
	}),
	name: 'getWeather',
	execute: async ({ latitude, longitude }) => {
		const query = new URLSearchParams({
			latitude: latitude.toString(),
			longitude: longitude.toString(),
			current: 'temperature_2m',
			hourly: 'temperature_2m',
			daily: 'sunrise,sunset',
			timezone: 'auto',
			temperature_unit: 'fahrenheit',
		});
		const response = await fetch(
			`https://api.open-meteo.com/v1/forecast?${query.toString()}`
		);

		return {
			status: 'success',
			message: 'Weather data fetched successfully',
			dataCount: 1,
			data: (await response.json()) as WeatherAtLocationData,
			hasOwnUI: true,
		};
	},
});
