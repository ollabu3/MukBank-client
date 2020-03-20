/* eslint-disable no-undef */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { BackHandler, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Google from 'expo-google-app-auth';
import axios from 'axios';

import HateFoodsScreen from './src/Screens/HateFood/HateFoodsScreen';
import IntroScreen from './src/Screens/IntroScreen';
import LoginScreen from './src/Screens/Login/LoginScreen';
import MapScreen from './src/Screens/Map/MapScreen';
import MyPageScreen from './src/Screens/MyPageScreen';
import RecommendBtnScreen from './src/Screens/RecommendBtnScreen';
import MainPlaceScreen from './src/Screens/PlaceList/MainPlaceScreen';

const Stack = createStackNavigator();

axios.defaults.withCredentials = true;

export default function App() {
  const [userinfo, setUserInfo] = useState({
    name: '',
    email: '',
    snsId: '',
    profile: ''
  });
  const [isLogin, setIsLogin] = useState(false);
  const [userToken, setUserToken] = useState('');
  const [hateFoods, setHateFoods] = useState(null);

  // useEffect(() => {
  // BackHandler.addEventListener('hardwareBackPress', handleBackBtn);
  // }, []);

  //login에서 고려해야 할 것
  // 1. DB에 유저가 있는데 토큰이 만료됨 --> login 요청
  // 2. token이 있음 --> isLogin을 true로 해줌
  // 3. 유저가 처음으로 등록을 함 --> DB에 담아줘야 한다 --> 이거는 서버에서 확인하는것 !
  function backBtn() {
    Alert.alert('MukBank', '종료하시겠습니까?', [
      {
        text: '아니요',
        onPress: () => null,
        style: 'cancel'
      },
      { text: '예', onPress: () => BackHandler.exitApp() }
    ]);
    return true;
  }
  //로그인 시 유저정보 보낼 때
  function postUserInfo() {
    axios.post('API', {
      email: userinfo.email,
      nick: userinfo.name,
      profile: userinfo.profile,
      snsId: userinfo.user.id
    });
  }
  //google signin
  const googleSignIn = async () => {
    console.log('googleSignin');
    try {
      const result = await Google.logInAsync({
        androidClientId: '',
        iosClientId: '',
        scopes: ['profile', 'email', 'openid']
      });
      if (result.type === 'success') {
        console.log(result);
        setIsLogin(true);
        // userinfo의 state변경해주고
        setUserInfo({
          name: result.user.name,
          email: result.user.email,
          profile: result.user.photoUrl,
          snsId: result.user.id
        });
        // userinfo를 서버에 보내준다
        // postUserInfo();
      } else {
        console.log('cancelled');
      }
    } catch (e) {
      console.log('error', e);
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Intro">
          {props => <IntroScreen {...props} isLogin={isLogin} />}
        </Stack.Screen>
        <Stack.Screen name="Login">
          {props => (
            <LoginScreen
              {...props}
              userinfo={userinfo}
              isLogin={isLogin}
              googleSignIn={googleSignIn}
              backBtn={backBtn}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="HateFoods">
          {props => (
            <HateFoodsScreen
              {...props}
              userinfo={userinfo}
              isLogin={isLogin}
              backBtn={backBtn}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Recommend" component={RecommendBtnScreen} />
        <Stack.Screen name="MainPlace" component={MainPlaceScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="MyPage" component={MyPageScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
