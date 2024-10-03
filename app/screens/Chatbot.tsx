import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Google Generative AI SDK
const API_KEY = "AIzaSyC8UJ_hH8QG_roMf9_DmCD2TQDzb2VXGd4";
const genAI = new GoogleGenerativeAI(API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction:
    "You are Smart Waste , a friendly assistant who works Smart waste. Smart waste is a mobile app that helps to manage day to day garbage collection system. Your job is to answer the user questions related on garbage collection and garbage disposals and garbage recycling tips and just a quick answer to waste-related questions techniques. When user send any other question without garbage collection, garbage disposal, or garbage recycling say user to Sorry Kindly please ask garbage disposal, collection or recycle related questions. when some one type in sinhala and ask instruction give them instruction using sinhala language use this dictionary link to translate english word to sinhala when you give instruction in sinhala language https://www.maduraonline.com/ . Use this links to get instruction about waste dispose ,recycling and collections https://www.mwatoday.com/waste-recycling/  ,   https://www.property.nhs.uk/news/blogs/how-to-dispose-of-waste-correctly/, https://www.epa.gov/recycle/how-do-i-recycle-common-recyclables. ",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export default function App() {
  const [messages, setMessages] = useState([]); 
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleMessageSend = async () => {
    if (userInput.trim() === "") return;


    setMessages((prevMessages) => [...prevMessages, { text: userInput, role: "user" }]);

    setLoading(true);
    try {
      const chatSession = model.startChat({
        generationConfig,
        history: [...messages, { text: userInput, role: "user" }].map((msg) => ({
          role: msg.role,
          parts: [{ text: msg.text }],
        })),
      });

      const response = await chatSession.sendMessage(userInput);
      const botResponse = response.response.text();

    
      setMessages((prevMessages) => [...prevMessages, { text: botResponse, role: "model" }]);
    } catch (error) {
      console.error("Error during chat:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Something went wrong. Please try again.", role: "model" },
      ]);
    } finally {
        setLoading(false);

    }


    setUserInput("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Smart Waste Chatbot</Text>

      <ScrollView style={styles.chatContainer}>
        {messages.map((message, index) => (
          <View key={index} style={message.role === "user" ? styles.userMessage : styles.botMessage}>
            <Text>{message.text}</Text>
          </View>
        ))}
        {loading && (
          <ActivityIndicator size="large" color="#4CAF50" style={styles.spinner} />
        )}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={userInput}
          onChangeText={setUserInput}
          placeholder="Type your message..."
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleMessageSend}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#edf0ee", 
  },
  header: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 50,
    color: "#333",
  },
  chatContainer: {
    flex: 1,
    padding: 14,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#edf0ee", 
    borderTopWidth: 1,
    borderColor: "#ddd",
    paddingBottom: 15,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff", 
    padding: 10,
    borderRadius: 25, 
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#4CAF50", 
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25, 
    justifyContent: "center",
  },
  sendButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#dcf8c6",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  botMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#f1f1f1",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  spinner: {
    marginTop: 10, 
  },
});
