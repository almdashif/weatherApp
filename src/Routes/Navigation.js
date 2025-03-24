import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '@screens/HomeScreen';
import AllReportScreen from '@screens/AllReportScreen';





const Stack = createStackNavigator();
const Navigation = () => {


    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName='HomeScreen' screenOptions={{headerShown: false}}>
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
                <Stack.Screen name="AllReportScreen" component={AllReportScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation
