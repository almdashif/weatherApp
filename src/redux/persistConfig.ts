import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer } from 'redux-persist';
import weatherReducer from './weatherSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['weather'], // Persist weather data
};

export default persistReducer(persistConfig, weatherReducer);
