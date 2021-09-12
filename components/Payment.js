import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import {
  ActivityIndicator,
  Colors,
  TextInput,
  Button,
  Divider,
} from 'react-native-paper';
import * as WebBrowser from 'expo-web-browser';
import Constants from 'expo-constants';
import * as Linking from 'expo-linking';
const { manifest } = Constants;
import AutoHeightWebView from 'react-native-autoheight-webview';
const { server } = require('./config.js');

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function LogIn({ route }) {
  // var server = 'http://localhost:8080'
  // if (Platform.OS === 'web') {
  //   server = 'http://localhost:8080';
  // } else {
  //   server = `http://${manifest.debuggerHost.split(':').shift()}:8080`;
  // }
  const [Name, setName] = useState('');
  const [Password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  //   console.log(server + '/paymentredirect' + route.params.testid);

  return (
    <View style={styles.container}>
      <AutoHeightWebView
        originWhitelist={['*']}
        source={{
          uri: server + '/paymentredirect/' + route.params.testid,
          //   baseUrl: server,
        }}
        scalesPageToFit={false}
      />
      {/* <Text>ABCD</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height,
    width,
  },
});
