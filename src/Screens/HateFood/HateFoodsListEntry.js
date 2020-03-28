import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import { CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Col, Row, Grid } from 'react-native-easy-grid';

export default function HateFoodsListEntry(props) {
  const [check, setCheck] = useState(false);

  var checkIcon = null;
  if (check) {
    checkIcon = <Icon name="check-circle-outline" size={30} color="black" />;
    // check-box-outline
  } else {
    checkIcon = (
      <Icon name="checkbox-blank-circle-outline" size={30} color="black" />
    );
    // checkbox-blank-outline
  }

  return (
    <View styles={styles.container}>
      <TouchableOpacity style={styles.Box} onPress={() => setCheck(!check)}>
        <Grid>
          <Col size={1}>
            <Icon name="food" size={30} style={styles.foodIcon} />
          </Col>
          <Col size={3}>
            <Text style={styles.categoryText}>{props.category}</Text>
          </Col>
          <Col size={1}>{checkIcon}</Col>
        </Grid>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  Box: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  categoryText: { textAlign: 'center' },
  foodIcon: {}
});
