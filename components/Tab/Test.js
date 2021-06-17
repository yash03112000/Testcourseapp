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
import CourseCard from '../TestTab/CourseCard';
import * as WebBrowser from 'expo-web-browser';
import Constants from 'expo-constants';
const { manifest } = Constants;

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

var confont = 12;

export default function TestCard({ item: test, navigation }) {
  if (Platform.OS === 'web') {
    server = 'http://localhost:8080';
  } else {
    server = `http://${manifest.debuggerHost.split(':').shift()}:8080`;
  }

  const [msg, setMsg] = useState('');
  const [load, setLoad] = useState(true);
  const [status, setStatus] = useState(false);
  const [courses, setCourses] = useState([]);
  const [tests, setTests] = useState([]);

  useEffect(() => {
    initial();
  }, []);

  const initial = () => {
    // console.log('aa');
    setLoad(true);
    fetch(`${server}/CourseServer/`, { method: 'GET' }).then((res) => {
      // console.log(res.status)
      if (res.status === 200) {
        res.json().then((res) => {
          // setCourses(res.courses);
          setTests(res.tests);
          setStatus(true);
        });
      } else if (res.status == 403) setStatus(false);
      setLoad(false);
    });
  };

  return load ? (
    <View>
      <Text>Test</Text>
    </View>
  ) : (
    <ScrollView style={classes.main}>
      <View style={classes.heading}>
        <Text style={classes.headtext}>My Tests</Text>
        <View
          style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}
        >
          {tests.map((item, i) => (
            <CourseCard {...{ item, navigation }} key={i} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const classes = StyleSheet.create({
  main: {
    width: width,
    padding: 10,
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