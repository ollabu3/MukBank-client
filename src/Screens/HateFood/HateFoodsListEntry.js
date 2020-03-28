import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Col, Row, Grid } from 'react-native-easy-grid';

export default function HateFoodsListEntry(props) {
  const [check, setCheck] = useState(false);

  var checkIcon = null;
  if (check) {
    checkIcon = <Icon name="check-circle-outline" size={25} color="black" />;
    // check-box-outline
  } else {
    checkIcon = (
      <Icon name="checkbox-blank-circle-outline" size={25} color="black" />
    );
    // checkbox-blank-outline
  }

  return (
    <View styles={styles.container}>
      <TouchableOpacity
        style={[styles.Box, styles.boxMargin]}
        onPress={() => setCheck(!check)}
      >
        <Grid>
          <Col size={1} style={{ justifyContent: 'center' }}>
            <Icon name="food" size={30} style={styles.foodIcon} />
          </Col>
          <Col size={3} style={{ justifyContent: 'center' }}>
            <Text style={styles.categoryText}>{props.category}</Text>
          </Col>
          <Col size={1} style={{ justifyContent: 'center' }}>
            {checkIcon}
          </Col>
        </Grid>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  boxMargin: {
    marginBottom: '2.5%',
    marginTop: '2.5%',
    marginLeft: '4%',
    marginRight: '4%'
  },
  Box: {
    height: 120,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    elevation: 7
  },
  categoryText: {
    textAlign: 'center',
    fontFamily: 'NanumGothic-Bold',
    fontSize: 20,
    color: 'black'
  },
  foodIcon: {}
});
