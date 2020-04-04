import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import MyPageScreen from './Screens/Mypage/MyPageScreen';
import LikeListScreen from './Screens/LikeList/LikeListScreen';

const MyStack = createStackNavigator();

export default function MyTab({ navigation, userInfo, setUserInfo }) {
  // console.log(userInfo);
  return (
    <MyStack.Navigator
      screenOptions={{
        headerTitleContainerStyle: {
          left: 0,
          right: 0,
          alignItems: 'center'
        },
        headerTitleStyle: {
          fontFamily: 'NanumGothic-Bold',
          fontSize: 17
        }
      }}
    >
      <MyStack.Screen name="MyPage" options={{ title: '마이페이지' }}>
        {props => (
          <MyPageScreen
            {...props}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
          />
        )}
      </MyStack.Screen>
      <MyStack.Screen name="LikeList" options={{ title: '좋아요 리스트' }}>
        {props => (
          <LikeListScreen
            {...props}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
          />
        )}
      </MyStack.Screen>
    </MyStack.Navigator>
  );
}
