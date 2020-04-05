import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

import LikeListEntry from './Components/LikeListEntry';

export default function LikeListScreen({
  navigation,
  userInfo,
  setUserInfo,
  route
}) {
  // console.log(route);

  const [likeList, setLikeList] = useState([]);

  const likeLists = async () => {
    try {
      const tokenStr = await AsyncStorage.getItem('jwt');
      const token = JSON.parse(tokenStr).jwt;
      await axios({
        method: 'post',
        url: 'https://mukbank.xyz:5001/user/userrestlist',
        headers: { Authorization: `Bearer ${token}` },
        data: {
          parent: `${route.params.parent}`
        }
      }).then(res => {
        setLikeList(res.data);
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    likeLists();
  }, []);

  useEffect(() => {
    likeLists();
  }, [likeList]);

  return (
    <ScrollView>
      {likeList.map(list => (
        <View key={JSON.stringify(list.name)}>
          <LikeListEntry
            list={list}
            navigation={navigation}
            parent={route.params.parent}
          />
        </View>
      ))}
    </ScrollView>
  );
}

// const styles = StyleSheet.create({});
