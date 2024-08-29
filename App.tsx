import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeDD from './app/screens/DriverDetails/HomeDD';
import AddDriverDetails from './app/screens/DriverDetails/AddDriverDetails';
import DDList from './app/screens/DriverDetails/DDList';
import SignUpScreen from './app/screens/SignUp';
import Signinscreen from './app/screens/LogIn';
import UpdateDeleteDD from './app/screens/DriverDetails/UpdateDeleteDD';
import AddGarbagePlace from './app/screens/GarbagePlaces/AddGarbagePlace';
import HomeG from './app/screens/GarbagePlaces/HomeG';
import PlaceView from './app/screens/GarbagePlaces/PlaceView';
import EditPlace from './app/screens/GarbagePlaces/EditPlace';

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
        <Stack.Screen name="UpdateDeleteDD" component={UpdateDeleteDD} options={{headerShown:false}}/>
        <Stack.Screen name="AddGarbagePlace" component={AddGarbagePlace} options={{headerShown:false}}/>
        <Stack.Screen name="HomeG" component={HomeG} options={{headerShown:false}}/>
        <Stack.Screen name="PlaceView" component={PlaceView} options={{headerShown:false}}/>
        <Stack.Screen name="EditPlace" component={EditPlace} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  ); 
}
