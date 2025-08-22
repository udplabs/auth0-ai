declare global {
	interface WeatherAtLocationData {
		latitude: number;
		longitude: number;
		elevation?: number;
		generationtime_ms: number;
		utc_offset_seconds?: number;
		timezone?: string;
		timezone_abbreviation?: string;
		current_units?: {
			time: string;
			interval: string;
			temperature_2m: string;
		};
		current?: {
			time?: string;
			interval: number;
			temperature_2m: number;
		};
		hourly_units?: {
			time: string;
			temperature_2m: string;
		};
		hourly?: {
			time: string[];
			temperature_2m: number[];
		};
		daily_units?: {
			time: string;
			sunrise: string;
			sunset: string;
		};
		daily?: {
			time: string[];
			sunrise: string[];
			sunset: string[];
		};
	}
}

export {};
