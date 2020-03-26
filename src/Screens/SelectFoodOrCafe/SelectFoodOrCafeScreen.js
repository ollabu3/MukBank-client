/* eslint-disable react/prop-types */
import React from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Row, Grid } from 'react-native-easy-grid';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: 'white'
  },
  titleText: {
    fontSize: 40,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  btn: {
    width: '35%',
    borderRadius: 10,
    backgroundColor: '#feee7d',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5
  },
  columnBtnText: {
    fontSize: 25,
    color: 'black'
  }
});

export default function SelectFoodOrCafeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Grid>
        <Row size={2} />
        <Row size={1} style={{ justifyContent: 'center' }}>
          <Text style={styles.titleText}>뭐 먹고 싶어요?</Text>
        </Row>
        <Row size={1} style={{ justifyContent: 'center' }}>
          <TouchableOpacity
            style={[styles.btn, { marginRight: '5%' }]}
            onPress={() => navigation.navigate('Map')}
          >
            <Text style={styles.columnBtnText}>디저트</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btn, { marginLeft: '5%' }]}
            onPress={() => navigation.navigate('HateFoods')}
          >
            <Text style={styles.columnBtnText}>음식점</Text>
          </TouchableOpacity>
        </Row>
        <Row size={2} />
      </Grid>
    </SafeAreaView>
  );
}
