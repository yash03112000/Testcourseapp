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
import { TextInput, Button, Divider } from 'react-native-paper';
import * as WebBrowser from 'expo-web-browser';
import Constants from 'expo-constants';
const { manifest } = Constants;
const { server } = require('../config.js');
import AutoHeightWebView from 'react-native-autoheight-webview';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

var confont = 12;

export default function TestCard({ data, type }) {
  // console.log('aa');
  const navigation = useNavigation();

  const enter = () => {
    // console.log(data._id);
    navigation.push('TestInstructions', {
      // screen: 'Test',
      params: { id: data._id },
    });
  };
  return (
    <TouchableOpacity onPress={enter}>
      <View style={classes.head}>
        <View style={classes.imgdiv}>
          {data.thumbnail == '' ? (
            <Image
              source={require('../../assets/banner.jpg')}
              style={classes.img}
            />
          ) : (
            <Image
              source={require('../../assets/banner.jpg')}
              style={classes.img}
            />
          )}
        </View>
        <View style={classes.condiv}>
          <View>
            <Text style={classes.title}>{data.title}</Text>
          </View>
          <View>
            {/* <Text style={classes.subtitle}>
              {parse(data.short_description)}
            </Text> */}
            <AutoHeightWebView
              originWhitelist={['*']}
              source={{ html: data.short_description, baseUrl: server }}
              scalesPageToFit={false}
            />
          </View>
          <View style={classes.pricediv}>
            {data.is_free ? (
              <Text
                component="p"
                color="primary"
                variant="subtitle1"
                gutterBottom
                style={classes.price}
              >
                <Text
                  style={{
                    fontWeight: 'bold',
                  }}
                >
                  FREE
                </Text>
              </Text>
            ) : (
              <>
                {!data.is_on_sale ? (
                  <Text style={classes.price}>
                    <Text>&#8377;</Text>
                    <Text
                      style={{
                        fontWeight: 'bold',
                      }}
                    >
                      {data.price}
                    </Text>
                  </Text>
                ) : (
                  <Text style={classes.price}>
                    <Text>&#8377;</Text>
                    <Text
                      style={{
                        textDecoration: 'line-through',
                        color: 'grey',
                        margin: 6,
                      }}
                    >
                      {data.price}
                    </Text>
                    <Text
                      style={{
                        fontWeight: 'bold',
                      }}
                    >
                      {data.sale_price}
                    </Text>
                  </Text>
                )}
              </>
            )}
          </View>
          {type === 'Teacher' ? (
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
              }}
            >
              <Button
                onPress={() => navigation.push(`/add_test?edit=${data._id}`)}
              >
                Edit
              </Button>
            </View>
          ) : (
            <></>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const classes = StyleSheet.create({
  head: {
    height: 180,
    width: 300,
    backgroundColor: 'white',
    margin: 20,
    display: 'flex',
    flexDirection: 'row',
  },
  imgdiv: {
    // height: 150,
    width: '50%',
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    maxHeight: 'auto',
  },
  title: {
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
    padding: 5,
  },
  subtitle: {
    fontSize: 12,
    color: 'black',
    fontWeight: 'normal',
    padding: 5,
  },
  condiv: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    // backgroundColor: 'blue',
    height: 150,
    padding: 10,
  },
  pricediv: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  price: {
    fontSize: 15,
    color: 'black',
    fontWeight: 'normal',
    padding: 5,
  },
});
