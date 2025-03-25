import React from 'react';
import { View, Text, Image, FlatList, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { clearHistory } from '../redux/weatherSlice';
import { useTheme } from '../themes/theme';
import { weatherIcons } from '../Assets/Weather/weather';
import { Commonheight, Commonsize, Commonwidth } from 'Utils/ResponsiveWidget';
import { format } from 'date-fns';

const HistoryPage = () => {
    const dispatch = useDispatch();
    const { history } = useSelector((state: any) => state.weather);
    const theme = useTheme();

    return (
        <SafeAreaView style={[styles.fullFlex, { backgroundColor: theme.background }]}>
            <View style={[styles.fullFlex, { backgroundColor: theme.background, width: '90%', height: '100%', alignSelf: "center" }]}>

                <View style={[styles.firstSubContainer]}>
                    <Text style={[styles.cityTitle, { color: theme.text }]}>Search History</Text>
                </View>
                <View style={styles.thirdSubContainer}>

                    {history.length !== 0 && <View style={[styles.fullReportTitleContainer, { marginTop: Commonheight(10) }]}>
                        <Text style={[styles.reportHeading, { color: theme.text }]}>All Forecast</Text>
                        <TouchableOpacity onPress={() => dispatch(clearHistory())}>
                            <Text style={[styles.reportHeading, { color: theme.text }]}>Clear history</Text>
                        </TouchableOpacity>
                    </View>}
                    {history.length === 0 ? (
                        <Text style={[styles.reportHeading, { color: theme.text }]}>No search history available.</Text>
                    ) : (<View style={[styles.fullReportCardContainer, {}]}>
                        <FlatList
                            data={history}
                            keyExtractor={(item: any, i: number) => i.toString()}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <View style={[styles.fullReportSubCardContainer, { backgroundColor: theme.cardBackground, }]}>
                                    <View>
                                        <Image source={item.icon ? weatherIcons[item.icon] : require('../Assets/Images/weather/cloudy.png')} style={styles.FRimgStyle} resizeMode="contain" />
                                        <Text style={[styles.FRDetailsHeading, { color: theme.text, fontSize: Commonsize(11), textAlign: "center" }]}>{format(item?.timestamp, 'yyyy-MM-dd')}</Text>
                                    </View>
                                    <View>
                                        <Text style={[styles.FRDetailsValue, { color: theme.text, fontSize: Commonsize(26), textAlign: "center" }]}>{item?.temperature}<Text style={{ fontSize: Commonsize(16) }}>°c</Text></Text>
                                        <Text style={[styles.FRDetailsHeading, { color: theme.secondaryText, textAlign: "center" }]}>{item?.condition}</Text>
                                    </View>
                                    <View>
                                        <Text style={[styles.FRDetailsHeading, { color: theme.secondaryText, textAlign: "center", fontSize: Commonsize(14), marginBottom: Commonheight(4), }]}>{item?.city}</Text>
                                        <Text style={[styles.FRDetailsHeading, { color: theme.text, fontSize: Commonsize(11), textAlign: "center" }]}>{format(item?.timestamp, 'HH:mm a')}</Text>

                                    </View>



                                </View>
                            )
                            } />
                    </View>)}
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    heading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    noHistory: {
        fontSize: 14,
        color: 'gray',
        textAlign: 'center',
    },
    historyItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    icon: {
        width: 40,
        height: 40,
        marginRight: 10,
    },
    city: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    info: {
        fontSize: 14,
        color: 'gray',
    },
    clearButton: {
        marginTop: 10,
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    clearText: {
        color: 'white',
        fontWeight: 'bold',
    },
    fullFlex: { flex: 1, width: '100%', height: '100%' },
    firstSubContainer: { height: Commonheight(100), width: '100%', justifyContent: "center", alignItems: "center" },
    secondSubContainer: { height: Commonheight(120), width: '100%', marginBottom: Commonheight(10), justifyContent: "flex-end", alignItems: "center" },
    thirdSubContainer: { flex: 1, height: Commonheight(120), width: '100%', marginBottom: Commonheight(50) },

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
    fullReportTitleContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: Commonheight(14), },
    reportHeading: { fontSize: Commonsize(15), fontWeight: '500', },
    fullReportText: { fontSize: Commonsize(13), },
    fullReportSubCardContainer: { flexDirection: 'row', borderRadius: Commonsize(8), justifyContent: 'space-between', alignItems: 'center', marginRight: Commonwidth(10), width: '100%', marginBottom: Commonheight(10), height: Commonheight(100), paddingHorizontal: Commonsize(20) },
    FRimgStyle: { width: Commonsize(50), height: Commonsize(50) },
    FRDetailsHeading: { fontSize: Commonsize(12), fontWeight: '500' },
    FRDetailsValue: { fontSize: Commonsize(18), fontWeight: '500' },
    fullReportCardContainer: { flexDirection: "row" },
    topBtns: { width: '100%', height: Commonheight(30), flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginBottom: Commonheight(10) },
    themeStyle: { paddingLeft: Commonwidth(10) }
});

export default HistoryPage;
