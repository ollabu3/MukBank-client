import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { GoogleSignin } from '@react-native-community/google-signin';
import KakaoLogins from '@react-native-seoul/kakao-login';

import MyPageScreen from './Screens/Mypage/MyPageScreen';

const MyStack = createStackNavigator();

export default function MyTab({
  navigation,
  userInfo,
  setUserInfo,
  setIsLogin
}) {
  const signOut = async () => {
    try {
      if (userInfo.provider === 'google') {
        await GoogleSignin.signOut();
      } else if (userInfo.provider === 'kakao') {
        await KakaoLogins.logout();
      }
      await setUserInfo({
        name: '',
        email: '',
        snsId: '',
        profile: '',
        provider: ''
      });

      await AsyncStorage.clear();
      setIsLogin(false);
    } catch (error) {
      console.log(error);
    }
  };

  const logoutProcess = () => {
    Alert.alert('MukBank', '로그아웃 하시겠습니까?', [
      {
        text: '아니요',
        style: 'cancel',
        onPress: () => null
      },
      {
        text: '예',
        onPress: async () => {
          await signOut();
          navigation.replace('Login');
        }
      }
    ]);
  };

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
      <MyStack.Screen
        name="MyPage"
        options={{
          title: '마이페이지',
          headerRight: () => (
            <Button
              onPress={() => {
                logoutProcess();
              }}
              title="Logout"
              color="#b2bec3"
            />
          )
        }}
      >
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
