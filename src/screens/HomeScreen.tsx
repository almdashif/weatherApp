import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Image, Alert, Platform, StyleSheet, FlatList, useColorScheme } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeather } from '../redux/weatherSlice';
import { RootState } from '../redux/store';
import { useTheme } from '../themes/theme';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { Commonheight, Commonsize, Commonwidth } from 'Utils/ResponsiveWidget';
import { format } from 'date-fns';
import logger from 'Utils/logger';
import { weatherIcons } from '../Assets/Weather/weather';
import { Icon3, Icon4 } from 'CommonFolder/CommonIcons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'types/stackType';


const HomeScreen = () => {
  const dispatch = useDispatch();
  const weather = useSelector((state: RootState) => state.weather);

  const theme = useTheme();
  const scheme = useColorScheme();


  
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [currentDate, setCurrentDate] = useState('');
  const [city, setCity] = useState('Fetching...');
  const [currentToggle, setCurrentToggle] = useState(false);
  const [isDark, setIsDark] = useState(scheme === 'dark');

  useEffect(() => {
    const today = new Date();
    setCurrentDate(format(today, 'MMMM dd, yyyy'));

    requestLocationPermission();
  }, []);


  useEffect(() => {
    setIsDark(scheme === 'dark');
  }, [scheme]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const getCityNameFromCoords = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
      const data = await response.json();

      if (data.city) {
        setCity(data.city);
        dispatch(fetchWeather(data.city));
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
    <SafeAreaView style={[styles.fullFlex, { backgroundColor: theme.background }]}>
      <View style={[styles.fullFlex, { backgroundColor: theme.background, width: '90%', height: '100%', alignSelf: "center" }]}>
        <View style={[styles.firstSubContainer]}>
          <View style={styles.topBtns}>
            <TouchableOpacity style={styles.themeStyle}>
              <Icon3 name="search" size={Commonsize(22)} color={theme.text} />
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleTheme} style={styles.themeStyle}>
              <Icon4 name={isDark ? "moon" : "sun"} size={Commonsize(20)} color={theme.text} />
            </TouchableOpacity>
          </View>
          <Text style={[styles.cityTitle, { color: theme.text }]}>{city}</Text>
          <Text style={[styles.dateText, { color: theme.secondaryText }]}>{currentDate}</Text>
        </View>
        <View style={styles.secondSubContainer}>
          <View style={[styles.toggleBtnContainer, { backgroundColor: theme.cardBackground }]}>
            <TouchableOpacity onPress={() => setCurrentToggle(false)} style={[styles.forecastBtn, { backgroundColor: !currentToggle ? theme.primary : theme.cardBackground }]}>
              <Text style={[styles.forecastText, { color: !currentToggle ? theme.text : theme.secondaryText }]}>Forecast</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setCurrentToggle(true)} style={[styles.airQltyBtn, { backgroundColor: currentToggle ? theme.primary : theme.cardBackground }]}>
              <Text style={[styles.airQltyText, { color: currentToggle ? theme.text : theme.secondaryText }]}>Air quality</Text>
            </TouchableOpacity>
          </View>
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
            <TouchableOpacity onPress={() => { }}>
              <Text style={[styles.fullReportText, { color: theme.primary }]}>View full report</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.fullReportCardContainer}>
            <FlatList
              data={weather.forecast}
              horizontal={true}
              keyExtractor={(item: any, i: number) => i}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => navigation.navigate('AllReportScreen', { data: item })} style={[styles.fullReportSubCardContainer, { backgroundColor: theme.primary, marginRight: Commonwidth(10) }]}>
                  <Image source={item.icon ? weatherIcons[item.icon] : require('../Assets/Images/weather/cloudy.png')} style={styles.FRimgStyle} resizeMode="contain" />
                  <View>
                    <Text style={[styles.FRDetailsHeading, { color: theme.secondaryText }]}>{item?.datetime}</Text>
                    <Text style={[styles.FRDetailsValue, { color: theme.text }]}>{item?.temp}°c</Text>
                  </View>
                </TouchableOpacity>
              )} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fullFlex: { flex: 1, width: '100%', height: '100%' },
  firstSubContainer: { height: Commonheight(140), width: '100%', justifyContent: "center", alignItems: "center" },
  secondSubContainer: { flex: 1, alignItems: "center", paddingTop: Commonheight(10), },
  thirdContainer: { height: Commonheight(120), width: '100%', marginBottom: Commonheight(10) },
  cityTitle: { fontSize: Commonsize(22), fontWeight: 'bold' },
  dateText: { fontSize: Commonsize(14), marginTop: Commonheight(4) },
  toggleBtnContainer: { flexDirection: 'row', borderRadius: Commonsize(4) },
  forecastBtn: { borderRadius: Commonsize(4) },
  forecastText: { fontSize: Commonsize(12), paddingHorizontal: Commonwidth(20), paddingVertical: Commonheight(8) },
  airQltyBtn: { borderRadius: Commonsize(4) },
  airQltyText: { fontSize: Commonsize(12), paddingHorizontal: Commonwidth(20), paddingVertical: Commonheight(8) },
  imageContainer: { width: Commonsize(250), height: Commonsize(280), justifyContent: 'center', alignItems: 'center' },
  imgStyle: { width: Commonsize(200), height: Commonsize(200) },
  weatherDetailsContainer: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', flexWrap: 'wrap' },
  wDetailContainer: { width: '48%', justifyContent: 'center', alignItems: 'center', borderRadius: Commonsize(8), marginBottom: Commonheight(14), paddingVertical: Commonheight(10), paddingHorizontal: Commonwidth(14) },
  wDetailHeading: { fontSize: Commonsize(12) },
  wDetailValue: { fontSize: Commonsize(14), fontWeight: '500' },
  fullReportTitleContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: Commonheight(14) },
  reportHeading: { fontSize: Commonsize(16), fontWeight: '500', },
  fullReportText: { fontSize: Commonsize(13), },
  fullReportSubCardContainer: { flexDirection: 'row', width: Commonwidth(150), height: Commonheight(70), backgroundColor: 'pink', borderRadius: Commonsize(8), justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: Commonsize(14) },
  FRimgStyle: { width: Commonsize(50), height: Commonsize(50) },
  FRDetailsHeading: { fontSize: Commonsize(12), fontWeight: '500' },
  FRDetailsValue: { fontSize: Commonsize(18), fontWeight: '500' },
  fullReportCardContainer: { flexDirection: "row" },
  topBtns: { width: '100%', height: Commonheight(30), flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginBottom: Commonheight(10) },
  themeStyle: { paddingLeft: Commonwidth(10) }
});

export default HomeScreen