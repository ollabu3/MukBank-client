import React from 'react';
import { View, Text } from 'react-native';

export default function CarouselContent({ item, styles, index, count }) {
  return (
    <>
      <View style={styles.contentsContainer}>
        {item.name.length > 13 ? (
          <Text
            style={[
              styles.contentsText,
              { fontSize: 11, fontFamily: 'NanumGothic-Bold' }
            ]}
          >
            {index + 1 + '. ' + item.name}
          </Text>
        ) : (
          <Text
            style={[
              styles.contentsText,
              { fontSize: 16, fontFamily: 'NanumGothic-Bold' }
            ]}
          >
            {index + 1 + '.' + item.name}
          </Text>
        )}
        {item.firstchild === 'null' ? (
          <Text style={styles.contentsText}>카페</Text>
        ) : (
          <Text style={styles.contentsText}>{item.firstchild}</Text>
        )}
        <Text style={styles.contentsText}>{item.address}</Text>
      </View>
      <View>{count !== '' ? <Text>0</Text> : <Text>{count}</Text>}</View>
    </>
    //
  );
}
