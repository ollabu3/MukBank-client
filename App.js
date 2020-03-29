/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { BackHandler, Alert, Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {
  statusCodes,
  GoogleSignin,
  GoogleSigninButton
} from '@react-native-community/google-signin';
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

export default function App({ navigation }) {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    snsId: '',
    profile: '',
    provider: ''
  });
  const [isLogin, setIsLogin] = useState(false);
  const [userToken, setUserToken] = useState('');
  const [hateFoods, setHateFoods] = useState(null);
  const [authCheck, setAuthCheck] = useState(false);

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

  // useEffect(() => {
  //   axios.get('https://mukbank.xyz:5001/hello').then(res => {
  //     console.log(res.data);
  //     setUserToken('test');
  //   });
  // }, []);

  // clear()
  // clearAsyncStorage = async () => {
  //   AsyncStorage.clear();
  // };

  // AsyncStorage.clear();

  async function getUser() {
    try {
      const tokenStr = await AsyncStorage.getItem('jwt');
      if (tokenStr === null) {
        console.log('token 이 없습니다');
        setAuthCheck(true);
        return;
      }
      const token = await JSON.parse(tokenStr).jwt;
      console.log('togkenStr: ', tokenStr);
      console.log('toeken:', token);

      // 'http://10.0.2.2:5001/user/info'
      const res = await axios('https://mukbank.xyz:5001/user/info', {
        headers: { Authorization: `Bearer ${token}` }
      });

      console.log('res.data~~~~ ', res.data);
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
      console.log('res.data~~~~ ', res.data);

      await setUserInfo(res.data);
      // await setUserToken('ttt');
      await setIsLogin(true);
      setAuthCheck(true);
    } catch (err) {
      console.log(err);
    }

    // console.log('info::', userInfo);

    // AsyncStorage.getItem('jwt').then(tokenStr => {
    //   const token = JSON.parse(tokenStr).jwt;
    //   axios
    //     .get('http://10.0.2.2:5001/user/info', {
    //       headers: { Authorization: `Bearer ${token}` }
    //     })
    //     .then(res => {
    //       console.log(res.data);
    //       // setUserToken('test');
    //     })
    //     .catch(err => console.log(err));
    // });
  }

  useEffect(() => {
    getUser();
  }, []);

  // console.log('userInfo~~~', userInfo);

  // 로그인 시 유저정보 보낼 때
  // `https://mukbank.xyz:5001/auth/${provider}/signin`
  // function postUserInfo(provider, userData) {
  //   axios
  //     .post(`http://localhost:5001/auth/${provider}/signin`, {
  //       email: userData.user.email,
  //       nick: userData.user.name,
  //       snsId: userData.user.id,
  //       userimage: userData.user.photo
  //     })
  //     .then(res => console.log('res: ', res.data))
  //     .cathch(err => console.log('err: ', err));
  // }

  const signOut = async () => {
    try {
      // await GoogleSignin.revokeAccess();
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
          component={SelectFoodOrCafeScreen}
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
                        alert(
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
        ></Stack.Screen>
        <Stack.Screen name="HateFoods">
          {props => <HateFoodsScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Recommend" component={RecommendBtnScreen} />
        <Stack.Screen name="MainPlace" component={MainPlaceScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="MyPage" component={MyPageScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// drawer
// https://snack.expo.io/?platform=android&name=Tab%20navigation%20%7C%20React%20Navigation&dependencies=%40react-native-community%2Fmasked-view%40%5E0.1.7%2C%40react-navigation%2Fnative%40%5E5.1.3%2C%40react-navigation%2Fbottom-tabs%40%5E5.2.4%2C%40react-navigation%2Fdrawer%40%5E5.3.4%2C%40react-navigation%2Fmaterial-bottom-tabs%40%5E5.1.6%2C%40react-navigation%2Fmaterial-top-tabs%40%5E5.1.6%2C%40react-navigation%2Fstack%40%5E5.2.6%2Creact-native-reanimated%40%5E1.7.0%2Creact-native-safe-area-context%40%5E0.7.3%2Creact-native-screens%40%5E2.4.0&sourceUrl=https%3A%2F%2Freactnavigation.org%2Fexamples%2F5.x%2Fdrawer-open-close-toggle.js
