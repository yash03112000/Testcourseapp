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
import * as WebBrowser from 'expo-web-browser';
import Constants from 'expo-constants';
import Banner from '../Home/Banner';
import CourseCard from '../Home/CourseCard';
import TestCard from '../Home/TestCard';
import DigitalCard from '../Home/DigitalCard';

const { manifest } = Constants;

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

var confont = 12;

export default function Home({ item: test, navigation }) {
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
  const [digitals, setDigitals] = useState([]);

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
          setCourses(res.courses);
          setTests(res.tests);
          setDigitals(res.digitals);
          setStatus(true);
        });
      } else if (res.status == 403) setStatus(false);
      setLoad(false);
    });
  };

  return load ? (
    <View>
      <Text>Home</Text>
    </View>
  ) : (
    <ScrollView style={classes.main}>
      <Banner />
      <View style={classes.heading}>
        <Text style={classes.headtext}>Courses</Text>
        <View>
          <FlatList
            style={{}}
            horizontal
            data={courses}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => <CourseCard {...{ item, navigation }} />}
          />
        </View>
      </View>
      <View style={classes.heading}>
        <Text style={classes.headtext}>Test</Text>
        <View>
          <FlatList
            style={{}}
            horizontal
            data={tests}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => <TestCard {...{ item, navigation }} />}
          />
        </View>
      </View>
      <View style={classes.heading}>
        <Text style={classes.headtext}>Digital Products</Text>
        <View>
          <FlatList
            style={{}}
            horizontal
            data={digitals}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => <DigitalCard {...{ item, navigation }} />}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const classes = StyleSheet.create({
  main: {
    display: 'flex',
    flexDirection: 'column',
  },
  heading: {
    padding: 10,
  },
  headtext: {
    fontWeight: 'bold',
    fontSize: 20,
  },
});
