import React, { useEffect } from 'react';
import { View, Alert, ToastAndroid, Image } from 'react-native';
import { Grid, Col } from 'react-native-easy-grid';
import AsyncStorage from '@react-native-community/async-storage';
import KakaoLogins from '@react-native-seoul/kakao-login';
import axios from 'axios';
import {
  statusCodes,
  GoogleSignin,
  GoogleSigninButton
} from '@react-native-community/google-signin';
import styles from './LoginStyles';

import KakaoLogin from './Components/KakaoLogin';
import GoogleLogin from './Components/GoogleLogin';

import { GOOGLE_SIGN_IN_KEY } from '../../config';

GoogleSignin.configure({
  scopes: [],
  webClientId: GOOGLE_SIGN_IN_KEY,
  hostedDomain: '',
  offlineAccess: true
});

axios.defaults.withCredentials = true;

const postUserInfo = async (provider, userData) => {
  try {
    const res = await axios.post(
      `https://mukbank.xyz:5001/auth/${provider}/signin`,
      {
        email: userData.email,
        nick: userData.name || userData.nickname,
        snsId: userData.id,
        userimage: userData.photo || userData.profile_image_url
      }
    );
    await AsyncStorage.setItem('jwt', JSON.stringify(res.data));
  } catch (err) {
    console.log(err);
  }
};
export default function LoginScreen({
  navigation,
  isLogin,
  setIsLogin,
  setUserInfo
}) {
  // 뒤로가기

  useEffect(() => {
    if (isLogin === true) {
      navigation.replace('Main');
    }
  }, [isLogin]);

  const googleSignIn = async () => {
    try {
      const userinfo = await GoogleSignin.signIn();
      await postUserInfo('google', userinfo.user);
      await setUserInfo({
        email: userinfo.user.email,
        nick: userinfo.user.nick,
        snsId: userinfo.user.id,
        userimage: userinfo.user.photo,
        provider: 'google'
      });
      setIsLogin(true);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        ToastAndroid.showWithGravity(
          '로그인이 취소되었습니다',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        Alert.alert('Error', '이미 처리되었습니다');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        Alert.alert('Error', '이용 불가능한 아이디 입니다.');
      } else {
        // some other error happened
        console.log(error);
      }
    }
  };

  const kakaoSignIn = async () => {
    try {
      const login = await KakaoLogins.login();
      if (login.accessToken) {
        const userinfo = await KakaoLogins.getProfile();
        await postUserInfo('kakao', userinfo);
        await setUserInfo({
          email: userinfo.email,
          nick: userinfo.nickname,
          snsId: userinfo.id,
          userimage: userinfo.profile_image_url,
          provider: 'kakao'
        });
        setIsLogin(true);
      } else {
        Alert.alert('Wrong', '다시 로그인을 시도해주세요');
      }
    } catch (error) {
      ToastAndroid.showWithGravity(
        error[0],
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.logoSpace,
          { alignItems: 'flex-end', justifyContent: 'center' }
        ]}
      >
        <Image
          style={styles.logoStyle}
          source={require('./Components/LoginImages/mukbank_logo.png')}
        />
      </View>

      <View style={styles.btnSpace}>
        <Grid>
          <Col size={1} />
          <Col size={4}>
            <KakaoLogin styles={styles} kakaoSignIn={kakaoSignIn} />
            <GoogleLogin styles={styles} googleSignIn={googleSignIn} />
          </Col>
          <Col size={1} />
        </Grid>
      </View>
    </View>
  );
}
