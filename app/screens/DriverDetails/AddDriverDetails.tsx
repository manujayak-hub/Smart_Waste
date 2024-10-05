import React, { useState } from "react";
import {
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  View,
  TouchableOpacity,
} from "react-native";
import { FIREBASE_DB } from "../../../Firebase_Config";
import { addDoc, collection } from "firebase/firestore";
import AdminNav from "../../Components/AdminNav";
import Header from "../../Components/HeaderAdmin";

import { TimerPickerModal } from "react-native-timer-picker";

const AddDriverDetails = () => {
  const [driverName, setDriverName] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [partnerName, setPartnerName] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [capacity, setCapacity] = useState("");
  const [collectingArea, setCollectingArea] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [leavingTime, setLeavingTime] = useState("");
  const [cdate, setcdate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [activePicker, setActivePicker] = useState("");

  const formatTime = ({ hours, minutes }: { hours: number; minutes: number }) => {
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12; 
    const formattedMinutes = minutes.toString().padStart(2, "0");
    return `${formattedHours}:${formattedMinutes} ${period}`;
  };

  const handleAddItem = async () => {
    // Basic validation regex
    const namePattern = /^[a-zA-Z\s]+$/;  // Only letters and spaces
    
    if (!driverName.trim() || !namePattern.test(driverName)) {
      alert("Please enter a valid driver name (letters only).");
      return;
    }
    if (!vehicleNumber.trim() ) {
      alert("Please enter a valid vehicle number (up to 9 alphanumeric characters).");
      return;
    }
    if (!partnerName.trim() || !namePattern.test(partnerName)) {
      alert("Please enter a valid partner name (letters only).");
      return;
    }
    if (!vehicleType.trim()) {
      alert("Please enter the vehicle type.");
      return;
    }
    if (!capacity.trim() || isNaN(Number(capacity)) || Number(capacity) <= 0 || Number(capacity) > 99) {
      alert("Please enter a valid capacity (1-99 tons).");
      return;
    }
    if (!collectingArea.trim()) {
      alert("Please enter the collecting area.");
      return;
    }
    if (!arrivalTime.trim()) {
      alert("Please set the arrival time.");
      return;
    }
    if (!leavingTime.trim()) {
      alert("Please set the leaving time.");
      return;
    }
  
    // If all validations pass, proceed with adding the record
    try {
      await addDoc(collection(FIREBASE_DB, "DriverDetails"), {
        driverName,
        vehicleNumber,
        partnerName,
        vehicleType,
        capacity,
        collectingArea,
        arrivalTime: arrivalTime.toString(),
        leavingTime: leavingTime.toString(),
        cdate: cdate.toISOString(), // Store date in ISO format
      });
  
      // Clear fields after successful submission
      setDriverName("");
      setVehicleNumber("");
      setPartnerName("");
      setVehicleType("");
      setCapacity("");
      setCollectingArea("");
      setArrivalTime("");
      setLeavingTime("");
      alert("Record added successfully");
    } catch (error) {
      console.error("Error adding record: ", error);
      alert("Failed to add record");
    }
  };
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#E8F5E9" }}>
      <Header />
      <View>
        <Text style={styles.title}>Add New Record</Text>
      </View>
      <ScrollView style={{ flex: 1, margin: 10 }}  contentContainerStyle={styles.container}  showsVerticalScrollIndicator={false}>
        <Text style={styles.formtitle}>
          Current Date: {cdate.toLocaleDateString()}
        </Text>
        <Text style={styles.formtitle}>Driver Name</Text>
        
        <TextInput
          value={driverName}
          onChangeText={setDriverName}
          style={styles.input}
          inputMode="text"
        />
        <Text style={styles.formtitle}>Partner Name</Text>
        <TextInput
          value={partnerName}
          onChangeText={setPartnerName}
          style={styles.input}
          inputMode="text"
        />
        <Text style={styles.formtitle}>Vehicle Number</Text>
        <TextInput
          value={vehicleNumber}
          onChangeText={setVehicleNumber}
          style={styles.input}
          maxLength={9}
        />
        <Text style={styles.formtitle}>Vehicle Type</Text>
        <TextInput
          value={vehicleType}
          onChangeText={setVehicleType}
          style={styles.input}
          inputMode="text"
        />
        <Text style={styles.formtitle}>Capacity of Vehicle in Tons</Text>
        <TextInput
          value={capacity}
          onChangeText={setCapacity}
          style={styles.input}
          maxLength={2}
          inputMode="numeric"
        />
        <Text style={styles.formtitle}>Area of Collecting Access</Text>
        <TextInput
          value={collectingArea}
          onChangeText={setCollectingArea}
          style={styles.input}
          inputMode="text"
        />
        <Text style={styles.formtitle}>Leaving Time</Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            setActivePicker("leaving");
            setShowPicker(true);
          }}
        >
          <Text style={styles.timeText}>
            {leavingTime ? leavingTime : "Set Leaving Time"}
          </Text>
        </TouchableOpacity>
        
        <Text style={styles.formtitle}>Arrival Time</Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            setActivePicker("arrival");
            setShowPicker(true);
          }}
        >
          <Text style={styles.timeText}>
            {arrivalTime ? arrivalTime : "Set Arrival Time"}
          </Text>
        </TouchableOpacity>

        <TimerPickerModal
          visible={showPicker}
          setIsVisible={setShowPicker}
          onConfirm={(pickedTime) => {
            const formattedTime = formatTime(pickedTime);
            if (activePicker === "arrival") {
              setArrivalTime(formattedTime);
            } else if (activePicker === "leaving") {
              setLeavingTime(formattedTime);
            }
            setShowPicker(false);
          }}
          modalTitle="Set Time"
          onCancel={() => setShowPicker(false)}
          closeOnOverlayPress
          use12HourPicker
        />
        
        <TouchableOpacity style={styles.button} onPress={handleAddItem}>
          <Text style={styles.buttonText}>Add Record</Text>
        </TouchableOpacity>
      </ScrollView>
      <AdminNav />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ffffff",
    padding: 8,
    marginBottom: 16,
  },
  timeText: {
    padding: 8,
    fontSize: 18,
    color: "#181818",
    backgroundColor: "#f0f0f0",
    textAlign: "center",
    borderRadius: 5,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#181818",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 20,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  title: {
    marginTop: 10,
    fontSize: 30,
    fontWeight: "bold",
    color: "#181818",
    textAlign: "center",
  },
  formtitle: {
    fontSize: 14,
    color: "#181818",
    textAlign: "left",
    fontWeight: "bold",
  },
});

export default AddDriverDetails;
