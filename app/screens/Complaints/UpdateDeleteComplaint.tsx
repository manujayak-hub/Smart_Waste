import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, TextInput, Button, Alert } from 'react-native';
import { FIREBASE_DB } from '../../../Firebase_Config';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';

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
    if (updatedComplaint) {
      const { id, ...rest } = updatedComplaint;
      try {
        const complaintDoc = doc(FIREBASE_DB, 'Complaints', id);
        await updateDoc(complaintDoc, rest);
        setComplaints(prevComplaints => prevComplaints.map(complaint => complaint.id === id ? updatedComplaint : complaint));
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
                placeholder="Complaint Type"
                value={updatedComplaint.complaintType}
                onChangeText={text => setUpdatedComplaint({ ...updatedComplaint, complaintType: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Missed Pickup Date"
                value={updatedComplaint.missedPickupDate}
                onChangeText={text => setUpdatedComplaint({ ...updatedComplaint, missedPickupDate: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Garbage Type"
                value={updatedComplaint.garbageType}
                onChangeText={text => setUpdatedComplaint({ ...updatedComplaint, garbageType: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Garbage Location"
                value={updatedComplaint.garbageLocation}
                onChangeText={text => setUpdatedComplaint({ ...updatedComplaint, garbageLocation: text })}
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
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    backgroundColor: '#89F28D',
   
    padding: 16,
  },
  itemContainer: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  button: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 4,
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
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
    maxWidth: 500,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#007bff',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
    borderRadius: 4,
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default UpdateDeleteComplaint;
