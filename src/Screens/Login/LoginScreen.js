import { GOOGLE_SIGN_IN_KEY } from '../../../config';
import React, { useState, useEffect } from 'react';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  BackHandler,
  Alert,
  ToastAndroid,
  Image
} from 'react-native';
import KakaoLogins from '@react-native-seoul/kakao-login';
import {
  statusCodes,
  GoogleSignin,
  GoogleSigninButton
} from '@react-native-community/google-signin';
import AsyncStorage from '@react-native-community/async-storage';
import { Row, Grid, Col } from 'react-native-easy-grid';
import axios from 'axios';

axios.defaults.withCredentials = true;

GoogleSignin.configure({
  scopes: [], // what API you want to access on behalf of the user, default is email and profile
  webClientId: GOOGLE_SIGN_IN_KEY, // client ID of type WEB for your server (needed to verify user ID and offline access)', // client ID of type WEB for your server (needed to verify user ID and offline access)
  hostedDomain: '',
  offlineAccess: true // if you want to access Google API on behalf of the user FROM YOUR SERVER
  // forceCodeForRefreshToken: true // [Android] related to `serverAuthCode`, read the docs link below *.
});

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
  backBtn,
  setUserInfo
}) {
  // 뒤로가기
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backBtn);
    return () => BackHandler.removeEventListener('hardwareBackPress', backBtn);
  }, []);

  useEffect(() => {
    if (isLogin === true) {
      navigation.replace('SelectFoodOrCafe', { isLogin: true });
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
          source={require('./LoginImages/mukbank_logo.png')}
        />
      </View>
      {/*  */}
      <View style={styles.btnSpace}>
        <Grid>
          <Col size={1} />
          <Col size={4}>
            <View style={styles.btnMargin}>
              <TouchableOpacity
                style={[styles.signinBtn, { backgroundColor: '#ffeb00' }]}
                onPress={kakaoSignIn}
              >
                <Grid>
                  <Col
                    size={1.5}
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <Image
                      style={styles.signinImg}
                      source={require('./LoginImages/kakaolink_btn_small.png')}
                    />
                  </Col>
                  <Col
                    size={4}
                    style={{
                      justifyContent: 'center'
                      // backgroundColor: 'red'
                    }}
                  >
                    <Text style={[styles.btnText, { color: '#3c1e1e' }]}>
                      카카오 계정으로 로그인
                    </Text>
                  </Col>
                </Grid>
              </TouchableOpacity>
            </View>
            {/*  */}
            <View>
              <TouchableOpacity
                style={[styles.signinBtn, { backgroundColor: '#ffffff' }]}
                onPress={googleSignIn}
              >
                <Grid>
                  <Col
                    size={1.5}
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <Image
                      style={styles.signinImg}
                      source={require('./LoginImages/googleSignin.png')}
                    />
                  </Col>

                  <Col
                    size={4}
                    style={{
                      justifyContent: 'center'
                      // backgroundColor: 'red'
                    }}
                  >
                    <Text style={styles.btnText}>구글 계정으로 로그인</Text>
                  </Col>
                </Grid>
              </TouchableOpacity>
            </View>
          </Col>
          <Col size={1} />
        </Grid>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  logoSpace: {
    flex: 1.5
    // ,backgroundColor: 'red'
  },
  logoStyle: {
    resizeMode: 'contain',
    height: '100%',
    width: '100%'
  },
  btnSpace: {
    flex: 1.5
  },
  signinBtn: {
    height: 45,
    width: '100%',
    borderRadius: 50,
    elevation: 2
  },
  signinImg: {
    resizeMode: 'contain',
    height: '50%',
    width: '50%'
  },
  btnMargin: { marginTop: '3%', marginBottom: '3%' },
  btnText: { fontSize: 15, fontFamily: 'NanumGothic-Bold' }
});
