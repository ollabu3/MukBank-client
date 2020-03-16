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
    nickname: '',
    age: '',
    gender: '',
    email: ''
  });
  const [isLogin, setIsLogin] = useState(false);
  const [hateFoods, setHateFoods] = useState(null);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Intro" component={IntroScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="HateFoods" component={HateFoodsScreen} />
        <Stack.Screen name="Recommend" component={RecommendBtnScreen} />
        <Stack.Screen name="MainPlace" component={MainPlaceScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="MyPage" component={MyPageScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
