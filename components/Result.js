import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View , Dimensions} from 'react-native';
import { ActivityIndicator, Colors,TextInput,Button, Divider } from 'react-native-paper';
import * as WebBrowser from 'expo-web-browser';
import { PieChart } from 'react-native-svg-charts'
import { Circle, G, Line, Text as SVGText } from 'react-native-svg'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


export default function Result({route,navigation}) {

  var uri = 'http://localhost:8080'
  var server = 'http://localhost:8080'
  const { id } = route.params;
  const [load,setLoad] = useState(true)
  const [labelWidth,setlabelWidth] = useState(0)
  const [data,setData] = useState({});
  const [piedata,setPieData] = useState([]);
  const [sec,setSec] = useState({});
  const [color,setColors] = useState(["hsl(260, 70%, 50%)","hsl(100, 70%, 50%)","hsl(343, 70%, 50%)","hsl(75, 70%, 50%)","hsl(259, 70%, 50%)"]);


  useEffect(()=>{
    initial()
  },[])

  const initial = async()=>{
    // console.log(id)
    var res = await fetch(`${server}/Testserver/result/${id}`,{method:"GET"});
    var data = await res.json();
    var a = data.result;
    // console.log(a)
    setData(a)
    setSec(a.sections[0])
    datafun(a)
  }

  const datafun = (data)=>{
    var a = [];
    // console.log(data)
    data.sections.map((sec,i)=>{
        var b = {}
        b.id = sec.title;
        // b.title = sec.title;
        b.value = sec.score;
        b.key = i;
        b.svg = {
          fill: color[(i%color.length)],
          onPress: ()=>{setSec(sec)}
        }
        a.push(b)
    })
      setPieData(a)
      setLoad(false)
  }

  const Labels = ({ slices }) => {
    return slices.map((slice, index) => {
        const { labelCentroid, pieCentroid, data } = slice;
        return (
            <G key={ index }>
                <Line
                    x1={ labelCentroid[ 0 ] }
                    y1={ labelCentroid[ 1 ] }
                    x2={ pieCentroid[ 0 ] }
                    y2={ pieCentroid[ 1 ] }
                    stroke={ data.svg.fill }
                />
                <SVGText
                  key={index}
                  x={labelCentroid[ 0 ]}
                  y={labelCentroid[ 1 ]}
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
                  key={index+1*100}
                  x={pieCentroid[ 0 ]}
                  y={pieCentroid[ 1 ]}
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
        )
    })
}
  const CenteredText = ({ slices,height,width }) => {
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
    )
  }

  return (
    load?
    <View style={classes.container}>
      <Text>
          Loading...
      </Text>
    </View>:
    
    <View style={classes.container}>
      <View style= {classes.mainform}>
          <View style={classes.header}>
            <Text style={{fontSize:40,}} >
                Your Result is ...
            </Text>
          </View>
          <View style={classes.graph}>
            <PieChart style={{ height: 200 }} data={piedata}  innerRadius={ 60 }
                outerRadius={ 100 }
                labelRadius={ 130 } >
              <Labels />
              <CenteredText />
            </PieChart>
          </View>
      </View>
    <View style={classes.tablediv}>
        <View style={classes.table}>
            <View style={classes.tr1}>
                <View style={{}}>
                  <Text>
                      {sec.title}
                  </Text>
                </View>
            </View>
            <View style={classes.tr}>
                <View>
                  <Text>
                      Total Question
                  </Text>
                </View>
                <View>
                  <Text>
                      {sec.endindex-sec.startindex+1}
                  </Text>
                </View>
            </View>
            <View style={classes.tr}>
                <View>
                  <Text>
                      Attempted
                  </Text>
                </View>
                <View>
                  <Text>
                      {sec.attempt}
                  </Text>
                </View>
            </View>                  
            <View style={classes.tr}>
                <View>
                  <Text>
                      Correct Answers
                  </Text>
                </View>
                <View>
                  <Text>
                      {sec.correct}
                  </Text>
                </View>
            </View>
            <View style={classes.tr}>
                <View>
                  <Text>
                      Wrong Answers
                  </Text>
                </View>
                <View>
                  <Text>
                      {sec.attempt - sec.correct}
                  </Text>
                </View>
            </View>
        </View>
      </View>
    </View>

  );
}

const classes = StyleSheet.create({
  container:{
    // flex:1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  mainform:{
    width:width,
    display:'flex',
    flexDirection:'column',
    // height:'100vh'
  },
  header:{
    display:'flex',
    justifyContent:'center',
    padding:30
  },
  graph:{
      // height:0.6*height
  },
  tr1:{
      backgroundColor:'hsl(240,74%,66%)',
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-around',
      padding:10
  },
  tr:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    padding:10

  },
  table:{
      width:0.6*width,
      backgroundColor:'hsl(201,87%,63%)',
      display:'flex',
      flexDirection:'column',
      marginTop:20,
  },
  tablediv:{
      width:width,
      display:'flex',
      flexDirection:'row',
      justifyContent:'center',
      padding:20
  }
});
