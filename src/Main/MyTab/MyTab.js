import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import MyPageScreen from './Screens/MyPageScreen';

const MyStack = createStackNavigator();

export default function MyTab({ navigation, userInfo, setUserInfo }) {
  // console.log(userInfo);
  return (
    <MyStack.Navigator>
      <MyStack.Screen name="MyPage">
        {props => (
          <MyPageScreen
            {...props}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
          />
        )}
      </MyStack.Screen>
    </MyStack.Navigator>
  );
}
