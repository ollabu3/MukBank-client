import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeTab from './HomeTab/HomeTab';
import MyTab from './MyTab/MyTab';

const MainTab = createBottomTabNavigator();
export default function Main({ userInfo, setUserInfo }) {
  return (
    <MainTab.Navigator>
      <MainTab.Screen name="Home">
        {props => (
          <HomeTab {...props} userInfo={userInfo} setUserInfo={setUserInfo} />
        )}
      </MainTab.Screen>
      <MainTab.Screen name="My">
        {props => (
          <MyTab {...props} userInfo={userInfo} setUserInfo={setUserInfo} />
        )}
      </MainTab.Screen>
    </MainTab.Navigator>
  );
}
