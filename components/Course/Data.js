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
import Learn from './Learn';
import Requirement from './Requirement';
import Curriculum from './Curriculum';
import Instructor from './Instructor';
import Feedback from './Feedback';
import Card from './Card';
import * as WebBrowser from 'expo-web-browser';
import Constants from 'expo-constants';
const { manifest } = Constants;

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

var confont = 12;

export default function TestCard({ data, navigation, route }) {
  if (Platform.OS === 'web') {
    server = 'http://localhost:8080';
  } else {
    server = `http://${manifest.debuggerHost.split(':').shift()}:8080`;
  }

  //   const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);
  // console.log(data);

  // console.log(data);

  return load ? (
    <View>
      <Text>Course</Text>
    </View>
  ) : (
    <View style={classes.main}>
      <Card {...{ data, route, navigation }} />
      <Learn data={data.outcomes} />
      <Curriculum data={data.sections} navigation={navigation} />
      <Requirement data={data.requirements} />
      <Instructor />
      <Feedback
        total={data.total_ratings}
        avg={data.rating}
        rating={data.ratings_count}
      />
    </View>
  );
}

const classes = StyleSheet.create({
  main: {
    width: width,
    // padding: 10,
    display: 'flex',
    flexDirection: 'column',
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
