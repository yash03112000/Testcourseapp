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
import Constants from 'expo-constants';
const { manifest } = Constants;
import AsyncStorage from '@react-native-async-storage/async-storage';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

var confont = 12;
const { server } = require('../config.js');

export default function Card({ data, route, navigation }) {
  // if (Platform.OS === 'web') {
  //   server = 'http://localhost:8080';
  // } else {
  //   server = `http://${manifest.debuggerHost.split(':').shift()}:8080`;
  // }

  const [load, setLoad] = useState(true);
  const [status, setStatus] = useState(false);
  const [fresh, setFresh] = useState([]);
  const [token, setToken] = useState('');
  // const [id, setID] = useState('');

  useEffect(() => {
    initial();
  }, []);
  const { id } = route.params.params;

  const initial = async () => {
    const token = await AsyncStorage.getItem('token');
    setToken(token);
    fetch(`${server}/CourseServer/test/permit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
      body: JSON.stringify({ id }),
    }).then((res) => {
      // console.log(res.status)
      if (res.status === 200) {
        res.json().then((res) => {
          // setID(res.data._id);
          setStatus(res.status);
          setFresh(res.data);
          setLoad(false);
        });
      } else if (res.status == 403) {
        navigation.replace('LogIn');
      }
    });
  };
  const pay = () => {
    // console.log(test._id);lud
    // WebBrowser.openAuthSessionAsync(`${server}/paymentredirect/${test._id}`);
    navigation.replace('Payment', { testid: id });
  };
  // const enter = () => {
  //   // console.log(test._id);lud
  //   // WebBrowser.openAuthSessionAsync(`${server}/paymentredirect/${test._id}`);
  //   navigation.replace('Payment', { testid: id });
  // };

  const register = (e) => {
    e.preventDefault();
    fetch(`${server}/payment/test/registerfree`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
      body: JSON.stringify({ id }),
    }).then((res) => {
      // console.log(res.status)
      if (res.status === 200) {
        res.json().then((res) => {
          // router.reload();
          setStatus(true);
        });
      } else if (res.status == 403) {
        navigation.replace('LogIn');
      }
    });
  };
  const enter = () => {
    console.log('a');
    navigation.replace('DrawerNav', {
      screen: 'Test',
      params: { id: data._id },
    });
  };

  const botfun = (test) => {
    if (status) {
      return (
        <>
          <View style={classes.rest}>
            <Button
              style={{
                backgroundColor: 'hsl(0,60%,60%)',
                width: '80%',
                paddingTop: 15,
                paddingBottom: 15,
                borderRadius: 0,
                margin: 10,
                // border: '0.2px solid black',
              }}
              onPress={enter}
            >
              Enter
            </Button>
          </View>
        </>
      );
    } else {
      if (fresh.is_free) {
        return (
          <>
            <View style={classes.row}>
              <Text
                component="p"
                color="primary"
                variant="subtitle1"
                gutterBottom
                style={classes.pricetext}
              >
                <Text
                  style={{
                    // textDecoration: 'line-through',
                    // color: 'grey',
                    fontWeight: 'bold',
                  }}
                >
                  FREE
                </Text>
              </Text>
            </View>
            <View style={classes.rest}>
              <Button
                style={{
                  backgroundColor: 'hsl(0,60%,60%)',
                  width: '80%',
                  paddingTop: 15,
                  paddingBottom: 15,
                  borderRadius: 0,
                  margin: 10,
                  // border: '0.2px solid black',
                }}
                onPress={register}
              >
                Buy Now
              </Button>
            </View>
          </>
        );
      } else {
        if (fresh.is_on_sale) {
          return (
            <>
              <View style={classes.row}>
                <Text
                  component="p"
                  color="primary"
                  variant="subtitle1"
                  gutterBottom
                  style={classes.pricetext}
                >
                  <Text>&#8377;</Text>
                  <Text
                    style={{
                      textDecorationLine: 'line-through',
                      color: 'grey',
                      margin: 20,
                    }}
                  >
                    {fresh.price}
                  </Text>
                  <Text
                    style={{
                      // textDecoration: 'line-through',
                      // color: 'grey',
                      fontWeight: 'bold',
                    }}
                  >
                    {fresh.sale_price}
                  </Text>
                </Text>
              </View>
              <View style={classes.rest}>
                <Button
                  style={{
                    backgroundColor: 'hsl(0,60%,60%)',
                    width: '80%',
                    paddingTop: 15,
                    paddingBottom: 15,
                    borderRadius: 0,
                    margin: 10,
                    // border: '0.2px solid black',
                  }}
                  onPress={pay}
                >
                  Buy Now
                </Button>
              </View>
            </>
          );
        } else {
          return (
            <>
              <View style={classes.row}>
                <Text
                  component="p"
                  color="primary"
                  variant="subtitle1"
                  gutterBottom
                  style={classes.pricetext}
                >
                  <Text>&#8377;</Text>
                  <Text
                    style={{
                      // textDecoration: 'line-through',
                      // color: 'grey',
                      margin: 20,
                    }}
                  >
                    {fresh.price}
                  </Text>
                </Text>
              </View>
              <View style={classes.rest}>
                <Button
                  style={{
                    backgroundColor: 'hsl(0,60%,60%)',
                    width: '80%',
                    paddingTop: 15,
                    paddingBottom: 15,
                    borderRadius: 0,
                    margin: 10,
                    // border: '0.2px solid black',
                  }}
                  onPress={pay}
                >
                  Buy Now
                </Button>
              </View>
            </>
          );
        }
      }
    }
  };
  return load ? (
    <View>
      <Text>loading...</Text>
    </View>
  ) : (
    <View style={classes.main}>
      <View style={classes.imgdiv}>
        <Image
          source={require('../../assets/banner.jpg')}
          style={classes.img}
        />
      </View>
      <View style={classes.column}>
        {botfun()}
        <View style={classes.column} style={{ paddingLeft: 20 }}>
          <Text
            component="p"
            color="primary"
            variant="subtitle1"
            gutterBottom
            style={classes.head}
          >
            Includes
          </Text>
          <Text
            component="p"
            color="primary"
            variant="subtitle1"
            gutterBottom
            style={classes.text}
          >
            23 Hours
          </Text>
          <Text
            component="p"
            color="primary"
            variant="subtitle1"
            gutterBottom
            style={classes.text}
          >
            24 Lessons
          </Text>
          <Text
            component="p"
            color="primary"
            variant="subtitle1"
            gutterBottom
            style={classes.text}
          >
            Access
          </Text>
          <Text
            component="p"
            color="primary"
            variant="subtitle1"
            gutterBottom
            style={classes.text}
          >
            Full Time
          </Text>
        </View>
      </View>
    </View>
  );
}

const classes = StyleSheet.create({
  main: {
    // backgroundColor: 'red',
    display: 'flex',
    flexDirection: 'column',
    // alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    // border: '0.2px solid rgba(0,0,0,0.2)',
    padding: 10,
    borderRadius: 5,
    elevation: 1,
  },
  head: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 5,
  },
  text: {
    color: 'black',
    // padding: 10,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    // backgroundColor: 'red',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    // paddingLeft: 30,
    // backgroundColor: 'red',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  card: {
    // height: '60vh',
    // backgroundColor: 'red',
    width: '90%',
    // boxShadow: '10px 10px 30px silver',
  },
  imgdiv: {
    height: 200,
    backgroundColor: 'black',
  },
  img: {
    height: '100%',
    width: '100%',
    backgroundColor: 'blue',
  },
  pricetext: {
    color: 'black',
    padding: 10,
    fontSize: 25,
  },
  rest: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
});
