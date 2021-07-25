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
  Menu,
  Portal,
  Dialog,
} from 'react-native-paper';
import moment from 'moment';

// import Banner from './Banner';
// import Data from './Data';
import * as WebBrowser from 'expo-web-browser';
import AutoHeightWebView from 'react-native-autoheight-webview';
import Curriculum from './Curriculum';
import Constants from 'expo-constants';
const { manifest } = Constants;
// import { Video } from 'expo-av';
import VideoPlayer from 'expo-video-player';
import { Video, AVPlaybackStatus } from 'expo-av';
import {
  MaterialCommunityIcons,
  Ionicons,
  AntDesign,
  FontAwesome,
  FontAwesome5,
  Entypo,
} from 'react-native-vector-icons';
import Slider from '@react-native-community/slider';

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
  const [uris, setURIs] = useState({});
  const [load, setLoad] = useState(true);
  const [visibleSpeed, setVisibleSpeed] = useState(false);
  const [visibleQuality, setVisibleQuality] = useState(false);
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [full, setFull] = useState(false);
  const [old, setOld] = useState(0);
  const [height, setHeight] = useState(Dimensions.get('window').height);
  const [width, setWidth] = useState(Dimensions.get('window').width);

  const onChange = ({ window, screen }) => {
    // setDimensions({ window, screen });
    console.log('change');
    setHeight(window.height);
    setWidth(window.width);
  };

  useEffect(() => {
    initial();
    Dimensions.addEventListener('change', onChange);
    return () => {
      Dimensions.removeEventListener('change', onChange);
    };
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
          // console.log(res);
          setData(res.data);
          // setLesson(res.lesson);
          setURIs(res.uris);
          if (res.uris.HD.valid) setLesson(res.uris.HD.uri);
          else if (res.uris.SD.valid) setLesson(res.uris.SD.uri);
          else if (res.uris.Med.valid) setLesson(res.uris.Med.uri);
          // setStatus(true);
          setLoad(false);
        });
      } else if (res.status == 403) {
        router.replace('LogIn');
      }
    });
  };

  // console.log(lesson);
  // console.log(status);

  const iconcolor = 'white';
  const iconsize = 25;

  // console.log(status);
  return load ? (
    <View>
      <Text>Lesson</Text>
    </View>
  ) : full ? (
    <View
      style={{
        backgroundColor: 'black',
        width,
        height,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      {/* <Video
        ref={video}
        style={{ width, height: 300 }}
        source={{
          uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
        }}
        useNativeControls={false}
        resizeMode="contain"
        isLooping
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      /> */}
    </View>
  ) : (
    <ScrollView style={classes.main}>
      <View
        style={{
          height: 300,
        }}
      >
        <Video
          ref={video}
          style={{ width, height: 300, backgroundColor: 'black' }}
          source={{
            uri: lesson,
          }}
          useNativeControls={false}
          resizeMode="contain"
          isLooping
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        />
        <View
          style={{
            height: 300,
            width,
            position: 'absolute',
            // backgroundColor: 'blue',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              width,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
            }}
          >
            <Button
              onPress={() => {
                setVisibleQuality(true);
              }}
            >
              <Ionicons
                name="settings-outline"
                size={iconsize}
                color={iconcolor}
              />
            </Button>
            <Button
              onPress={() => {
                setVisibleSpeed(true);
              }}
            >
              <Ionicons
                name="speedometer-outline"
                size={iconsize}
                color={iconcolor}
              />
            </Button>
          </View>
          <Button
            // title=
            onPress={() => {
              var a = old.positionMillis;
              video.current.setPositionAsync(a);
              status.isLoaded
                ? status.isPlaying
                  ? video.current.pauseAsync()
                  : video.current.playAsync()
                : video.current.pauseAsync();
            }}
          >
            {status.isPlaying ? (
              <FontAwesome name="pause" color={iconcolor} size={iconsize} />
            ) : (
              <FontAwesome name="play" color={iconcolor} size={iconsize} />
            )}
          </Button>
          <View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                // backgroundColor: 'red',
                height: 30,
              }}
            >
              <Text style={{ color: 'white' }}>
                {/* {moment.duration(status.positionMillis).minutes()}:
                {moment.duration(status.positionMillis).seconds()}/
                {moment.duration(status.durationMillis).minutes()}:
                {moment.duration(status.playableDurationMillis).seconds()} */}
                {moment('1900-01-01 00:00:00')
                  .add(status.positionMillis, 'milliseconds')
                  .format('HH:mm:ss')}
                /
                {moment('1900-01-01 00:00:00')
                  .add(status.playableDurationMillis, 'milliseconds')
                  .format('HH:mm:ss')}
              </Text>
              <View style={{ display: 'flex', flexDirection: 'row' }}>
                <Button
                  onPress={() => {
                    video.current.setIsMutedAsync(!status.isMuted);
                    // setFull(true);
                    // navigation.setOptions({ headerShown: false });
                  }}
                >
                  {status.isMuted ? (
                    <FontAwesome5
                      name="volume-mute"
                      size={iconsize}
                      color={iconcolor}
                    />
                  ) : (
                    <FontAwesome5
                      name="volume-up"
                      size={iconsize}
                      color={iconcolor}
                    />
                  )}
                </Button>
                <Button
                  onPress={() => {
                    video.current.presentFullscreenPlayer();
                    // setFull(true);
                    // navigation.setOptions({ headerShown: false });
                  }}
                >
                  <Entypo
                    name="resize-full-screen"
                    size={iconsize}
                    color={iconcolor}
                  />
                </Button>
              </View>
            </View>
            <Slider
              style={{ width, height: 20 }}
              minimumValue={0}
              maximumValue={1}
              minimumTrackTintColor="blue"
              maximumTrackTintColor="#fff"
              onValueChange={() => {
                video.current.pauseAsync();
              }}
              onSlidingComplete={(value) => {
                var a = value * status.durationMillis;
                video.current.setPositionAsync(a);
              }}
            />
          </View>
        </View>
        <Portal>
          <Dialog
            visible={visibleQuality}
            onDismiss={() => setVisibleQuality(false)}
          >
            <Dialog.Title>Speed</Dialog.Title>
            <Dialog.Content>
              {uris.HD.valid ? (
                <Button
                  onPress={() => {
                    setOld(status);
                    setLesson(uris.HD.uri);
                  }}
                >
                  HD
                </Button>
              ) : (
                <></>
              )}
              {uris.SD.valid ? (
                <Button
                  onPress={() => {
                    setOld(status);
                    setLesson(uris.SD.uri);
                  }}
                >
                  SD
                </Button>
              ) : (
                <></>
              )}
              {uris.Med.valid ? (
                <Button
                  onPress={() => {
                    setOld(status);
                    setLesson(uris.Med.uri);
                  }}
                >
                  Medium
                </Button>
              ) : (
                <></>
              )}
            </Dialog.Content>
          </Dialog>
          <Dialog
            visible={visibleSpeed}
            onDismiss={() => setVisibleSpeed(false)}
          >
            <Dialog.Title>Speed</Dialog.Title>
            <Dialog.Content>
              <Button
                onPress={() => {
                  video.current.setRateAsync(0.5, true);
                }}
              >
                0.5
              </Button>
              <Button
                onPress={() => {
                  video.current.setRateAsync(1, true);
                }}
              >
                1
              </Button>
              <Button
                onPress={() => {
                  video.current.setRateAsync(1.5, true);
                }}
              >
                1.25
              </Button>
              <Button
                onPress={() => {
                  video.current.setRateAsync(1.5, true);
                }}
              >
                1.5
              </Button>
              <Button
                onPress={() => {
                  video.current.setRateAsync(2, true);
                }}
              >
                2
              </Button>
            </Dialog.Content>
          </Dialog>
        </Portal>
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
