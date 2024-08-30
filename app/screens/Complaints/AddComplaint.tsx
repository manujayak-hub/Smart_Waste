import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, TextInput } from 'react-native';
import { FIREBASE_DB } from '../../../Firebase_Config';
import { addDoc, collection } from 'firebase/firestore';
import { List } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialIcons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const AddComplaint: React.FC = () => {
  const [fullName, setFullName] = useState<string>('');
  const [complaintType, setComplaintType] = useState<string>('');
  const [missedPickupDate, setMissedPickupDate] = useState<string>('');
  const [garbageType, setGarbageType] = useState<string>('');
  const [garbageLocation, setGarbageLocation] = useState<string>('');
  const [additionalDetails, setAdditionalDetails] = useState<string>('');
  const [complaintExpanded, setComplaintExpanded] = useState<boolean>(false);
  const [garbageExpanded, setGarbageExpanded] = useState<boolean>(false);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedLocation, setSelectedLocation] = useState<{ latitude: number, longitude: number } | null>(null);

  useEffect(() => {
    const requestLocationPermission = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Permission to access location was denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setSelectedLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      setGarbageLocation(`Lat: ${location.coords.latitude}, Long: ${location.coords.longitude}`);
    };

    requestLocationPermission();
  }, []);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
    setMissedPickupDate(currentDate.toISOString().split('T')[0]);
  };

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
        status: 'Pending',
      });

      setFullName('');
      setComplaintType('');
      setMissedPickupDate('');
      setGarbageType('');
      setGarbageLocation('');
      setAdditionalDetails('');
      setSelectedLocation(null);
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

      <List.Accordion
        title={complaintType || "Select Complaint Type"}
        expanded={complaintExpanded}
        onPress={() => setComplaintExpanded(!complaintExpanded)}
        style={styles.accordion}
      >
        <List.Item
          title="Missed Pickup"
          onPress={() => {
            setComplaintType('Missed Pickup');
            setComplaintExpanded(false);
          }}
        />
        <List.Item
          title="Improper Disposal"
          onPress={() => {
            setComplaintType('Improper Disposal');
            setComplaintExpanded(false);
          }}
        />
        <List.Item
          title="Others"
          onPress={() => {
            setComplaintType('Others');
            setComplaintExpanded(false);
          }}
        />
      </List.Accordion>

      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePicker}>
        <View style={styles.datePickerContent}>
          <Text style={styles.dateText}>
            {missedPickupDate || 'Please Select Date'}
          </Text>
          <MaterialIcons name="calendar-today" size={24} color="#333" style={styles.calendarIcon} />
        </View>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={date || new Date()}
          mode="date"
          display="spinner"
          onChange={handleDateChange}
        />
      )}

      <List.Accordion
        title={garbageType || "Select Type of Garbage"}
        expanded={garbageExpanded}
        onPress={() => setGarbageExpanded(!garbageExpanded)}
        style={styles.accordion}
      >
        <List.Item
          title="General Waste"
          onPress={() => {
            setGarbageType('General Waste');
            setGarbageExpanded(false);
          }}
        />
        <List.Item
          title="Recyclables"
          onPress={() => {
            setGarbageType('Recyclables');
            setGarbageExpanded(false);
          }}
        />
        <List.Item
          title="Organic Waste"
          onPress={() => {
            setGarbageType('Organic Waste');
            setGarbageExpanded(false);
          }}
        />
        <List.Item
          title="Other"
          onPress={() => {
            setGarbageType('Other');
            setGarbageExpanded(false);
          }}
        />
      </List.Accordion>

      <View style={styles.locationContainer}>
        <TouchableOpacity style={styles.mapButton}>
          <View style={styles.mapButtonContent}>
            <MaterialIcons name="location-on" size={24} color="#333" style={styles.locationIcon} />
            <Text style={styles.mapButtonText}>
              {selectedLocation ? `Current Location: Lat ${selectedLocation.latitude}, Long ${selectedLocation.longitude}` : 'Fetching current location...'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

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
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 24,
    marginTop: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 14,
    borderRadius: 10,
    backgroundColor: '#E8F5E9',
    marginBottom: 16,
    fontSize: 16,
    color: '#333',
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  accordion: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 16,
    backgroundColor: '#E8F5E9',
  },
  datePicker: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 14,
    borderRadius: 10,
    backgroundColor: '#E8F5E9',
    marginBottom: 16,
  },
  datePickerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateText: {
    color: '#333',
    fontSize: 16,
  },
  calendarIcon: {
    marginLeft: 8,
  },
  locationContainer: {
    marginBottom: 16,
  },
  mapButton: {
    padding: 14,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#E8F5E9',
  },
  mapButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  locationIcon: {
    marginRight: 8,
  },
  mapButtonText: {
    color: '#333',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddComplaint;
