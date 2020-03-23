import React, { useState, useEffect } from 'react';

import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import KakaoLogins from '@react-native-seoul/kakao-login';

import { GoogleSigninButton } from '@react-native-community/google-signin';
export default function LoginScreen({
  navigation,
  googleSignIn,
  // kakaoSignin,
  isLogin,
  setIsLogin
}) {
  // console.log('로그인스크린', isLogin, setIsLogin);

  // 뒤로가기
  // useEffect(() => {
  //   BackHandler.addEventListener('hardwareBackPress', backBtn);

  //   return () => BackHandler.removeEventListener('hardwareBackPress', backBtn);
  // }, []);

  // //카카오 로그인
  // function getKakaoProfile() {
  //   return new Promise((resolve, reject) => {
  //     KakaoLogins.getProfile((err, result) => {
  //       if (result !== null && result !== undefined) {
  //         resolve({ success: true, result: result });
  //       }
  //       if (err) {
  //         reject({ success: false, result: err });
  //       }
  //     });
  //   });
  // }

  // const kakaoSignin = () => {
  //   console.log('KakaoSignin');
  //   KakaoLogins.login(async (err, result) => {
  //     console.log(result); // 토큰 찍힘
  //     if (result !== null && result !== undefined) {
  //       setIsLogin(true); // true되어야 한다. true해줘도 이럼!
  //       console.log('앱', isLogin);
  //       try {
  //         const profile = await getKakaoProfile();
  //         if (profile.success) {
  //           // 프로필 받아오기 성공
  //           // // 프로필정보를 받아온 후 해야할 것들
  //           console.log('프로필 결과값', profile.result);
  //         } else throw profile.result;
  //       } catch (error) {
  //         console.log('getKakaoProfile error ', error);
  //       }
  //     }
  //     if (err) {
  //       console.log('Error', err);
  //       return;
  //     }
  //   });
  // };
  useEffect(() => {
    console.log('LoginScreen에서 useEffect 했다');
    if (isLogin === true) {
      navigation.replace('HateFoods', { isLogin: true });
    }
  }, [isLogin]);

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleSize}>MukBank</Text>
      </View>
      <View style={styles.button}>
        <View>
          <TouchableOpacity>
            <GoogleSigninButton
              style={{ width: `100%`, height: 60, justifyContent: 'center' }}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Dark}
              onPress={googleSignIn}
            />
            {/* <Text style={styles.font1}>Facebook 로그인</Text> */}
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={styles.btn2}
            onPress={() =>
              KakaoLogins.login()
                .then(() => {
                  KakaoLogins.getProfile().then(() => {
                    setIsLogin(true);
                  });
                })
                .catch(err => {
                  throw err;
                })
            }
          >
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
