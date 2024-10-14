import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FIREBASE_DB } from '../../../Firebase_Config';
import { collection, onSnapshot } from 'firebase/firestore';
import CustomerNav from '../../Components/CustomerNav';
import Header from '../../Components/HeaderCustomer';
import * as Location from 'expo-location';
import Icon from 'react-native-vector-icons/MaterialIcons'; 

const UserGarbage = () => {
  const [garbagePlaces, setGarbagePlaces] = useState<{ id: string; locationName: string; address: string; capacity: string; contactPerson: string; phoneNumber: string; wasteType: string; latitude: number; longitude: number }[]>([]);
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
            ...doc.data() as { locationName: string; address: string; capacity: string; contactPerson: string; phoneNumber: string; wasteType: string; latitude: number; longitude: number },
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

  
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radius of the earth in kilometers
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
  };

  
  const fetchCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Permission to access location was denied.');
      return;
    }
  
    let location = await Location.getCurrentPositionAsync({});
    if (location) {
      const { latitude, longitude } = location.coords;
  
      const reverseGeocode = await Location.reverseGeocodeAsync({ latitude, longitude });
      if (reverseGeocode.length > 0) {
        const locationName = `${reverseGeocode[0].city}`;
        setSearchText(locationName);
  
        // Filter garbage places where the address includes the location name (city or region)
        const matchingPlaces = garbagePlaces.filter((place) =>
          place.address.toLowerCase().includes(locationName.toLowerCase())
        );
  
        if (matchingPlaces.length > 0) {
          setFilteredPlaces(matchingPlaces);
        } else {
          Alert.alert('No Matches', 'No garbage places found for your current location.');
        }
      } else {
        Alert.alert('Location Error', 'Unable to fetch location details');
      }
    }
  };
  

  
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

        
        <TouchableOpacity style={styles.locationBtn} onPress={fetchCurrentLocation}>
          <Icon name="location-on" size={20} color="#fff" style={styles.iconStyle} />
          <Text style={styles.locationBtnText}>Use My Location</Text>
        </TouchableOpacity>

        <View style={styles.mainframe}>
          {filteredPlaces.length > 0 ? (
            filteredPlaces.map((place) => (
              <View key={place.id} style={styles.frame}>
                <Text style={styles.ss2}>{place.address}</Text>
                <TouchableOpacity
                  style={styles.btn1}
                  onPress={() => navigation.navigate('UserView', { id: place.id })}
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
      <CustomerNav />
    </SafeAreaView>
  );
};

export default UserGarbage;

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
  locationBtn: {
    flexDirection: 'row',
    alignSelf:'center',
    backgroundColor: '#28A745',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    justifyContent: 'center',
    width:200,
  },
  locationBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 5, 
  },
  iconStyle: {
    marginRight: 10,
  },
  mainframe: {
    flexGrow: 1,
  },
  frame: {
    width: '100%',
    height: 50,
    backgroundColor: '#C2E0C0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderRadius: 12,
    padding: 10,
    marginTop: 2,
    marginBottom: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  btn1: {
    width: 56.95,
    height: 36,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginTop: 5,
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
