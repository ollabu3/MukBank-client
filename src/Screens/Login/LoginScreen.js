import React, { useState, useEffect } from 'react';
import {
  BackHandler,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

export default function LoginScreen({
  navigation,
  googleSignIn,
  isLogin,
  backBtn
}) {
  // 뒤로가기
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backBtn);

    return () => BackHandler.removeEventListener('hardwareBackPress', backBtn);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleSize}>MukBank</Text>
      </View>
      <View style={styles.button}>
        <View>
          <TouchableOpacity style={styles.btn1}>
            <Text style={styles.font1}>Facebook 로그인</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity style={styles.btn2}>
            <Text style={styles.font2}>Kakao 로그인</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={styles.btn3}
            onPress={() =>
              googleSignIn().then(() => {
                if (isLogin === true) {
                  navigation.replace('HateFoods');
                }
              })
            }
          >
            <Text style={styles.font3}>Google 로그인</Text>
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
  },
  btn3: {
    marginBottom: 10,
    borderRadius: 5,
    height: '50%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  font3: {
    fontSize: 20
  }
});
