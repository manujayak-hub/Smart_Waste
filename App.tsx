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
        <Stack.Screen name="HomeDD" component={HomeDD} />
        <Stack.Screen name="AddDriverDetails" component={AddDriverDetails} />
        <Stack.Screen name="DDList" component={DDList} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen name="Signinscreen" component={Signinscreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
