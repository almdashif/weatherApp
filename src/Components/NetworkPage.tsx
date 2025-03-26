/* eslint-disable quotes */
import React from "react";
import { Text, View, Image, TouchableOpacity ,StyleSheet} from 'react-native';
import { Commonsize, Commonwidth, Commonheight } from "../Utils/ResponsiveWidget";
import logger from "../Utils/logger";
import { RootState } from "../redux/store";
import { darkTheme, lightTheme } from "../themes/colors";
import { useSelector } from "react-redux";

const NetworkPage = () => {

    const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
    const theme = isDarkMode ? darkTheme : lightTheme;

    return (
            <View style={styles.container}>

                <View style={{}}>
                    <Image
                        style={{ width: 300, height: 200, alignSelf: "center", marginBottom: Commonheight(40) }}
                        source={require('../Assets/Images/Nointernet.png')}
                    />
                    <Text style={{ fontWeight: "bold", fontSize: Commonsize(20), color: theme.text, alignSelf: "center", marginBottom: Commonheight(30), textAlign: 'center' }}>YOUR INTERNET IS A LITTLE WONKEY</Text>
                    <Text style={{ fontWeight: "400", fontSize: Commonsize(15), color: theme.secondaryText, textAlign: "center" }}>Try switching to a different connection or reset your internet to proceed the process</Text>
                </View>
                <TouchableOpacity style={{ borderColor: theme.background, height: Commonheight(40), width: Commonwidth(100), alignSelf: 'center', borderWidth: Commonwidth(2), borderRadius: Commonwidth(5), alignItems: 'center', justifyContent: 'center', marginTop: Commonheight(40) }} onPress={logger.log("Check internet")}>
                    <Text style={{ fontWeight: 'bold', color: theme.background }}>Retry</Text>
                </TouchableOpacity>
            </View>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: '#f7f7f7',
    },
    innerContainer: {
        width: '90%',
        justifyContent: "space-evenly",
        alignSelf: 'center',
        padding: 10,
    },
});

export default NetworkPage;
