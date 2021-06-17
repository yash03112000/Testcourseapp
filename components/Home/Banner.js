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
    // backgroundImage: 'url(/static/banner.jpg)',
    height: 0.5 * height,
    width: width,
    // backgroundSize: '100% 100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  header: {
    fontSize: 40,
    color: 'white',
  },
  subtitle: {
    fontSize: 20,
    color: 'white',
    width: '80%',
    paddingTop: 20,
  },
});

export default function Home() {
  return (
    <View>
      <ImageBackground
        style={classes.head}
        source={require('../../assets/banner.jpg')}
      >
        <View>
          <Text style={classes.header}>Learn on your schedule</Text>
        </View>
        <View>
          <Text style={classes.subtitle}>
            Study any topic, anytime. Explore thousands of courses for the
            lowest price ever!
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
}
