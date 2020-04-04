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

  async function getIsLike() {
    const tokenStr = await AsyncStorage.getItem('jwt');
    const token = await JSON.parse(tokenStr).jwt;
    if (datas !== null) {
      axios({
        method: 'post',
        url: 'https://mukbank.xyz:5001/user/userrestsel',
        headers: { Authorization: `Bearer ${token}` },
        data: {
          rest_id: datas[selectedIndex].id
        }
      }).then(res => {
        console.log('-----------------', res);
        // setLike(res.data);
      });
    }
    // console.log('토큰 값ㅇ~~~~', datas[selectedIndex].id);
  }

  function getLikeCount() {
    if (datas !== null) {
      axios({
        method: 'post',
        url: 'https://mukbank.xyz:5001/restaurant/restlike',
        data: {
          rest_id: datas[selectedIndex].id
        }
      }).then(res => {
        setCount(res.data);
      });
    }
  }

  async function postLike() {
    const tokenStr = await AsyncStorage.getItem('jwt');
    const token = await JSON.parse(tokenStr).jwt;
    axios({
      method: 'post',
      url: 'https://mukbank.xyz:5001/restaurant/restlike',
      headers: { Authorization: `Bearer ${token}` },
      data: {
        rest_id: datas[selectedIndex].id
      }
    }).then(() => {
      setLike(like ? false : true);
    });
  }

  useEffect(() => {
    getLikeCount();
  }, [like]);

  useEffect(() => {
    getIsLike();
  }, []);

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
              {like ? <Text>{count + 1}</Text> : <Text>{Number(count)}</Text>}
            </View>
          </Row>
        </Grid>
      </View>
    </>
  );
}
