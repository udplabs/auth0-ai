export function getGeolocationPrompt(geolocation: UIGeolocation) {
	const {
		latitude = '36.18811',
		longitude = '-115.176468',
		city = 'Las Vegas',
		country = 'US',
		flag = '🇺🇸',
	} = geolocation;
	if (!latitude || !longitude || !city || !country) {
		return '';
	}
	return geolocationPrompt
		.replace('{{latitude}}', latitude)
		.replace('{{longitude}}', longitude)
		.replace('{{city}}', city)
		.replace('{{country}}', country)
		.replace('{{flag}}', flag);
}

export const geolocationPrompt = `The user is located in {{city}}, {{country}} {{flag}} at coordinates ({{latitude}}, {{longitude}}).`;
