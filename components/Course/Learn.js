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
      <View style={classes.learn1}>
        <View style={classes.learntop}>
          <View>
            <Text style={classes.learnhead}>What Will You Learn?</Text>
          </View>
        </View>
        <View style={classes.learnbottom}>
          {data.map((dat, i) => (
            <View key={i}>
              <Text style={classes.outcome}>{dat}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const classes = StyleSheet.create({
  learn1: {
    display: 'flex',
    flexDirection: 'column',
    width: '90%',
    // backgroundColor: 'purple',
    // margin: 10,
    padding: 10,
    // border: '0.2px solid rgba(0,0,0,0.2)',
    borderRadius: 5,
  },
  learnbottom: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    // backgroundColor: 'red',
  },
  learnhead: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 5,
  },
  outcome: {
    color: 'black',
  },
});
