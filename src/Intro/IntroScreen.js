import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import styles from './IntroStyles';

export default function IntroScreen({ navigation, isLogin, authCheck }) {
  // isLogin이 false면 Login으로 넘어가기 아닐시 hateFoods로 넘어가기
  if (authCheck === true && isLogin === false) {
    setTimeout(() => {
      navigation.replace('Login');
    }, 2000);
  } else if (authCheck === true && isLogin === true) {
    setTimeout(() => {
      navigation.replace('Main');
    }, 2000);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.size}>MukBank</Text>
    </View>
  );
}
