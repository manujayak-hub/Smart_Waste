import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Image, StyleSheet, View, TouchableOpacity, Text } from 'react-native';

// Import your icons
const homeicon = require('../../assets/CusHome.png');
const guideicon = require('../../assets/ChatbotIcon.png');
const cameraicon = require('../../assets/CameraIcon.png');

const AdminNav: React.FC = () => {
  const navigation: any = useNavigation();

  return (
    <View style={styles.container}>
      {/* Home Icon */}
      <TouchableOpacity onPress={() => navigation.navigate('CustomerHome')} style={styles.iconContainer}>
        <Image source={homeicon} style={styles.icon} />
        <Text style={styles.iconLabel}>Home</Text>
      </TouchableOpacity>

      {/* Guide Icon */}
      <TouchableOpacity onPress={() => navigation.navigate('Chatbot')} style={styles.iconContainer}>
        <Image source={guideicon} style={styles.icon} />
        <Text style={styles.iconLabel}>Chatbot</Text>
      </TouchableOpacity>

      {/* Camera Icon */}
      <TouchableOpacity onPress={() => navigation.navigate('CameradScreen')} style={styles.iconContainer}>
        <Image source={cameraicon} style={styles.icon} />
        <Text style={styles.iconLabel}>Camera</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 60, // Slightly increased height for better touch area
    backgroundColor: '#ffffff', // Light background for a clean look
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderTopWidth: 1, // Add a subtle border on top
    borderTopColor: '#e0e0e0', // Light grey color for the border
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center', // Center icon and text vertically
  },
  icon: {
    width: 28, // Slightly larger icons for better visibility
    height: 28,
    marginBottom: 5, // Space between the icon and the label
  },
  iconLabel: {
    fontSize: 12, // Small label text size
    color: '#333', // Darker color for contrast
  },
});

export default AdminNav;
