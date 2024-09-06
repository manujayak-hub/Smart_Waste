import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { FIREBASE_DB } from '../../../Firebase_Config';
import { collection, getDocs } from 'firebase/firestore';
import AdminNav from '../../Components/AdminNav';
import Header from '../../Components/HeaderAdmin';

interface DriverDetail {
  id: string;
  driverName: string;
  vehicleNumber: string;
  partnerName: string;
  vehicleType: string;
  capacity: string;
  collectingArea: string;
  arrivalTime: string;
  leavingTime: string;
  cdate: string;
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
    <SafeAreaView style={{ flex: 1, backgroundColor: '#E8F5E9' }}>
      <Header />
      <View>
        <Text style={styles.title}>Driver Details</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContainer} showsVerticalScrollIndicator={false}>
        {driverDetails.map((item) => (
          <View key={item.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.driverName}>{item.driverName}</Text>
              <Text style={styles.cdate}>{new Date(item.cdate).toLocaleDateString()}</Text>
            </View>
            <Text style={styles.cardTitle}>{item.vehicleNumber}</Text>
            <Text style={styles.cardText}>Partner Name: {item.partnerName}</Text>
            <Text style={styles.cardText}>Vehicle Type: {item.vehicleType}</Text>
            <Text style={styles.cardText}>Capacity: {item.capacity} Tons</Text>
            <Text style={styles.cardText}>Collecting Area: {item.collectingArea}</Text>
            <Text style={styles.cardText}>Arrival Time: {item.arrivalTime}</Text>
            <Text style={styles.cardText}>Leaving Time: {item.leavingTime}</Text>
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
  cardHeader: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  driverName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  cdate: {
    fontSize: 14,
    color: '#555',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  cardText: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: 'center',
  },
  title: {
    marginTop: 10,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#181818',
    textAlign: 'center',
  },
});

export default DDList;
