import { WEATHER_API_KEY } from '@env';
import logger from 'Utils/logger';

const BASE_URL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';

export const fetchWeatherFromAPI = async (city: string) => {
  const response = await fetch(`${BASE_URL}/${city}?unitGroup=metric&key=${WEATHER_API_KEY}`);
  if (!response.ok) { throw new Error('Failed to fetch weather data'); }
  const data = await response.json();  // Store response before logging
  // logger.log(data, 'fetchWeatherFromAPI');

  return data;
};
