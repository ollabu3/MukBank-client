import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

import IntroScreen from './src/Intro/IntroScreen';
import LoginScreen from './src/Login/LoginScreen';
import Main from './src/Main/Main';

axios.defaults.withCredentials = true;

const StackNav = createStackNavigator();

export default function App() {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    snsId: '',
    profile: '',
    provider: ''
  });
  const [isLogin, setIsLogin] = useState(false);
  const [authCheck, setAuthCheck] = useState(false);

  // 첫 랜더링 시 유저토큰이 있으면 유저정보를 담아온다
  async function getUser() {
    try {
      const tokenStr = await AsyncStorage.getItem('jwt');
      if (tokenStr === null) {
        setAuthCheck(true);
        return;
      }

      const token = await JSON.parse(tokenStr).jwt;
      const res = await axios('https://mukbank.xyz:5001/user/info', {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.data === 'failed' || res.data === 'wrong') {
        setUserInfo({
          name: '',
          email: '',
          snsId: '',
          profile: '',
          provider: ''
        });
        setIsLogin(false);
        setAuthCheck(true);
        return;
      }
      setUserInfo(res.data);
      setIsLogin(true);
      setAuthCheck(true);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <NavigationContainer>
      <StackNav.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <StackNav.Screen name="Intro">
          {props => (
            <IntroScreen
              {...props}
              isLogin={isLogin}
              authCheck={authCheck}
              userInfo={userInfo}
            />
          )}
        </StackNav.Screen>
        <StackNav.Screen name="Login">
          {props => (
            <LoginScreen
              {...props}
              userInfo={userInfo}
              setUserInfo={setUserInfo}
              isLogin={isLogin}
              setIsLogin={setIsLogin}
            />
          )}
        </StackNav.Screen>
        <StackNav.Screen name="Main">
          {props => (
            <Main {...props} userInfo={userInfo} setUserInfo={setUserInfo} />
          )}
        </StackNav.Screen>
      </StackNav.Navigator>
    </NavigationContainer>
  );
}
