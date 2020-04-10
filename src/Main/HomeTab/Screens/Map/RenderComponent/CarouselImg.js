import React from 'react';
import { View, Text, Image } from 'react-native';
import { Avatar } from 'react-native-elements';

export default function CarouselImg({ item, getLikeCount, styles }) {
  return (
    <>
      <View style={styles.imageConstainer}>
        {item.image ? (
          <Avatar
            rounded
            size={60}
            source={{
              uri: item.image
            }}
          />
        ) : (
          <Avatar
            size={60}
            rounded
            title={'이미지\n준비중'}
            titleStyle={{ fontSize: 11, fontFamily: 'NanumGothic-Regular' }}
            onPress={() => console.log('Works!')}
            activeOpacity={0.7}
          />
        )}
      </View>
    </>
  );
}
