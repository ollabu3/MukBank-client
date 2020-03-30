import React, { useState, useEffect } from 'react';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  BackHandler,
  Alert
} from 'react-native';
import KakaoLogins from '@react-native-seoul/kakao-login';
import {
  statusCodes,
  GoogleSignin,
  GoogleSigninButton
} from '@react-native-community/google-signin';
import AsyncStorage from '@react-native-community/async-storage';

import axios from 'axios';

axios.defaults.withCredentials = true;

GoogleSignin.configure({
  scopes: [], // what API you want to access on behalf of the user, default is email and profile
  webClientId: '', // client ID of type WEB for your server (needed to verify user ID and offline access)
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
      // console.log(userinfo);
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
        Alert.alert('Error', '로그인이 취소되었습니다');
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
        setIsLogin(true);
        setUserInfo({
          email: userinfo.email,
          nick: userinfo.nickname,
          snsId: userinfo.id,
          userimage: userinfo.profile_image_url,
          provider: 'kakao'
        });
      } else {
        Alert.alert('Wrong', '다시 로그인을 시도해주세요');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleSize}>MukBank</Text>
      </View>
      <View style={styles.button}>
        <View>
          <GoogleSigninButton
            style={{ width: `100%`, height: 60, justifyContent: 'center' }}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={googleSignIn}
          />
        </View>
        <View>
          <TouchableOpacity style={styles.btn2} onPress={kakaoSignIn}>
            <Text style={styles.font2}>Kakao 로그인</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white'
  },
  title: {
    flex: 3,
    width: '100%',
    height: '18%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleSize: {
    fontSize: 40,
    fontWeight: 'bold'
  },
  button: {
    flex: 1,
    justifyContent: 'center'
  },
  btn1: {
    marginBottom: 10,
    borderRadius: 5,
    height: '50%',
    backgroundColor: '#3b5998',
    alignItems: 'center',
    justifyContent: 'center'
  },
  font1: {
    fontSize: 20
  },
  btn2: {
    marginBottom: 10,
    borderRadius: 5,
    height: '50%',
    backgroundColor: '#f7e600',
    alignItems: 'center',
    justifyContent: 'center'
  },
  font2: {
    fontSize: 20
  }
});
