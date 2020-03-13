import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HateFoodsScreen from './src/Screens/HateFoodsScreen';
import IntroScreen from './src/Screens/IntroScreen';
import LoginScreen from './src/Screens/LoginScreen';
import MapScreen from './src/Screens/MapScreen';
import MyPageScreen from './src/Screens/MyPageScreen';
import PlaceListScreen from './src/Screens/PlaceListScreen';
import RecommendBtnScreen from './src/Screens/RecommendBtnScreen';

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
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="HateFoods" component={HateFoodsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
