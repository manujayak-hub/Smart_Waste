import React, { useState } from 'react';
import { Text, TextInput, Button, StyleSheet, ScrollView,SafeAreaView,View} from 'react-native';
import { FIREBASE_DB } from '../../../Firebase_Config';
import { addDoc, collection } from 'firebase/firestore';
import AdminNav from '../../Components/AdminNav';
import Header from '../../Components/HeaderAdmin';


const AddDriverDetails = () => {
  const [driverName, setDriverName] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [partnerName, setPartnerName] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [capacity, setCapacity] = useState('');
  const [collectingArea, setCollectingArea] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [leavingTime, setLeavingTime] = useState('');

  const handleAddItem = async () => {
    if (
      !driverName.trim() ||
      !vehicleNumber.trim() ||
      !partnerName.trim() ||
      !vehicleType.trim() ||
      !capacity.trim() ||
      !collectingArea.trim() ||
      !arrivalTime.trim() ||
      !leavingTime.trim()
    ) {
      return;
    }

    try {
      await addDoc(collection(FIREBASE_DB, 'DriverDetails'), {
        driverName,
        vehicleNumber,
        partnerName,
        vehicleType,
        capacity,
        collectingArea,
        arrivalTime,
        leavingTime,
      });
      
      setDriverName('');
      setVehicleNumber('');
      setPartnerName('');
      setVehicleType('');
      setCapacity('');
      setCollectingArea('');
      setArrivalTime('');
      setLeavingTime('');
      alert('Record added successfully');
    } catch (error) {
      console.error('Error adding record: ', error);
      alert('Failed to add record');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1,backgroundColor:'#89F28D' }}>
      <Header/>
      <View >
        <Text style={styles.title}>
          Add New Record
        </Text>
       </View>
    <ScrollView  style={{ flex: 1, margin: 10 }} contentContainerStyle={styles.container}>
    <Text style={styles.formtitle}>
      Driver Name
    </Text>
    <TextInput
        placeholder="Driver Name"
        value={driverName}
        onChangeText={setDriverName}
        style={styles.input}
        inputMode='text'
      />
      <TextInput
        placeholder="Partner Name"
        value={partnerName}
        onChangeText={setPartnerName}
        style={styles.input}
        inputMode='text'
      />
      <TextInput
        placeholder="Vehicle Number"
        value={vehicleNumber}
        onChangeText={setVehicleNumber}
        style={styles.input}
        maxLength={9}
      />
      
      <TextInput
        placeholder="Vehicle Type"
        value={vehicleType}
        onChangeText={setVehicleType}
        style={styles.input}
        inputMode='text'
      />
      <TextInput
        placeholder="Capacity of Vehicle in Tons"
        value={capacity}
        onChangeText={setCapacity}
        style={styles.input}
        maxLength={2}
        inputMode='numeric'
      />
      <TextInput
        placeholder="Area of Collecting Access"
        value={collectingArea}
        onChangeText={setCollectingArea}
        style={styles.input}
        inputMode='text'
      />
      <TextInput
        placeholder="Arrival Time"
        value={arrivalTime}
        onChangeText={setArrivalTime}
        style={styles.input}
        
      />
      <TextInput
        placeholder="Leaving Time"
        value={leavingTime}
        onChangeText={setLeavingTime}
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
    borderColor: '#ffffff',
    textDecorationColor:'#ffffff',
    padding: 8,
    marginBottom: 16,
  },
  title:{
    marginTop:10,
    fontSize: 30,
    fontWeight:'bold',
    color:'#ffffff',
    textAlign: 'center',
  },
  formtitle:{
    fontSize: 20,
    color:'#ffffff',
    textAlign: 'left',
    fontWeight:'bold'
  }
});

export default AddDriverDetails;
