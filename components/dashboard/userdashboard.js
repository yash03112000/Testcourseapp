import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
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
import TestCard from './TestCard';
import CourseCard from './CourseCard';
import DigitalCard from './DigitalCard';
import { FlatList } from 'react-native-gesture-handler';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const { server } = require('../config.js');

export default function userdashboard({ data }) {
  return (
    <ScrollView contentContainerStyle={classes.container}>
      <View style={classes.View}>
        <View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}
          >
            <Text>Courses Bought</Text>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <FlatList
              data={data.courses}
              renderItem={({ item, i }) => {
                // console.log(item);
                return <CourseCard data={item} type={data.type} />;
              }}
              horizontal={true}
              keyExtractor={(item) => item._id}
            />
            {/* {data.courses.map((course, i) => {
              return (
                <View key={i} style={{ margin: 20 }}>
                  <CourseCard data={course} type={data.type} />
                </View>
              );
            })} */}
          </View>
        </View>
        <View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}
          >
            <Text>Test Bought</Text>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <FlatList
              data={data.tests}
              renderItem={({ item, i }) => {
                // console.log(item);
                return <TestCard data={item} type={data.type} />;
              }}
              horizontal={true}
              keyExtractor={(item) => item._id}
            />
            {/* {data.tests.map((test, i) => {
              return (
                <View key={i} style={{ margin: 20 }}>
                  <TestCard data={test} type={data.type} />
                </View>
              );
            })} */}
          </View>
        </View>
        <View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}
          >
            <Text>Digital Products Bought</Text>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              overflow: 'scroll',
            }}
          >
            <FlatList
              data={data.courses}
              renderItem={({ item }) => {
                // console.log(item);
                return <DigitalCard data={item} type={data.type} />;
              }}
              horizontal={true}
              keyExtractor={(item) => item._id}
            />
            {/* {data.digitals.map((course, i) => {
              return (
                <View key={i} style={{ margin: 20 }}>
                  <DigitalCard data={course} type={data.type} />
                </View>
              );
            })} */}
          </View>
        </View>
        {/* <ChangePassword /> */}
      </View>
    </ScrollView>
  );
}

const classes = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
});
