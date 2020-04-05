import React from 'react';
import { View, AsyncStorage, TouchableOpacity, Alert } from 'react-native';
import { Grid } from 'react-native-easy-grid';
import axios from 'axios';

import styles from './LikeListStyles';
import LikeListImg from './ListComponents/LikeListImg';
import LikeListText from './ListComponents/LikeListText';

export default function LikeListEntry({ list, navigation, parent }) {
  // console.log(route);
  // console.log(parent);
  // console.log(list);

  async function removeList() {
    //토큰받고
    const tokenStr = await AsyncStorage.getItem('jwt');
    const token = await JSON.parse(tokenStr).jwt;
    // 리스트 보내고
    axios({
      method: 'post',
      url: 'https://mukbank.xyz:5001/user/restlikeupdate',
      headers: { Authorization: `Bearer ${token}` },
      data: {
        rest_id: list.rest_id
      }
    });
  }

  // 지우는 알람
  const removeAlert = () => {
    Alert.alert('MukBank', '리스트를 삭제하시겠습니까?', [
      {
        text: '아니요',
        style: 'cancel',
        onPress: () => null
      },
      {
        text: '예',
        onPress: async () => {
          removeList();
        }
      }
    ]);
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.LikeListBoxContatiner}
        activeOpacity={1.0}
        // 길게누를시에는 리스트 삭제
        onLongPress={() => removeAlert()}
        // 누를 시 디테일로 이동
        onPress={() => {
          navigation.navigate('Detail', {
            id: list.rest_id,
            parent: parent
          });
        }}
      >
        <Grid>
          <LikeListImg list={list} />
          <LikeListText list={list} />
        </Grid>
      </TouchableOpacity>
    </View>
  );
}
