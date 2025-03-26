import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import weatherReducer from './weatherSlice';
import tabReducer from './tabSlice';
import themeReducer from './themeSlice';
const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['weather','theme'],
};

const rootReducer = combineReducers({
    weather: weatherReducer,
    tab: tabReducer,
    theme: themeReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);
persistor.persist();
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
