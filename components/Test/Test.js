import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import {
  ActivityIndicator,
  Colors,
  TextInput,
  Button,
  Portal,
  Modal,
  Provider,
} from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { setSectionact } from '../../redux/SectionReducer';
import { setResultact } from '../../redux/ResultReducer';
import { setQuesidact } from '../../redux/QuesidReducer';
import { setDataact } from '../../redux/DataReducer';
import { setQuesarract } from '../../redux/QuesarrayReducer';
import Question from './Question';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { setModalact } from '../../redux/ModalReducer';
import Constants from 'expo-constants';

const { manifest } = Constants;

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function Test({ route, navigation }) {
  if (Platform.OS === 'web') {
    server = 'http://localhost:8080';
  } else {
    server = `http://${manifest.debuggerHost.split(':').shift()}:8080`;
  }
  const [Msg, setMsg] = useState('');
  const [load, setLoad] = useState(true);
  const {
    DataReducer: data,
    QuesidReducer: quesid,
    QuesarrayReducer: quesarr,
    ResultReducer: result,
    SectionReducer: section,
    ModalReducer: modal,
  } = useSelector((state) => state);

  const dispatch = useDispatch();
  const setSection = (a) => dispatch(setSectionact(a));
  const setResult = (a) => dispatch(setResultact(a));
  const setData = (a) => dispatch(setDataact(a));
  const setQuesid = (a) => dispatch(setQuesidact(a));
  const setQuesarr = (a) => dispatch(setQuesarract(a));
  const setModal = (a) => dispatch(setModalact(a));

  const { id } = route.params;
  //   console.log(id)

  useEffect(() => {
    initial();
  }, []);

  const initial = async () => {
    // console.log(server);
    var res = await fetch(`${server}/Testserver/${id}`, { method: 'GET' });
    if (res.status == 403) {
      navigation.replace('LogIn');
    }
    if (res.status === 200) {
      var data = await res.json();
      console.log(data);
      var test = data.test;
      var result = data.result;
      var arr = [];

      result.sections.map((sec, i) => {
        sec.questions.map((ques) => {
          var a = {};
          a['done'] = false;
          a['_id'] = ques._id;
          a['content'] = {};
          arr.push(a);
        });
      });

      // console.log(arr)
      setData(test);
      setResult(result);
      setQuesarr(arr);
      setSection(test.section_id[0]);
      setQuesid(test.section_id[0].questions[0]._id);
      setLoad(false);
    }
  };

  const secChange = (curr) => {
    // console.log('quesid')

    if (curr.title !== section.title) {
      setSection(curr);
      setQuesid(curr.questions[0]._id);
    }
  };

  const submitTest = () => {
    navigation.closeDrawer();
    fetch(`${server}/Testserver/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ testid: id }),
    }).then((res) => {
      // console.log(res.status)
      if (res.status === 200) {
        res.json().then((res) => {
          if (res.status === 200) {
            // router.replace(`/result/${testid}`)
            navigation.replace('Result', { id });
          }
        });
      }
    });
  };

  return load ? (
    <View style={classes.container}>
      <Text>Loading...</Text>
    </View>
  ) : (
    <View style={classes.container}>
      <View style={classes.header}>
        <View>
          <Text style={{ color: 'white' }}>{data.title}</Text>
        </View>
        <View style={classes.headertextInstruct}>
          <Text style={{ color: 'white' }}>View Instructions</Text>
        </View>
        {/* <Drawer result={result} changeqid={changeqid} section={section} /> */}
      </View>
      <View style={classes.mainView}>
        <View style={classes.mainViewleft}>
          <View style={classes.sec1}>
            {data.section_id.map((sec, index) => {
              return (
                <TouchableOpacity
                  style={{ padding: 5 }}
                  key={index}
                  onPress={() => {
                    secChange(sec);
                  }}
                >
                  <Text
                    style={{
                      backgroundColor: '#38A9EB',
                      color: 'white',
                      padding: 8,
                      margin: 10,
                      borderRadius: 10,
                    }}
                  >
                    {sec.title}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <View style={classes.sec2}>
            <View>
              <View>
                <Text style={{ color: 'black', margin: 5 }}>Section</Text>
              </View>
            </View>
            <View>
              <View>
                <Text style={{ color: 'black', margin: 5 }}>
                  Time Left:00:00
                </Text>
              </View>
            </View>
          </View>
          <View style={classes.sec3}>
            <View>
              <Text
                style={{
                  backgroundColor: '#38A9EB',
                  color: 'white',
                  padding: 8,
                }}
              >
                {section.title}
              </Text>
            </View>
          </View>
          <Question test={id} />
        </View>
      </View>
      <Provider>
        <Portal>
          <Modal
            visible={modal}
            onDismiss={() => {
              setModal(false);
            }}
            contentContainerStyle={classes.modal}
          >
            <View style={classes.paper}>
              <Text style={{ fontSize: 20 }}>Do You Wanna Submit?</Text>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  paddingVertical: 30,
                }}
              >
                <Button
                  mode="contained"
                  style={{ backgroundColor: '#449D44' }}
                  onPress={() => submitTest()}
                >
                  Submit
                </Button>
                <Button
                  mode="contained"
                  style={{ backgroundColor: '#E74500' }}
                  onPress={() => setModal(false)}
                >
                  Cancel
                </Button>
              </View>
            </View>
          </Modal>
        </Portal>
      </Provider>

      {/* <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                style={classes.modal}
                open={modal}
                // onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
                <Fade in={modal}>
                <View style={classes.paper}>
                    <h2 id="transition-modal-title">
                        Do You Wanna Submit
                    </h2>
                    <Button variant="contained" style={{backgroundColor:'#449D44'}} onClick={()=>submitTest()}>
                        Submit
                    </Button>
                    <Button variant="contained" style={{backgroundColor:'#E74500'}} onClick={()=>setModal(false)}>
                        Cancel
                    </Button>
                </View>
                </Fade>
            </Modal> */}
    </View>
  );
}

const classes = StyleSheet.create({
  container: {
    width: width,
    display: 'flex',
    flexDirection: 'column',
    height: height,
  },
  header: {
    backgroundColor: '#363636',
    width: width,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 0.05 * height,
  },
  headertext: {
    color: '#D8EA4D',
    fontSize: 12,
  },
  maindiv: {
    width: width,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 95 * height,
  },
  maindivleft: {
    flex: 3,
    // backgroundColor:'red',
    display: 'flex',
    flexDirection: 'column',
  },
  sec1: {
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEEEEE',
  },
  sec2: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor:'pink'
  },
  sec3: {
    padding: 10,
    //   backgroundColor:
  },
  sec5: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: '#38A9EB',
    padding: 8,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: 'white',
    // border: '2px solid #000',
    // boxShadow: theme.shadows[5],
    padding: 0.15 * width,
  },
});
