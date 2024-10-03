import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  Modal,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { FIREBASE_DB } from '../../../Firebase_Config';
import { collection, query, onSnapshot } from 'firebase/firestore';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

interface Complaint {
  id: string;
  fullName: string;
  complaintType: string;
  missedPickupDate: string;
  garbageType: string;
  garbageLocation: string;
  additionalDetails: string;
  status: string;
}

const ComplaintReport: React.FC = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);

  useEffect(() => {
    const q = query(collection(FIREBASE_DB, 'Complaints'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const complaintsList: Complaint[] = [];
      querySnapshot.forEach((doc) => {
        complaintsList.push({
          id: doc.id,
          ...doc.data(),
        } as Complaint);
      });
      setComplaints(complaintsList);
    });

    return () => unsubscribe();
  }, []);

  const openModal = (complaint: Complaint) => {
    setSelectedComplaint(complaint);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedComplaint(null);
  };

  const generatePDF = async () => {
    if (!selectedComplaint) return;

    const pdfContent = `
        <html>
            <head>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; line-height: 1.6; }
                h1 {text-align: center; font-size: 24px; margin-bottom: 40px; }
                .container {
                border: 1px solid #ccc;
                border-radius: 12px;
                padding: 20px;
                background-color: #f9f9f9;
                }
                .section-title {
                font-size: 18px;
                color: #333;
                margin-bottom: 10px;
                border-bottom: 2px solid #4CAF50;
                padding-bottom: 5px;
                }
                .complainant-info {
                margin-bottom: 20px;
                }
                .complainant-info p {
                margin: 5px 0;
                }
                table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 20px;
                }
                table, th, td {
                border: 1px solid #ddd;
                }
                th, td {
                padding: 12px;
                text-align: left;
                }
                .status {
                margin-top: 30px;
                font-size: 20px;
                text-align: center;
                color: #333;
                }
                .status span {
                font-weight: bold;
                color: #4CAF50;
                }
            </style>
            </head>
            <body>
            <h1>Complaint Report</h1>

            <!-- Complainant Information Section -->
            <div class="container">
                <div class="section-title">Complainant Information</div>
                <div class="complainant-info">
                <p><strong>Full Name:</strong> ${selectedComplaint.fullName}</p>
                <p><strong>Filed Date:</strong> ${new Date().toLocaleDateString()}</p>
                </div>

                <!-- Complaint Details Table -->
                <div class="section-title">Complaint Details</div>
                <table>
                <tr>
                    <th>Complaint Type</th>
                    <td>${selectedComplaint.complaintType}</td>
                </tr>
                <tr>
                    <th>Missed Pickup Date</th>
                    <td>${selectedComplaint.missedPickupDate}</td>
                </tr>
                <tr>
                    <th>Garbage Type</th>
                    <td>${selectedComplaint.garbageType}</td>
                </tr>
                <tr>
                    <th>Garbage Location</th>
                    <td>${selectedComplaint.garbageLocation}</td>
                </tr>
                <tr>
                    <th>Additional Details</th>
                    <td>${selectedComplaint.additionalDetails}</td>
                </tr>
                </table>

                <!-- Complaint Status Section -->
                <div class="status">
                <p><strong>Status:</strong> <span>${selectedComplaint.status}</span></p>
                </div>
            </div>
            </body>
        </html>
        `;

    try {
      const { uri } = await Print.printToFileAsync({
        html: pdfContent,
      });

      // Share the generated PDF
      await Sharing.shareAsync(uri);
      Alert.alert('Success', 'PDF generated successfully! You can share it now.');
    } catch (error) {
      console.error('Error generating PDF:', error);
      Alert.alert('Error', 'Failed to generate PDF');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Complaint Report</Text>
      <FlatList
        data={complaints}
        renderItem={({ item }) => (
          <View style={styles.complaintItem}>
            <Text style={styles.sectionHeader}>Personal Information</Text>
            <Text style={styles.infoText}>Full Name: {item.fullName}</Text>

            <Text style={styles.sectionHeader}>Complaint Details</Text>
            <Text style={styles.infoText}>Complaint Type: {item.complaintType}</Text>
            <Text style={styles.infoText}>Missed Pickup Date: {item.missedPickupDate}</Text>

            <View style={styles.divider} />
            <Button title="View Details" onPress={() => openModal(item)} />
          </View>
        )}
        keyExtractor={(item) => item.id}
      />

      {/* Modal to display complaint details */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContent}>
          {selectedComplaint && (
            <>
              <Text style={styles.modalTitle}>Complaint Details</Text>

              <Text style={styles.sectionHeader}>Personal Information</Text>
              <Text style={styles.infoText}>Full Name: {selectedComplaint.fullName}</Text>

              <Text style={styles.sectionHeader}>Complaint Information</Text>
              <Text style={styles.infoText}>Complaint Type: {selectedComplaint.complaintType}</Text>
              <Text style={styles.infoText}>Missed Pickup Date: {selectedComplaint.missedPickupDate}</Text>
              <Text style={styles.infoText}>Garbage Type: {selectedComplaint.garbageType}</Text>
              <Text style={styles.infoText}>Garbage Location: {selectedComplaint.garbageLocation}</Text>

              <Text style={styles.sectionHeader}>Additional Information</Text>
              <Text style={styles.infoText}>Additional Details: {selectedComplaint.additionalDetails}</Text>

              <Text style={styles.sectionHeader}>Status</Text>
              <Text style={styles.statusText}>Status: {selectedComplaint.status}</Text>

              <TouchableOpacity onPress={generatePDF} style={styles.pdfButton}>
                <Text style={styles.pdfButtonText}>Generate PDF</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F3F4F6',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  complaintItem: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginTop: 10,
    marginBottom: 5,
  },
  infoText: {
    fontSize: 16,
    marginVertical: 2,
    color: '#333',
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 10,
  },
  modalContent: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#4CAF50',
  },
  statusText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 10,
  },
  pdfButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  pdfButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  closeButton: {
    backgroundColor: '#d9534f',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default ComplaintReport;
