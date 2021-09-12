import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  FlatList,
} from 'react-native';
import {
  ActivityIndicator,
  Colors,
  TextInput,
  Button,
  Divider,
} from 'react-native-paper';
import Banner from './Banner';
import Data from './Data';

import * as WebBrowser from 'expo-web-browser';
import Constants from 'expo-constants';
const { manifest } = Constants;

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

var confont = 12;
const { server } = require('../config.js');

export default function TestCard({ route, navigation }) {
  // if (Platform.OS === 'web') {
  //   server = 'http://localhost:8080';
  // } else {
  //   server = `http://${manifest.debuggerHost.split(':').shift()}:8080`;
  // }

  const [data, setData] = useState([]);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    initial();
  }, []);
  const { id } = route.params.params;

  const initial = () => {
    // console.log('aa');
    setLoad(true);
    fetch(`${server}/DigitalServer/details/${id}`, { method: 'GET' }).then(
      (res) => {
        // console.log(res.status)
        if (res.status === 200) {
          res.json().then((res) => {
            setData(res.routes);
            // console.log(res.routes);
            setLoad(false);
            // setTests(res.tests);
            // setStatus(true);
          });
        }
        //  else if (res.status == 403) setStatus(false);
        else if (res.status == 404) navigation.navigate('404');
      }
    );
  };

  // console.log(data);
  return load ? (
    <View>
      <Text>Digital Product</Text>
    </View>
  ) : (
    <ScrollView style={classes.main}>
      {/* <Header /> */}
      <Banner data={data} />
      {/* <Card /> */}
      <Data {...{ data, navigation, route }} />
    </ScrollView>
  );
}

const classes = StyleSheet.create({
  main: {
    width: width,
    // padding: 10,
    // display: 'flex',
    // flexDirection: 'column',
    height,
    // backgroundColor: 'red',
    // boxShadow: '10px 10px 30px silver',
  },
  heading: {
    // padding: 10,
  },
  headtext: {
    fontWeight: 'bold',
    fontSize: 20,
  },
});
