import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { FIREBASE_DB } from '../../../Firebase_Config';
import { addDoc, collection } from 'firebase/firestore';

const AddComplaint: React.FC = () => {
  const [fullName, setFullName] = useState<string>('');
  const [complaintType, setComplaintType] = useState<string>('');
  const [missedPickupDate, setMissedPickupDate] = useState<string>('');
  const [garbageType, setGarbageType] = useState<string>('');
  const [garbageLocation, setGarbageLocation] = useState<string>('');
  const [additionalDetails, setAdditionalDetails] = useState<string>('');

  const handleAddItem = async () => {
    if (
      !fullName.trim() ||
      !complaintType.trim() ||
      !missedPickupDate.trim() ||
      !garbageType.trim() ||
      !garbageLocation.trim() ||
      !additionalDetails.trim()
    ) {
      Alert.alert('Validation', 'Please fill out all fields');
      return;
    }

    try {
      await addDoc(collection(FIREBASE_DB, 'Complaints'), {
        fullName,
        complaintType,
        missedPickupDate,
        garbageType,
        garbageLocation,
        additionalDetails,
        status: 'Pending', // Set status to "Pending"
      });

      // Clear the input fields after adding the document
      setFullName('');
      setComplaintType('');
      setMissedPickupDate('');
      setGarbageType('');
      setGarbageLocation('');
      setAdditionalDetails('');
      Alert.alert('Success', 'Complaint added successfully');
    } catch (error) {
      console.error('Error adding complaint: ', error);
      Alert.alert('Error', 'Failed to add complaint');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add New Complaint</Text>

      <TextInput
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
        style={styles.input}
      />
      <TextInput
        placeholder="Complaint Type"
        value={complaintType}
        onChangeText={setComplaintType}
        style={styles.input}
      />
      <TextInput
        placeholder="Missed Pickup Date"
        value={missedPickupDate}
        onChangeText={setMissedPickupDate}
        style={styles.input}
      />
      <TextInput
        placeholder="Type of Garbage"
        value={garbageType}
        onChangeText={setGarbageType}
        style={styles.input}
      />
      <TextInput
        placeholder="Garbage Location"
        value={garbageLocation}
        onChangeText={setGarbageLocation}
        style={styles.input}
      />
      <TextInput
        placeholder="Additional Details"
        value={additionalDetails}
        onChangeText={setAdditionalDetails}
        style={[styles.input, styles.textArea]}
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={handleAddItem}>
        <Text style={styles.buttonText}>Submit Complaint</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#F3F4F6', // Light background color
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 24,
    marginTop: 20, // Added marginTop for gap above the title
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 16,
    fontSize: 16,
  },
  textArea: {
    height: 100, // Increase height for text area
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddComplaint;
