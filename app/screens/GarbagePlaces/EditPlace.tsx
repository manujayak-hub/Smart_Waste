import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import { FIREBASE_DB } from '../../../Firebase_Config'; 
import { doc, getDoc, updateDoc } from 'firebase/firestore'; 
import AdminNav from '../../Components/AdminNav';
import Header from '../../Components/HeaderAdmin';

const EditPlace = ({ route, navigation }) => {
  const { id } = route.params; // Get the id from the navigation route params
  const [locationName, setLocationName] = useState('');
  const [address, setAddress] = useState('');
  const [wasteType, setWasteType] = useState('');
  const [capacity, setCapacity] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    // Fetch the existing data for the garbage place
    const fetchGarbagePlace = async () => {
      try {
        const garbagePlaceDoc = doc(FIREBASE_DB, 'GarbagePlaces', id);
        const docSnap = await getDoc(garbagePlaceDoc);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setLocationName(data.locationName);
          setAddress(data.address);
          setWasteType(data.wasteType);
          setCapacity(data.capacity);
          setContactPerson(data.contactPerson);
          setPhoneNumber(data.phoneNumber);
        } else {
          Alert.alert('Error', 'No such document!');
        }
      } catch (error) {
        Alert.alert('Error', 'Error fetching garbage place details: ' + error.message);
      }
    };

    fetchGarbagePlace();
  }, [id]);

  const handleSubmit = async () => {
    try {
      // Update the document in Firestore
      const garbagePlaceDoc = doc(FIREBASE_DB, 'GarbagePlaces', id);
      await updateDoc(garbagePlaceDoc, {
        locationName,
        address,
        wasteType,
        capacity,
        contactPerson,
        phoneNumber,
      });
      Alert.alert('Success', 'Garbage place updated successfully!');
      navigation.goBack(); 
    } catch (error) {
      Alert.alert('Error', 'Error updating garbage place: ' + error.message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1}}>
      <Header/>
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Edit Location Details</Text>
      <View style={styles.frame}>
      <Text style={styles.label}>Location Name</Text>
      <TextInput
        style={styles.input}
        value={locationName}
        onChangeText={setLocationName}
      />
      <Text style={styles.label}>Address</Text>
      <TextInput
        style={styles.input}
        value={address}
        onChangeText={setAddress}
      />
      <Text style={styles.label}>Waste Type</Text>
      <TextInput
        style={styles.input}
        value={wasteType}
        onChangeText={setWasteType}
      />
      <Text style={styles.label}>Capacity</Text>
      <TextInput
        style={styles.input}
        value={capacity}
        onChangeText={setCapacity}
      />
      <Text style={styles.label}>Contact Person</Text>
      <TextInput
        style={styles.input}
        value={contactPerson}
        onChangeText={setContactPerson}
      />
      <Text style={styles.label}>Contact Number</Text>
      <TextInput
        style={styles.input}
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      </View>
      <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
        <Text style={styles.btnText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
    <AdminNav/>
    </SafeAreaView>
  );
};

export default EditPlace;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    width: 400,
    justifyContent:'space-between',
    backgroundColor:'#EFF6F0' ,
        
  },
  header: {
    fontWeight: '700',
    fontSize: 22,
    marginBottom: 20,
    textAlign:'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: '#FFFFFF',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor:'#FFFFFF',
    borderRadius:5,
  },
  btn: {
    backgroundColor: '#28A745',
    padding: 10,
    alignItems: 'center',
    width:'50%',
    borderRadius:10,
    alignSelf:'center',
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  frame: {
    width: '100%',
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
});
