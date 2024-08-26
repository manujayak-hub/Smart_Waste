import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeDD from './app/screens/DriverDetails/HomeDD';
import AddDriverDetails from './app/screens/DriverDetails/AddDriverDetails';
import DDList from './app/screens/DriverDetails/DDList';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeDD">
        <Stack.Screen name="HomeDD" component={HomeDD} />
        <Stack.Screen name="AddDriverDetails" component={AddDriverDetails} />
        <Stack.Screen name="DDList" component={DDList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
