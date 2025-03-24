/* eslint-disable quotes */
import React, { useEffect, useContext } from "react";
import { Text, View, Image, TouchableOpacity } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import { GlobalContext } from "../App";
import { Commonsize, Commonwidth, Commonheight } from "../Utils/ResponsiveWidget";
import Commoncolor from "../CommonFolder/CommonColor";
import logger from "../Utils/logger";


const NetworkPage = () => {

    const { cstate, cdispatch } = useContext(GlobalContext);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            logger.log(state, "State");
            const Internet = state.isConnected;
            const Internet_Reachability = state.isInternetReachable;
            cdispatch({ type: "Internet", payload: Internet && Internet_Reachability });
        });

        return () => unsubscribe();
    }, [cstate.Internet]);

    return (
            <View style={styles.container}>

                <View style={styles.}>
                    <Image
                        style={{ width: 300, height: 200, alignSelf: "center", marginBottom: Commonheight(40) }}
                        source={require('../Assets/Images/Nointernet.png')}
                    />
                    <Text style={{ fontWeight: "bold", fontSize: Commonsize(20), color: Commoncolor.CommonBlackColor, alignSelf: "center", marginBottom: Commonheight(30), textAlign: 'center' }}>YOUR INTERNET IS A LITTLE WONKEY</Text>
                    <Text style={{ fontWeight: "400", fontSize: Commonsize(15), color: Commoncolor.CommonBlackColor, textAlign: "center" }}>Try switching to a different connection or reset your internet to proceed the process</Text>
                </View>
                <TouchableOpacity style={{ borderColor: '#017373', height: Commonheight(40), width: Commonwidth(100), alignSelf: 'center', borderWidth: Commonwidth(2), borderRadius: Commonwidth(5), alignItems: 'center', justifyContent: 'center', marginTop: Commonheight(40) }} onPress={logger.log("Check internet")}>
                    <Text style={{ fontWeight: 'bold', color: '#017373' }}>Retry</Text>
                </TouchableOpacity>
            </View>
    );
};

import { StyleSheet } from 'react-native';

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