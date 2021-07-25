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
  ProgressBar,
} from 'react-native-paper';
import { Rating, AirbnbRating } from 'react-native-ratings';

import * as WebBrowser from 'expo-web-browser';
import Constants from 'expo-constants';
const { manifest } = Constants;

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

var confont = 12;

export default function TestCard({ total, avg, rating }) {
  if (Platform.OS === 'web') {
    server = 'http://localhost:8080';
  } else {
    server = `http://${manifest.debuggerHost.split(':').shift()}:8080`;
  }

  const [load, setLoad] = useState(false);

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
            Student Feedback
          </Text>
        </View>
      </View>
      <View style={classes.bottom}>
        <View style={classes.left}>
          <View style={classes.logodiv}>
            <Text style={classes.head2}>{avg}</Text>
          </View>
          <View style={classes.logodiv}>
            <Rating
              //   size={20}
              imageSize={20}
              startingValue={avg}
              tintColor="hsl(360,0%,15%)"
              count={5}
              isDisabled
              reviewSize={0}
              showRating={false}
              fractions={2}
            />
          </View>
          <View style={classes.logodiv}>
            <Text
              component="h1"
              color="primary"
              variant="subtitle1"
              gutterBottom
              style={classes.text}
            >
              Average Rating
            </Text>
          </View>
        </View>

        <View style={classes.right}>
          <View style={classes.row}>
            <View style={classes.progdiv}>
              <ProgressBar
                progress={rating.rated_1 / total}
                style={classes.progress}
              />
            </View>
            <View>
              <Text style={classes.text}>1</Text>
            </View>
          </View>
          <View style={classes.row}>
            <View style={classes.progdiv}>
              <ProgressBar
                progress={rating.rated_2 / total}
                style={classes.progress}
              />
            </View>
            <View>
              <Text style={classes.text}>2</Text>
            </View>
          </View>
          <View style={classes.row}>
            <View style={classes.progdiv}>
              <ProgressBar
                progress={rating.rated_3 / total}
                style={classes.progress}
              />
            </View>
            <View>
              <Text style={classes.text}>3</Text>
            </View>
          </View>
          <View style={classes.row}>
            <View style={classes.progdiv}>
              <ProgressBar
                progress={rating.rated_4 / total}
                style={classes.progress}
              />
            </View>
            <View>
              <Text style={classes.text}>4</Text>
            </View>
          </View>
          <View style={classes.row}>
            <View style={classes.progdiv}>
              <ProgressBar
                progress={rating.rated_5 / total}
                style={classes.progress}
              />
            </View>
            <View>
              <Text style={classes.text}>5</Text>
            </View>
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
  head2: {
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
    // padding: 5,
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
    flexDirection: 'column',
  },
  left: {
    display: 'flex',
    flexDirection: 'column',
    // backgroundColor: 'red',
    alignItems: 'center',
    width: '100%',
  },
  logo: {
    width: '100%',
    borderRadius: 200,
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
    width: '60%',
    alignItems: 'center',
  },
  logo: {
    width: '100%',
    borderRadius: 200,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  right: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    // backgroundColor: 'red',
    // alignItems: 'center',
  },
  progdiv: {
    // backgroundColor: 'red',
    width: '70%',
  },
  progress: {
    height: 20,
    borderRadius: 10,
    width: '100%',
  },
});
