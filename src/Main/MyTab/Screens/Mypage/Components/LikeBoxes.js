import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Grid, Col } from 'react-native-easy-grid';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from '../MyPageStyles';

export default function LikeBoxes({
  navigation,
  userInfo,
  setUserInfo,
  likeText
}) {
  return (
    <>
      <TouchableOpacity style={styles.likeBox} activeOpacity={1.0}>
        <Grid>
          <Col size={4} style={{ justifyContent: 'center', marginLeft: '10%' }}>
            <View>
              <Text style={styles.lkeBoxText}>좋아요한 {likeText}</Text>
            </View>
          </Col>
          <Col
            size={1.4}
            style={{
              alignItems: 'flex-end',
              justifyContent: 'center',
              marginRight: '3%'
            }}
          >
            <View>
              <Icon name="chevron-right" size={28} />
            </View>
          </Col>
        </Grid>
      </TouchableOpacity>
    </>
  );
}
