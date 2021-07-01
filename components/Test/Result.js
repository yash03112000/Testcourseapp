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
  Provider,
  Portal,
  Modal,
} from 'react-native-paper';
import * as WebBrowser from 'expo-web-browser';
import { PieChart } from 'react-native-svg-charts';
import { Circle, G, Line, Text as SVGText } from 'react-native-svg';
import AutoHeightWebView from 'react-native-autoheight-webview';
import Constants from 'expo-constants';

const { manifest } = Constants;

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function Result({ route, navigation }) {
  if (Platform.OS === 'web') {
    server = 'http://localhost:8080';
  } else {
    server = `http://${manifest.debuggerHost.split(':').shift()}:8080`;
  }
  const { id } = route.params;
  const [load, setLoad] = useState(true);
  const [loadques, setLoadques] = useState(true);
  const [quesarr, setQuesarr] = useState([]);
  const [data, setData] = useState({});
  const [piedata, setPieData] = useState([]);
  const [sec, setSec] = useState({});
  const [text, setText] = useState('');
  const [color, setColors] = useState([
    'hsl(260, 70%, 50%)',
    'hsl(100, 70%, 50%)',
    'hsl(343, 70%, 50%)',
    'hsl(75, 70%, 50%)',
    'hsl(259, 70%, 50%)',
  ]);
  const [modal, setModal] = useState(false);
  const [ida, setID] = useState('');

  useEffect(() => {
    initial();
    initial2();
  }, []);

  const initial = async () => {
    // console.log(id)
    var res = await fetch(`${server}/Testserver/result/${id}`, {
      method: 'GET',
    });
    var data = await res.json();
    var a = data.result;
    // console.log(a)
    setData(a);
    setSec(a.sections[0]);
    datafun(a);
  };
  const initial2 = () => {
    fetch(`${server}/Testserver/result/questions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ testid: id }),
    }).then((res) => {
      // console.log(res.status)
      if (res.status === 200) {
        res.json().then((res) => {
          setQuesarr(res.quesarr);
          setLoadques(false);
        });
      }
    });
  };

  const datafun = (data) => {
    var a = [];
    // console.log(data)
    data.sections.map((sec, i) => {
      var b = {};
      b.id = sec.title;
      // b.title = sec.title;
      b.value = sec.score;
      b.key = i;
      b.svg = {
        fill: color[i % color.length],
        onPress: () => {
          setSec(sec);
        },
      };
      a.push(b);
    });
    setPieData(a);
    setLoad(false);
  };

  const Labels = ({ slices }) => {
    return slices.map((slice, index) => {
      const { labelCentroid, pieCentroid, data } = slice;
      return (
        <G key={index}>
          <Line
            x1={labelCentroid[0]}
            y1={labelCentroid[1]}
            x2={pieCentroid[0]}
            y2={pieCentroid[1]}
            stroke={data.svg.fill}
          />
          <SVGText
            key={index}
            x={labelCentroid[0]}
            y={labelCentroid[1]}
            fill={'black'}
            textAnchor={'middle'}
            alignmentBaseline={'middle'}
            fontSize={12}
            stroke={'black'}
            strokeWidth={0.2}
          >
            {data.id}
          </SVGText>
          <SVGText
            key={index + 1 * 100}
            x={pieCentroid[0]}
            y={pieCentroid[1]}
            fill={'black'}
            textAnchor={'middle'}
            alignmentBaseline={'middle'}
            fontSize={12}
            stroke={'black'}
            strokeWidth={0.2}
          >
            {data.value}
          </SVGText>
        </G>
      );
    });
  };
  const CenteredText = ({ slices, height, width }) => {
    return (
      <G>
        <SVGText
          // key={index}
          // x={40}
          // y={height}
          fill={'black'}
          textAnchor={'middle'}
          alignmentBaseline={'middle'}
          fontSize={25}
          stroke={'black'}
          strokeWidth={0.2}
        >
          {data.totalscore}
        </SVGText>
      </G>
    );
  };
  const submit = () => {
    // console.log('here');
    fetch(`${server}/Testserver/report`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ testid: id, id: ida, text }),
    }).then((res) => {
      // console.log(res.status)
      if (res.status === 200) {
        res.json().then((res) => {
          if (res.status == 200) {
            setModal(false);
            setText('');
            setID('');
          }
        });
      }
    });
  };
  const qtype = (ques, quesdet) => {
    // console.log(quesdet)
    // console.log(ques)
    if (ques.question_type === 'SCQ') {
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
      var b = {
        [op1]: 'unchecked',
        [op2]: 'unchecked',
        [op3]: 'unchecked',
        [op4]: 'unchecked',
      };
      var i = 0;
      for (i = 0; i < ques.answer.length; i++) b[ques.answer[i]] = 'checked';
      for (i = 0; i < quesdet.user_response.length; i++)
        a[quesdet.user_response[i]] = 'checked';
      return (
        <View>
          <View style={{ width }}>
            <AutoHeightWebView
              originWhitelist={['*']}
              style={{ margin: 5, padding: 5 }}
              source={{ html: ques.question, baseUrl: server }}
              scalesPageToFit={false}
            />
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Text style={{ color: 'black' }}>
                Total Marks : {quesdet.marks_correct} Your Score :{' '}
                {quesdet.user_score}
              </Text>
              <Text
                style={{ fontSize: 15 }}
                onPress={() => {
                  setID('Test');
                  setModal(true);
                }}
              >
                Report Any Complaint
              </Text>
            </View>
            {ques.option_1.valid ? (
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  marginVertical: 10,
                }}
              >
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                  <RadioButton
                    value={ques.option_1._id}
                    style={{}}
                    status={b[ques.option_1._id]}
                    disabled
                  />
                  <RadioButton
                    value={ques.option_1._id}
                    status={a[ques.option_1._id]}
                    disabled
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
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                  <RadioButton
                    value={ques.option_2._id}
                    style={{}}
                    status={b[ques.option_2._id]}
                    disabled
                  />
                  <RadioButton
                    value={ques.option_2._id}
                    status={a[ques.option_2._id]}
                    disabled
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
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                  <RadioButton
                    value={ques.option_3._id}
                    style={{}}
                    status={b[ques.option_3._id]}
                    disabled
                  />
                  <RadioButton
                    value={ques.option_3._id}
                    status={a[ques.option_3._id]}
                    disabled
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
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                  <RadioButton
                    value={ques.option_4._id}
                    style={{}}
                    status={b[ques.option_4._id]}
                    disabled
                  />
                  <RadioButton
                    value={ques.option_4._id}
                    status={a[ques.option_4._id]}
                    disabled
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
        </View>
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
      var b = {
        [op1]: 'unchecked',
        [op2]: 'unchecked',
        [op3]: 'unchecked',
        [op4]: 'unchecked',
      };
      var i = 0;
      for (i = 0; i < ques.answer.length; i++) b[ques.answer[i]] = 'checked';
      for (i = 0; i < quesdet.user_response.length; i++)
        a[quesdet.user_response[i]] = 'checked';
      return (
        <View>
          <View style={{ width }}>
            <AutoHeightWebView
              originWhitelist={['*']}
              style={{ margin: 5, padding: 5 }}
              source={{ html: ques.question, baseUrl: server }}
              scalesPageToFit={false}
            />
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Text style={{ color: 'black' }}>
                Total Marks : {quesdet.marks_correct} Your Score :{' '}
                {quesdet.user_score}
              </Text>
              <Text
                style={{ fontSize: 15 }}
                onPress={() => {
                  setID('Test');
                  setModal(true);
                }}
              >
                Report Any Complaint
              </Text>
            </View>
            {ques.option_1.valid ? (
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  marginVertical: 10,
                }}
              >
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                  <Checkbox
                    value={ques.option_1._id}
                    style={{}}
                    status={b[ques.option_1._id]}
                    disabled
                  />
                  <Checkbox
                    value={ques.option_1._id}
                    status={a[ques.option_1._id]}
                    disabled
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
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                  <Checkbox
                    value={ques.option_2._id}
                    style={{}}
                    status={b[ques.option_2._id]}
                    disabled
                  />
                  <Checkbox
                    value={ques.option_2._id}
                    status={a[ques.option_2._id]}
                    disabled
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
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                  <Checkbox
                    value={ques.option_3._id}
                    style={{}}
                    status={b[ques.option_3._id]}
                    disabled
                  />
                  <Checkbox
                    value={ques.option_3._id}
                    status={a[ques.option_3._id]}
                    disabled
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
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                  <Checkbox
                    value={ques.option_4._id}
                    style={{}}
                    status={b[ques.option_4._id]}
                    disabled
                  />
                  <Checkbox
                    value={ques.option_4._id}
                    status={a[ques.option_4._id]}
                    disabled
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
        </View>
      );
    } else if (ques.question_type === 'Fill') {
      var b = ques.answer.length > 0 ? ques.answer[0] : '';
      var a = quesdet.user_response[0];
      return (
        <View style={classes.sec7}>
          <View style={{ margin: 10 }}>
            <AutoHeightWebView
              originWhitelist={['*']}
              source={{ html: ques.question, baseUrl: server }}
              scalesPageToFit={false}
            />
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Text style={{ color: 'black' }}>
                Total Marks : {quesdet.marks_correct} Your Score :{' '}
                {quesdet.user_score}
              </Text>
              <Text
                style={{ fontSize: 15 }}
                onPress={() => {
                  setID('Test');
                  setModal(true);
                }}
              >
                Report Any Complaint
              </Text>
            </View>
            <View style={{ margin: 5, padding: 5 }}>
              <TextInput
                style={{ margin: 5, padding: 5, borderColor: 'green' }}
                disabled
                type="username"
                required
                label="Correct Answer"
                name="username"
                variant="outlined"
                size="small"
                autoFocus
                value={b}
              />
              <TextInput
                style={{ margin: 5, padding: 5 }}
                disabled
                type="username"
                required
                label="Your Answer"
                name="username"
                variant="outlined"
                size="small"
                autoFocus
                value={a}
              />
            </View>
          </View>
        </View>
      );
    }
  };

  const qdis = () => {
    var i;
    var a = [];
    for (i = 0; i < quesarr.length; i++) {
      if (sec._id === quesarr[i].secid) {
        var ques = quesarr[i].ques;
        // console.log(quesarr[i])
        var b = (
          <View key={i} style={classes.ques}>
            {qtype(ques, quesarr[i])}
          </View>
        );

        a.push(b);
      }
    }
    for (i = sec.startindex; i <= sec.endindex; i++) {
      var ques = quesarr[i].ques;
      // console.log(quesarr[i])
      var b = (
        <View key={i} style={classes.ques}>
          {qtype(ques, quesarr[i])}
        </View>
      );

      a.push(b);
    }

    return a;
  };

  return load ? (
    <View style={classes.container}>
      <Text>Loading...</Text>
    </View>
  ) : (
    <ScrollView style={classes.container}>
      <View style={classes.mainform}>
        <View style={classes.header}>
          <Text style={{ fontSize: 40 }}>Your Result is ...</Text>
          <Text
            style={{ fontSize: 15 }}
            onPress={() => {
              setID('Test');
              setModal(true);
            }}
          >
            Report Any Complaint
          </Text>
        </View>
        <View style={classes.graph}>
          <PieChart
            style={{ height: 200 }}
            data={piedata}
            innerRadius={60}
            outerRadius={100}
            labelRadius={130}
          >
            <Labels />
            <CenteredText />
          </PieChart>
        </View>
      </View>
      <View style={classes.tablediv}>
        <View style={classes.table}>
          <View style={classes.tr1}>
            <View style={{}}>
              <Text>{sec.title}</Text>
            </View>
          </View>
          <View style={classes.tr}>
            <View>
              <Text>Total Question</Text>
            </View>
            <View>
              <Text>{sec.questions.length}</Text>
            </View>
          </View>
          <View style={classes.tr}>
            <View>
              <Text>Attempted</Text>
            </View>
            <View>
              <Text>{sec.attempt}</Text>
            </View>
          </View>
          <View style={classes.tr}>
            <View>
              <Text>Correct Answers</Text>
            </View>
            <View>
              <Text>{sec.correct}</Text>
            </View>
          </View>
          <View style={classes.tr}>
            <View>
              <Text>Wrong Answers</Text>
            </View>
            <View>
              <Text>{sec.attempt - sec.correct}</Text>
            </View>
          </View>
        </View>
      </View>
      {loadques ? (
        <View>
          <Text>Loading...</Text>
        </View>
      ) : (
        <View style={classes.quesdiv}>{qdis()}</View>
      )}
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
              <Text style={{ fontSize: 25 }}>
                Tell us about your complaint about particular Question/Test
              </Text>
              <TextInput
                style={{ margin: 5, padding: 5, height: 50 }}
                // type="username"
                mode="flat"
                // required
                label="Complaint"
                // name="username"
                // variant="outlined"
                // size="small"
                // autoFocus
                value={text}
                onChangeText={(text) => setText(text)}
              />
              <Button
                variant="contained"
                style={{ backgroundColor: '#449D44' }}
                onPress={submit}
              >
                Submit
              </Button>
            </View>
          </Modal>
        </Portal>
      </Provider>
    </ScrollView>
  );
}

const classes = StyleSheet.create({
  container: {
    // flex:1,
    // alignItems: 'center',
    // justifyContent: 'center',
    height,
  },
  mainform: {
    width: width,
    display: 'flex',
    flexDirection: 'column',
    // height:'100vh'
  },
  header: {
    display: 'flex',
    justifyContent: 'center',
    padding: 30,
    flexDirection: 'column',
    alignItems: 'center',
  },
  graph: {
    // height:0.6*height
  },
  tr1: {
    backgroundColor: 'hsl(240,74%,66%)',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  tr: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  table: {
    width: 0.6 * width,
    backgroundColor: 'hsl(201,87%,63%)',
    display: 'flex',
    flexDirection: 'column',
    marginTop: 20,
  },
  tablediv: {
    width: width,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 20,
  },
  quesdiv: {
    width: width,
    display: 'flex',
    // alignItems:'stretch',
    marginVertical: 20,
    flexDirection: 'column',
  },
  modal: {
    // display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'center',
    height: 0.5 * height,
  },
  paper: {
    backgroundColor: 'white',
    // border: '2px solid #000',
    // boxShadow: theme.shadows[5],
    padding: 0.15 * width,
  },
});
