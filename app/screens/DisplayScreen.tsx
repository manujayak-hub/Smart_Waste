import React, { useState } from 'react';
import { View, Image, Text, TextInput, ActivityIndicator, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Entypo } from '@expo/vector-icons';

const DisplayScreen = ({ route }) => {
  const [description, setDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState(route.params.imageUri);
  const [prompt, setPrompt] = useState('Identify the garbage type and give tips to dispose them correctly?');
  const [loading, setLoading] = useState(false); 

  const analyzeImage = async (imageUri) => {
    setLoading(true); 
    try {
      const genAI = new GoogleGenerativeAI("AIzaSyBDD4et7jdY027ZMgbDFOjc2XJ-f1GdD3A");
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const response = await fetch(imageUri);
      const blob = await response.blob();

      const reader = new FileReader();
      reader.onloadend = async () => {
        if (typeof reader.result === 'string') {
          const base64Image = reader.result.split(',')[1];

          const fileData = {
            inlineData: {
              data: base64Image,
              mimeType: "image/jpeg",
            },
          };

          const result = await model.generateContent([prompt, fileData]);
          
          
          const formattedDescription = result.response.text().split('\n').map((item) => item.replace(/^\*+\s*/, '')).join('\n');
          setDescription(formattedDescription);
        } else {
          console.error('Failed to convert image to Base64.');
        }
        setLoading(false); 
      };

      reader.readAsDataURL(blob);
    } catch (error) {
      console.error('An error occurred:', error);
      setLoading(false); 
    }
};


  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.innerContainer}>
      <Text style={styles.header}>Smart Waste Analyzer</Text>
        {selectedImage && <Image source={{ uri: selectedImage }} style={styles.image} />}
        {/* <TextInput
          style={styles.input}
          placeholder="Enter your prompt here"
          value={prompt}
          onChangeText={setPrompt}
        /> */}

        <TouchableOpacity style={styles.analyzeButton} onPress={() => analyzeImage(selectedImage)}>
          <Text style={styles.analyzeButtonText}>Analyze Image</Text>
        </TouchableOpacity>

        {loading && <ActivityIndicator size="large" color="#4CAF50" style={styles.spinner} />}
        
        {description && <Text style={styles.description}>{description}</Text>}
      </ScrollView>
      <TouchableOpacity style={styles.selectImageButton} onPress={pickImage}>
        <Entypo name="image" size={35} color="#FFFFFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  innerContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10,
    paddingBottom: 100, 
  },
  header: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 50,
    color: "#333",
  },
  image: {
    width: '100%',
    height: 300, 
    borderRadius: 15,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#4CAF50',
    marginTop:30
  },
  input: {
    height: 40,
    borderColor: '#4CAF50',
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 10,
    paddingHorizontal: 10,
    width: '100%',
    backgroundColor: '#FFFFFF',
  },
  analyzeButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  analyzeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
  },
  spinner: {
    marginVertical: 20,
  },
  description: {
    marginTop: 20,
    fontSize: 18,
    color: '#333',
    textAlign: 'left',
    paddingHorizontal: 20,
  },
  selectImageButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#4CAF50',
    borderRadius: 50,
    padding: 10,
    elevation: 5, 
  },
});

export default DisplayScreen;
