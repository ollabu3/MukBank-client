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

export default function LikeListEntry({ item }) {
  // console.log(route);

  return (
    <View style={styles.LikeListBoxContatiner}>
      <TouchableOpacity activeOpacity={1.0}>
        <Grid>
          <LikeListImg item={item} />
          <LikeListText item={item} />
        </Grid>
      </TouchableOpacity>
    </View>
  );
}
