import React, { useState } from 'react';
import { View, Alert, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../Firebase_Config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const SignUpScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [userType, setUserType] = useState('Customer');
  const navigation:any = useNavigation();

  const handleSignUp = async () => {
    if (!email || !password || !name || !mobile) {
      Alert.alert('Error', 'All fields are required!');
      return;
    }
    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
      const user = userCredential.user;

      // Save additional user information to Firestore
      await setDoc(doc(FIREBASE_DB, 'users', user.uid), {
        name,
        mobile,
        email,
        type: userType,
      });

      // Clear form fields
      setName('');
      setMobile('');
      setEmail('');
      setPassword('');
      setUserType('Customer');

      // Display success alert
      Alert.alert('Success', 'Account created successfully!', [{ text: 'OK', onPress: () => navigation.navigate('LogIn') }]);
    } catch (error:any) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Smart Waste</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Mobile"
        keyboardType="phone-pad"
        value={mobile}
        onChangeText={setMobile}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Text style={styles.label}>Select User Type:</Text>
      <View style={styles.radioGroup}>
        <TouchableOpacity style={styles.radioButton} onPress={() => setUserType('Customer')}>
          <Text style={userType === 'Customer' ? styles.radioButtonTextSelected : styles.radioButtonText}>Customer</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.radioButton} onPress={() => setUserType('Admin')}>
          <Text style={userType === 'Admin' ? styles.radioButtonTextSelected : styles.radioButtonText}>Admin</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginRedirect} onPress={() => navigation.navigate('LogIn')}>
        <Text style={styles.loginText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#E8F5E9',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 40,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#4CAF50',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#ffffff',
    fontSize: 16,
  },
  label: {
    marginVertical: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  radioButton: {
    padding: 10,
  },
  radioButtonText: {
    fontSize: 16,
    color: '#4CAF50',
  },
  radioButtonTextSelected: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007BFF',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginRedirect: {
    marginTop: 20,
    alignItems: 'center',
  },
  loginText: {
    fontSize: 16,
    color: '#007BFF',
  },
});

export default SignUpScreen;
