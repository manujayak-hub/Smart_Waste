import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Modal, TextInput, Button, SafeAreaView } from 'react-native';
import { FIREBASE_DB } from '../../../Firebase_Config';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import AdminNav from '../../Components/AdminNav';
import Header from '../../Components/HeaderAdmin';

interface DriverDetail {
  id: string;
  driverName: string;
  vehicleNumber: string;
  partnerName: string;
  vehicleType: string;
  capacity: string;
  collectingArea: string;
  arrivalTime: string;
  leavingTime: string;
  cdate: string;
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
    <SafeAreaView style={{ flex: 1, backgroundColor: '#E8F5E9' }}>
      <Header />
      <View>
        <Text style={styles.title}>Change Record</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContainer} showsVerticalScrollIndicator={false}>
        {driverDetails.map((item) => (
          <View key={item.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardDate}>{new Date(item.cdate).toLocaleDateString()}</Text>
            </View>
            <Text style={styles.cardTitle}>{item.vehicleNumber}</Text>
            <Text style={styles.cardText}>Driver Name: {item.driverName}</Text>
            <Text style={styles.cardText}>Partner Name: {item.partnerName}</Text>
            <Text style={styles.cardText}>Vehicle Type: {item.vehicleType}</Text>
            <Text style={styles.cardText}>Capacity: {item.capacity}</Text>
            <Text style={styles.cardText}>Collecting Area: {item.collectingArea}</Text>
            <Text style={styles.cardText}>Arrival Date: {item.arrivalTime}</Text>
            <Text style={styles.cardText}>Leaving Date: {item.leavingTime}</Text>

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
              <TouchableOpacity style={styles.buttonDelete} onPress={() => handleDelete(item.id)}>
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

                <Text style={styles.modalCdate}>Created Date: {new Date(updatedDetail.cdate).toLocaleDateString()}</Text>

                <TextInput
                  style={styles.input}
                  placeholder="Vehicle Number"
                  value={updatedDetail.vehicleNumber}
                  onChangeText={text => setUpdatedDetail({ ...updatedDetail, vehicleNumber: text })}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Driver Name"
                  value={updatedDetail.driverName}
                  onChangeText={text => setUpdatedDetail({ ...updatedDetail, driverName: text })}
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
                  placeholder="Capacity (in Tons)"
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
                  value={updatedDetail.arrivalTime}
                  onChangeText={text => setUpdatedDetail({ ...updatedDetail, arrivalTime: text })}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Leaving Date"
                  value={updatedDetail.leavingTime}
                  onChangeText={text => setUpdatedDetail({ ...updatedDetail, leavingTime: text })}
                />

                <View style={styles.modalButtonContainer}>
                  <TouchableOpacity style={styles.modalButton} onPress={handleUpdate}>
                    <Text style={styles.buttonText}>Save</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.modalButtonCancel} onPress={() => setModalVisible(false)}>
                    <Text style={styles.buttonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
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
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  cardDate: {
    fontSize: 14,
    color: '#555',
    textAlign: 'right',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  cardText: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    padding: 8,
    backgroundColor: '#89F28D',
    borderRadius: 4,
    flex: 1,
    marginRight: 5,
  },
  buttonDelete: {
    padding: 8,
    backgroundColor: '#ff4d4d',
    borderRadius: 4,
    flex: 1,
    marginLeft: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
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
    textAlign: 'center',
  },
  modalCdate: {
    fontSize: 14,
    color: '#555',
    marginBottom: 12,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
    borderRadius: 4,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  modalButton: {
    padding: 10,
    backgroundColor: '#89F28D',
    borderRadius: 4,
    flex: 1,
    marginRight: 5,
  },
  modalButtonCancel: {
    padding: 10,
    backgroundColor: '#ff4d4d',
    borderRadius: 4,
    flex: 1,
    marginLeft: 5,
  },
  title: {
    marginTop: 10,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#181818',
    textAlign: 'center',
  }
});

export default UpdateDeleteDD;
