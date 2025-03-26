import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '@screens/HomeScreen';
import AllReportScreen from '@screens/AllReportScreen';
import Layout from '@screens/Layout';
import HistoryPage from '@screens/HistoryPage';
import SplashScreen from '@screens/SplashScreen';





const Stack = createStackNavigator();
const Navigation = () => {


    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName='SplashScreen' screenOptions={{ headerShown: false }}>
                <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ animation: 'fade' }} />
                <Stack.Screen name="AllReportScreen" component={AllReportScreen} options={{ animation: 'fade' }} />
                <Stack.Screen name="Layout" component={Layout} options={{ animation: 'fade' }} />
                <Stack.Screen name="HistoryPage" component={HistoryPage} options={{ animation: 'fade' }} />
                <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ animation: 'fade' }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation
