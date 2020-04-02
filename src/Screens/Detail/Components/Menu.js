import React from 'react';
import { Text } from 'react-native';
import { Grid, Col } from 'react-native-easy-grid';

export default function Menu({ menu, styles, grid }) {
  return (
    <Grid>
      <Col size={grid.left} style={styles.gridLeft}>
        <Text style={styles.gridLeftSub}>메뉴</Text>
      </Col>
      <Col size={grid.right} style={styles.gridRight}>
        {menu !== '' ? (
          JSON.parse(menu).map(item => {
            return <Text key={JSON.stringify(item)}>{item}</Text>;
          })
        ) : (
          <></>
        )}
      </Col>
    </Grid>
  );
}
