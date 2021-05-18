import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ActivityIndicator, Colors,TextInput,Button, Divider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LogIn from './components/LogIn';
import Dashboard from './components/Dashboard';
import SignUp from './components/SignUp';
import Test from './components/Test';
import Result from './components/Result';
import DrawerCom from './components/DrawerCom';

import { Provider as StoreProvider } from 'react-redux'
import store from './redux/store'


// import { WebView } from 'react-native-webview';
{/* <WebView originWhitelist={['*']} source={{ html: movie.overview,baseUrl:uri }} scalesPageToFit={false} /> */}


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {


  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LogIn" component={LogIn} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="DrawerNav" component={DrawerNav} />
        <Stack.Screen name="Result" component={Result} />
      </Stack.Navigator>

    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  
});

const DrawerNav = ({route})=>{
  // const { id } = route.params;
  // console.log(id)




  return (
    <StoreProvider store={store} >
      <Drawer.Navigator drawerContent={(props) => <DrawerCom {...props} />}>
        <Drawer.Screen name="Test" component={Test}  />
      </Drawer.Navigator>
    </StoreProvider>

  )
}
