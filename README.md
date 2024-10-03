
# Smart Waste Management System

This project is a Smart Waste Management System built using **React Native** with **Expo**, integrated with **Firebase** for backend services. It incorporates AI-powered chatbot features and image recognition using **Gemini AI**, with support for Sinhala language. This system provides functionalities for efficient waste collection and management, such as user management, garbage bin location tracking, driver details management, and issue reporting.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [Firebase Setup](#firebase-setup)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Smart Bin Management**: Bins are monitored with real-time fill-level detection.
- **AI Chatbot**: Gemini AI-powered chatbot with Sinhala language support to assist users.
- **Driver Management**: Manage and assign drivers for waste collection.
- **Location Management**: Track and manage garbage bin locations with GPS.
- **Issue Reporting**: Users can submit complaints or issues related to waste collection.
- **User Authentication**: Firebase authentication to manage user accounts.

## Tech Stack

- **React Native** with Expo
- **Firebase** (Authentication, Firestore, Storage)
- **Gemini AI** for chatbot and image recognition
- **Zustand** for state management
- **Node.js** (for any backend services, if applicable)

## Getting Started

To get a local copy up and running, follow these steps.

### Prerequisites

You need to have the following installed on your machine:

- **Node.js**: [Download here](https://nodejs.org/)
- **Expo CLI**: `npm install -g expo-cli`
- **Firebase Account**: [Firebase Console](https://console.firebase.google.com/)

### Installation

1. Clone the repo:
   ```sh
   git clone https://github.com/your-username/smart-waste-system.git

### Navigate to the project directory:

```sh
cd smart-waste-system
```

### Install the dependencies:

```sh
npm install
```

### Usage

Start the Expo server:

```sh
npx expo start
```

Open the Expo Go app on your mobile device and scan the QR code to run the app.

### Firebase Setup

1. Create a new project in [Firebase](https://console.firebase.google.com/).
2. Enable **Firebase Authentication**, **Cloud Firestore**, and **Storage**.
3. Get your Firebase configuration details (API key, Auth domain, etc.) from the Firebase console.
4. Create Firebase_Config.ts File in Your project in the `smart-waste-system/Firebase_Config.ts`
Replace the placeholders with your actual Firebase configuration keys:

```
//Firebase_Config.ts


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {initializeAuth,  getReactNativePersistence} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// Your web app's Firebase configuration
const Firebase_Config = {
    apiKey: "your_api_key",
    authDomain: "your_project_id.firebaseapp.com",
    projectId: "your_project_id",
    storageBucket: "your_project_id.appspot.com",
    messagingSenderId: "your_sender_id",
    appId: "your_app_id"
};


// Initialize Firebase
const FIREBASE_APP = initializeApp(Firebase_Config);
const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
     persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });
const FIREBASE_DB = getFirestore(FIREBASE_APP);


export {FIREBASE_APP,FIREBASE_AUTH,FIREBASE_DB};

```
Save the file, and your Firebase setup is complete!



## License

Distributed under the MIT License. See `LICENSE` for more information.
