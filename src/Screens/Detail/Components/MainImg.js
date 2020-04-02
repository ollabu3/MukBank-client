import React from 'react';
import { View, Image } from 'react-native';

export default function MainIng({ img, styles }) {
  return (
    <View>
      <Image source={{ uri: img }} style={styles.MainImg} />
    </View>
  );
}
