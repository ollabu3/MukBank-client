import React from 'react';
import { Text, View } from 'react-native';
import { Col, Grid } from 'react-native-easy-grid';
import { Divider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../LikeListStyles';

export default function LikeListText({ list, removeAlert }) {
  return (
    <>
      <Col size={3}>
        <Grid>
          <Col size={5}>
            <Text style={styles.listTitleText}>{list.name}</Text>
            <Divider style={{ backgroundColor: 'gray' }} />

            <Text style={[styles.listText, { fontSize: 14.5 }]}>
              {list.address}
            </Text>

            <Text style={styles.listText}>{list.secondchild}</Text>
          </Col>
          <Col size={0.5} style={{ alignItems: 'center' }}>
            <View style={{ marginTop: '10%' }}>
              {/* 아이콘 누를 시 좋아요 리스트 삭제 */}
              <Icon
                name="clear"
                color="grey"
                size={25}
                onPress={() => removeAlert()}
              />
            </View>
          </Col>
        </Grid>
      </Col>
    </>
  );
}
