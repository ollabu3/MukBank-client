import React from 'react';
import { Text } from 'react-native';
import { Col } from 'react-native-easy-grid';
import { Divider } from 'react-native-elements';
import styles from '../LikeListStyles';

export default function LikeListText({ list }) {
  return (
    <>
      <Col size={3}>
        <Text style={styles.listTitleText}>{list.name}</Text>

        <Divider style={{ backgroundColor: 'gray' }} />

        <Text style={[styles.listText, { fontSize: 14.5 }]}>
          {list.address}
        </Text>

        <Text style={styles.listText}>{list.secondchild}</Text>
      </Col>
    </>
  );
}
