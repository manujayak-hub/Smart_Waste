import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity, StyleSheet, Button, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import AdminNav from '../../Components/AdminNav';
import Header from '../../Components/HeaderAdmin';
import { FIREBASE_DB } from '../../../Firebase_Config';
import { collection, onSnapshot } from 'firebase/firestore';



const garbagebin = require('../../../assets/garbagebin.png');
const addgarbage = require('../../../assets/addgarbage.png');
const viewgarbage = require('../../../assets/viewgarbage.png');
const generatereport = require('../../../assets/generatereport.png');


const MainGarbage = () => {
  const navigation: any = useNavigation();
  const [garbagePlaces, setGarbagePlaces] = useState<{ id: string; locationName: string; address: string; capacity:string;contactPerson:string;phoneNumber:string;wasteType:string; }[]>([]);
  const [filteredPlaces, setFilteredPlaces] = useState<{ id: string; locationName: string; address: string }[]>([]);
  const [searchText, setSearchText] = useState('');
 

  useEffect(() => {
    const fetchGarbagePlaces = async () => {
      try {
        const q = collection(FIREBASE_DB, 'GarbagePlaces');
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const placesData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data() as { locationName: string; address: string; capacity:string;contactPerson:string;phoneNumber:string;wasteType:string },
          }));
          setGarbagePlaces(placesData);
          setFilteredPlaces(placesData); // Set initial filtered places to all places
        });

        return () => unsubscribe();
      } catch (error) {
        console.error('Error fetching garbage places: ', error);
      }
    };

    fetchGarbagePlaces();
  }, []);


  const handleGenerateReport = () => {
    // Navigate to the ReportDetails page, passing the garbage places data
    navigation.navigate('ReportDetails', { garbagePlaces: garbagePlaces });
  };


  
  

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#E8F5E9' }}>
      <Header />
      <ScrollView style={{ flex: 1, margin: 20 }} showsVerticalScrollIndicator={false}>
        <View>
          <Text style={styles.title}>Garbage Bin Information</Text>
        </View>
        <Image source={garbagebin} style={styles.topImage} />

        <TouchableOpacity style={styles.gridItem} onPress={() => navigation.navigate('AddGarbagePlace')}>
            <Image source={addgarbage} style={styles.buttonImage} />
            <Text style={styles.buttonText}>Add New Garbage Bin Details</Text>
          </TouchableOpacity>

        <View style={styles.gridContainer}>
          <TouchableOpacity style={styles.gridItem} onPress={() => navigation.navigate('HomeG')}>
            <Image source={viewgarbage} style={styles.buttonImage} />
            <Text style={styles.buttonText}>View Garbage Bin Details</Text>
          </TouchableOpacity>

          

          <TouchableOpacity style={styles.gridItem}  onPress={handleGenerateReport}>
            <Image source={generatereport} style={styles.buttonImage} />
            <Text style={styles.buttonText}>Generate Report</Text>
          </TouchableOpacity>
        </View>

       
      </ScrollView>
      <AdminNav />
    </SafeAreaView>
  );
};

export default MainGarbage;

const styles = StyleSheet.create({
  topImage: {
    width: '100%',
    height: 250,
    marginBottom: 30,
    borderRadius:10,
  },
  gridContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '100%',
    aspectRatio: 3,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 10,
  },
  buttonImage: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#38e079',
    textAlign: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#181818',
    textAlign: 'center',
    marginBottom: 20,
  },
});
