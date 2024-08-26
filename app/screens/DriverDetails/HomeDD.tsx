import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const hero = require('../../../assets/hero.jpg')
const add = require('../../../assets/add.png')
const edit = require('../../../assets/edit.png')
const list = require('../../../assets/list.png')

const HomeDD = () => {
  const navigation:any = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1,backgroundColor:'#89F28D' }}>
      <View style={{ flex: 1, margin: 20 }}>
       
        <Image
          source={hero}
          style={styles.topImage}
        />
        
        
        <View style={styles.gridContainer}>
          <TouchableOpacity style={styles.gridItem} > 
            <Image
              source={list}
              style={styles.buttonImage}
            />
            <Text style={styles.buttonText}>Add Your</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.gridItem  } onPress={() => navigation.navigate('AddDriverDetails')}>
            <Image
              source={add}
              style={styles.buttonImage}
            />
            <Text style={styles.buttonText}>Edit Your</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.gridItem}>
            <Image
              source={edit}
              style={styles.buttonImage}
            />
            <Text style={styles.buttonText}>Availability</Text>
          </TouchableOpacity>

        </View>
      </View>
    </SafeAreaView>
  );
}

export default HomeDD;

const styles = StyleSheet.create({
  topImage: {
    width: '100%',
    height: 250,
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
});
