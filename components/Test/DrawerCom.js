import React from 'react';
import { Drawer } from 'react-native-paper';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';
import {
  ActivityIndicator,
  Colors,
  TextInput,
  Button,
  RadioButton,
} from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { setSectionact } from '../../redux/SectionReducer';
import { setResultact } from '../../redux/ResultReducer';
import { setQuesidact } from '../../redux/QuesidReducer';
import { setModalact } from '../../redux/ModalReducer';
import Constants from 'expo-constants';

const { manifest } = Constants;

// var server = 'http://localhost:8080'
if (Platform.OS === 'web') {
  server = 'http://localhost:8080';
} else {
  server = `http://${manifest.debuggerHost.split(':').shift()}:8080`;
}
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function SwipeableTemporaryDrawer({ navigation }) {
  // console.log(props)
  const {
    DataReducer: data,
    QuesidReducer: quesid,
    QuesarrayReducer: quesarr,
    ResultReducer: result,
    SectionReducer: section,
  } = useSelector((state) => state);
  // console.log(result)
  const dispatch = useDispatch();
  const setQuesid = (a) => dispatch(setQuesidact(a));
  const setModal = (a) => dispatch(setModalact(a));

  const changeqid = (id) => {
    // console.log('quesid')
    navigation.closeDrawer();
    if (quesid !== id) setQuesid(id);
  };

  return (
    <Drawer.Section>
      <View style={classes.maindivright}>
        <View style={classes.rightsec1}>
          <Image
            source={require('../../assets/malefig.jpg')}
            style={{
              width: '50%',
              height: 100,
              borderRadius: 35,
              marginLeft: 5,
            }}
          />
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <Text style={{ color: 'black', fontSize: 18 }}>John Doe</Text>
          </View>
        </View>
        <View style={classes.rightsec2}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              margin: 10,
              padding: 3,
            }}
          >
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <Text
                style={{
                  backgroundColor: 'green',
                  color: 'white',
                  padding: 10,
                  borderRadius: 15,
                }}
              >
                {result.answered}
              </Text>
              <Text
                gutterBottom
                style={{ color: 'black', margin: 10, fontSize: 14 }}
              >
                Answered
              </Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <Text
                style={{
                  backgroundColor: 'red',
                  color: 'white',
                  padding: 10,
                  borderRadius: 15,
                }}
              >
                {result.notanswered}
              </Text>
              <Text style={{ color: 'black', margin: 10, fontSize: 14 }}>
                Not Answered
              </Text>
            </View>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              margin: 10,
              padding: 3,
            }}
          >
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <Text
                style={{
                  backgroundColor: 'white',
                  color: 'black',
                  padding: 10,
                  borderRadius: 15,
                }}
              >
                {result.notvisited}
              </Text>
              <Text style={{ color: 'black', margin: 10, fontSize: 14 }}>
                Not Visited
              </Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <Text
                style={{
                  backgroundColor: 'purple',
                  color: 'white',
                  padding: 10,
                  borderRadius: 15,
                }}
              >
                {result.markedforreview}
              </Text>
              <Text style={{ color: 'black', margin: 10, fontSize: 14 }}>
                Marked For Review
              </Text>
            </View>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              margin: 10,
              padding: 3,
            }}
          >
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <Text
                style={{
                  backgroundColor: 'purple',
                  color: 'white',
                  padding: 10,
                  borderRadius: 15,
                }}
              >
                {result.markedanswered}
              </Text>
              <Text style={{ color: 'black', margin: 10, fontSize: 14 }}>
                Answered And Marked for Review
              </Text>
            </View>
          </View>
        </View>
        <View style={classes.rightsec3}>
          <View>
            <Text style={{ color: 'white', margin: 5, padding: 5 }}>
              {section.title}
            </Text>
          </View>
        </View>
        <View style={classes.rightsec4}>
          <View>
            <Text style={{ color: 'black', fontSize: 13, margin: 5 }}>
              Choose a Question
            </Text>
          </View>
          <ScrollView
            contentContainerStyle={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              maxHeight: '100%',
            }}
          >
            {result.sections.map((sec, i) => {
              if (sec._id == section._id)
                return sec.questions.map((res, i) => {
                  if (!res.visited) {
                    return (
                      <Text
                        key={i}
                        onPress={() => changeqid(res._id)}
                        gutterBottom
                        style={{
                          backgroundColor: 'white',
                          color: 'black',
                          padding: 15,
                          borderRadius: 15,
                          margin: 5,
                        }}
                      >
                        {i + 1}
                      </Text>
                    );
                  } else if (res.answered) {
                    return (
                      <Text
                        key={i}
                        onPress={() => changeqid(res._id)}
                        gutterBottom
                        style={{
                          backgroundColor: 'green',
                          color: 'white',
                          padding: 15,
                          borderRadius: 15,
                          margin: 5,
                        }}
                      >
                        {i + 1}
                      </Text>
                    );
                  } else if (res.notanswered) {
                    return (
                      <Text
                        key={i}
                        onPress={() => changeqid(res._id)}
                        gutterBottom
                        style={{
                          backgroundColor: 'red',
                          color: 'white',
                          padding: 15,
                          borderRadius: 15,
                          margin: 5,
                        }}
                      >
                        {i + 1}
                      </Text>
                    );
                  } else if (res.markedforreview) {
                    return (
                      <Text
                        key={i}
                        onPress={() => changeqid(res._id)}
                        gutterBottom
                        style={{
                          backgroundColor: 'purple',
                          color: 'white',
                          padding: 15,
                          borderRadius: 15,
                          margin: 5,
                        }}
                      >
                        {i + 1}
                      </Text>
                    );
                  } else if (res.markedanswered) {
                    return (
                      <Text
                        key={i}
                        onPress={() => changeqid(res._id)}
                        gutterBottom
                        style={{
                          backgroundColor: 'pink',
                          color: 'white',
                          padding: 15,
                          borderRadius: 15,
                          margin: 5,
                        }}
                      >
                        {i + 1}
                      </Text>
                    );
                  }
                });
            })}
          </ScrollView>
        </View>
        <View
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            flexDirection: 'row',
          }}
        >
          <Button
            mode="contained"
            style={{ backgroundColor: '#F0AD4E', width: 0.4 * width }}
            onPress={() => {
              navigation.closeDrawer();
              setModal(true);
            }}
          >
            Submit
          </Button>
        </View>
      </View>
    </Drawer.Section>
  );
}

const classes = StyleSheet.create({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  hamicon: {
    color: '#38A9EB',
    // [theme.breakpoints.up('sm')]:{
    //     display:'none'
    // },
    padding: 0,
  },
  rightsec1: {
    display: 'flex',
    flexDirection: 'row',
    // justifyContent:'flex-end',
    backgroundColor: '#F8FBFF',
    paddingVertical: 10,
  },
  rightsec2: {
    display: 'flex',
    flexDirection: 'column',
    // justifyContent:'flex-end',
    backgroundColor: '#fff',
  },
  rightsec3: {
    display: 'flex',
    flexDirection: 'row',
    // justifyContent:'flex-end',
    backgroundColor: '#4E85C5',
  },
  rightsec4: {
    display: 'flex',
    flexDirection: 'column',
    // justifyContent:'flex-end',
    backgroundColor: '#E5F6FD',
    height: 300,
  },
  maindivright: {
    // flex:1,
    // backgroundColor:'blue',
    display: 'flex',
    flexDirection: 'column',
    // [theme.breakpoints.down('sm')]:{
    //     display:'block'
    // }
  },
});
