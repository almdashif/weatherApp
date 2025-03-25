import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '@screens/HomeScreen';
import AllReportScreen from '@screens/AllReportScreen';
import Layout from '@screens/Layout';
import HistoryPage from '@screens/HistoryPage';





const Stack = createStackNavigator();
const Navigation = () => {


    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName='Layout' screenOptions={{headerShown: false}}>
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
                <Stack.Screen name="AllReportScreen" component={AllReportScreen} />
                <Stack.Screen name="Layout" component={Layout} />
                <Stack.Screen name="HistoryPage" component={HistoryPage} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation
