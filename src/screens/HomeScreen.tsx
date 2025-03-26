import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList, ScrollView, TextInput, Alert, Platform, RefreshControl } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { fetchWeather } from '../redux/weatherSlice';
import { AppDispatch, RootState } from '../redux/store';
import { Commonheight, Commonsize, Commonwidth } from 'Utils/ResponsiveWidget';
import { format } from 'date-fns';
import { weatherIcons } from '../Assets/Weather/weather';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'types/stackType';
import { debounce } from 'Utils/debounce';
import Geolocation from 'react-native-geolocation-service';
import { PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import logger from 'Utils/logger';
import { darkTheme, lightTheme } from '../themes/colors';
import { toggleTheme } from '../redux/themeSlice';
import { Icon3, Icon4 } from '../Utils/CommonIcons';

const HomeScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const weather = useSelector((state: RootState) => state.weather);


  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const theme = isDarkMode ? darkTheme : lightTheme;

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [currentDate, setCurrentDate] = useState('');
  const [searchCity, setSearchCity] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const today = new Date();
    setCurrentDate(format(today, 'MMMM dd, yyyy'));
    requestLocationPermission();


      console.log('Redux Theme State:', theme);

  }, []);




  const onRefresh = useCallback(() => {
    setRefreshing(true);

    requestLocationPermission(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);


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


  const requestLocationPermission = async (refreshState = false) => {
    const result = await request(
      Platform.OS === 'android'
        ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
        : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
    );

    if (result === RESULTS.GRANTED) {

      if (weather.forecast.length === 0 || refreshState) { getCurrentLocation(); logger.log('Location permission granted', weather.forecast); }

    } else {
      Alert.alert('Permission Denied', 'Enable location permission to get weather for your location.');
    }
  };









  const toggleThemes = () => {
    dispatch(toggleTheme());
  };

  const debouncedFetchWeather = useCallback(
    debounce((city: string) => {
      if (city.trim()) {
        dispatch(fetchWeather(city));
      }
    }, 800), // Wait 800ms before making the API request
    [dispatch]
  );

  const searchByCity = () => {
    if (!searchCity.trim()) { return; }
    debouncedFetchWeather(searchCity);
    setSearchCity('');
  };


  return (
    <View style={[styles.fullFlex, { backgroundColor: theme.background }]}>
      <View style={[styles.fullFlex, { backgroundColor: theme.background, width: '90%', height: '100%', alignSelf: "center" }]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          <View style={[styles.firstSubContainer]}>
            <View style={styles.topBtns}>
              <Text style={[styles.cityTitle, { color: theme.text, marginRight: Commonwidth(40),fontSize: Commonsize(24),fontWeight:'bold' }]}>Climora</Text>

              <View style={[styles.themeStyle, { flex: 1, flexDirection: 'row', backgroundColor: theme.cardBackground, alignItems: "center", justifyContent: "space-between", paddingHorizontal: Commonsize(10), borderRadius: Commonsize(20) }]}>
                <TextInput
                  placeholder='search by city'
                  placeholderTextColor={theme.secondaryText}
                  style={[styles.searchInputStyle, { color: theme.secondaryText }]}
                  value={searchCity}
                  onChangeText={setSearchCity}
                  returnKeyType="search" // Shows "Search" button in keyboard
                  onSubmitEditing={searchByCity}
                />
                <TouchableOpacity onPress={searchByCity}>
                  <Icon3 name="search" size={Commonsize(20)} color={theme.text} />
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={toggleThemes} style={styles.themeStyle}>
                <Icon4 name={isDarkMode ? 'moon' : 'sun'} size={Commonsize(18)} color={theme.text} />
              </TouchableOpacity>
            </View>
            <Text style={[styles.cityTitle, { color: theme.text }]}>{weather.resolvedAddress}</Text>
            {/* <Text style={[styles.cityTitle, { color: theme.text,fontSize:Commonsize(12) }]}>{weather.city}</Text> */}
            <Text style={[styles.dateText, { color: theme.secondaryText }]}>{currentDate}</Text>
      

          </View>
          <View style={styles.secondSubContainer}>

            <View style={styles.imageContainer}>
              <Image source={weather.icon ? weatherIcons[weather.icon] : require('../Assets/Images/weather/cloudy.png')} style={styles.imgStyle} resizeMode="contain" />
            </View>
            <View style={styles.weatherDetailsContainer}>
              <View style={[styles.wDetailContainer, { backgroundColor: theme.cardBackground }]}>
                <Text style={[styles.wDetailHeading, { color: theme.secondaryText }]}>Temp</Text>
                <Text style={[styles.wDetailValue, { color: theme.text }]}>{weather.temperature}°C</Text>
              </View>
              <View style={[styles.wDetailContainer, { backgroundColor: theme.cardBackground }]}>
                <Text style={[styles.wDetailHeading, { color: theme.secondaryText }]}>Humidity</Text>
                <Text style={[styles.wDetailValue, { color: theme.text }]}>{weather.humidity}%</Text>
              </View>
              <View style={[styles.wDetailContainer, { backgroundColor: theme.cardBackground }]}>
                <Text style={[styles.wDetailHeading, { color: theme.secondaryText }]}>WindSpeed</Text>
                <Text style={[styles.wDetailValue, { color: theme.text }]}>{weather.windSpeed} km/h</Text>
              </View>
              <View style={[styles.wDetailContainer, { backgroundColor: theme.cardBackground }]}>
                <Text style={[styles.wDetailHeading, { color: theme.secondaryText }]}>Condition</Text>
                <Text style={[styles.wDetailValue, { color: theme.text }]}>{weather.condition}</Text>
              </View>
            </View>
          </View>
          <View style={styles.thirdContainer}>
            <View style={styles.fullReportTitleContainer}>
              <Text style={[styles.reportHeading, { color: theme.text }]}>Today</Text>
              <TouchableOpacity onPress={() => navigation.navigate('AllReportScreen')}>
                <Text style={[styles.fullReportText, { color: theme.primary }]}>View full report</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.fullReportCardContainer}>
              <FlatList
                data={weather.forecast}
                horizontal={true}
                keyExtractor={(item: any, i: number) => i.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => navigation.navigate('AllReportScreen')} style={[styles.fullReportSubCardContainer, { backgroundColor: theme.primary, marginRight: Commonwidth(10) }]}>
                    <Image source={item.icon ? weatherIcons[item.icon] : require('../Assets/Images/weather/cloudy.png')} style={styles.FRimgStyle} resizeMode="contain" />
                    <View>
                      <Text style={[styles.FRDetailsHeading, { color: theme.secondaryText }]}>{item?.datetime}</Text>
                      <Text style={[styles.FRDetailsValue, { color: theme.text }]}>{item?.temp}°c</Text>
                    </View>
                  </TouchableOpacity>
                )} />
            </View>
          </View>
        </ScrollView>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({

  // modalContainer:{flex:1,backgroundColor:'rgba(0,0,0,0.5)',width:"100%",height:'100%'},
  // subContainer:{width:'100%'}
  searchInputStyle: { fontSize: Commonsize(13), },
  fullFlex: { flex: 1, width: '100%', height: '100%' },
  firstSubContainer: { height: Commonheight(170), width: '100%', justifyContent: "center", alignItems: "center", },
  secondSubContainer: { flex: 1, alignItems: "center", },
  thirdContainer: { height: Commonheight(140), width: '100%', marginBottom: Commonheight(10) },
  cityTitle: { fontSize: Commonsize(18), fontWeight: '500', textAlign: "center" },
  dateText: { fontSize: Commonsize(14), marginTop: Commonheight(4) },
  toggleBtnContainer: { flexDirection: 'row', borderRadius: Commonsize(4) },
  forecastBtn: { borderRadius: Commonsize(4) },
  forecastText: { fontSize: Commonsize(12), paddingHorizontal: Commonwidth(20), paddingVertical: Commonheight(8) },
  airQltyBtn: { borderRadius: Commonsize(4) },
  airQltyText: { fontSize: Commonsize(12), paddingHorizontal: Commonwidth(20), paddingVertical: Commonheight(8) },
  imageContainer: { width: Commonsize(250), height: Commonsize(260), justifyContent: 'center', alignItems: 'center' },
  imgStyle: { width: Commonsize(250), height: Commonsize(250) },
  weatherDetailsContainer: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', flexWrap: 'wrap' },
  wDetailContainer: { width: '48%', justifyContent: 'center', alignItems: 'center', borderRadius: Commonsize(8), marginBottom: Commonheight(14), paddingVertical: Commonheight(10), paddingHorizontal: Commonwidth(14) },
  wDetailHeading: { fontSize: Commonsize(12), textAlign: "center" },
  wDetailValue: { fontSize: Commonsize(14), fontWeight: '500', textAlign: "center" },
  fullReportTitleContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: Commonheight(14) },
  reportHeading: { fontSize: Commonsize(16), fontWeight: '500', },
  fullReportText: { fontSize: Commonsize(13), },
  fullReportSubCardContainer: { flexDirection: 'row', width: Commonwidth(150), height: Commonheight(70), backgroundColor: 'pink', borderRadius: Commonsize(8), justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: Commonsize(14) },
  FRimgStyle: { width: Commonsize(50), height: Commonsize(50) },
  FRDetailsHeading: { fontSize: Commonsize(12), fontWeight: '500' },
  FRDetailsValue: { fontSize: Commonsize(18), fontWeight: '500' },
  fullReportCardContainer: { flexDirection: "row" },
  topBtns: { width: '100%', height: Commonheight(50), flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginBottom: Commonheight(20) },
  themeStyle: { paddingLeft: Commonwidth(10) }
});

export default HomeScreen;
