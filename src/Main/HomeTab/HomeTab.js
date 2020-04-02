import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SelectScreen from './Screens/Select/SelectScreen';
import HateFoodsScreen from './Screens/HateFoods/HateFoodsScreen';
import MapScreen from './Screens/Map/MapScreen';
import DetailScreen from './Screens/Detail/DetailScreen';

const HomeStack = createStackNavigator();

export default function HomeTab({ userInfo }) {
  return (
    <>
      <HomeStack.Navigator>
        <HomeStack.Screen name="Select" component={SelectScreen} />
        <HomeStack.Screen
          name="HateFoods"
          options={{ title: '음식 선택' }}
          component={HateFoodsScreen}
        />
        <HomeStack.Screen name="Map">
          {props => <MapScreen {...props} userInfo={userInfo} />}
        </HomeStack.Screen>
        <HomeStack.Screen name="Detail" component={DetailScreen} />
      </HomeStack.Navigator>
    </>
  );
}
