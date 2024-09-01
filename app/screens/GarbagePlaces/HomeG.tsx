import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity, Alert,SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FIREBASE_DB } from '../../../Firebase_Config';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';

const HomeG = () => {
  const [garbagePlaces, setGarbagePlaces] = useState<{ id: string; locationName: string; address: string }[]>([]);
  const navigation:any = useNavigation();
  useEffect(() => {
    // Fetch the list of garbage places from Firestore
    const fetchGarbagePlaces = async () => {
      try {
        const q = collection(FIREBASE_DB, 'GarbagePlaces');
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const placesData = querySnapshot.docs.map(doc => ({
            id: doc.id, // Using document ID as a unique key
            ...doc.data() as { locationName: string; address: string }
          }));
          setGarbagePlaces(placesData);
        });

        // Clean up the subscription on unmount
        return () => unsubscribe();
      } catch (error) {
        console.error("Error fetching garbage places: ", error);
      }
    };

    fetchGarbagePlaces();
  }, []);

  return (
    <SafeAreaView >
    <ScrollView contentContainerStyle={styles.layout}>
      <Text style={styles.h1d}>Garbage Places</Text>
      <TextInput
        style={styles.search}
        placeholder="Search for garbage places"
      />
      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('AddGarbagePlace')}>
        <Text style={styles.btntxt}>Add Garbage Place</Text>
      </TouchableOpacity>
      <Text style={styles.subd}>Garbage Disposal Places</Text>
      <View style={styles.mainframe}>
        {garbagePlaces.map(place => (
          <View key={place.id} style={styles.frame}>
            <Text style={styles.ss1}>{place.locationName}</Text>
            <Text style={styles.ss2}>{place.address}</Text>
            <TouchableOpacity style={styles.btn1} onPress={() => navigation.navigate('PlaceView', { id: place.id })}>
              <Text style={styles.btntxt1}>View</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
    </SafeAreaView>
  );
};

export default HomeG;

  
const styles = StyleSheet.create({
  layout: {
    flexGrow: 1,
    padding: 20,
    backgroundColor:'#EFF6F0' ,
  },
  h1d: {
    fontWeight: '700',
    fontSize: 22,
    textAlign: 'center',
    color: '#000000',
    marginBottom:20,
    
  },
  search: {
    width: '100%',
    height: 40,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    borderColor: '#DBDBDB',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  btn: {
    width: '50%',
    height: 40,
    backgroundColor: '#7EB685',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf:'center',
    marginBottom: 20,
  },
  btntxt: {
    fontWeight: '400',
    fontSize: 16,
    color: '#0E1813',
  },
  subd: {
    fontWeight: '700',
    fontSize: 22,
    color: '#141414',
    marginBottom: 20,
  },
  mainframe: {
    flexGrow: 1,
   
  },
  frame: {
    width: '100%',
    height: 132,
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
  btn1: {
    width: 56.95,
    height: 36,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  btntxt1: {
    fontWeight: '500',
    fontSize: 14,
    color: '#141414',
  },
  ss1: {
    fontWeight: '700',
    fontSize: 18,
    marginBottom: 10,
  },
  ss2: {
    fontWeight: '400',
    fontSize: 16,
  },
});
