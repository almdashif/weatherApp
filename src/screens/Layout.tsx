import { Alert, Platform, View } from 'react-native'
import React, { useCallback, useEffect } from 'react'
import BottomTabNavigator from '../Components/BottomTabNavigator'
import HomeScreen from './HomeScreen'
import AllReportScreen from './AllReportScreen'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../redux/store'
import { updateTab } from '../redux/tabSlice'
import { RootState } from '../redux/store';
import { Icon2, Icon4, Icon7 } from '../CommonFolder/CommonIcons'
import { Commonsize } from 'Utils/ResponsiveWidget'
import { useTheme } from '../themes/theme'
import HistoryPage from './HistoryPage'
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import logger from 'Utils/logger'
import Geolocation from 'react-native-geolocation-service';
import { fetchWeather, setCity } from '../redux/weatherSlice'
import { debounce } from 'Utils/debounce'


const Layout = () => {
    const dispatch = useDispatch<AppDispatch>();
    const tab = useSelector((state: RootState) => state.tab.tab); // Get tab state
    const theme = useTheme();
    const weather = useSelector((state: RootState) => state.weather);
    useEffect(() => {
        requestLocationPermission();
    }, [])
    useEffect(() => {
        console.log("Weather History from Redux:", weather.history);
    }, [weather.history]);
    

    const debouncedFetchWeather = useCallback(
        debounce((city: string) => {
            if (city.trim()) {
                dispatch(setCity(city));
                dispatch(fetchWeather(city));
            }
        }, 800), // Wait 800ms before making the API request
        [dispatch]
    );
    const getCityNameFromCoords = async (latitude: number, longitude: number) => {
        try {
            const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
            const data = await response.json();

            if (data.city) {
                debouncedFetchWeather(data.city);
            } else {
                Alert.alert('Error', 'Could not fetch city name');
            }
        } catch (error) {
            console.error('Error fetching city name:', error);
        }
    };


    const getCurrentLocation = () => {
        Geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
                getCityNameFromCoords(latitude, longitude);
            },
            error => {
                Alert.alert('Error', error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    };


    const requestLocationPermission = async () => {
        const result = await request(
            Platform.OS === 'android'
                ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
                : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        );

        if (result === RESULTS.GRANTED) {
            getCurrentLocation();
            logger.log('Location permission granted');
        } else {
            Alert.alert('Permission Denied', 'Enable location permission to get weather for your location.');
        }
    };


    

    return (
        <View style={{ flex: 1, width: '100%', height: '100%' }}>


            <BottomTabNavigator
                state={tab}
                renderTabs={[<HomeScreen />, <AllReportScreen />, <HistoryPage />]}
                tabNames={['HomeScreen', 'AllReportScreen', 'History']} tabIcons={[
                    <Icon4 name={"home"} size={Commonsize(20)} style={{ color: theme.text }} />,
                    <Icon2 name={"calendar"} size={Commonsize(20)} style={{ color: theme.text }} />,
                    <Icon7 name={"history"} size={Commonsize(20)} style={{ color: theme.text }} />,
                ]}
                style={{ backgroundColor: theme.cardBackground, borderTopColor: theme.cardBackground }}
                activeBackgroundColor={theme.background}
                inActiveBackgroundColor={theme.cardBackground}
                tabOnPress={[
                    (() => dispatch(updateTab(0))),
                    (() => dispatch(updateTab(1))),
                    (() => dispatch(updateTab(2))),
                ]}
            />
        </View>
    );
};

export default Layout;
