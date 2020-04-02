import React, { useState, useEffect } from 'react';
import { View, Button, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import MyPageScreen from './Screens/MyPageScreen';

const MyStack = createStackNavigator();

export default function MyTab({ navigation, userInfo, setUserInfo }) {
  // console.log(userInfo);
  return (
    // 넘져줘야 하니까!라고 생각합니다..
    <MyStack.Navigator>
      <MyStack.Screen name="MyPage" component={MyPageScreen} />
    </MyStack.Navigator>
  );
}
