import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Image, StyleSheet, View, TouchableOpacity } from 'react-native';


// Import your icons
const homeicon = require('../../assets/nav (1).png');
const guideicon = require('../../assets/nav (2).png');
const profileicon = require('../../assets/nav (3).png');

const AdminNav: React.FC = () => {
  const navigation: any = useNavigation();

  return (
    <View style={styles.container}>
      
      <TouchableOpacity onPress={() => navigation.navigate('HomeDD')} style={styles.iconContainer}>
        <Image source={homeicon} style={styles.icon} />
      </TouchableOpacity>


      <TouchableOpacity onPress={() => navigation.navigate('MainGarbage')} style={styles.iconContainer}>


        <Image source={guideicon} style={styles.icon} />
      </TouchableOpacity>


      <TouchableOpacity onPress={() => navigation.navigate('AdminSideComplaint')} style={styles.iconContainer}>

        <Image source={profileicon} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%', // Take up the full width of the screen
    height: 60, // Set the height of the navbar
    backgroundColor: '#f8f8f8', // Optional background color
    flexDirection: 'row', // Arrange icons horizontally
    justifyContent: 'space-around', // Space icons evenly across the navbar
    alignItems: 'center', // Center icons vertically
    paddingHorizontal: 20, // Add padding on the sides
  },
  iconContainer: {
    flex: 1, // Allow each icon to take equal space
    alignItems: 'center', // Center icons horizontally within their container
  },
  icon: {
    width: 24, // Icon width
    height: 24, // Icon height
  },
});

export default AdminNav;