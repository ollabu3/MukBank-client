import React from 'react';
import { View, Text, Button } from 'react-native';

export default function LoginScreen({ navigation }) {
  return (
    <View>
      <Text>Login</Text>
      <Button onPress={() => navigation.replace('HateFoods')} />
    </View>
  );
}
