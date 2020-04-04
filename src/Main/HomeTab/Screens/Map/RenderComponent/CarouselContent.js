import React from 'react';
import { View, Text, Button } from 'react-native';
import { Divider } from 'react-native-elements';

export default function CarouselContent({ item, styles, index, count }) {
  return (
    <>
      <View style={styles.contentsContainer}>
        <View style={{ flexDirection: 'row' }}>
          {item.name.length > 13 ? (
            <Text
              style={[
                styles.contentsText,
                {
                  fontSize: 11,
                  fontFamily: 'NanumGothic-Bold',
                  marginRight: 20
                }
              ]}
            >
              {index + 1 + '. ' + item.name}
            </Text>
          ) : (
            <Text
              style={[
                styles.contentsText,
                {
                  fontSize: 16,
                  fontFamily: 'NanumGothic-Bold',
                  marginRight: 20
                }
              ]}
            >
              {index + 1 + '.' + item.name}
            </Text>
          )}
          <View style={{ fontWeight: 'bold' }}>
            <Text style={[styles.contentsText, { fontWeight: 'bold' }]}>
              {`${item.distance.toFixed(2) * 1000}m`}
            </Text>
          </View>
        </View>
        <Divider style={styles.divider} />
        {item.firstchild === 'null' ? (
          <Text style={styles.contentsText}>카페</Text>
        ) : (
          <Text style={styles.contentsText}>{item.firstchild}</Text>
        )}
        <Text style={styles.contentsText}>{item.address}</Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={[styles.contentsText, { paddingRight: 20 }]}>
            {item.address.split(' ')[2]}
          </Text>
        </View>
      </View>
    </>
    //
  );
}
