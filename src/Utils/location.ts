// utils/location.ts
import Geolocation from 'react-native-geolocation-service';


export const getCurrentLocation = (): Promise<{ latitude: number; longitude: number }> => {
    return new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition(
        (position) => resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }),
        (error) => reject(error)
      );
    });
  };
  
  export const getCityName = async (lat: number, lon: number): Promise<string> => {
    const API_KEY = 'YOUR_REVERSE_GEOCODING_API_KEY';
    const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${API_KEY}`);
    const data = await response.json();
    return data.results[0].components.city || data.results[0].components.town || 'Unknown';
  };
  