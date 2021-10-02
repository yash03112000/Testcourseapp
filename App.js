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
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LogIn from './components/LogIn';
import Dashboard from './components/Dashboard';
import SignUp from './components/SignUp';
import Test from './components/Test/Test';
import Result from './components/Test/Result';
import DrawerCom from './components/Test/DrawerCom';
import Payment from './components/Payment';
import Home from './components/Tab/Home';
import TestTab from './components/Tab/Test';
import Search from './components/Tab/Search';
import CourseTab from './components/Tab/Course';
import DigitalTab from './components/Tab/Digital';
import Course from './components/Course/index';
import Digital from './components/Digital/index';
import Learn from './components/Learn/index';
import TestInstructions from './components/TestInstructions/index';

import {
  MaterialCommunityIcons,
  Ionicons,
  AntDesign,
  FontAwesome,
} from 'react-native-vector-icons';
import { Provider as StoreProvider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import store from './redux/store';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Tab" component={TabCom} />
          <Stack.Screen name="LogIn" component={LogIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="DrawerNav" component={DrawerNav} />
          <Stack.Screen name="Result" component={Result} />
          <Stack.Screen name="Payment" component={Payment} />
          <Stack.Screen name="Course" component={Course} />
          <Stack.Screen name="Digital" component={Digital} />
          <Stack.Screen name="Learn" component={Learn} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="TestInstructions" component={TestInstructions} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const DrawerNav = ({ route }) => {
  // const { id } = route.params;
  // console.log(id)

  return (
    <StoreProvider store={store}>
      <Drawer.Navigator drawerContent={(props) => <DrawerCom {...props} />}>
        <Drawer.Screen name="Test" component={Test} />
      </Drawer.Navigator>
    </StoreProvider>
  );
};

const TabCom = () => {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="My Course"
        component={CourseTab}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="codesquare" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="My Test"
        component={TestTab}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="graduation-cap" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="My Downloads"
        component={DigitalTab}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="clouddownload" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
