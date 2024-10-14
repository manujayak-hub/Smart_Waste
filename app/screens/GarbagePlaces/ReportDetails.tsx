import React from 'react';
import { ScrollView, StyleSheet, Text, View, SafeAreaView ,Alert,Button,Linking, TouchableOpacity} from 'react-native';
import { useRoute } from '@react-navigation/native';
import * as Print from 'expo-print';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import Header from '../../Components/HeaderAdmin';

const ReportDetails = () => {
  const route = useRoute();
  const { garbagePlaces } = route.params as { garbagePlaces: { id: string; locationName: string; address: string; capacity:string;contactPerson:string;phoneNumber:string;wasteType:string; }[] };

  const generatePDF = async () => {
    const htmlContent = `
      <html>
        <body>
          <h1>Garbage Places Report</h1>
          ${garbagePlaces.map(
            (place) =>
              `<div>
                <h2>Location Name: ${place.locationName}</h2>
                <p>Address: ${place.address}</p>
                <p>Capacity: ${place.capacity}</p>
                <p>Contact Person: ${place.contactPerson}</p>
                <p>Phone Number: ${place.phoneNumber}</p>
                <p>Waste Type: ${place.wasteType}</p>
              </div>`
          ).join('')}
        </body>
      </html>
    `;

    try {
      // Generate PDF using expo-print
      const { uri } = await Print.printToFileAsync({ html: htmlContent });

      // Share the PDF
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri);
      } else {
        Alert.alert('Error', 'Sharing is not available on this device');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to generate PDF');
      console.error(error);
    }
  };
  
  const openInMaps = (address: string) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    Linking.openURL(url).catch(() => {
      Alert.alert('Error', 'Failed to open Google Maps');
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header/>
      <Text style={styles.title}>Garbage Places Report</Text>
      <ScrollView contentContainerStyle={styles.reportContent}>
        {garbagePlaces.map((place) => (
          <View key={place.id} style={styles.reportItem}>
            <Text style={styles.reportText}><Text style={styles.bold}>Location Name:</Text> {place.locationName}</Text>
            <Text 
              style={[styles.reportText, styles.link]} 
              onPress={() => openInMaps(place.address)}
            >
              <Text style={styles.bold}>Address:</Text> {place.address}
            </Text>
            <Text style={styles.reportText}><Text style={styles.bold}>Capacity:</Text> {place.capacity}</Text>
            <Text style={styles.reportText}><Text style={styles.bold}>Contact Person:</Text> {place.contactPerson}</Text>
            <Text style={styles.reportText}><Text style={styles.bold}>Phone Number:</Text> {place.phoneNumber}</Text>
            <Text style={styles.reportText}><Text style={styles.bold}>Waste Type:</Text> {place.wasteType}</Text>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.rb}  onPress={generatePDF} ><Text style={styles.rbt}>Download PDF</Text></TouchableOpacity>
    </SafeAreaView>
  );
};

export default ReportDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFF6F0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    marginBottom:5,
  },
  reportContent: {
    flexGrow: 1,
    padding:20,
  },
  reportItem: {
    backgroundColor: '#C2E0C0',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  reportText: {
    fontSize: 16,
  },
  bold: {
    fontWeight: 'bold',
  },
  link: {
    color: 'black',
    textDecorationLine: 'underline',
  },
  rb:{
    width:'40%',
    height: 50,
    borderRadius:10,
    backgroundColor:'#28A745',
    alignSelf:'center',
  },
  rbt:{
    fontSize:15,
    color:'#FFFFFF',
    textAlign:'center',
    marginTop:10,
  }
});
