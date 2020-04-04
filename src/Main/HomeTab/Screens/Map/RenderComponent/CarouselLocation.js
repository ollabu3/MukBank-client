import React, { useState, useEffect } from 'react';
import { View, Text, Alert, Linking, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Row, Grid } from 'react-native-easy-grid';
import axios from 'axios';

export default function CarouselLocation({
  styles,
  item,
  navigation,
  datas,
  phone,
  selectedIndex
}) {
  const [like, setLike] = useState(false);
  const [count, setCount] = useState(0);

  //처음 getislike 셋팅...
  async function getIsLike() {
    const tokenStr = await AsyncStorage.getItem('jwt');
    const token = await JSON.parse(tokenStr).jwt;

    if (item !== null) {
      axios({
        method: 'post',
        url: 'https://mukbank.xyz:5001/user/userrestsel',
        headers: { Authorization: `Bearer ${token}` },
        data: {
          rest_id: item.id
        }
      }).then(res => {
        setLike(res.data);
      });
    }
  }

  function getLikeCount() {
    if (item !== null) {
      axios({
        method: 'post',
        url: 'https://mukbank.xyz:5001/restaurant/restlike',
        data: {
          rest_id: item.id
        }
      }).then(res => {
        if (res) {
          setCount(res.data.count);
        } else {
          setCount(0);
        }
      });
    }
  }

  async function postLike() {
    const tokenStr = await AsyncStorage.getItem('jwt');
    const token = await JSON.parse(tokenStr).jwt;
    axios({
      method: 'post',
      url: 'https://mukbank.xyz:5001/user/restlikeupdate',
      headers: { Authorization: `Bearer ${token}` },
      data: {
        rest_id: item.id
      }
    }).then(res => {
      setLike(res.data.likecheck);
    });
  }

  //item의 기준으로 useeffect 좋아요 를 실행시킨다...
  useEffect(() => {
    if (datas[selectedIndex].id === item.id) {
      getIsLike();
      getLikeCount();
    }
  }, [like, selectedIndex, item]);

  return (
    <>
      <View style={styles.detailContainer}>
        <Grid>
          <Row style={{ alignItems: 'center' }}>
            {phone ? (
              <Icon
                name="phone"
                size={25}
                color="black"
                onPress={() => {
                  Alert.alert('전화하시겠습니까?', `${phone}`, [
                    {
                      text: '전화',
                      onPress: () =>
                        Linking.openURL(`tel: ${phone.split('-').join('')}`)
                    },
                    {
                      text: '아니요'
                    }
                  ]);
                }}
              />
            ) : (
              <></>
            )}
          </Row>
          <Row>
            {datas[selectedIndex].id === item.id ? (
              <View
                style={{ flexDirection: 'row', justifyContent: 'flex-start' }}
              >
                {like ? (
                  <Icon
                    name="cards-heart"
                    size={25}
                    color="red"
                    onPress={() => {
                      postLike();
                    }}
                  />
                ) : (
                  <Icon
                    name="heart-outline"
                    size={25}
                    color="black"
                    onPress={() => {
                      postLike();
                    }}
                  />
                )}
                {<Text>{count}</Text>}
              </View>
            ) : (
              <></>
            )}
          </Row>
        </Grid>
      </View>
    </>
  );
}
