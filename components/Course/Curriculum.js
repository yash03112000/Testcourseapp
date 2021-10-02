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
  List,
} from 'react-native-paper';
import moment from 'moment';
const { server } = require('../config.js');

import * as WebBrowser from 'expo-web-browser';
import Constants from 'expo-constants';
import { TouchableHighlight } from 'react-native-gesture-handler';
const { manifest } = Constants;
import AsyncStorage from '@react-native-async-storage/async-storage';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

var confont = 12;

export default function TestCard({ data, navigation }) {
  // if (Platform.OS === 'web') {
  //   server = 'http://localhost:8080';
  // } else {
  //   server = `http://${manifest.debuggerHost.split(':').shift()}:8080`;
  // }

  const [load, setLoad] = useState(false);
  const lessonfun = () => {
    var sum = 0;
    data.map((sec, i) => {
      sum += sec.lessons.length;
    });
    return sum;
  };

  const cirdate = () => {
    var sum = 0;
    data.map((sec, i) => {
      sec.lessons.map((tim, i) => {
        sum += tim.secs;
      });
    });
    return moment('1900-01-01 00:00:00').add(sum, 'seconds').format('HH:mm:ss');
  };
  const sectime = (sec) => {
    var sum = 0;
    sec.lessons.map((les, i) => {
      sum += les.secs;
    });
    return moment('1900-01-01 00:00:00').add(sum, 'seconds').format('HH:mm:ss');
  };
  const enter = (lesid) => {
    console.log('a');
    navigation.push('Learn', {
      // screen: 'Test',
      params: { id: lesid },
    });
  };

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
            Curriculum
          </Text>
        </View>
        <View style={classes.topright}>
          <View>
            <Text
              component="h1"
              color="primary"
              variant="subtitle1"
              gutterBottom
              style={classes.text}
            >
              {lessonfun()} Lessons
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
              {cirdate()}
            </Text>
          </View>
        </View>
      </View>
      <View style={classes.bottom}>
        <List.AccordionGroup>
          {data.map((dat, i) => (
            <List.Accordion
              key={i}
              id={'0' + i}
              left={() => (
                <View style={classes.accordhead}>
                  <View>
                    <Text style={classes.heading}>{dat.title}</Text>
                  </View>
                  <View>
                    <Text style={classes.heading}>{sectime(dat)}</Text>
                  </View>
                </View>
              )}
            >
              {dat.lessons.map((les, index) => (
                <List.Item
                  key={index}
                  left={() => (
                    <View style={classes.detail}>
                      <View style={classes.row}>
                        <TouchableHighlight
                          // href={`/lesson/${les._id}`}
                          onPress={() => enter(les._id)}
                        >
                          <View>
                            <Text>{les.title}</Text>
                          </View>
                        </TouchableHighlight>
                      </View>
                      <View>
                        <Text>
                          {moment('1900-01-01 00:00:00')
                            .add(les.secs, 'seconds')
                            .format('HH:mm:ss')}
                        </Text>
                      </View>
                    </View>
                  )}
                />
              ))}
            </List.Accordion>
          ))}
        </List.AccordionGroup>
      </View>
    </View>
  );
}

const classes = StyleSheet.create({
  main: {
    display: 'flex',
    flexDirection: 'column',
    width: '80%',
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
  topright: {
    display: 'flex',
    flexDirection: 'row',
  },
  text: {
    color: 'black',
    padding: 10,
  },
  accordhead: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: 'red',
    width: '100%',
  },
  detail: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    // backgroundColor: 'red',
    // border: '1px solid black',
    padding: 10,
  },
});
