import { ScrollView, StyleSheet, Text, TextInput, View ,Alert, TouchableOpacity,SafeAreaView} from 'react-native'
import React, { useState } from 'react';
import { FIREBASE_DB } from '../../../Firebase_Config';
import { addDoc, collection } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import AdminNav from '../../Components/AdminNav';
import Header from '../../Components/HeaderAdmin';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  HomeG: undefined; 
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'HomeG'>;

const AddGarbagePlace = () => {
    const [locationName, setLocationName] = useState('');
    const [address, setAddress] = useState('');
    const [wasteType, setWasteType] = useState('');
    const [capacity, setCapacity] = useState('');
    const [contactPerson, setContactPerson] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
  
    const navigation = useNavigation<NavigationProp>();

    const validateInputs = () => {
      if (!locationName.trim()) {
        Alert.alert('Validation Error', 'Location Name is required');
        return false;
      }
      if (!address.trim()) {
        Alert.alert('Validation Error', 'Address is required');
        return false;
      }
      if (!wasteType.trim()) {
        Alert.alert('Validation Error', 'Type of Waste is required');
        return false;
      }
      if (!capacity.trim()) {
        Alert.alert('Validation Error', 'Capacity is required and must be a number');
        return false;
      }
    
      if (!contactPerson.trim()) {
        Alert.alert('Validation Error', 'Contact Person is required');
        return false;
      }
      if (!phoneNumber.trim() || phoneNumber.length < 10) {
        Alert.alert('Validation Error', 'Valid Phone Number is required');
        return false;
      }
      return true;
    };
  
    const addPlaceToFirestore = async () => {
      if (!validateInputs()) {
        return;
      }
  
      const newPlace = {
        locationName,
        address,
        wasteType,
        capacity,
        contactPerson,
        phoneNumber,
      };
  
      try {
        await addDoc(collection(FIREBASE_DB, 'GarbagePlaces'), newPlace);
        // Clear the input fields after adding the document
        setLocationName('');
        setAddress('');
        setWasteType('');
        setCapacity('');
        setContactPerson('');
        setPhoneNumber('');
        Alert.alert('Success', 'Place added successfully!');
        navigation.navigate('HomeG'); 
      } catch (error) {
        console.error('Error adding place: ', error);
        Alert.alert('Error', 'Failed to add place. Please try again.');
      }
    };
  
    return (
      <SafeAreaView style={{ flex: 1}}>
        <Header />
      <ScrollView contentContainerStyle={styles.layoutd}>
        <Text style={styles.header}>Add New Garbage Location</Text>
        <View style={styles.frame}>
        <Text style={styles.l1}>Location Name</Text>
        <TextInput 
          style={styles.boxd}
          value={locationName}
          onChangeText={setLocationName}
          placeholder="Enter location name"/>
          
        <Text style={styles.l1}>Address</Text>
        <TextInput 
          style={styles.boxd}
          value={address}
          onChangeText={setAddress}
          placeholder="Enter address"/>
  
        <Text style={styles.l1}>Type of Waste </Text>
        <TextInput 
          style={styles.boxd}
          value={wasteType}
          onChangeText={setWasteType}
          placeholder="Enter type of waste"/>
  
        <Text style={styles.l1}>Capacity </Text>
        <TextInput 
          style={styles.boxd}
          value={capacity}
          onChangeText={setCapacity}
          placeholder="Enter capacity"
          keyboardType="numeric"/>

        <Text style={styles.l1}>Contact Person</Text>
        <TextInput
          style={styles.boxd}
          value={contactPerson}
          onChangeText={setContactPerson}
          placeholder="Enter contact person name"/>
  
        <Text style={styles.l1}>Contact Number</Text>
        <TextInput 
          style={styles.boxd}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          placeholder="Enter phone number"
          keyboardType="numeric"/>
        </View>
        <TouchableOpacity style={styles.button} onPress={addPlaceToFirestore}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>

        
      </ScrollView>
      <AdminNav/>
      </SafeAreaView>
    )
  }
  
export default AddGarbagePlace

const styles = StyleSheet.create({
    layoutd:{
        display: 'flex',
        flexDirection: 'column',
        width: 400,
        height:'auto',
        padding:10,
        justifyContent:'space-between',
        backgroundColor:'#EFF6F0' ,
    },
    l1:{
      
      left: 10,
      fontWeight: '400',
      fontSize: 19,
      lineHeight: 28,
      color: '#141414',
      
    },
    boxd:{
      height: 40,
    borderColor: '#FFFFFF',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor:'#FFFFFF',
    borderRadius:5,
    
    },

    button: {
      backgroundColor: '#28A745',
      padding: 10,
      alignItems: 'center',
      width:'50%',
      borderRadius:10,
      alignSelf:'center',
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: 'bold',
    },
    header: {
      fontWeight: '700',
      fontSize: 22,
      marginBottom: 20,
      textAlign:'center',
    },
    frame: {
      width: '98%',
      backgroundColor: '#C2E0C0',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      borderRadius: 12,
      padding: 10,
      marginBottom: 20,
      justifyContent: 'space-between',
    },


})