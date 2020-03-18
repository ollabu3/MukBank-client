/* eslint-disable no-console */
import React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import * as Google from 'expo-google-app-auth';

axios.defaults.withCredentials = true;

export default function LoginScreen({
  navigation,
  userinfo,
  isLogin,
  getUserinfo
}) {
  //login에서 고려해야 할 것
  // 1. DB에 유저가 있는데 토큰이 만료됨 --> login만 요청하면 된다
  // 2. 유저가 처음으로 등록을 함 --> DB에 담아줘야 한다 --> 이거는 서버에서 확인하는것 !

  //google signin
  const signIn = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId: '',
        iosClientId: '',
        scopes: ['profile', 'email', 'openid']
      });
      if (result.type === 'success') {
        console.log(result);
      } else {
        console.log('cancelled');
      }
    } catch (e) {
      console.log('error', e);
    }
  };

  return (
    <View>
      <Text>Login</Text>
      <Button title="google" onPress={() => signIn()} />
    </View>
  );
}

// import React from 'react';
// import { View, Text, Button } from 'react-native';

// export default function LoginScreen({ navigation }) {
//   return (
//     <View>
//       <Text>Login</Text>
//       <Button onPress={() => navigation.replace('HateFoods')} />
//     </View>
//   );
// }
