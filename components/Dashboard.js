import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ActivityIndicator, Colors,TextInput,Button, Divider } from 'react-native-paper';
import * as WebBrowser from 'expo-web-browser';
export default function Dashboard({navigation}) {

  var uri = 'http://localhost:8080'
  const [Msg,setMsg] = useState('');



  const pay=()=>{
    WebBrowser.openBrowserAsync(`${uri}/dashboard`)
  }

  return (
    <View style={styles.container}>
      <Text>
          Dashboard
      </Text>
      <Text  style={styles.msg} >
        {Msg}
      </Text>
      <Text onPress={()=>{
        navigation.replace('DrawerNav',{screen:'Test',params:{id:'608470b2649f1c577703ea58'}})
      }} >
          Test Link
      </Text>
      <Button  variant="contained" type="submit" style={{}} onPress={pay} style={styles.submit}>Pay</Button>
    </View>

  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
