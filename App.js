/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { BackHandler, Alert, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { GoogleSignin } from '@react-native-community/google-signin';
import KakaoLogins from '@react-native-seoul/kakao-login';

import HateFoodsScreen from './src/Screens/HateFood/HateFoodsScreen';
import IntroScreen from './src/Screens/IntroScreen';
import LoginScreen from './src/Screens/Login/LoginScreen';
import MapScreen from './src/Screens/Map/MapScreen';
import MyPageScreen from './src/Screens/MyPageScreen';
import RecommendBtnScreen from './src/Screens/RecommendBtnScreen';
import MainPlaceScreen from './src/Screens/PlaceList/MainPlaceScreen';
import SelectFoodOrCafeScreen from './src/Screens/SelectFoodOrCafe/SelectFoodOrCafeScreen';

const Stack = createStackNavigator();

axios.defaults.withCredentials = true;

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

  async function getUser() {
    try {
      const tokenStr = await AsyncStorage.getItem('jwt');
      if (tokenStr === null) {
        setAuthCheck(true);
        // console.log('tokenstr, ', tokenStr);
        return;
      }
      const token = await JSON.parse(tokenStr).jwt;
      // console.log('totken ', token);
      // localhost --> 'http://10.0.2.2:5001/user/info'
      const res = await axios('https://mukbank.xyz:5001/user/info', {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.data === 'failed' || res.data === 'wrong') {
        await setUserInfo({
          name: '',
          email: '',
          snsId: '',
          profile: '',
          provider: ''
        });
        await setIsLogin(false);
        await setAuthCheck(true);
        return;
      }
      await setUserInfo(res.data);
      await setIsLogin(true);
      setAuthCheck(true);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getUser();
  }, []);

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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Intro">
          {props => (
            <IntroScreen {...props} isLogin={isLogin} authCheck={authCheck} />
          )}
        </Stack.Screen>
        <Stack.Screen name="Login">
          {props => (
            <LoginScreen
              {...props}
              userInfo={userInfo}
              setUserInfo={setUserInfo}
              backBtn={backBtn}
              isLogin={isLogin}
              setIsLogin={setIsLogin}
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="SelectFoodOrCafe"
          options={{
            headerRight: () => (
              <Button
                onPress={() => {
                  Alert.alert('MukBank', '(테스트)로그아웃 하시겠습니까?', [
                    {
                      text: '아니요',
                      onPress: () => null,
                      style: 'cancel'
                    },
                    {
                      text: '예',
                      onPress: async () => {
                        await signOut();
                        Alert.alert(
                          '로그아웃 되었습니다. 앱을 다시 시작해주세요(테스트메시지)'
                        );
                      }
                    }
                  ]);
                }}
                title="test-logout"
                color="powderblue"
              />
            )
          }}
        >
          {props => <SelectFoodOrCafeScreen {...props} userInfo={userInfo} />}
        </Stack.Screen>

        <Stack.Screen name="HateFoods">
          {props => <HateFoodsScreen {...props} userInfo={userInfo} />}
        </Stack.Screen>
        <Stack.Screen name="Recommend" component={RecommendBtnScreen} />
        <Stack.Screen name="MainPlace" component={MainPlaceScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="MyPage" component={MyPageScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
