import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeDD from './app/screens/DriverDetails/HomeDD';
import AddDriverDetails from './app/screens/DriverDetails/AddDriverDetails';
import DDList from './app/screens/DriverDetails/DDList';
import SignUpScreen from './app/screens/SignUp';
import Signinscreen from './app/screens/LogIn';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Signinscreen">
        <Stack.Screen name="HomeDD" component={HomeDD} options={{headerShown:false}}/>
        <Stack.Screen name="AddDriverDetails" component={AddDriverDetails} options={{headerShown:false}} />
        <Stack.Screen name="DDList" component={DDList} options={{headerShown:false}} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Signinscreen" component={Signinscreen} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
