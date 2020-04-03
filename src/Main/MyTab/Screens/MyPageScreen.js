import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { Card, Button, Avatar } from 'react-native-elements';

import styles from './MyPageStyles';
import Profile from './Components/Profile';

export default function MyPageScreen({ userInfo, setUserInfo }) {
  // console.log(userInfo);
  // userInfo.email: YunJu Lee
  // userInfo.nick: YunJu Lee
  // userInfo.userimage

  return (
    <SafeAreaView style={styles.container}>
      <Profile userInfo={userInfo} setUserInfo={setUserInfo} />
      <View style={styles.likeContainer}></View>
    </SafeAreaView>
  );
}
