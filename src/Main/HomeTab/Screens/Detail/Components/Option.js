import React from 'react';
import { Text } from 'react-native';
import { Grid, Col } from 'react-native-easy-grid';

export default function Option({ option, styles, grid }) {
  return (
    <Grid>
      <Col size={grid.left} style={styles.gridLeft}>
        <Text style={styles.gridLeftSub}>부대시설</Text>
      </Col>
      <Col size={grid.right} style={styles.gridRight}>
        {option ? (
          JSON.parse(option).map(item => {
            return <Text key={JSON.stringify(item)}>{item}</Text>;
          })
        ) : (
          <></>
        )}
      </Col>
    </Grid>
  );
}
