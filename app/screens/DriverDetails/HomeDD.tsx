import React from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity, StyleSheet, Button, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import AdminNav from '../../Components/AdminNav';
import Header from '../../Components/HeaderAdmin';
import { FIREBASE_DB } from '../../../Firebase_Config';
import { collection, getDocs } from 'firebase/firestore';
import * as Print from 'expo-print';


const hero = require('../../../assets/hero.jpg');
const add = require('../../../assets/add.png');
const edit = require('../../../assets/edit.png');
const list = require('../../../assets/list.png');
const adduser = require('../../../assets/adduser.png');
const report = require('../../../assets/report.png')

const HomeDD = () => {
  const navigation: any = useNavigation();

  const generatePDF = async () => {
    let htmlContent = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; }
            h1 { text-align: center; color: #4CAF50; }
            p { font-size: 14px; color: #555; line-height: 1.6; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: center; }
            th { background-color: #4CAF50; color: white; }
            footer { margin-top: 50px; text-align: center; font-size: 12px; color: #888; }
            .signature-section {
              margin-top: 30px;
              display: flex;
              justify-content: space-between;
            }
            .signature {
              width: 200px;
              border-top: 1px solid black;
              text-align: center;
            }
          </style>
        </head>
        <body>
          <h1>Driver Details Report</h1>
          <center><p>This report contains information about driver details.</p>
          </center>
          <table>
            <thead>
              <tr>
                <th>Driver Name</th>
                <th>Vehicle Number</th>
                <th>Partner Name</th>
                <th>Vehicle Type</th>
                <th>Capacity (Tons)</th>
                <th>Collecting Area</th>
                <th>Arrival Time</th>
                <th>Leaving Time</th>
              </tr>
            </thead>
            <tbody>
    `;
  
    try {
      // Fetch driver details from Firestore
      const querySnapshot = await getDocs(collection(FIREBASE_DB, 'DriverDetails'));
      const driverDetails = querySnapshot.docs.map(doc => doc.data());
  
      // Populate the HTML table with driver details
      driverDetails.forEach(driver => {
        htmlContent += `
          <tr>
            <td>${driver.driverName}</td>
            <td>${driver.vehicleNumber}</td>
            <td>${driver.partnerName}</td>
            <td>${driver.vehicleType}</td>
            <td>${driver.capacity}</td>
            <td>${driver.collectingArea}</td>
            <td>${driver.arrivalTime}</td>
            <td>${driver.leavingTime}</td>
          </tr>
        `;
      });
  
      htmlContent += `
            </tbody>
          </table>
  
          <!-- Signature section for authorized personnel -->
          <div class="signature-section">
            <div class="signature">Authorized Signature</div>
            <div class="signature">Date</div>
          </div>
  
          <footer>
            <p>Report generated by Smart Waste System</p>
          </footer>
        </body>
      </html>
      `;
  
      // Generate the PDF and open it for preview
      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      console.log('PDF generated:', uri);
  
      // Open the PDF for preview
      await Print.printAsync({ uri });
    } catch (error) {
      console.error('Error generating PDF report:', error);
      Alert.alert('Error', 'Failed to generate PDF report');
    }
  };
  

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#E8F5E9' }}>
      <Header />
      <ScrollView style={{ flex: 1, margin: 20 }} showsVerticalScrollIndicator={false}>
        <View>
          <Text style={styles.title}>Driver Details</Text>
        </View>
        <Image source={hero} style={styles.topImage} />

        <View style={styles.gridContainer}>
          <TouchableOpacity style={styles.gridItem} onPress={() => navigation.navigate('DDList')}>
            <Image source={list} style={styles.buttonImage} />
            <Text style={styles.buttonText}>View Driver Details Records</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.gridItem} onPress={() => navigation.navigate('AddDriverDetails')}>
            <Image source={add} style={styles.buttonImage} />
            <Text style={styles.buttonText}>Add New Record</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.gridItem} onPress={() => navigation.navigate('UpdateDeleteDD')}>
            <Image source={edit} style={styles.buttonImage} />
            <Text style={styles.buttonText}>Update & Delete Records</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.gridItem} onPress={() => navigation.navigate('SignUpScreen')}>
            <Image source={adduser} style={styles.buttonImage} />
            <Text style={styles.buttonText}>Create User</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.gridItem} onPress={generatePDF}>
            <Image source={report} style={styles.buttonImage} />
            <Text style={styles.buttonText}>Generate Report</Text>
          </TouchableOpacity>
        </View>

       
      </ScrollView>
      <AdminNav />
    </SafeAreaView>
  );
};

export default HomeDD;

const styles = StyleSheet.create({
  topImage: {
    width: '100%',
    height: 250,
    marginBottom: 30,
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
    color: '#38e079',
    textAlign: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#181818',
    textAlign: 'center',
  },
});
