import React from 'react';
import { Text } from 'react-native';
import { Grid, Col } from 'react-native-easy-grid';

export default function Phone({ phone, styles, grid }) {
  return (
    <Grid>
      <Col size={grid.left} style={styles.gridLeft}>
        <Text style={styles.gridLeftSub}>전화번호</Text>
      </Col>
      <Col size={grid.right} style={styles.gridRight}>
        <Text>{phone}</Text>
      </Col>
    </Grid>
  );
}
