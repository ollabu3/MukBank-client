import React, { useState, useEffect } from 'react';

import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { GoogleSigninButton } from '@react-native-community/google-signin';
export default function LoginScreen({
  navigation,
  googleSignIn,
  isLogin,
  kakaoSignin
}) {
  // 뒤로가기
  // useEffect(() => {
  //   BackHandler.addEventListener('hardwareBackPress', backBtn);

  //   return () => BackHandler.removeEventListener('hardwareBackPress', backBtn);
  // }, []);

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
            onPress={() => {
              kakaoSignin();
              if (isLogin === true) {
                navigation.replace('HateFoods');
              }
            }}
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
