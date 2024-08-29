import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { FIREBASE_DB } from '../../../Firebase_Config';
import { collection, getDocs } from 'firebase/firestore';
import AdminNav from '../../Components/AdminNav';
import Header from '../../Components/HeaderAdmin';

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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#89F28D' }}>
      <Header />
      <View>
        <Text style={styles.title}>Driver Details</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {driverDetails.map((item) => (
          <View key={item.id} style={styles.card}>
            <Text style={styles.cardTitle}>{item.vehicleNumber}</Text>
            <Text style={styles.cardText}>Partner Name: {item.partnerName}</Text>
            <Text style={styles.cardText}>Vehicle Type: {item.vehicleType}</Text>
            <Text style={styles.cardText}>Capacity: {item.capacity}</Text>
            <Text style={styles.cardText}>Collecting Area: {item.collectingArea}</Text>
            <Text style={styles.cardText}>Leaving Time: {item.leavingDate}</Text>
            <Text style={styles.cardText}>Arrival Time: {item.arrivalDate}</Text>
          </View>
        ))}
      </ScrollView>
      <AdminNav />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    padding: 10,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 5,
  },
  title: {
    marginTop: 10,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
});

export default DDList;
