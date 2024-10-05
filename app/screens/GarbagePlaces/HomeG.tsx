import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity, SafeAreaView,Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FIREBASE_DB } from '../../../Firebase_Config';
import { collection, onSnapshot } from 'firebase/firestore';
import AdminNav from '../../Components/AdminNav';
import Header from '../../Components/HeaderAdmin';


const HomeG = () => {
  const [garbagePlaces, setGarbagePlaces] = useState<{ id: string; locationName: string; address: string; capacity:string;contactPerson:string;phoneNumber:string;wasteType:string; }[]>([]);
  const [filteredPlaces, setFilteredPlaces] = useState<{ id: string; locationName: string; address: string }[]>([]);
  const [searchText, setSearchText] = useState('');
  const navigation: any = useNavigation();

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
          setFilteredPlaces(placesData); 
        });

        return () => unsubscribe();
      } catch (error) {
        console.error('Error fetching garbage places: ', error);
      }
    };

    fetchGarbagePlaces();
  }, []);

  // Function to filter places by address
  const handleSearch = (text: string) => {
    setSearchText(text);
    if (text === '') {
      setFilteredPlaces(garbagePlaces); 
    } else {
      const filtered = garbagePlaces.filter((place) =>
        place.address.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredPlaces(filtered);
    }
  };

  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />
      <ScrollView contentContainerStyle={styles.layout}>
        <Text style={styles.h1d}>Garbage Disposal Places</Text>
        <TextInput
          style={styles.search}
          placeholder="Search for garbage places by address"
          value={searchText}
          onChangeText={handleSearch} 
        />
       
        <View style={styles.mainframe}>
          {filteredPlaces.length > 0 ? (
            filteredPlaces.map((place) => (
              <View key={place.id} style={styles.frame}>
                <Text style={styles.ss1}>{place.locationName}</Text>
                <Text style={styles.ss2}>{place.address}</Text>
                <TouchableOpacity
                  style={styles.btn1}
                  onPress={() => navigation.navigate('PlaceView', { id: place.id })}
                >
                  <Text style={styles.btntxt1}>View</Text>
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <Text>No matching garbage places found.</Text>
          )}
        </View>
      </ScrollView>
      <AdminNav />
    </SafeAreaView>
  );
};

export default HomeG;

const styles = StyleSheet.create({
  layout: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#EFF6F0',
  },
  h1d: {
    fontWeight: '700',
    fontSize: 22,
    textAlign: 'center',
    color: '#000000',
    marginBottom: 20,
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
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
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
  reportBtn: {
    width: '50%',
    height: 40,
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
  },
});
