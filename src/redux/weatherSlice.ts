import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchWeatherFromAPI } from '../api/weatherApi';

export const fetchWeather = createAsyncThunk('weather/fetchWeather', async (city: string, { rejectWithValue }) => {
  console.log({ city }, 'fetchWeather')
  try {
    const data = await fetchWeatherFromAPI(city);
    // await AsyncStorage.setItem(`weather_${city}`, JSON.stringify(data));
    console.log({ city, data }, 'fetchWeather')
    return {
      city,
      temperature: data.currentConditions.temp,
      humidity: data.currentConditions.humidity,
      windSpeed: data.currentConditions.windspeed,
      condition: data.currentConditions.conditions,
      resolvedAddress: data.resolvedAddress,
      icon: data.currentConditions.icon,
      forecast: data?.days.slice(0, 10),
    };

  } catch (error) {
    return rejectWithValue('Could not fetch weather');
  }
});

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    city: '',
    temperature: null,
    humidity: null,
    windSpeed: null,
    condition: '',
    loading: false,
    resolvedAddress: '',
    error: null,
    icon: '',
    forecast: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;
        Object.assign(state, action.payload);
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default weatherSlice.reducer;
