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
import UserDashboard from '../components/dashboard/userdashboard';
// import TeacherDashboard from '../components/dashboard/teacherdashboard';
// import AdminDashboard from '../components/dashboard/admindashboard';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const { server } = require('./config.js');
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Dashboard({ navigation }) {
  const [Msg, setMsg] = useState('');
  const [load, setLoad] = useState(true);
  const [data, setData] = useState({});

  useEffect(() => {
    initial();
  }, []);

  const initial = async () => {
    const token = await AsyncStorage.getItem('token');

    fetch(`${server}/DashboardServer`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
    }).then((res) => {
      // console.log(res.status)
      if (res.status === 200) {
        res.json().then((res) => {
          // console.log(res);
          setData(res);
          setLoad(false);
        });
      } else if (res.status == 403) {
        navigation.push(`LogIn`);
      }
    });
  };

  const type = () => {
    if (data.type == 'User') return <UserDashboard data={data} />;
    // else if (data.type == 'Teacher') return <TeacherDashboard data={data} />;
    // else if (data.type == 'Admin') return <AdminDashboard data={data} />;
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
        {type()}
        {/* <FlatList
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
        /> */}
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
