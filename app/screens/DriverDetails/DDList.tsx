import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { FIREBASE_DB } from '../../../Firebase_Config';
import { collection, getDocs } from 'firebase/firestore';

// Define the type for the driver details
interface DriverDetail {
  id: string;
  vehicleNumber: string;
  partnerName: string;
  vehicleType: string;
  capacity: string;
  collectingArea: string;
  arrivalDate: string;
  leavingDate: string;
}

const DDList: React.FC = () => {
  const [driverDetails, setDriverDetails] = useState<DriverDetail[]>([]);

  useEffect(() => {
    const fetchDriverDetails = async () => {
      try {
        const querySnapshot = await getDocs(collection(FIREBASE_DB, 'DriverDetails'));
        const details = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as DriverDetail[];
        setDriverDetails(details);
      } catch (error) {
        console.error('Error fetching driver details: ', error);
      }
    };

    fetchDriverDetails();
  }, []);

  const renderItem = ({ item }: { item: DriverDetail }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>Vehicle Number: {item.vehicleNumber}</Text>
      <Text style={styles.itemText}>Partner Name: {item.partnerName}</Text>
      <Text style={styles.itemText}>Vehicle Type: {item.vehicleType}</Text>
      <Text style={styles.itemText}>Capacity: {item.capacity}</Text>
      <Text style={styles.itemText}>Collecting Area: {item.collectingArea}</Text>
      <Text style={styles.itemText}>Arrival Date: {item.arrivalDate}</Text>
      <Text style={styles.itemText}>Leaving Date: {item.leavingDate}</Text>
    </View>
  );

  return (
    <FlatList
      data={driverDetails}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
  },
  itemContainer: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 8,
  },
});

export default DDList;
