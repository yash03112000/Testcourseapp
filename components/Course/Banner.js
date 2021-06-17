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
  ImageBackground,
} from 'react-native';
import {
  ActivityIndicator,
  Colors,
  TextInput,
  Button,
  Divider,
  Chip,
} from 'react-native-paper';
import Constants from 'expo-constants';
const { manifest } = Constants;
import moment from 'moment';
import { Rating, AirbnbRating } from 'react-native-ratings';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

var confont = 12;

export default function Banner({ data, navigation }) {
  if (Platform.OS === 'web') {
    server = 'http://localhost:8080';
  } else {
    server = `http://${manifest.debuggerHost.split(':').shift()}:8080`;
  }

  const [msg, setMsg] = useState('');
  const [load, setLoad] = useState(false);
  const [status, setStatus] = useState(false);
  const [courses, setCourses] = useState([]);
  const [tests, setTests] = useState([]);

  //   console.log(data);
  return load ? (
    <View>
      <Text>Course</Text>
    </View>
  ) : (
    <View>
      <View style={classes.head}>
        <View>
          <Text style={classes.header} gutterBottom>
            {data.title}
          </Text>
        </View>
        <View>
          <Text style={classes.subtitle} gutterBottom>
            {data.short_description}
          </Text>
        </View>
        <View style={classes.stardiv}>
          {data.tags.map((tag, i) => (
            <Chip
              //   color="primary"
              size="medium"
              //   label={tag}
              style={{ marginRight: 5 }}
              key={i}
            >
              {tag}
            </Chip>
          ))}

          <View style={{ paddingLeft: 10 }}>
            <Rating
              //   size={20}
              imageSize={20}
              //   defaultRating={1.2}
              startingValue={data.rating}
              //   ratingBackgroundColor="yellow"
              //   ratingColor="yellow"
              tintColor="hsl(360,0%,15%)"
              count={5}
              isDisabled
              reviewSize={0}
              showRating={false}
              fractions={2}
            />
          </View>
          <View>
            <Text
              component="h4"
              color="primary"
              variant="subtitle1"
              style={classes.subtitle2}
              gutterBottom
            >
              {data.rating}
            </Text>
          </View>
          <View>
            <Text
              component="h4"
              color="primary"
              variant="subtitle1"
              style={classes.subtitle2}
              gutterBottom
            >
              {data.total_ratings} Ratings
            </Text>
          </View>
          <View>
            <Text
              component="h4"
              color="primary"
              variant="subtitle1"
              style={classes.subtitle2}
              gutterBottom
            >
              N students enrolled
            </Text>
          </View>
        </View>
        <View style={classes.stardiv}>
          <View>
            <Text
              component="h4"
              color="primary"
              variant="subtitle1"
              style={classes.subtitle2}
              gutterBottom
            >
              Created By ABCD
            </Text>
          </View>
          <View>
            <Text
              component="h4"
              color="primary"
              variant="subtitle1"
              style={classes.subtitle2}
              gutterBottom
            >
              Last Updated :
              {moment(data.last_updated).format('MMMM Do YYYY,h:mm a')}
            </Text>
          </View>
          <View>
            {data.languages.map((lang, i) => (
              <Text
                component="h4"
                color="primary"
                variant="subtitle1"
                style={classes.subtitle2}
                gutterBottom
                key={i}
              >
                {lang}
              </Text>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}

const classes = StyleSheet.create({
  head: {
    // backgroundImage: 'url(/static/banner.jpg)',
    height: 0.4 * height,
    width: width,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'hsl(360,0%,15%)',
    paddingLeft: 10,
  },
  header: {
    fontSize: 40,
    color: 'white',
  },
  subtitle: {
    fontSize: 18,
    color: 'white',
    margin: 5,

    // width: '50%',
  },
  stardiv: {
    // backgroundColor: 'red',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    margin: 5,
  },
  subtitle2: {
    fontSize: 15,
    color: 'white',
    margin: 4,
    // width: '50%',
  },
});
