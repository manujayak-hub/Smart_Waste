import React, { useEffect } from 'react';
import {  View, Text, TouchableOpacity, StatusBar, StyleSheet  } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../Firebase_Config';
import { doc, getDoc } from "firebase/firestore";
import { useNavigation, StackActions } from '@react-navigation/native';
import userStore from '../Store/userStore'

const HeaderCustomer: React.FC = () => {
  const user = FIREBASE_AUTH.currentUser;
  const navigation = useNavigation();
  const { user: storedUser, setUser, clearUser } = userStore(); // Zustand functions

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          const refDoc = doc(FIREBASE_DB, 'users', user.uid);
          const userDoc = await getDoc(refDoc);
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUser({
              name: userData.name,
              email: user.email,
              uid: ''
            });
          } else {
            console.log('No document found');
          }
        } catch (error) {
          console.error('Error fetching user details: ', error);
        }
      }
    };

    fetchUserData();
  }, [user]);

  const logout = () => {
    FIREBASE_AUTH.signOut()
      .then(() => {
        clearUser(); // Clear the user data on logout
        navigation.dispatch(StackActions.replace('Signinscreen'));
      })
      .catch((error) => {
        console.error('Error during sign out: ', error);
      });
  };

  return (
    <SafeAreaView>
      <View style={styles.headerContainer}>
        <Text style={styles.adminText}>{'Hello ' + (storedUser?.name || '')}</Text>
        <StatusBar backgroundColor="#38E079" barStyle="light-content" />
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    padding: 20,
    backgroundColor: '#38E079',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  adminText: {
    fontSize: 14,
    color: '#ffffff',
  },
  logoutButton: {
    marginRight: 10,
    padding: 5,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
  },
  logoutText: {
    fontSize: 8,
    color: '#ffffff',
  },
});

export default HeaderCustomer;
