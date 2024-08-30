import React, { useState } from 'react';
import { View, Image, TextInput, ActivityIndicator, Button, StyleSheet, Alert, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../../Firebase_Config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { FIREBASE_DB } from '../../Firebase_Config';

const hero = require('../../assets/homeHero.jpg');

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation:any = useNavigation();

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
      const user = response.user;
      const userDoc = await getDoc(doc(FIREBASE_DB, 'users', user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (userData.type === 'Admin') {

            Alert.alert('Hello Admin');

            navigation.navigate('HomeDD', { user: userData });
        } else {

            Alert.alert('Hello Customer');
            navigation.navigate('CustomerHome', { user: userData });

        }
      } else {
        Alert.alert('Error', 'No user data found');
      }
    } catch (error:any) {
      Alert.alert('Sign in failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.header}>Smart Waste</Text>
      <Image source={hero} style={styles.topImage} />
      <TextInput 
        value={email} 
        placeholder="Email" 
        autoCapitalize='none' 
        onChangeText={setEmail} 
        style={styles.input} 
      />
      <TextInput 
        value={password} 
        secureTextEntry 
        placeholder="Password" 
        autoCapitalize='none' 
        onChangeText={setPassword} 
        style={styles.input} 
      />
      {loading ? (
        <ActivityIndicator size="large" color="#4CAF50" style={styles.loader} />
      ) : (
        <>
          <TouchableOpacity style={styles.button} onPress={signIn}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, styles.signupButton]} 
            onPress={() => navigation.navigate('SignUpScreen')}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    marginBottom: 15,
    padding: 10,
    borderColor: '#4CAF50',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#ffffff',
    fontSize: 16,
  },
  loader: {
    marginVertical: 20,
  },
  button: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 5,
    backgroundColor: '#4CAF50',
    marginBottom: 15,
    alignItems: 'center',
  },
  signupButton: {
    backgroundColor: '#FF5722',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  topImage: {
    width: '100%',
    height: 300,
    borderRadius: 15,
    marginBottom: 20,
  },
});

export default LoginScreen;
