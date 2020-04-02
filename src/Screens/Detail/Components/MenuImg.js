import React from 'react';
import { View, Dimensions } from 'react-native';
import { Image } from 'react-native-elements';

export default function MenuImg({ img, styles }) {
  return (
    <View>
      <Image
        source={{ uri: img }}
        style={{
          width: Dimensions.get('window').width,
          height: 300
        }}
      />
    </View>
  );
}
