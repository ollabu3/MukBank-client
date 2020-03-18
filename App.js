/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HateFoodsScreen from './src/Screens/HateFood/HateFoodsScreen';
import IntroScreen from './src/Screens/IntroScreen';
import LoginScreen from './src/Screens/LoginScreen';
import MapScreen from './src/Screens/Map/MapScreen';
import MyPageScreen from './src/Screens/MyPageScreen';
import RecommendBtnScreen from './src/Screens/RecommendBtnScreen';
import MainPlaceScreen from './src/Screens/PlaceList/MainPlaceScreen';

const Stack = createStackNavigator();

export default function App() {
  const [userinfo, setUserInfo] = useState({
    name: '',
    age: '',
    gender: '',
    email: ''
  });
  const [isLogin, setIsLogin] = useState(false);
  const [hateFoods, setHateFoods] = useState(null);

  // user가 접속할 때 정보를 업데이트 해주는 function

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Intro">
          {props => <IntroScreen {...props} isLogin={isLogin} />}
        </Stack.Screen>
        <Stack.Screen name="Login">
          {props => (
            <LoginScreen {...props} userinfo={userinfo} isLogin={isLogin} />
          )}
        </Stack.Screen>
        <Stack.Screen name="HateFoods" component={HateFoodsScreen} />
        <Stack.Screen name="Recommend" component={RecommendBtnScreen} />
        <Stack.Screen name="MainPlace" component={MainPlaceScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="MyPage" component={MyPageScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
