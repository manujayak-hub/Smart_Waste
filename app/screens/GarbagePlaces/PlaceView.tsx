import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert , Linking,SafeAreaView} from 'react-native';
import { FIREBASE_DB } from '../../../Firebase_Config';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AdminNav from '../../Components/AdminNav';

const PlaceView = ({ route }) => {
  const { id } = route.params; // Get the id from the navigation route params
  const [garbagePlace, setGarbagePlace] = useState(null);
  const navigation:any = useNavigation();

 

  // Fetch the garbage place details from Firestore
  const fetchGarbagePlace = useCallback(async () => {
    try {
      const docRef = doc(FIREBASE_DB, 'GarbagePlaces', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setGarbagePlace(docSnap.data());
      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.error("Error fetching garbage place details: ", error);
    }
  }, [id]);

  useFocusEffect(
    useCallback(() => {
      fetchGarbagePlace();
    }, [fetchGarbagePlace])
  );

  const handleDelete = async () => {
    try {
      const docRef = doc(FIREBASE_DB, 'GarbagePlaces', id);
      await deleteDoc(docRef);
      Alert.alert('Success', 'Garbage place deleted successfully!');
      navigation.navigate('HomeG'); // Navigate to the home page after deletion
    } catch (error) {
      Alert.alert('Error', 'Error deleting garbage place: ' + error.message);
    }
  };

  if (!garbagePlace) {
    return (
      <View style={styles.layoutgd}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const openInGoogleMaps = () => {
    if (garbagePlace.address) {
      const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(garbagePlace.address)}`;
      Linking.openURL(url).catch(err => console.error('Error opening Google Maps', err));
    } else {
      alert("No address provided to open in Google Maps.");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1}}>
    <ScrollView contentContainerStyle={styles.layoutgd}>
      <Text style={styles.header}>Garbage Location View</Text>
      <View style={styles.infoContainer}>

      
        <Text style={styles.label}>Location Name:</Text>
        <View style={styles.vf}>
        <Text style={styles.value}>{garbagePlace.locationName}</Text>
        </View>
      
        <Text style={styles.label}>Address:</Text>
        <View style={styles.vf}>
        <Text style={styles.value}>{garbagePlace.address}</Text>
        </View>
        <TouchableOpacity style={styles.btnl} onPress={openInGoogleMaps}><Text style={styles.btnt}>View on Map</Text></TouchableOpacity>
      
     
        <Text style={styles.label}>Capacity:</Text>
        <View style={styles.vf}>
        <Text style={styles.value}>{garbagePlace.capacity}</Text></View>
    
      
        <Text style={styles.label}>Contact Person:</Text>
        <View style={styles.vf}>
        <Text style={styles.value}>{garbagePlace.contactPerson}</Text></View>
      
    
        <Text style={styles.label}>Phone Number:</Text>
        <View style={styles.vf}>
        <Text style={styles.value}>{garbagePlace.phoneNumber}</Text></View>
        </View>
      <View style={styles.btnf}>
        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('EditPlace', { id })}>
          <Text style={styles.btnt}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={handleDelete}>
          <Text style={styles.btnt}>Delete</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    <AdminNav/>
    </SafeAreaView>
  );
};

export default PlaceView;

const styles = StyleSheet.create({
  layoutgd: {
    padding: 20,
    backgroundColor:'#EFF6F0' ,
    
  },
  header: {
    fontWeight: '700',
    fontSize: 22,
    marginBottom: 20,
  },
  infoContainer: {
      width: '100%',
      height:600,
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

  infoc:{
    width: '100%',
    height:20,
    backgroundColor:'#fffff',
  },

  label: {
    fontWeight: '600',
    fontSize: 16,
    flex: 1,
  },
  value: {
    fontSize: 16,
    flex: 2,
    
    
  },

  btn:{
    width:'40%',
    height: 50,
    borderRadius:10,
    backgroundColor:'#151515',

  },

  btnt:{
    fontSize:15,
    color:'#FFFFFF',
    textAlign:'center',
    marginTop:10,
  },
  
  btnf:{
    flexDirection: 'row',         // Align children in a row
    justifyContent: 'space-between', // Space out the buttons evenly
    padding: 10, 
  },

  vf:{
    height: 40,
    borderColor: '#FFFFFF',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor:'#FFFFFF',
    borderRadius:5,
   
  },
  btnl:{
    width:'40%',
    height: 50,
    borderRadius:10,
    backgroundColor:'#151515',
    marginBottom:20,
    marginLeft:40,
  },
});
