import React from 'react';
import { Text } from 'react-native';
import { Grid, Col } from 'react-native-easy-grid';

export default function Address({ address, styles, grid }) {
  return (
    <Grid>
      <Col size={grid.left} style={styles.gridLeft}>
        <Text style={styles.gridLeftSub}>주소</Text>
      </Col>
      <Col size={grid.right} style={styles.gridRight}>
        <Text style={styles.gridRightContent}>{address}</Text>
      </Col>
    </Grid>
  );
}
