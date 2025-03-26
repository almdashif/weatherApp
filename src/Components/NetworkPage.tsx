/* eslint-disable quotes */
import React from "react";
import { Text, View, Image, StyleSheet } from 'react-native';
import { Commonsize, Commonheight } from "../Utils/ResponsiveWidget";
import { RootState } from "../redux/store";
import { darkTheme, lightTheme } from "../themes/colors";
import { useSelector } from "react-redux";

const NetworkPage = () => {
    const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
    const theme = isDarkMode ? darkTheme : lightTheme;

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <View style={styles.innerContainer}>
                <Image
                    style={styles.image}
                    source={require('../Assets/Images/Nointernet.png')}
                />
                <Text style={[styles.title, { color: theme.text }]}>
                    YOUR INTERNET CONNECTION IS UNSTABLE
                </Text>
                <Text style={[styles.subtitle, { color: theme.secondaryText }]}>
                    Try switching to a different network or resetting your internet connection to continue.
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
    innerContainer: {
        width: '90%',
        justifyContent: "space-evenly",
        alignSelf: 'center',
        padding: Commonsize(10),
    },
    image: {
        width: Commonsize(300),
        height: Commonsize(200),
        alignSelf: "center",
        marginBottom: Commonheight(40),
    },
    title: {
        fontWeight: "bold",
        fontSize: Commonsize(20),
        alignSelf: "center",
        marginBottom: Commonheight(30),
        textAlign: 'center',
    },
    subtitle: {
        fontWeight: "400",
        fontSize: Commonsize(15),
        textAlign: "center",
    },
});

export default NetworkPage;
