import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  ActivityIndicator,
  Colors,
  TextInput,
  Button,
  Divider,
} from 'react-native-paper';
import * as WebBrowser from 'expo-web-browser';
import Constants from 'expo-constants';
import * as Linking from 'expo-linking';
const { manifest } = Constants;

export default function LogIn({ navigation }) {
  // var server = 'http://localhost:8080'
  if (Platform.OS === 'web') {
    server = 'http://localhost:8080';
  } else {
    server = `http://${manifest.debuggerHost.split(':').shift()}:8080`;
  }
  const [Name, setName] = useState('');
  const [Password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const handleRedirect = async (event) => {
    // let { path, queryParams } = Linking.parse(url);
    // console.log(Linking.parse(url))
    WebBrowser.dismissBrowser();
  };

  const addLinkingListener = () => {
    Linking.addEventListener('url', handleRedirect);
  };
  const removeLinkingListener = () => {
    // Linking.removeEventListener('url',handleRedirect)
  };

  const fb = async () => {
    // gets the app's deep link
    let redirectUrl = await Linking.getInitialURL();
    console.log(redirectUrl);
    // this should change depending on where the server is running
    let authUrl = `http://localhost:8080/auth/facebook?applogin=true&linkingUri=${Linking.createURL(
      '/?'
    )}`;
    // addLinkingListener()
    try {
      let authResult = await WebBrowser.openAuthSessionAsync(
        authUrl,
        redirectUrl
      );
      if (authResult.type === 'success') {
        navigation.replace('Dashboard');
      }
      // console.log(authResult)
      // await this.setState({ authResult: authResult })
    } catch (err) {
      console.log('ERROR:', err);
    }
    // removeLinkingListener()
    // let result = await WebBrowser.openBrowserAsync(`${server}/auth/facebook`);
    // setResult(result);
  };

  const google = async () => {
    // gets the app's deep link
    let redirectUrl = await Linking.getInitialURL();
    // console.log(redirectUrl)
    // this should change depending on where the server is running
    let authUrl = `http://localhost:8080/auth/google?applogin=true&linkingUri=${Linking.createURL(
      '/?'
    )}`;
    // addLinkingListener()
    try {
      let authResult = await WebBrowser.openAuthSessionAsync(
        authUrl,
        redirectUrl
      );
      console.log(authResult);
      if (authResult.type === 'success') {
        navigation.replace('Dashboard');
      }
      // console.log(authResult)
      // await this.setState({ authResult: authResult })
    } catch (err) {
      console.log('ERROR:', err);
    }
  };

  const login = () => {
    fetch(`${server}/auth/SignUp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: Name, password: Password }),
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((res) => {
          if (res.msg === 'Username Exist') {
            setMsg(res.msg);
          } else {
            navigation.replace('Dashboard');
          }
        });
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.msg}>{msg}</Text>
      <Text style={styles.header}>Create Your TestCourse Account</Text>
      <Divider />
      <View style={styles.btnbox}>
        <Button mode="contained" style={styles.fb} icon="facebook" onPress={fb}>
          SignIn with FaceBook
        </Button>
        <Button
          mode="contained"
          color="black"
          style={styles.google}
          icon="google"
          onPress={google}
        >
          SignIn with Google
        </Button>
      </View>
      <View style={styles.btnbox}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: 0,
            marginVertical: 10,
            height: 100,
          }}
        >
          <TextInput
            label="Username"
            type="outlined"
            style={{ height: 50, padding: 5, backgroundColor: '#fff' }}
            value={Name}
            onChangeText={(text) => setName(text)}
            left={<TextInput.Icon name="email" />}
          />
          <TextInput
            label="Password"
            type="outlined"
            secureTextEntry
            style={{ height: 50, padding: 5, backgroundColor: '#fff' }}
            value={Password}
            onChangeText={(text) => setPassword(text)}
            left={<TextInput.Icon name="lock" />}
          />
        </View>
        <View>
          <Button
            variant="contained"
            type="submit"
            style={{}}
            onPress={login}
            style={styles.submit}
          >
            LogIn
          </Button>
        </View>
      </View>
      <Divider />
      <Text
        component="h4"
        color="primary"
        variant="subtitle1"
        style={styles.header}
        gutterBottom
      >
        Already a User?LogIn{' '}
        <Text
          onPress={() => {
            navigation.replace('/SignUp');
          }}
        >
          Here
        </Text>{' '}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  msg: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 15,
  },
  header: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 10,
    // flex:1
  },
  fb: {
    backgroundColor: '#1A538A',
    width: 250,
    color: 'white',
    marginBottom: 5,
  },
  google: {
    backgroundColor: 'red',
    width: 250,
    color: 'black',
  },
  submit: {
    backgroundColor: '#A436F1',
    width: 250,
    color: 'black',
    marginTop: 20,
  },
  main: {
    // backgroundColor:'green',
    width: 250,
  },
  btnbox: {
    display: 'flex',
    flexDirection: 'column',
    margin: 5,
    // backgroundColor:'green',
    // flex:1
    // marginTop:20,
    // marginBottom:10
  },
});
