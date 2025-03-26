import React, { useEffect } from 'react';
import { View, Text, SafeAreaView, Image, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Commonheight, Commonsize, Commonwidth } from 'Utils/ResponsiveWidget';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'types/stackType';
import { darkTheme, lightTheme } from '../themes/colors';
import { appImages } from '../Assets/AppImages/images';


const SplashScreen = () => {
    const weather = useSelector((state: RootState) => state.weather || []);


    const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
    const theme = isDarkMode ? darkTheme : lightTheme;

    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    useEffect(() => {
        const moveToHome = setTimeout(() => {
            navigation.navigate('Layout')
        }, 3000);
        return () => clearTimeout(moveToHome);
    }, [])



    return (
        <View style={[styles.fullFlex, { backgroundColor: theme.background }]}>
            <View style={[styles.fullFlex, { backgroundColor: theme.background, width: '90%', height: '100%', alignSelf: "center", justifyContent: 'center', alignItems: 'center' }]}>
                <View style={styles.imageContainer}>
                    <Image source={appImages.appLogo} style={styles.imgStyle} resizeMode="cover" />
                </View>
                <View style={styles.titleContainer}>
                    <Text style={[styles.appTitle, { color: theme.text }]}>Climora</Text>
                </View>
                
            </View>
            {/* <Text style={[styles.descText, { color: theme.secondaryText }]}>Weather beyond Horizons</Text> */}

        </View>
    );
};

const styles = StyleSheet.create({
    fullFlex: { flex: 1, width: '100%', height: '100%' },
    imageContainer: { width: Commonsize(250), height: Commonsize(250), justifyContent: 'center', alignItems: 'center',},
    imgStyle: { width: '100%', height: '100%' },
    titleContainer:{marginTop:Commonheight(-50)},
    appTitle: { fontSize: Commonsize(26), fontWeight: '500', textAlign: "center",marginBottom:Commonheight(5) },
    descText: { fontSize: Commonsize(12), textAlign:'right',marginVertical:Commonheight(10)},


});

export default SplashScreen