
import React from 'react'
import { StatusBar ,Image,View ,Text} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'



const HeaderAdmin :React.FC = () => {
  return (
  
  <SafeAreaView >
    <View style={{padding:5 ,backgroundColor:'#F96D2B'}}>
    <Text style={{fontSize:20, color:'#ffffff'}}>Admin DashBoard</Text>
    <StatusBar backgroundColor="#F96D2B" barStyle="light-content" />
    
      
    </View>
    
  </SafeAreaView>
  
  )
}


export default HeaderAdmin

