import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomerNav from '../../Components/CustomerNav';

const hero = require('../../../assets/hero.jpg');
const add = require('../../../assets/add.png');
const edit = require('../../../assets/edit.png');
const list = require('../../../assets/list.png');

const CustomerHome: React.FC = () => {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#89F28D' }}>
      <View style={{ flex: 1, margin: 20 }}>
        <Text style={styles.header}>Smart Waste</Text>
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
  topImage: {
    width: '100%',
    height: 200,
    marginBottom: 10,
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
    color: '#F96D2B',
    textAlign: 'center',
  },
  header: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#388E3C',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default CustomerHome;
