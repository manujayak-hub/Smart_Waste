import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert, StyleSheet } from 'react-native';
import { FIREBASE_DB } from '../../../Firebase_Config';
import { collection, query, onSnapshot, updateDoc, doc } from 'firebase/firestore';

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

const AdminSideComplaint: React.FC = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);

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

  const handleStatusChange = async (id: string) => {
    try {
      const complaintDocRef = doc(FIREBASE_DB, 'Complaints', id);
      await updateDoc(complaintDocRef, { status: 'Resolved' });
      Alert.alert('Success', 'Complaint status updated to Resolved');
    } catch (error) {
      console.error('Error updating complaint status: ', error);
      Alert.alert('Error', 'Failed to update complaint status');
    }
  };

  const renderComplaintItem = ({ item }: { item: Complaint }) => (
    <View style={styles.complaintItem}>
      <Text style={styles.label}>Full Name: <Text style={styles.value}>{item.fullName}</Text></Text>
      <Text style={styles.label}>Complaint Type: <Text style={styles.value}>{item.complaintType}</Text></Text>
      <Text style={styles.label}>Missed Pickup Date: <Text style={styles.value}>{item.missedPickupDate}</Text></Text>
      <Text style={styles.label}>Type of Garbage: <Text style={styles.value}>{item.garbageType}</Text></Text>
      <Text style={styles.label}>Garbage Location: <Text style={styles.value}>{item.garbageLocation}</Text></Text>
      <Text style={styles.label}>Additional Details: <Text style={styles.value}>{item.additionalDetails}</Text></Text>
      <Text style={styles.label}>Status: <Text style={styles.value}>{item.status}</Text></Text>

      {item.status === 'Pending' && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleStatusChange(item.id)}
        >
          <Text style={styles.buttonText}>Mark as Resolved</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={complaints}
        renderItem={renderComplaintItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F3F4F6', // Light background color
  },
  listContainer: {
    paddingBottom: 20,
  },
  complaintItem: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
    color: '#333',
  },
  value: {
    fontWeight: 'normal',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AdminSideComplaint;
