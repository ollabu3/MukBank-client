import React from 'react';
import {
  ScrollView,
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { Card, Avatar } from 'react-native-elements';

import LikeListEntry from './Components/LikeListEntry';
import { FakeData } from './Components/FakeData';

export default function LikeListScreen({
  navigation,
  userInfo,
  setUserInfo,
  route
}) {
  // console.log(route);

  return (
    <ScrollView>
      {FakeData.map(item => (
        <View key={JSON.stringify(item.name)}>
          <LikeListEntry item={item} />
        </View>
      ))}
    </ScrollView>
  );
}

// const styles = StyleSheet.create({});
