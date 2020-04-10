/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SelectScreen from './Screens/Select/SelectScreen';
import HateFoodsScreen from './Screens/HateFoods/HateFoodsScreen';
import MapScreen from './Screens/Map/MapScreen';
import DetailScreen from './Screens/Detail/DetailScreen';

const HomeStack = createStackNavigator();

export default function HomeTab({ userInfo }) {
  // function headerTab() {
  //   if (routes.name === 'Select') {
  //     <Header
  //       statusBarProps={{ translucent: true, barStyle: 'light-content' }}
  //       barStyle="light-content" // or directly
  //       centerComponent={{
  //         text: '종류 선택',
  //         style: {
  //           color: 'black',
  //           fontFamily: 'NanumGothic-Bold',
  //           fontSize: 17
  //         }
  //       }}
  //       containerStyle={{
  //         backgroundColor: 'white'
  //         //   justifyContent: 'space-around'
  //       }}
  //     />;
  //   }
  // }

  return (
    <>
      <HomeStack.Navigator
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
        <HomeStack.Screen
          name="Select"
          options={{ title: '종류 선택' }}
          component={SelectScreen}
        />
        <HomeStack.Screen
          name="HateFoods"
          options={{ title: '음식 선택' }}
          component={HateFoodsScreen}
        />
        <HomeStack.Screen name="Map" options={{ title: '지도' }}>
          {props => <MapScreen {...props} userInfo={userInfo} />}
        </HomeStack.Screen>
      </HomeStack.Navigator>
    </>
  );
}
