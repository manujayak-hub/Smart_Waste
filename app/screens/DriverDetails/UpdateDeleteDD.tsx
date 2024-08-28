import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Modal, TextInput, Button, SafeAreaView } from 'react-native';
import { FIREBASE_DB } from '../../../Firebase_Config';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import AdminNav from '../../Components/AdminNav';
import Header from '../../Components/HeaderAdmin';

interface DriverDetail {
  id: string;
  vehicleNumber: string;
  partnerName: string;
  vehicleType: string;
  capacity: string;
  collectingArea: string;
  arrivalDate: string;
  leavingDate: string;
}

const UpdateDeleteDD: React.FC = () => {
  const [driverDetails, setDriverDetails] = useState<DriverDetail[]>([]);
  const [selectedDetail, setSelectedDetail] = useState<DriverDetail | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [updatedDetail, setUpdatedDetail] = useState<DriverDetail | null>(null);

  useEffect(() => {
    const fetchDriverDetails = async () => {
      try {
        const querySnapshot = await getDocs(collection(FIREBASE_DB, 'DriverDetails'));
        const details = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as DriverDetail[];
        setDriverDetails(details);
      } catch (error) {
        console.error('Error fetching driver details: ', error);
      }
    };

    fetchDriverDetails();
  }, []);

  const handleUpdate = async () => {
    if (updatedDetail) {
      const { id, ...rest } = updatedDetail;
      try {
        const detailDoc = doc(FIREBASE_DB, 'DriverDetails', id);
        await updateDoc(detailDoc, rest);
        setDriverDetails(prevDetails => prevDetails.map(detail => detail.id === id ? updatedDetail : detail));
        setModalVisible(false);
      } catch (error) {
        console.error('Error updating driver detail: ', error);
      }
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(FIREBASE_DB, 'DriverDetails', id));
      setDriverDetails(prevDetails => prevDetails.filter(detail => detail.id !== id));
    } catch (error) {
      console.error('Error deleting driver detail: ', error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#89F28D' }}>
      <Header />
      <View>
        <Text style={styles.title}>Change Record </Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {driverDetails.map((item) => (
          <View key={item.id} style={styles.card}>
            <Text style={styles.cardTitle}>{item.vehicleNumber}</Text>
            <Text style={styles.cardText}>Partner Name: {item.partnerName}</Text>
            <Text style={styles.cardText}>Vehicle Type: {item.vehicleType}</Text>
            <Text style={styles.cardText}>Capacity: {item.capacity}</Text>
            <Text style={styles.cardText}>Collecting Area: {item.collectingArea}</Text>
            <Text style={styles.cardText}>Arrival Date: {item.arrivalDate}</Text>
            <Text style={styles.cardText}>Leaving Date: {item.leavingDate}</Text>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setSelectedDetail(item);
                  setUpdatedDetail(item);
                  setModalVisible(true);
                }}
              >
                <Text style={styles.buttonText}>Update</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => handleDelete(item.id)}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {modalVisible && updatedDetail && (
          <Modal
            visible={modalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Update Driver Detail</Text>

                <TextInput
                  style={styles.input}
                  placeholder="Vehicle Number"
                  value={updatedDetail.vehicleNumber}
                  onChangeText={text => setUpdatedDetail({ ...updatedDetail, vehicleNumber: text })}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Partner Name"
                  value={updatedDetail.partnerName}
                  onChangeText={text => setUpdatedDetail({ ...updatedDetail, partnerName: text })}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Vehicle Type"
                  value={updatedDetail.vehicleType}
                  onChangeText={text => setUpdatedDetail({ ...updatedDetail, vehicleType: text })}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Capacity"
                  value={updatedDetail.capacity}
                  onChangeText={text => setUpdatedDetail({ ...updatedDetail, capacity: text })}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Collecting Area"
                  value={updatedDetail.collectingArea}
                  onChangeText={text => setUpdatedDetail({ ...updatedDetail, collectingArea: text })}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Arrival Date"
                  value={updatedDetail.arrivalDate}
                  onChangeText={text => setUpdatedDetail({ ...updatedDetail, arrivalDate: text })}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Leaving Date"
                  value={updatedDetail.leavingDate}
                  onChangeText={text => setUpdatedDetail({ ...updatedDetail, leavingDate: text })}
                />

                <Button title="Save" onPress={handleUpdate} />
                <Button title="Cancel" onPress={() => setModalVisible(false)} />
              </View>
            </View>
          </Modal>
        )}
      </ScrollView>
      <AdminNav />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    padding: 10,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    padding: 8,
    backgroundColor: '#007bff',
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    width: '90%',
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 12,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
    borderRadius: 4,
  },
  title: {
    marginTop: 10,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  }
});

export default UpdateDeleteDD;
