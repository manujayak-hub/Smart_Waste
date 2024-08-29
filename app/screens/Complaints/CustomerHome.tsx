import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomerNav from '../../Components/CustomerNav';

const hero = require('../../../assets/homeHero.jpg');
const add = require('../../../assets/add.png');
const edit = require('../../../assets/edit.png');
const list = require('../../../assets/list.png');

const CustomerHome: React.FC = () => {
  const navigation = useNavigation<any>(); // You can replace 'any' with specific type if needed

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Image source={hero} style={styles.topImage} />
        <View style={styles.gridContainer}>
          <TouchableOpacity style={styles.gridItem} onPress={() => navigation.navigate('AddComplaint')}>
            <Image source={add} style={styles.buttonImage} />
            <Text style={styles.buttonText}>Add Complaint</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.gridItem} onPress={() => navigation.navigate('ComplaintList')}>
            <Image source={list} style={styles.buttonImage} />
            <Text style={styles.buttonText}>View Complaints</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.gridItem} onPress={() => navigation.navigate('UpdateDeleteComplaint')}>
            <Image source={edit} style={styles.buttonImage} />
            <Text style={styles.buttonText}>Manage Complaints</Text>
          </TouchableOpacity>
        </View>
      </View>
      <CustomerNav />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#89F28D',
  },
  innerContainer: {
    flex: 1,
    margin: 20,
    paddingBottom: 20, // Add padding to the bottom to ensure even spacing
  },
  topImage: {
    width: '100%',
    height: 300,
    borderRadius: 15,
    marginBottom: 10,
  },
  gridContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '100%',
    aspectRatio: 3,
    marginBottom: 20, // Ensure even spacing between items
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonImage: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F96D2B',
    textAlign: 'center',
  },
});

export default CustomerHome;
