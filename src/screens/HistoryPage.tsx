import React, { useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, SafeAreaView, TouchableOpacity,  Modal } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { clearHistory } from '../redux/weatherSlice';import { weatherIcons } from '../Assets/Weather/weather';
import { Commonheight, Commonsize, Commonwidth } from 'Utils/ResponsiveWidget';
import { format } from 'date-fns';
import { darkTheme, lightTheme } from '../themes/colors';
import { RootState } from '../redux/store';

const HistoryPage = () => {
    const dispatch = useDispatch();
    const { history } = useSelector((state: any) => state.weather);
      const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
      const theme = isDarkMode ? darkTheme : lightTheme;

    const [visible, setVisible] = useState(false);

    const clearAllHistory = () => {
        dispatch(clearHistory());
        toggleClearHistory();

    };
    const toggleClearHistory = () => {
        setVisible(prev => !prev);
    };

    return (
        <SafeAreaView style={[styles.fullFlex, { backgroundColor: theme.background }]}>
            <View style={[styles.fullFlex, { backgroundColor: theme.background, width: '90%', height: '100%', alignSelf: "center" }]}>

                <View style={[styles.firstSubContainer]}>
                    <Text style={[styles.cityTitle, { color: theme.text }]}>Recent History</Text>
                </View>
                <View style={styles.thirdSubContainer}>

                    {history.length !== 0 && <View style={[styles.fullReportTitleContainer, { marginTop: Commonheight(10) }]}>
                        <Text style={[styles.reportHeading, { color: theme.text }]}>All Forecast</Text>
                        <TouchableOpacity onPress={toggleClearHistory} style={[styles.clearbtn, { backgroundColor: theme.cardBackground }]}>
                            <Text style={[styles.reportHeading, { fontSize: Commonsize(12), color: theme.text }]}>Clear history</Text>
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
                                    <View style={{ maxWidth: "40%" }}>
                                        <Text style={[styles.FRDetailsValue, { color: theme.text, fontSize: Commonsize(26), textAlign: "center" }]}>{item?.temperature}<Text style={{ fontSize: Commonsize(16) }}>°c</Text></Text>
                                        <Text style={[styles.FRDetailsHeading, { color: theme.secondaryText, textAlign: "center" }]}>{item?.condition}</Text>
                                    </View>
                                    <View style={{ maxWidth: "35%" }}>
                                        <Text numberOfLines={1} style={[styles.FRDetailsHeading, { color: theme.secondaryText, textAlign: "center", fontSize: Commonsize(14), marginBottom: Commonheight(4), }]}>{item?.city}</Text>
                                        <Text style={[styles.FRDetailsHeading, { color: theme.text, fontSize: Commonsize(11), textAlign: "center" }]}>{format(item?.timestamp, 'HH:mm a')}</Text>

                                    </View>



                                </View>
                            )
                            } />
                    </View>)}
                </View>
            </View>
            <Modal transparent visible={visible} animationType="fade">
                <View style={styles.overlay}>
                    <View style={[styles.alertBox, { backgroundColor: theme.background }]}>
                        <Text style={[styles.title, { color: theme.secondaryText }]}>Clear History Confirmation</Text>
                        <Text style={[styles.message, { color: theme.text }]}>Are you sure you want to clear the history?</Text>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={[styles.cancelButton,{backgroundColor:theme.text}]} onPress={toggleClearHistory}>
                                <Text style={[styles.cancelText,{color:theme.background}]}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.okButton,{backgroundColor:theme.cardBackground}]} onPress={clearAllHistory}>
                                <Text style={[styles.okText,{color:theme.text}]}>OK</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity onPress={toggleClearHistory} style={styles.overlayBackPress} />
                </View>
            </Modal>
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
    fullReportSubCardContainer: { flexDirection: 'row', borderRadius: Commonsize(8), justifyContent: 'space-between', alignItems: 'center', marginRight: Commonwidth(10), width: '100%', marginBottom: Commonheight(10), minHeight: Commonheight(80), paddingHorizontal: Commonsize(15), paddingVertical: Commonsize(10) },
    FRimgStyle: { width: Commonsize(50), height: Commonsize(50) },
    FRDetailsHeading: { fontSize: Commonsize(12), fontWeight: '500' },
    FRDetailsValue: { fontSize: Commonsize(18), fontWeight: '500' },
    fullReportCardContainer: { flexDirection: "row" },
    topBtns: { width: '100%', height: Commonheight(30), flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginBottom: Commonheight(10) },
    themeStyle: { paddingLeft: Commonwidth(10) },
    clearbtn: { backgroundColor: 'pink', paddingVertical: Commonheight(5), paddingHorizontal: Commonwidth(15), borderRadius: Commonsize(4) },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlayBackPress: {
        flex: 1,
        width: "100%",
        height: "100%",
        position: 'absolute',
    },
    alertBox: {
        width: 300,
        backgroundColor: '#fff',
        borderRadius: Commonsize(10),
        padding: Commonsize(30),
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        zIndex: 99,
    },
    title: {
        fontSize: Commonsize(16),
        fontWeight: 'bold',
        marginBottom: 10,
    },
    message: {
        fontSize: Commonsize(14),
        textAlign: 'center',
        marginBottom: Commonsize(20),
        color: '#555',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop:Commonheight(10)
    },
    cancelButton: {
        flex: 1,
        backgroundColor: '#ddd',
        paddingVertical: Commonsize(10),
        borderRadius: Commonsize(5),
        alignItems: 'center',
        marginRight: Commonsize(5),
    },
    cancelText: {
        fontSize: Commonsize(14),
        fontWeight: '500',
    },
    okButton: {
        flex: 1,
        paddingVertical: Commonsize(10),
        borderRadius: Commonsize(5),
        alignItems: 'center',
        marginLeft: Commonsize(5),
    },
    okText: {
        fontSize: Commonsize(14),
        fontWeight: '500',
    },
});

export default HistoryPage;
