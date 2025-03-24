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
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'types/stackType';


const AllReportScreen = () => {
    const dispatch = useDispatch();
    const weather = useSelector((state: RootState) => state.weather);

    const theme = useTheme();
    const scheme = useColorScheme();



    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const route = useRoute();
    const { data } = route?.params as { data: any };

    const [currentDate, setCurrentDate] = useState<string | Date>('');
    const [showDate, setShowDate] = useState('');

    useEffect(() => {
        console.log({ data }, 'data')
        const today = new Date();
        setCurrentDate(today);
        setShowDate(format(data.datetime, 'MMMM dd, yyyy'));
    }, []);

    const formatDate = (dateString: string) => {
        setCurrentDate(dateString);
        setShowDate(format(dateString, 'MMMM dd, yyyy'));
    }


    return (
        <SafeAreaView style={[styles.fullFlex, { backgroundColor: theme.background }]}>
            <View style={[styles.fullFlex, { backgroundColor: theme.background, width: '90%', height: '100%', alignSelf: "center" }]}>
                <View style={[styles.firstSubContainer]}>
                    <Text style={[styles.cityTitle, { color: theme.text }]}>Forecast report</Text>
                </View>
                <View style={styles.secondSubContainer}>
                    <View style={styles.fullReportTitleContainer}>
                        <Text style={[styles.reportHeading, { color: theme.text }]}>Today</Text>
                        <View>
                            <Text style={[styles.fullReportText, { color: theme.secondaryText }]}>{showDate}</Text>
                        </View>
                    </View>
                    <View style={styles.fullReportCardContainer}>
                        <FlatList
                            data={data.hours}
                            horizontal={true}
                            keyExtractor={(item: any, i: number) => i.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => formatDate(item.datetime)} style={[styles.fullReportSubCardContainer, { backgroundColor: theme.cardBackground, marginRight: Commonwidth(10) }]}>
                                    <Image source={item.icon ? weatherIcons[item.icon] : require('../Assets/Images/weather/cloudy.png')} style={styles.FRimgStyle} resizeMode="contain" />
                                    <View>
                                        <Text style={[styles.FRDetailsHeading, { color: theme.secondaryText }]}>{item?.datetime}</Text>
                                        <Text style={[styles.FRDetailsValue, { color: theme.text }]}>{item?.temp}°c</Text>
                                    </View>
                                </TouchableOpacity>
                            )} />
                    </View>
                </View>
                <View style={styles.thirdSubContainer}>
                    <View style={[styles.fullReportTitleContainer, { marginTop: Commonheight(10) }]}>
                        <Text style={[styles.reportHeading, { color: theme.text }]}>Upcoming forecast</Text>
                        <TouchableOpacity onPress={() => { }}>
                            <Text style={[styles.fullReportText, { color: theme.primary }]}>View full report</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.fullReportCardContainer, {}]}>
                        <FlatList
                            data={weather.forecast}
                            keyExtractor={(item: any, i: number) => i.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => formatDate(item.datetime)} style={[styles.fullReportSubCardContainer, { backgroundColor: item.datetime == currentDate ? theme.primary : theme.cardBackground, marginRight: Commonwidth(10), width: '100%', marginBottom: Commonheight(10), height: Commonheight(100), paddingHorizontal: Commonsize(20) }]}>
                                    <View>
                                        <Text style={[styles.FRDetailsHeading, { color: theme.text, fontSize: Commonsize(14), marginBottom: Commonheight(4), textAlign: "center" }]}>{format(new Date(item?.datetime), "EEEE")}</Text>
                                        <Text style={[styles.FRDetailsHeading, { color: theme.secondaryText, textAlign: "center" }]}>{item?.datetime}</Text>
                                    </View>
                                    <Text style={[styles.FRDetailsValue, { color: theme.text, fontSize: Commonsize(24), }]}>{item?.temp}<Text style={{ fontSize: Commonsize(16) }}>°c</Text></Text>
                                    <Image source={item.icon ? weatherIcons[item.icon] : require('../Assets/Images/weather/cloudy.png')} style={styles.FRimgStyle} resizeMode="contain" />

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
    firstSubContainer: { height: Commonheight(100), width: '100%', justifyContent: "center", alignItems: "center" },
    secondSubContainer: { height: Commonheight(120), width: '100%', marginBottom: Commonheight(10) },
    thirdSubContainer: { flex: 1, height: Commonheight(120), width: '100%', marginBottom: Commonheight(10) },

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

export default AllReportScreen