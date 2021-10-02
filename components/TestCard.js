import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
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
const { manifest } = Constants;
const { server } = require('./config.js');

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import AsyncStorage from '@react-native-async-storage/async-storage';

var confont = 12;

export default function TestCard({ item: test, navigation }) {
  // if (Platform.OS === 'web') {
  //   server = 'http://localhost:8080';
  // } else {
  //   server = `http://${manifest.debuggerHost.split(':').shift()}:8080`;
  // }

  const [msg, setMsg] = useState('');
  const [load, setLoad] = useState(true);
  const [status, setStatus] = useState(false);

  useEffect(() => {
    initial();
  }, []);

  const initial = () => {
    fetch(`${server}/DashboardServer/permit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ testid: test._id }),
    }).then((res) => {
      // console.log(res.status)
      if (res.status === 200) {
        res.json().then((res) => {
          setStatus(res.status);
          setLoad(false);
        });
      }
    });
  };

  const register = (e) => {
    // e.preventDefault();
    fetch(`/payment/registerfree`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ testid: test._id }),
    }).then((res) => {
      // console.log(res.status)
      if (res.status === 200) {
        res.json().then((res) => {
          //   router.reload();
        });
      }
    });
  };

  const pay = () => {
    // console.log(test._id);lud
    // WebBrowser.openAuthSessionAsync(`${server}/paymentredirect/${test._id}`);
    navigation.replace('Payment', { testid: test._id });
  };

  const enter = () => {
    navigation.replace('DrawerNav', {
      screen: 'Test',
      params: { id: test._id },
    });
  };

  const botfun = (test) => {
    if (status) {
      return (
        <>
          <Button
            variant="contained"
            type="submit"
            onPress={enter}
            style={classes.btn}
            // startIcon={<FacebookIcon />}
          >
            Enter
          </Button>
        </>
      );
    } else {
      if (test.is_free) {
        return (
          <>
            <Text
              style={{
                color: 'black',
                fontSize: confont,
              }}
            >
              <Text
                style={
                  {
                    // textDecoration: 'line-through',
                    // color: 'grey',
                  }
                }
              >
                FREE
              </Text>
            </Text>
            <Button
              variant="contained"
              type="submit"
              onPress={register}
              style={classes.btn}
              // startIcon={<FacebookIcon />}
            >
              Register
            </Button>
          </>
        );
      } else {
        if (test.is_on_sale) {
          return (
            <>
              <Text
                component="Text"
                color="primary"
                variant="subtitle1"
                gutterBottom
                style={{
                  color: 'black',
                  fontSize: confont,
                }}
              >
                <Text>&#8377;</Text>
                <Text
                  style={{
                    textDecorationLine: 'line-through',
                    color: 'grey',
                    margin: 6,
                  }}
                >
                  {test.price}
                </Text>
                <Text
                  style={
                    {
                      // textDecoration: 'line-through',
                      // color: 'grey',
                    }
                  }
                >
                  {test.sale_price}
                </Text>
              </Text>
              <Button
                variant="contained"
                type="submit"
                onPress={pay}
                style={classes.btn}
                // startIcon={<FacebookIcon />}
              >
                Pay
              </Button>
            </>
          );
        } else {
          return (
            <>
              <Text
                component="Text"
                color="primary"
                variant="subtitle1"
                gutterBottom
                style={{
                  color: 'black',
                  fontSize: confont,
                }}
              >
                <Text
                  style={
                    {
                      // textDecoration: 'line-through',
                      // color: 'grey',
                    }
                  }
                >
                  {test.price}
                </Text>
              </Text>
              <Button
                variant="contained"
                type="submit"
                onPress={pay}
                style={classes.btn}
                // startIcon={<FacebookIcon />}
              >
                Pay
              </Button>
            </>
          );
        }
      }
    }
  };

  return load ? (
    <View>
      <Text>Loading...</Text>
    </View>
  ) : (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        width,
        // backgroundColor: 'blue',
        justifyContent: 'center',
      }}
    >
      <View style={classes.main}>
        <View style={classes.imgdiv}>
          {/* <img src="../malefig.jpg" style={classes.img} /> */}
          <Image
            source={require('../assets/malefig.jpg')}
            style={classes.img}
          />
        </View>
        <View style={classes.condiv}>
          <View style={{ flex: 3, display: 'flex', flexDirection: 'column' }}>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  color: 'black',
                  fontSize: confont,
                  // fontWeight: 'bolder',
                }}
              >
                {test.title}
              </Text>
            </View>
            <View style={classes.randiv}>
              <Text style={{ color: 'black', fontSize: confont }}>
                Questions:
              </Text>
              <Text style={{ color: 'black', fontSize: confont }}>
                {test.total_questions.length}
              </Text>
            </View>
            <View style={classes.randiv}>
              <Text style={{ color: 'black', fontSize: confont }}>
                Time(mins):
              </Text>
              <Text style={{ color: 'black', fontSize: confont }}>
                {test.test_duration}
              </Text>
            </View>
            <View style={classes.randiv}>
              <Text style={{ color: 'black', fontSize: confont }}>
                Maximum Marks:
              </Text>
              <Text style={{ color: 'black', fontSize: confont }}>
                {test.maximum_marks}
              </Text>
            </View>
            <Divider />
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              // backgroundColor: 'red',
              justifyContent: 'space-around',
              flex: 1,
              //   backgroundColor: 'red',
              // height: '100%',
            }}
          >
            {botfun(test)}
          </View>
        </View>
      </View>
    </View>
  );
}

const classes = StyleSheet.create({
  main: {
    width: 0.8 * width,
    height: 0.6 * height,
    padding: 30,
    display: 'flex',
    flexDirection: 'column',
    // backgroundColor: 'red',
    // boxShadow: '10px 10px 30px silver',
  },
  imgdiv: {
    flex: 1,
    // objectFit: 'cover',
    backgroundColor: 'blue',
    overflow: 'hidden',
  },
  condiv: {
    flex: 1,
    // backgroundColor: 'green',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    maxHeight: 'auto',
  },
  randiv: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    // backgroundColor: 'red',
    justifyContent: 'space-between',
    flex: 1,
  },
  btn: {
    backgroundColor: '#1A538A',
    // width: 250,
    color: 'white',
    marginBottom: 5,
  },
});
