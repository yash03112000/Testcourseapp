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
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Ionicons, Entypo, AntDesign } from 'react-native-vector-icons';

import * as WebBrowser from 'expo-web-browser';
import Constants from 'expo-constants';
const { manifest } = Constants;

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

var confont = 12;

export default function TestCard({ data }) {
  if (Platform.OS === 'web') {
    server = 'http://localhost:8080';
  } else {
    server = `http://${manifest.debuggerHost.split(':').shift()}:8080`;
  }

  const [load, setLoad] = useState(false);

  // console.log(data);
  return load ? (
    <View>
      <Text>Course</Text>
    </View>
  ) : (
    <View style={classes.main}>
      <View style={classes.top}>
        <View>
          <Text
            component="h1"
            color="primary"
            variant="subtitle1"
            gutterBottom
            style={classes.head}
          >
            About The Instructor
          </Text>
        </View>
      </View>
      <View style={classes.bottom}>
        <View style={classes.left}>
          <View style={classes.logodiv}>
            <Image
              source={require('../../assets/malefig.jpg')}
              style={classes.logo}
            />
          </View>
          <View style={classes.row}>
            <Ionicons name="chatbox-outline" size={20} />
            <Text
              component="h1"
              color="primary"
              variant="subtitle1"
              gutterBottom
              style={classes.text}
            >
              0 reviews
            </Text>
          </View>
          <View style={classes.row}>
            <Entypo name="user" size={20} />
            <Text
              component="h1"
              color="primary"
              variant="subtitle1"
              gutterBottom
              style={classes.text}
            >
              4 Students
            </Text>
          </View>
          <View style={classes.row}>
            <AntDesign name="play" size={20} />
            <Text
              component="h1"
              color="primary"
              variant="subtitle1"
              gutterBottom
              style={classes.text}
            >
              1 Courses
            </Text>
          </View>
        </View>

        <View style={classes.right}>
          <View>
            <Text
              component="h1"
              color="primary"
              variant="subtitle1"
              gutterBottom
              style={classes.text}
            >
              Vipin Kumar
            </Text>
          </View>
          <View>
            <Text
              component="h1"
              color="primary"
              variant="subtitle1"
              gutterBottom
              style={classes.text}
            >
              Rest
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const classes = StyleSheet.create({
  main: {
    display: 'flex',
    flexDirection: 'column',
    width: '90%',
    // backgroundColor: 'purple',
    margin: 10,
    padding: 10,
    // border: '0.2px solid rgba(0,0,0,0.2)',
    borderRadius: 5,
  },
  head: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 5,
  },
  top: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    color: 'black',
    padding: 10,
  },
  bottom: {
    display: 'flex',
    flexDirection: 'row',
  },
  left: {
    display: 'flex',
    flexDirection: 'column',
    // backgroundColor: 'red',
    width: '50%',
  },
  right: {
    display: 'flex',
    flexDirection: 'column',
    // backgroundColor: 'red',
    width: '50%',
    alignItems: 'center',
  },
  course: {
    color: 'black',
  },
  logodiv: {
    // flex: 1,
    // backgroundColor: 'red',
    margin: 5,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    // width: '60%',
  },
  logo: {
    width: '100%',
    borderRadius: 100,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    // backgroundColor: 'red',
    alignItems: 'center',
    // backgroundColor: 'blue',
    // width: '100%',
  },
});
