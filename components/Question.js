import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native';
import {
  ActivityIndicator,
  Colors,
  TextInput,
  Button,
  RadioButton,
  Checkbox,
} from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { setSectionact } from '../redux/SectionReducer';
import { setResultact } from '../redux/ResultReducer';
import { setQuesidact } from '../redux/QuesidReducer';
import { setDataact } from '../redux/DataReducer';
import { setQuesarract } from '../redux/QuesarrayReducer';
import { WebView } from 'react-native-webview';
import AutoHeightWebView from 'react-native-autoheight-webview';
import { Picker } from '@react-native-picker/picker';
import Constants from 'expo-constants';

const { manifest } = Constants;

// var server = 'http://localhost:8080'
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

if (Platform.OS === 'web') {
  server = 'http://localhost:8080';
} else {
  server = `http://${manifest.debuggerHost.split(':').shift()}:8080`;
}

const classes = StyleSheet.create({
  sec1: {
    // height:50,
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
  },
  sec5: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: '#38A9EB',
    padding: 8,
    marginBottom: 10,
  },
  sec7: {
    // overflow:'scroll',
    height: 0.45 * height,
  },
});

export default function Question({ test }) {
  const [lang, setLang] = useState('');
  const [loading, setLoading] = useState(true);
  const [ques, setQues] = useState({});
  const [answer, setAnswer] = useState([]);
  const {
    DataReducer: data,
    QuesidReducer: id,
    QuesarrayReducer: quesarr,
    ResultReducer: result,
    SectionReducer: section,
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  const setSection = (a) => dispatch(setSectionact(a));
  const setResult = (a) => dispatch(setResultact(a));
  const setData = (a) => dispatch(setDataact(a));
  const setQuesid = (a) => dispatch(setQuesidact(a));
  const setQuesarr = (a) => dispatch(setQuesarract(a));
  //   const {id:test} = router.query;

  useEffect(() => {
    initial();
  }, [id]);

  const changeresult = (result, id, data, next) => {
    var i = 0;
    // console.log('quesid')

    for (i = 0; i < result.user_response.length; i++) {
      if (result.user_response[i]._id === id) {
        if (i !== section.endindex) {
          if (next) setQuesid(result.user_response[i + 1]._id);
          setResult(result);
        } else {
          setResult(result);
        }
      }
    }
  };

  const initial = () => {
    setLoading(true);
    var data = [...quesarr];
    data.map((q, i) => {
      if (q._id === id) {
        if (q.done) {
          setQues(q.content.quesbody);
          setAnswer(q.content.response);
          setLoading(false);
        } else {
          fetch(`${server}/Testserver/question`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, test }),
          }).then((res) => {
            // console.log(res.status)
            if (res.status === 200) {
              res.json().then((res) => {
                // console.log(res)
                data[i].content.quesbody = res.quesbody;
                data[i].content.response = res.ques.response;
                data[i].done = true;
                setQues(res.quesbody);
                setAnswer(res.ques.response);
                changeresult(res.result, id, data, false);
                setLoading(false);
              });
            }
          });
        }
      }
    });
  };

  const qnum = (id) => {
    var i = 0;
    for (i = 0; i < result.user_response.length; i++) {
      if (result.user_response[i]._id === id) {
        return i + 1;
      }
    }
  };
  const savefun = () => {
    // setLoading(true);
    fetch(`${server}/Testserver/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, test, answer }),
    }).then((res) => {
      // console.log(res.status)
      if (res.status === 200) {
        res.json().then((res) => {
          var data = [...quesarr];
          data.map((q, i) => {
            if (q._id === id) {
              data[i].content.response = answer;
              changeresult(res.result, id, data, true);
            }
          });
        });
      }
    });
  };
  const clearresponse = () => {
    // setLoading(true);
    fetch(`${server}/Testserver/clearresponse`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, test }),
    }).then((res) => {
      // console.log(res.status)
      if (res.status === 200) {
        res.json().then((res) => {
          var data = [...quesarr];
          data.map((q, i) => {
            if (q._id === id) {
              // console.log('aa')
              data[i].content.response = [];
              setAnswer([]);
              changeresult(res.result, id, data, false);
            }
          });
        });
      }
    });
  };
  const review = () => {
    // setLoading(true);
    fetch(`${server}/Testserver/review`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, test, answer }),
    }).then((res) => {
      // console.log(res.status)
      if (res.status === 200) {
        res.json().then((res) => {
          var data = [...quesarr];
          data.map((q, i) => {
            if (q._id === id) {
              data[i].content.response = answer;
              changeresult(res.result, id, data, true);
            }
          });
        });
      }
    });
  };

  const qtype = (ques) => {
    if (ques.question_type === 'SCQ') {
      // var a = answer.length>0?answer[0]:" ";
      // console.log(a)
      var op1 = ques.option_1._id || 'op1';
      var op2 = ques.option_2._id || 'op2';
      var op3 = ques.option_3._id || 'op3';
      var op4 = ques.option_4._id || 'op4';
      var a = {
        [op1]: 'unchecked',
        [op2]: 'unchecked',
        [op3]: 'unchecked',
        [op4]: 'unchecked',
      };
      var i = 0;
      for (i = 0; i < answer.length; i++) a[answer[i]] = 'checked';
      const fun = (q, res) => {
        a[op1] = 'unchecked';
        a[op2] = 'unchecked';
        a[op3] = 'unchecked';
        a[op4] = 'unchecked';
        if (res === 'checked') a[q] = 'checked';
        var arr = [];
        if (a[op1] === 'checked') arr.push(op1);
        if (a[op2] === 'checked') arr.push(op2);
        if (a[op3] === 'checked') arr.push(op3);
        if (a[op4] === 'checked') arr.push(op4);
        setAnswer(arr);
      };
      return (
        <ScrollView style={classes.sec7}>
          <View style={{ margin: 1, width }}>
            <AutoHeightWebView
              originWhitelist={['*']}
              source={{ html: ques.question, baseUrl: server }}
              scalesPageToFit={false}
            />
            {/* <RadioGroup aria-label="quiz" name="quiz" style={{color:'black',padding:8}}> */}
            {ques.option_1.valid ? (
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  marginVertical: 10,
                }}
              >
                <View style={{}}>
                  <RadioButton
                    value={ques.option_1._id}
                    status={a[ques.option_1._id]}
                    onPress={() => {
                      a[op1] = 'checked';
                      fun(op1, 'checked');
                    }}
                  />
                </View>
                <AutoHeightWebView
                  originWhitelist={['*']}
                  source={{ html: ques.option_1.content, baseUrl: server }}
                  scalesPageToFit={false}
                />
              </View>
            ) : (
              <></>
            )}
            {ques.option_2.valid ? (
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  marginVertical: 10,
                }}
              >
                <View style={{}}>
                  <RadioButton
                    value={ques.option_2._id}
                    status={a[ques.option_2._id]}
                    onPress={() => {
                      a[op2] = 'checked';
                      fun(op2, 'checked');
                    }}
                  />
                </View>
                <AutoHeightWebView
                  originWhitelist={['*']}
                  source={{ html: ques.option_2.content, baseUrl: server }}
                  scalesPageToFit={false}
                />
              </View>
            ) : (
              <></>
            )}
            {ques.option_3.valid ? (
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  marginVertical: 10,
                }}
              >
                <View style={{}}>
                  <RadioButton
                    value={ques.option_3._id}
                    status={a[ques.option_3._id]}
                    onPress={() => {
                      a[op3] = 'checked';
                      fun(op3, 'checked');
                    }}
                  />
                </View>
                <AutoHeightWebView
                  originWhitelist={['*']}
                  source={{ html: ques.option_3.content, baseUrl: server }}
                  scalesPageToFit={false}
                />
              </View>
            ) : (
              <></>
            )}
            {ques.option_4.valid ? (
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  marginVertical: 10,
                }}
              >
                <View style={{}}>
                  <RadioButton
                    value={ques.option_4._id}
                    status={a[ques.option_4._id]}
                    onPress={() => {
                      a[op4] = 'checked';
                      fun(op4, 'checked');
                    }}
                  />
                </View>
                <AutoHeightWebView
                  originWhitelist={['*']}
                  source={{ html: ques.option_4.content, baseUrl: server }}
                  scalesPageToFit={false}
                />
              </View>
            ) : (
              <></>
            )}
          </View>
        </ScrollView>
      );
    } else if (ques.question_type === 'MCQ') {
      var op1 = ques.option_1._id || 'op1';
      var op2 = ques.option_2._id || 'op2';
      var op3 = ques.option_3._id || 'op3';
      var op4 = ques.option_4._id || 'op4';
      var a = {
        [op1]: 'unchecked',
        [op2]: 'unchecked',
        [op3]: 'unchecked',
        [op4]: 'unchecked',
      };
      var i = 0;
      for (i = 0; i < answer.length; i++) a[answer[i]] = 'checked';
      //   console.log(a)
      const fun = (op) => {
        if (a[op] === 'checked') a[op] = 'unchecked';
        else a[op] = 'checked';
        var arr = [];
        if (a[op1] === 'checked') arr.push(op1);
        if (a[op2] === 'checked') arr.push(op2);
        if (a[op3] === 'checked') arr.push(op3);
        if (a[op4] === 'checked') arr.push(op4);
        setAnswer(arr);
      };
      return (
        <ScrollView style={classes.sec7}>
          <View style={{ margin: 1, width }}>
            <AutoHeightWebView
              originWhitelist={['*']}
              source={{ html: ques.question, baseUrl: server }}
              scalesPageToFit={false}
            />
            {/* <RadioGroup aria-label="quiz" name="quiz" style={{color:'black',padding:8}}> */}
            {ques.option_1.valid ? (
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  marginVertical: 10,
                }}
              >
                <View style={{}}>
                  <Checkbox
                    value={ques.option_1._id}
                    status={a[ques.option_1._id]}
                    onPress={() => {
                      fun(op1, 'checked');
                    }}
                  />
                </View>
                <AutoHeightWebView
                  originWhitelist={['*']}
                  source={{ html: ques.option_1.content, baseUrl: server }}
                  scalesPageToFit={false}
                />
              </View>
            ) : (
              <></>
            )}
            {ques.option_2.valid ? (
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  marginVertical: 10,
                }}
              >
                <View style={{}}>
                  <Checkbox
                    value={ques.option_2._id}
                    status={a[ques.option_2._id]}
                    onPress={() => {
                      fun(op2, 'checked');
                    }}
                  />
                </View>
                <AutoHeightWebView
                  originWhitelist={['*']}
                  source={{ html: ques.option_2.content, baseUrl: server }}
                  scalesPageToFit={false}
                />
              </View>
            ) : (
              <></>
            )}
            {ques.option_3.valid ? (
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  marginVertical: 10,
                }}
              >
                <View style={{}}>
                  <Checkbox
                    value={ques.option_3._id}
                    status={a[ques.option_3._id]}
                    onPress={() => {
                      fun(op3, 'checked');
                    }}
                  />
                </View>
                <AutoHeightWebView
                  originWhitelist={['*']}
                  source={{ html: ques.option_3.content, baseUrl: server }}
                  scalesPageToFit={false}
                />
              </View>
            ) : (
              <></>
            )}
            {ques.option_4.valid ? (
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  marginVertical: 10,
                }}
              >
                <View style={{}}>
                  <Checkbox
                    value={ques.option_4._id}
                    status={a[ques.option_4._id]}
                    onPress={() => {
                      fun(op4, 'checked');
                    }}
                  />
                </View>
                <AutoHeightWebView
                  originWhitelist={['*']}
                  source={{ html: ques.option_4.content, baseUrl: server }}
                  scalesPageToFit={false}
                />
              </View>
            ) : (
              <></>
            )}
          </View>
        </ScrollView>
      );
    } else if (ques.question_type === 'Fill') {
      var a = answer.length > 0 ? answer[0] : '';
      return (
        <View style={classes.sec7}>
          <View style={{ margin: 10 }}>
            <AutoHeightWebView
              originWhitelist={['*']}
              source={{ html: ques.question, baseUrl: server }}
              scalesPageToFit={false}
            />
            <TextInput
              mode="flat"
              autoFocus
              value={a}
              onChangeText={(text) => {
                setAnswer([text]);
              }}
            />
          </View>
        </View>
      );
    }
  };

  return (
    <>
      {loading ? (
        <View>
          <Text>Loading...</Text>
        </View>
      ) : (
        <>
          <View style={classes.sec4}>
            <View>
              <Text style={{ color: 'red', padding: 8, margin: 5 }}>
                Question Type : {ques.question_type}
              </Text>
            </View>
          </View>
          <View style={classes.sec5}>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <Text style={{ color: 'white', margin: 6 }}>ViewIn:</Text>
              {/* ,height:30,borderWidth:1,paddingVertical:20,backgroundColor:'#3498db',,marginBottom:10 */}
              <Picker
                // mode="dropdown"
                style={{
                  minWidth: 80,
                  marginRight: 50,
                  alignSelf: 'center',
                  height: 30,
                  backgroundColor: '#3498db',
                }}
                // itemStyle={{justifyContent}}
                selectedValue={lang}
                onValueChange={(itemValue, itemIndex) => {
                  setLang(itemValue);
                }}
              >
                <Picker.Item label="Ten" value={10} />
                <Picker.Item label="Twenty" value={20} />
                <Picker.Item label="Thirty" value={30} />
              </Picker>
            </View>
          </View>
          <View style={classes.sec6}>
            <View>
              <Text style={{ color: 'black', padding: 8 }}>
                Question NO : {qnum(id)}
              </Text>
            </View>
          </View>
          {qtype(ques)}
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 'auto',
            }}
          >
            <Button
              mode="contained"
              onPress={review}
              compact
              style={{ backgroundColor: '#286090', flex: 1 }}
            >
              Mark For Review And Next
            </Button>
            <Button
              mode="contained"
              onPress={clearresponse}
              compact
              style={{ backgroundColor: '#E74500', flex: 1 }}
            >
              Clear Response
            </Button>
            <Button
              mode="contained"
              onPress={savefun}
              compact
              style={{ backgroundColor: '#449D44', flex: 1 }}
            >
              Save And Next
            </Button>
          </View>
        </>
      )}
    </>
  );
}
