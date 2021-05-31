import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import {
  ActivityIndicator,
  Colors,
  TextInput,
  Button,
  Divider,
} from 'react-native-paper';
import * as WebBrowser from 'expo-web-browser';
import Constants from 'expo-constants';
const { manifest } = Constants;
import TestCard from './TestCard';
import { FlatList } from 'react-native-gesture-handler';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function Dashboard({ navigation }) {
  // var server = 'http://localhost:8080'
  if (Platform.OS === 'web') {
    server = 'http://localhost:8080';
  } else {
    server = `http://${manifest.debuggerHost.split(':').shift()}:8080`;
  }
  const [Msg, setMsg] = useState('');
  const [load, setLoad] = useState(true);
  const [tests, setTests] = useState([]);

  useEffect(() => {
    initial();
  }, []);

  const initial = () => {
    fetch(`${server}/DashboardServer`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      // console.log(res.status)
      if (res.status === 200) {
        res.json().then((res) => {
          setTests(res.tests);
          setLoad(false);
        });
      }
    });
  };

  return load ? (
    <View>
      <Text>Loading...</Text>
    </View>
  ) : (
    <View style={classes.container}>
      <View style={classes.main}>
        {/* <View>
          <Text>Dashboard</Text>
        </View> */}
        <FlatList
          style={{
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'wrap',
            // backgroundColor: 'red',
            // alignItems: 'center',
            // justifyContent: 'center',
          }}
          data={tests}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <TestCard {...{ item, navigation }} />}
        />
      </View>
    </View>
  );
}

const classes = StyleSheet.create({
  msg: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 15,
  },
  header: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 10,
  },
  fb: {
    backgroundColor: '#1A538A',
    width: 250,
    color: 'white',
    marginBottom: 5,
  },
  google: {
    backgroundColor: '#fff',
    width: 250,
    color: 'black',
  },
  submit: {
    backgroundColor: '#A436F1',
    width: 250,
    color: 'black',
    marginTop: 20,
  },
  btnbox: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 20,
    marginBottom: 10,
  },
  main: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    // backgroundColor: 'blue',
    alignItems: 'center',
  },
});
