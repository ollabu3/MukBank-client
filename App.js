/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { BackHandler, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import axios from 'axios';

import HateFoodsScreen from './src/Screens/HateFood/HateFoodsScreen';
import IntroScreen from './src/Screens/IntroScreen';
import LoginScreen from './src/Screens/Login/LoginScreen';
import MapScreen from './src/Screens/Map/MapScreen';
import MyPageScreen from './src/Screens/MyPageScreen';
import RecommendBtnScreen from './src/Screens/RecommendBtnScreen';
import MainPlaceScreen from './src/Screens/PlaceList/MainPlaceScreen';
import SelectFoodOrCafeScreen from './src/Screens/SelectFoodOrCafe/SelectFoodOrCafe';
const Stack = createStackNavigator();

axios.defaults.withCredentials = true;

export default function App() {
  const [userInfo, setUserInfo] = useState({
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
  function postUserInfo(provider) {
    axios.post('API', {
      email: userInfo.email,
      nick: userInfo.name,
      profile: userInfo.profile,
      snsId: userInfo.user.id,
      provider: provider
    });
  }

  //google signin
  // const googleSignin = async () => {
  //   try {
  //     const result = await GoogleSignin.signIn();
  //     console.log(result);
  //   } catch (error) {
  //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
  //       Alert.alert('Error', '로그인이 취소되었습니다');
  //     } else if (error.code === statusCodes.IN_PROGRESS) {
  //       // operation (e.g. sign in) is in progress already
  //       Alert.alert('Error', '이미 처리되었습니다');
  //     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
  //       // play services not available or outdated
  //     } else {
  //       // some other error happened
  //     }
  //   }
  // };

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
        />

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
