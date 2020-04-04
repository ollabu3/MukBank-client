import React from 'react';
import { View } from 'react-native';
import { Col } from 'react-native-easy-grid';
import { Avatar } from 'react-native-elements';
import styles from '../LikeListStyles';

export default function LikeListImg({ list }) {
  return (
    <>
      <Col
        size={1}
        style={{
          // marginTop: '3%',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '10%'
        }}
      >
        <View>
          {list.image ? (
            <Avatar
              size={80}
              rounded
              source={{
                uri: `${list.image}`
              }}
            />
          ) : (
            <Avatar
              size={80}
              rounded
              titleStyle={{ fontSize: 12, fontFamily: 'NanumGothic-Bold' }}
              title={`이미지${'\n'}준비중`}
            />
          )}
        </View>
      </Col>
    </>
  );
}
