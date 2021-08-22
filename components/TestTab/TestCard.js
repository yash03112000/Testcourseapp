import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
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

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const classes = StyleSheet.create({
  head: {
    height: 240,
    width: width * 0.4,
    // backgroundColor: 'blue',
    margin: 10,
    // boxShadow: '10px 10px 30px silver',
    // elevation: 1,
    borderRadius: 10,
    // shadowColor: 'black',
    // borderColor: 'red',
  },
  imgdiv: {
    height: '50%',
    padding: 4,
  },
  img: {
    height: '100%',
    width: '100%',
    borderRadius: 10,
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
    height: '50%',
  },
  pricediv: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  price: {
    fontSize: 15,
    color: 'black',
    fontWeight: 'normal',
    padding: 5,
  },
});

export default function Home({ item: data }) {
  // const router = useRouter();

  const enter = () => {
    console.log('a');
    navigation.push('TestInstructions', {
      // screen: 'Test',
      params: { id: data._id },
    });
  };

  return (
    <View>
      <View style={classes.head}>
        <TouchableOpacity onPress={enter} style={classes.imgdiv}>
          <View
          // style={classes.imgdiv}
          >
            {data.thumbnail == '' ? (
              <Image
                source={require(`../../assets/banner.jpg`)}
                style={classes.img}
              />
            ) : (
              <Image
                //   source={require(`../../assets/${data.thumbnail}.jpg`)}
                style={classes.img}
              />
            )}
          </View>
        </TouchableOpacity>
        <View style={classes.condiv}>
          <View>
            <Text style={classes.title}>{data.title}</Text>
          </View>
          <View>
            <Text style={classes.subtitle}>{data.short_description}</Text>
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
                  <Text
                    component="p"
                    color="primary"
                    variant="subtitle1"
                    gutterBottom
                    style={classes.price}
                  >
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
                  <Text
                    component="p"
                    color="primary"
                    variant="subtitle1"
                    gutterBottom
                    style={classes.price}
                  >
                    <Text>&#8377;</Text>
                    <Text
                      style={{
                        textDecorationLine: 'line-through',
                        color: 'grey',
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
        </View>
      </View>
    </View>
  );
}