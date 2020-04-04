import React from 'react';
import { SafeAreaView, View } from 'react-native';

import styles from './MyPageStyles';
import Profile from './Components/Profile';
import LikeBoxes from './Components/LikeBoxes';

export default function MyPageScreen({ navigation, userInfo, setUserInfo }) {
  // console.log(userInfo);
  // userInfo.email: YunJu Lee
  // userInfo.nick: YunJu Lee
  // userInfo.userimage

  return (
    <SafeAreaView style={styles.container}>
      <Profile userInfo={userInfo} setUserInfo={setUserInfo} />
      <View style={styles.likeContainer}>
        <LikeBoxes
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          navigation={navigation}
          likeText={'음식점'}
        />
        <LikeBoxes
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          likeText={'카페'}
        />
      </View>
    </SafeAreaView>
  );
}
