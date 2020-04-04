import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { Grid, Col } from 'react-native-easy-grid';
import { Avatar, Divider } from 'react-native-elements';

import styles from './LikeListStyles';
import LikeListImg from './ListComponents/LikeListImg';
import LikeListText from './ListComponents/LikeListText';

export default function LikeListEntry({ list, navigation, parent }) {
  // console.log(route);
  // console.log(parent);
  // console.log(list);
  return (
    <View>
      <TouchableOpacity
        style={styles.LikeListBoxContatiner}
        activeOpacity={1.0}
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
