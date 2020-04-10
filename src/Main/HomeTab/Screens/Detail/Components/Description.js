import React from 'react';
import { Text } from 'react-native';
import { Grid, Col } from 'react-native-easy-grid';

export default function Description({ des, styles, grid }) {
  return (
    <Grid>
      <Col size={grid.left} style={styles.gridLeft}>
        <Text style={styles.gridLeftSub}>설명</Text>
      </Col>
      <Col size={grid.right} style={styles.gridRight}>
        <Text>{des}</Text>
      </Col>
    </Grid>
  );
}
