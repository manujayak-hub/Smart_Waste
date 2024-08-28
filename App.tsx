import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeDD from './app/screens/DriverDetails/HomeDD';
import AddDriverDetails from './app/screens/DriverDetails/AddDriverDetails';
import DDList from './app/screens/DriverDetails/DDList';
import SignUpScreen from './app/screens/SignUp';
import Signinscreen from './app/screens/LogIn';
import UpdateDeleteDD from './app/screens/DriverDetails/UpdateDeleteDD';

import AddComplaint from './app/screens/Complaints/AddComplaint';
import CustomerHome from './app/screens/Complaints/CustomerHome';
import ComplaintList from './app/screens/Complaints/ComplaintList';
import UpdateDeleteComplaint from './app/screens/Complaints/UpdateDeleteComplaint';
import AdminSideComplaint from './app/screens/Complaints/AdminSideComplaint';
import LogIn from './app/screens/LogIn';

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

        <Stack.Screen name="LogIn" component={LogIn} options={{headerShown:false}} />

        <Stack.Screen name="AddComplaint" component={AddComplaint} options={{headerShown:false}} />
        <Stack.Screen name="CustomerHome" component={CustomerHome} options={{headerShown:false}} />
        <Stack.Screen name="ComplaintList" component={ComplaintList} options={{headerShown:false}} />
        <Stack.Screen name="UpdateDeleteComplaint" component={UpdateDeleteComplaint} options={{headerShown:false}} />
        <Stack.Screen name="AdminSideComplaint" component={AdminSideComplaint} options={{headerShown:false}} />
        
      </Stack.Navigator>
    </NavigationContainer>
  ); 
}
