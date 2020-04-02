import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

export default function CarouselImg({ item, getLikeCount, styles }) {
  return (
    <>
      <View style={styles.imageConstainer}>
        {item.image ? (
          <TouchableOpacity
            onPress={() => {
              // getLikeCount();
            }}
          >
            <Image source={{ uri: item.image }} style={styles.renderImage} />
          </TouchableOpacity>
        ) : (
          <View style={styles.WaingImageText}>
            <Text style={{ color: 'black', fontWeight: 'bold' }}>이미지</Text>
            <Text style={{ color: 'black', fontWeight: 'bold' }}>준비중</Text>
          </View>
        )}
      </View>
    </>
  );
}
