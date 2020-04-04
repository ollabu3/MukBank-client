import React from 'react';
import { View } from 'react-native';
import { Col } from 'react-native-easy-grid';
import { Avatar } from 'react-native-elements';
import styles from '../LikeListStyles';

export default function LikeListImg({ item }) {
  return (
    <>
      <Col
        size={1}
        style={{
          marginTop: '3%',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <View>
          {item.image ? (
            <Avatar
              size={80}
              rounded
              source={{
                uri:
                  'https://lh3.googleusercontent.com/a-/AOh14Gg9FSHxSSG4n-e4HBfiOz5b_WfLqbA6c5DnZjU5=s96-c'
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
