import React, { useEffect, useRef, useState } from 'react'
import { Camera, CameraView, CameraType, FlashMode } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { View } from 'react-native';
import { StyleSheet, Image } from 'react-native';
import Button from '../Components/Button';
import { ThemedText } from '../Components/ThemedText';


export default function CameradScreen() {
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [image, setImage] = useState(null);
    const [facing, setFacing] = useState<CameraType>('back');
    const [flash, setFlash] = useState<FlashMode>('off');
    const cameraRef = useRef(null);
 
    useEffect(() =>{
      (async () =>{
        MediaLibrary.requestPermissionsAsync();
        const cameraStatus = await Camera.requestCameraPermissionsAsync();
        setHasCameraPermission(cameraStatus.status === 'granted');
      })();
    }, [])

    const takePicture = async () =>{
      if(cameraRef) {
        try{
          const data = await cameraRef.current.takePictureAsync();
          console.log(data);
          setImage(data.uri);
        }catch(e){
          console.log(e);
        }
      }
    }

    const saveImage = async () => {
      if(image) {
        try{
          await MediaLibrary.createAssetAsync(image);
          alert('Picture save! 🎉')
          setImage(null);
        }catch(e){
          console.log(e)
        }
      }
    }

    function toggleCameraFacing() {
      setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    function toggleCameraFlash() {
      setFlash(current => (current === 'off' ? 'on' : 'off'));
    }

    

    if(hasCameraPermission === false) {
      return <ThemedText>No access to camera</ThemedText>
    }

  return (
    <View style={styles.container}>
      {!image ?
      <CameraView 
        style={styles.camera}
        facing={facing}
        flash={flash}
        ref={cameraRef}        
        >

          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 30,
          }}>
            
            <Button icon={'retweet'} title={undefined} onPress={toggleCameraFacing} color={undefined}/>
            <Button icon={'flash'} title={undefined} onPress={toggleCameraFlash} color={undefined}/>
          </View>

          

      </CameraView>
      :
      <Image source={{uri: image}} style={styles.camera}/>
      } 
      <View>
        {image ?
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 0.5,
        }}>
          <Button title={"Re-take"} icon="retweet" onPress={() => setImage(null)} color={undefined}/>
          <Button title={"Save"} icon="check" onPress={saveImage} color={flash === 'off' ? 'gray' : '#f1f1f1'}/>
        </View>
        :
        <Button title={'Take a picture'} icon="camera" onPress={takePicture} color={undefined}/>
}
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 90,
    
  },
  camera:{
    paddingTop: 25,
    height: '100%',
    width: '100%',
  },
})
