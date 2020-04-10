import React from 'react';
import { Text } from 'react-native';
import { Grid, Col } from 'react-native-easy-grid';

export default function Clock({ clock, styles, grid }) {
  return (
    <Grid>
      <Col size={grid.left} style={styles.gridLeft}>
        <Text style={styles.gridLeftSub}>영업시간</Text>
      </Col>
      <Col size={grid.right} style={styles.gridRight}>
        <Text>{clock}</Text>
      </Col>
    </Grid>
  );
}
