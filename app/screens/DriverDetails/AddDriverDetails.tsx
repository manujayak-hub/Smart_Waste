import React, { useState } from 'react';
import { Text, TextInput, Button, StyleSheet, ScrollView, SafeAreaView, View, TouchableOpacity } from 'react-native';
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
  const [cdate, setcdate] = useState(new Date());

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
        cdate: cdate.toISOString(), // Store date in ISO format
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
    <SafeAreaView style={{ flex: 1, backgroundColor: '#89F28D' }}>
      <Header />
      <View>
        <Text style={styles.title}>Add New Record</Text>
      </View>
      <ScrollView style={{ flex: 1, margin: 10 }} contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.formtitle}>Current Date: {cdate.toLocaleDateString()}</Text>
        <Text style={styles.formtitle}>Driver Name</Text>
        <TextInput
          value={driverName}
          onChangeText={setDriverName}
          style={styles.input}
          inputMode="text"
        />
        <Text style={styles.formtitle}>Partner Name</Text>
        <TextInput
          
          value={partnerName}
          onChangeText={setPartnerName}
          style={styles.input}
          inputMode="text"
        />
        <Text style={styles.formtitle}>Vehicle Number</Text>
        <TextInput
          
          value={vehicleNumber}
          onChangeText={setVehicleNumber}
          style={styles.input}
          maxLength={9}
        />
<Text style={styles.formtitle}>Vehicle Type</Text>
        <TextInput
          
          value={vehicleType}
          onChangeText={setVehicleType}
          style={styles.input}
          inputMode="text"
        />
        <Text style={styles.formtitle}>Capacity of Vehicle in Tons</Text>
        <TextInput
         
          value={capacity}
          onChangeText={setCapacity}
          style={styles.input}
          maxLength={2}
          inputMode="numeric"
        />
        <Text style={styles.formtitle}>Area of Collecting Access</Text>
        <TextInput
          value={collectingArea}
          onChangeText={setCollectingArea}
          style={styles.input}
          inputMode="text"
        />
        <Text style={styles.formtitle}>Arrival Time</Text>
        <TextInput
          
          value={arrivalTime}
          onChangeText={setArrivalTime}
          style={styles.input}
        />
        <Text style={styles.formtitle}>Leaving Time</Text>
        <TextInput
          value={leavingTime}
          onChangeText={setLeavingTime}
          style={styles.input}
        />
        
        <TouchableOpacity style={styles.button} onPress={handleAddItem}>
          <Text style={styles.buttonText}>Add Record</Text>
        </TouchableOpacity>
      </ScrollView>
      <AdminNav />
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
    textDecorationColor: '#ffffff',
    padding: 8,
    marginBottom: 16,
    
  },
  button: {
    backgroundColor: '#181818',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    marginTop: 10,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#181818',
    textAlign: 'center',
  },
  formtitle: {
    fontSize: 14,
    color: '#181818',
    textAlign: 'left',
    fontWeight: 'bold',
  },
});

export default AddDriverDetails;
