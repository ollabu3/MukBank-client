import React from 'react';
import { View, Text } from 'react-native';

export default function CarouselLocation({
  styles,
  item,
  navigation,
  datas,
  selectedIndex
}) {
  return (
    <>
      <View style={styles.detailContainer}>
        <Text style={styles.contentsText}>{item.address.split(' ')[2]}</Text>
        <Text style={styles.contentsText}>
          {`${item.distance.toFixed(2)}Km`}
        </Text>
        <View style={styles.detailBtnContainer}>
          <Text
            style={styles.detailBtn}
            onPress={() => {
              navigation.navigate('Detail', { id: datas[selectedIndex].id });
            }}
          >
            Detail
          </Text>
        </View>
      </View>
    </>
  );
}
