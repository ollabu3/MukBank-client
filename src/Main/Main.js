import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

import HomeTab from './HomeTab/HomeTab';
import MyTab from './MyTab/MyTab';

const MainTab = createBottomTabNavigator();

export default function Main({ userInfo, setUserInfo }) {
  return (
    <MainTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        style: {
          height: 60
        },
        labelStyle: {
          fontSize: 12,
          fontFamily: 'NanumGothic-Regular'
        },
        activeTintColor: '#1E1E1E'
      }}
    >
      <MainTab.Screen
        name="Home"
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={37} />
          )
        }}
      >
        {props => (
          <HomeTab {...props} userInfo={userInfo} setUserInfo={setUserInfo} />
        )}
      </MainTab.Screen>
      <MainTab.Screen
        name="My"
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={37} />
          )
        }}
      >
        {props => (
          <MyTab {...props} userInfo={userInfo} setUserInfo={setUserInfo} />
        )}
      </MainTab.Screen>
    </MainTab.Navigator>
  );
}
