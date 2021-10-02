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
  Chip,
  Searchbar,
} from 'react-native-paper';
import * as WebBrowser from 'expo-web-browser';
import Constants from 'expo-constants';
import { Entypo } from 'react-native-vector-icons';
const { manifest } = Constants;
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  const [load, setLoad] = useState(false);
  const [status, setStatus] = useState(false);
  const [search, setSearch] = useState('');

  const logout = async () => {
    await AsyncStorage.removeItem('token');
  };

  return load ? (
    <View>
      <Text>Search</Text>
    </View>
  ) : (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        width,
        // backgroundColor: 'blue',
        justifyContent: 'center',
      }}
    >
      <View style={classes.main}>
        <View>
          <Button onPress={logout}>LogOut</Button>
        </View>
        <View>
          <Searchbar
            placeholder="Search"
            onChangeText={(text) => setSearch(text)}
            value={search}
          />
        </View>
        <View style={{ margin: 10 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Top Searches</Text>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            width,
          }}
        >
          <Chip
            // icon="information"
            onPress={() => console.log('Pressed')}
            style={{ paddingVertical: 5, margin: 5 }}
          >
            Example Chip
          </Chip>
          <Chip
            // icon="information"
            style={{ paddingVertical: 5, margin: 5 }}
            onPress={() => console.log('Pressed')}
          >
            Example Chip
          </Chip>
        </View>
        <View style={{ margin: 10 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
            Browse Categories
          </Text>
        </View>
        <ScrollView>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              width,
              justifyContent: 'space-between',
              padding: 15,
            }}
          >
            <View>
              <Text>ABCD</Text>
            </View>
            <View>
              <Entypo name="chevron-small-right" color="black" size={25} />
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const classes = StyleSheet.create({
  main: {
    width: width,
    // height: 0.6 * height,
    // padding: 30,
    display: 'flex',
    flexDirection: 'column',
    // backgroundColor: 'red',
    // boxShadow: '10px 10px 30px silver',
  },
});
