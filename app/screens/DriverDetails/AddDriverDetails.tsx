import React, { useState } from 'react';
import { Text, TextInput, Button, StyleSheet, ScrollView,SafeAreaView,View } from 'react-native';
import { FIREBASE_DB } from '../../../Firebase_Config';
import { addDoc, collection } from 'firebase/firestore';
import AdminNav from '../../Components/AdminNav';
import Header from '../../Components/HeaderAdmin';


const AddDriverDetails = () => {
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [partnerName, setPartnerName] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [capacity, setCapacity] = useState('');
  const [collectingArea, setCollectingArea] = useState('');
  const [arrivalDate, setArrivalDate] = useState('');
  const [leavingDate, setLeavingDate] = useState('');

  const handleAddItem = async () => {
    if (
      !vehicleNumber.trim() ||
      !partnerName.trim() ||
      !vehicleType.trim() ||
      !capacity.trim() ||
      !collectingArea.trim() ||
      !arrivalDate.trim() ||
      !leavingDate.trim()
    ) {
      return;
    }

    try {
      await addDoc(collection(FIREBASE_DB, 'DriverDetails'), {
        vehicleNumber,
        partnerName,
        vehicleType,
        capacity,
        collectingArea,
        arrivalDate,
        leavingDate,
      });
      // Clear the input fields after adding the document
      setVehicleNumber('');
      setPartnerName('');
      setVehicleType('');
      setCapacity('');
      setCollectingArea('');
      setArrivalDate('');
      setLeavingDate('');
      alert('Record added successfully');
    } catch (error) {
      console.error('Error adding record: ', error);
      alert('Failed to add record');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1,backgroundColor:'#89F28D' }}>
      <View >
        <Text style={styles.title}>
          Add New Record
        </Text>
       </View>
    <ScrollView  style={{ flex: 1, margin: 10 }} contentContainerStyle={styles.container}>
      <TextInput
        placeholder="Vehicle Number"
        value={vehicleNumber}
        onChangeText={setVehicleNumber}
        style={styles.input}
      />
      <TextInput
        placeholder="Partner Name"
        value={partnerName}
        onChangeText={setPartnerName}
        style={styles.input}
      />
      <TextInput
        placeholder="Vehicle Type"
        value={vehicleType}
        onChangeText={setVehicleType}
        style={styles.input}
      />
      <TextInput
        placeholder="Capacity of Vehicle"
        value={capacity}
        onChangeText={setCapacity}
        style={styles.input}
      />
      <TextInput
        placeholder="Area of Collecting Access"
        value={collectingArea}
        onChangeText={setCollectingArea}
        style={styles.input}
      />
      <TextInput
        placeholder="Arrival Date"
        value={arrivalDate}
        onChangeText={setArrivalDate}
        style={styles.input}
      />
      <TextInput
        placeholder="Leaving Date"
        value={leavingDate}
        onChangeText={setLeavingDate}
        style={styles.input}
      />
      <Button title="Add Record" onPress={handleAddItem} />
      
    </ScrollView>
    <AdminNav/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 16,
  },
  title:{
    marginTop:10,
    fontSize: 30,
    fontWeight:'bold',
    color:'#ffffff',
    textAlign: 'center',
  }
});

export default AddDriverDetails;
