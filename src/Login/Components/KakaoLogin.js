/* eslint-disable global-require */
/* eslint-disable react/prop-types */
import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { Grid, Col } from 'react-native-easy-grid';

export default function KakaoLogin({ styles, kakaoSignIn }) {
  return (
    <>
      <View style={styles.btnMargin}>
        <TouchableOpacity
          style={[styles.signinBtn, { backgroundColor: '#ffeb00' }]}
          onPress={kakaoSignIn}
        >
          <Grid>
            <Col
              size={1.5}
              style={{
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Image
                style={styles.signinImg}
                source={require('./LoginImages/kakaolink_btn_small.png')}
              />
            </Col>
            <Col
              size={4}
              style={{
                justifyContent: 'center'
              }}
            >
              <Text style={[styles.btnText, { color: '#3c1e1e' }]}>
                카카오 계정으로 로그인
              </Text>
            </Col>
          </Grid>
        </TouchableOpacity>
      </View>
    </>
  );
}
