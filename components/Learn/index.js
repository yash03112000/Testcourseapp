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
// import Banner from './Banner';
// import Data from './Data';
import * as WebBrowser from 'expo-web-browser';
import AutoHeightWebView from 'react-native-autoheight-webview';
import Curriculum from './Curriculum';
import Constants from 'expo-constants';
const { manifest } = Constants;

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

var confont = 12;

export default function TestCard({ route, navigation }) {
  if (Platform.OS === 'web') {
    server = 'http://localhost:8080';
  } else {
    server = `http://${manifest.debuggerHost.split(':').shift()}:8080`;
  }

  const [data, setData] = useState([]);
  const [lesson, setLesson] = useState([]);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    initial();
  }, []);
  const { id } = route.params.params;

  const initial = () => {
    setLoad(true);
    fetch(`${server}/CourseServer/lessondata`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    }).then((res) => {
      // console.log(res.status)
      if (res.status === 200) {
        res.json().then((res) => {
          // setUser(res.user);
          setData(res.data);
          setLesson(res.lesson);
          // setStatus(true);
          setLoad(false);
        });
      } else if (res.status == 403) {
        router.replace('/LogIn');
      }
    });
  };

  // console.log(data);
  return load ? (
    <View>
      <Text>Lesson</Text>
    </View>
  ) : (
    <ScrollView style={classes.main}>
      <View
        style={{
          height: 300,
        }}
      >
        <AutoHeightWebView
          originWhitelist={['*']}
          source={{
            uri: server + '/videoredirect/' + lesson,
            //   baseUrl: server,
          }}
          scalesPageToFit={false}
        />
      </View>
      <Curriculum data={data} navigation={navigation} id={id} />
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
