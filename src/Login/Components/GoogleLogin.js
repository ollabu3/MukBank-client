import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { Grid, Col } from 'react-native-easy-grid';

export default function KakaoLogin({ styles, googleSignIn }) {
  return (
    <>
      <View style={styles.btnMargin}>
        <TouchableOpacity
          style={[styles.signinBtn, { backgroundColor: '#ffffff' }]}
          onPress={googleSignIn}
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
                source={require('./LoginImages/googleSignin.png')}
              />
            </Col>

            <Col
              size={4}
              style={{
                justifyContent: 'center'
              }}
            >
              <Text style={styles.btnText}>구글 계정으로 로그인</Text>
            </Col>
          </Grid>
        </TouchableOpacity>
      </View>
    </>
  );
}
