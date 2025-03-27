import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, Image, StyleSheet, FlatList, TouchableOpacity, BackHandler } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Commonheight, Commonsize, Commonwidth } from 'Utils/ResponsiveWidget';
import { format, parse } from 'date-fns';
import { weatherIcons } from '../Assets/Weather/weather';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'types/stackType';
import { darkTheme, lightTheme } from '../themes/colors';
import { Icon4 } from '../Utils/CommonIcons';
import { updateTab } from '../redux/tabSlice';


const AllReportScreen = () => {
    const dispatch = useDispatch();
    const weather = useSelector((state: RootState) => state.weather || []);
    const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
    const theme = isDarkMode ? darkTheme : lightTheme;

    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();



    const [currentDate, setCurrentDate] = useState<string | Date>('');
    const [showDate, setShowDate] = useState('');
    const [currentTime, setCurrentTime] = useState('');


    useEffect(() => {
        const backAction = () => {
            navigation.goBack()
            return true;
        };

        const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

        return () => backHandler.remove();
    }, []);

    useEffect(() => {
        const today = new Date();
        setCurrentDate(today);
        setShowDate(format(weather?.forecast[0]?.datetime, 'MMMM dd, yyyy'));
        setCurrentTime(format(today, 'HH:mm:ss'));
    }, []);



    const upcomingForcast = weather.forecast.filter(val => { return val?.datetime !== weather.forecast[0]?.datetime });
    const todayHourlyForecast = weather.forecast[0]?.hours.filter(val => { return val?.datetime > currentTime });

    return (
        <SafeAreaView style={[styles.fullFlex, { backgroundColor: theme.background }]}>
            <View style={[styles.fullFlex, { backgroundColor: theme.background, width: '90%', height: '100%', alignSelf: "center" }]}>
                {/* <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}> */}
                <View style={[styles.firstSubContainer]}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.leftBtn}><Icon4 name='chevron-left' size={Commonsize(24)} color={theme.text} /></TouchableOpacity>
                    <Text style={[styles.cityTitle, { color: theme.text }]}>Forecast report</Text>
                </View>
                {todayHourlyForecast.length > 0 && <View style={styles.secondSubContainer}>
                    <View style={styles.fullReportTitleContainer}>
                        <Text style={[styles.reportHeading, { color: theme.text }]}>Today</Text>
                        <View>
                            <Text style={[styles.fullReportText, { color: theme.secondaryText }]}>{showDate}</Text>
                        </View>
                    </View>
                    <View style={styles.fullReportCardContainer}>
                        <FlatList
                            data={todayHourlyForecast}
                            horizontal={true}
                            keyExtractor={(item: any, i: number) => i.toString()}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <View style={[styles.fullReportSubCardContainer, { backgroundColor: theme.cardBackground, marginRight: Commonwidth(10) }]}>
                                    <Image source={item.icon ? weatherIcons[item.icon] : require('../Assets/Images/weather/cloudy.png')} style={styles.FRimgStyle} resizeMode="contain" />
                                    <View>
                                        <Text style={[styles.FRDetailsHeading, { color: theme.secondaryText }]}>{format(parse(item?.datetime, 'HH:mm:ss', new Date()), 'hh:mm a')}</Text>
                                        <Text style={[styles.FRDetailsValue, { color: theme.text }]}>{item?.temp}°c</Text>
                                    </View>
                                </View>
                            )} />
                    </View>
                </View>}
                <View style={styles.thirdSubContainer}>
                    <View style={[styles.fullReportTitleContainer, { marginTop: Commonheight(10) }]}>
                        <Text style={[styles.reportHeading, { color: theme.text }]}>Upcoming forecast</Text>

                    </View>
                    <View style={[styles.fullReportCardContainer, {}]}>
                        <FlatList
                            data={upcomingForcast}
                            keyExtractor={(item: any, i: number) => i.toString()}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <View style={[styles.fullReportSubCardContainer, { backgroundColor: item.datetime == currentDate ? theme.primary : theme.cardBackground, marginRight: Commonwidth(10), width: '100%', marginBottom: Commonheight(10), height: Commonheight(100), paddingHorizontal: Commonsize(20) }]}>
                                    <View>
                                        <Text style={[styles.FRDetailsHeading, { color: theme.text, fontSize: Commonsize(14), marginBottom: Commonheight(4), textAlign: "center" }]}>{format(new Date(item?.datetime), "EEEE")}</Text>
                                        <Text style={[styles.FRDetailsHeading, { color: theme.secondaryText, textAlign: "center" }]}>{item?.datetime}</Text>
                                    </View>
                                    <View style={{ maxWidth: "45%" }}>
                                        <Text style={[styles.FRDetailsValue, { color: theme.text, fontSize: Commonsize(26), textAlign: "center" }]}>{item?.temp}<Text style={{ fontSize: Commonsize(16) }}>°c</Text></Text>
                                        <Text style={[styles.FRDetailsHeading, { color: theme.secondaryText, textAlign: "center" }]}>{item?.conditions}</Text>
                                    </View>
                                    <Image source={item.icon ? weatherIcons[item.icon] : require('../Assets/Images/weather/cloudy.png')} style={styles.FRimgStyle} resizeMode="contain" />

                                </View>
                            )} />
                    </View>
                </View>
                {/* </ScrollView> */}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    fullFlex: { flex: 1, width: '100%', height: '100%' },
    firstSubContainer: { height: Commonheight(100), width: '100%', flexDirection: "row", justifyContent: "flex-start", alignItems: "center" },
    secondSubContainer: { height: Commonheight(120), width: '100%', marginBottom: Commonheight(10) },
    thirdSubContainer: { flex: 1, height: Commonheight(120), width: '100%', marginBottom: Commonheight(50) },
    leftBtn: { marginRight: Commonwidth(10) },
    cityTitle: { flex: 1, fontSize: Commonsize(22), fontWeight: 'bold', textAlign: "center" },
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