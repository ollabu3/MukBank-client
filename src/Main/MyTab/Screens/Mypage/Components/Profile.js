import React from 'react';
import { View, Text } from 'react-native';
import { Grid, Row } from 'react-native-easy-grid';
import { Button, Avatar } from 'react-native-elements';

import styles from '../MyPageStyles';

export default function Profile({ userInfo, setUserInfo }) {
  return (
    <>
      <View style={styles.profileBox}>
        <Grid>
          <Row
            size={1.3}
            style={{ alignItems: 'flex-end', justifyContent: 'center' }}
          >
            {/* 프로필이미지 */}
            <Avatar
              rounded
              size={120}
              source={{
                uri:
                  'https://lh3.googleusercontent.com/a-/AOh14Gg9FSHxSSG4n-e4HBfiOz5b_WfLqbA6c5DnZjU5=s96-c'
              }}
            />
          </Row>
          {/* 프로필 닉네임, 메일 */}
          <Row size={0.6}>
            <View style={styles.profileBox}>
              <Text style={styles.profileText}>Yunju Lee님</Text>
              <Text
                style={[
                  styles.profileText,
                  { fontFamily: 'NanumGothic-Regular', fontSize: 15 }
                ]}
              >
                ollabu3@gmail.com
              </Text>
            </View>
          </Row>
          <Row
            size={0.4}
            style={{ alignItems: 'center', justifyContent: 'center' }}
          >
            <Button
              title="프로필 정보 수정"
              titleStyle={{
                fontFamily: 'NanumGothic-Bold'
              }}
              containerStyle={{ width: 200 }}
            />
          </Row>
        </Grid>
      </View>
    </>
  );
}
