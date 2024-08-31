import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, TextInput, Button, Alert } from 'react-native';
import { FIREBASE_DB } from '../../../Firebase_Config';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import CustomerNav from '../../Components/CustomerNav';

interface Complaint {
  id: string;
  fullName: string;
  complaintType: string;
  missedPickupDate: string;
  garbageType: string;
  garbageLocation: string;
  additionalDetails: string;
  status?: string;
}

const UpdateDeleteComplaint: React.FC = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [updatedComplaint, setUpdatedComplaint] = useState<Complaint | null>(null);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const querySnapshot = await getDocs(collection(FIREBASE_DB, 'Complaints'));
        const complaintsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Complaint[];
        setComplaints(complaintsData);
      } catch (error) {
        console.error('Error fetching complaints: ', error);
      }
    };

    fetchComplaints();
  }, []);

  const handleUpdate = async () => {
    if (updatedComplaint && selectedComplaint) {
      const { id } = selectedComplaint;
      const { fullName, additionalDetails } = updatedComplaint;
      try {
        const complaintDoc = doc(FIREBASE_DB, 'Complaints', id);
        await updateDoc(complaintDoc, { fullName, additionalDetails });
        setComplaints(prevComplaints => prevComplaints.map(complaint => 
          complaint.id === id ? { ...complaint, fullName, additionalDetails } : complaint
        ));
        setModalVisible(false);
        Alert.alert('Success', 'Complaint updated successfully!');
      } catch (error) {
        console.error('Error updating complaint: ', error);
      }
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(FIREBASE_DB, 'Complaints', id));
      setComplaints(prevComplaints => prevComplaints.filter(complaint => complaint.id !== id));
      Alert.alert('Success', 'Complaint deleted successfully!');
    } catch (error) {
      console.error('Error deleting complaint: ', error);
    }
  };

  const renderItem = ({ item }: { item: Complaint }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>Full Name: {item.fullName}</Text>
      <Text style={styles.itemText}>Complaint Type: {item.complaintType}</Text>
      <Text style={styles.itemText}>Missed Pickup Date: {item.missedPickupDate}</Text>
      <Text style={styles.itemText}>Garbage Type: {item.garbageType}</Text>
      <Text style={styles.itemText}>Garbage Location: {item.garbageLocation}</Text>
      <Text style={styles.itemText}>Additional Details: {item.additionalDetails}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setSelectedComplaint(item);
            setUpdatedComplaint(item);
            setModalVisible(true);
          }}
        >
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={() => handleDelete(item.id)}>
          <Text style={styles.buttonText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.listContainer}>
      <FlatList
        data={complaints}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />

      {modalVisible && updatedComplaint && (
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Update Complaint</Text>

              <TextInput
                style={styles.input}
                placeholder="Full Name"
                value={updatedComplaint.fullName}
                onChangeText={text => setUpdatedComplaint({ ...updatedComplaint, fullName: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Additional Details"
                value={updatedComplaint.additionalDetails}
                onChangeText={text => setUpdatedComplaint({ ...updatedComplaint, additionalDetails: text })}
              />

              <View style={styles.modalButtonsContainer}>
                <Button title="Save" onPress={handleUpdate} color="#007bff" />
                <Button title="Cancel" onPress={() => setModalVisible(false)} color="#dc3545" />
              </View>
            </View>
          </View>
        </Modal>
      )}
      <CustomerNav />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    backgroundColor: '#E8F5E9',
    padding: 0,
    marginTop: 20,
  },
  itemContainer: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginHorizontal: 16,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 6,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  button: {
    padding: 12,
    backgroundColor: '#007bff',
    borderRadius: 6,
    flex: 1,
    marginHorizontal: 6,
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 12,
    width: '90%',
    maxWidth: 500,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#007bff',
  },
  input: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 12,
    borderRadius: 8,
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
});

export default UpdateDeleteComplaint;
