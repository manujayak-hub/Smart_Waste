import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeDD from './app/screens/DriverDetails/HomeDD';
import AddDriverDetails from './app/screens/DriverDetails/AddDriverDetails';
import DDList from './app/screens/DriverDetails/DDList';
import SignUpScreen from './app/screens/SignUp';
import Signinscreen from './app/screens/LogIn';
import UpdateDeleteDD from './app/screens/DriverDetails/UpdateDeleteDD';


import CameradScreen from './app/screens/CameradScreen';
import Chatbot from './app/screens/Chatbot';

import AddGarbagePlace from './app/screens/GarbagePlaces/AddGarbagePlace';
import HomeG from './app/screens/GarbagePlaces/HomeG';
import PlaceView from './app/screens/GarbagePlaces/PlaceView';
import EditPlace from './app/screens/GarbagePlaces/EditPlace';
import MapLocator from './app/screens/GarbagePlaces/MapLocator';
import ReportDetails from './app/screens/GarbagePlaces/ReportDetails';
import UserGarbage from './app/screens/GarbagePlaces/UserGarbage';
import UserView from './app/screens/GarbagePlaces/UserView';
import MainGarbage from './app/screens/GarbagePlaces/MainGarbage';

import AddComplaint from './app/screens/Complaints/AddComplaint';
import CustomerHome from './app/screens/Complaints/CustomerHome';
import ComplaintList from './app/screens/Complaints/ComplaintList';
import UpdateDeleteComplaint from './app/screens/Complaints/UpdateDeleteComplaint';
import AdminSideComplaint from './app/screens/Complaints/AdminSideComplaint';
import ComplaintReport from './app/screens/Complaints/ComplaintReport';
import LogIn from './app/screens/LogIn';
import DisplayScreen from './app/screens/DisplayScreen';



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



        <Stack.Screen name="CameradScreen" component={CameradScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Chatbot" component={Chatbot} options={{headerShown:false}}/>
        <Stack.Screen name="DisplayScreen" component={DisplayScreen} options={{headerShown:false}}/>


        <Stack.Screen name="LogIn" component={LogIn} options={{headerShown:false}} />

        <Stack.Screen name="AddComplaint" component={AddComplaint} options={{headerShown:false}} />
        <Stack.Screen name="CustomerHome" component={CustomerHome} options={{headerShown:false}} />
        <Stack.Screen name="ComplaintList" component={ComplaintList} options={{headerShown:false}} />
        <Stack.Screen name="UpdateDeleteComplaint" component={UpdateDeleteComplaint} options={{headerShown:false}} />
        <Stack.Screen name="AdminSideComplaint" component={AdminSideComplaint} options={{headerShown:false}} />
        <Stack.Screen name="ComplaintReport" component={ComplaintReport} options={{headerShown:false}} />

        

        <Stack.Screen name="AddGarbagePlace" component={AddGarbagePlace} options={{headerShown:false}}/>
        <Stack.Screen name="HomeG" component={HomeG} options={{headerShown:false}}/>
        <Stack.Screen name="PlaceView" component={PlaceView} options={{headerShown:false}}/>
        <Stack.Screen name="EditPlace" component={EditPlace} options={{headerShown:false}}/>
        <Stack.Screen name="MapLocator" component={MapLocator} options={{headerShown:false}}/>
        <Stack.Screen name="ReportDetails" component={ReportDetails} options={{headerShown:false}}/>
        <Stack.Screen name="UserGarbage" component={UserGarbage} options={{headerShown:false}}/>
        <Stack.Screen name="UserView" component={UserView} options={{headerShown:false}}/>
        <Stack.Screen name="MainGarbage" component={MainGarbage} options={{headerShown:false}}/>




      </Stack.Navigator>
    </NavigationContainer>
  ); 
}
