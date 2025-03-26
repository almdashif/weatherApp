import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchWeatherFromAPI } from '../api/weatherApi';
import logger from 'Utils/logger';

export const fetchWeather = createAsyncThunk('weather/fetchWeather', async (city: string, { rejectWithValue }) => {

  try {
    const data = await fetchWeatherFromAPI(city);
    logger.log({ city, data }, 'fetchWeather');
    return {
      city: data.address,
      temperature: data.currentConditions.temp,
      humidity: data.currentConditions.humidity,
      windSpeed: data.currentConditions.windspeed,
      condition: data.currentConditions.conditions,
      resolvedAddress: data.resolvedAddress,
      icon: data.currentConditions.icon,
      forecast: data?.days.slice(0, 11),
      timestamp: new Date().toISOString(),
      datetimeEpoch: data.currentConditions.datetimeEpoch,
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
    error: null as string | null,
    icon: '',
    forecast: [],
    datetimeEpoch: null,
    history: [] as Array<{
      city: string;
      resolvedAddress: string;
      timestamp: string;
      temperature: number | null;
      condition: string;
      icon: string;
    }>,
  },
  reducers: {
    setCity: (state, action) => {
      state.city = action.payload;
    },
    clearHistory: (state) => {
      state.history = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;

        const newEntry = {
          city: action.payload.city,
          resolvedAddress: action.payload.resolvedAddress,
          temperature: action.payload.temperature,
          condition: action.payload.condition,
          icon: action.payload.icon,
          timestamp: action.payload.timestamp,
          datetimeEpoch: action.payload.datetimeEpoch,
        };

        state.history = [...(state.history || [])]; // Ensure history exists

        const exists = state.history.some(entry => entry.city === action.payload.city);
        if (!exists) {
          state.history.unshift(newEntry);
          if (state.history.length > 10) { state.history.pop(); } // Keep last 10
        }

        Object.assign(state, { ...action.payload, history: state.history });
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
export const { setCity, clearHistory } = weatherSlice.actions;
export default weatherSlice.reducer;
