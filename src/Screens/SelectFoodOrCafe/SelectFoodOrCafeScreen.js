/* eslint-disable react/prop-types */
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View
} from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';

export default function SelectFoodOrCafeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.titleText}>
          뭐 먹고 싶어요?{'\n'}
          {'\n'}
        </Text>

        <View>
          <Grid style={styles.gridStyle}>
            <Col>
              <TouchableOpacity
                style={styles.columnBtn}
                onPress={() => navigation.navigate('Map')}
              >
                <Text style={styles.columnBtnText}>디저트</Text>
              </TouchableOpacity>
            </Col>
            <Col>
              <TouchableOpacity
                style={styles.columnBtn}
                onPress={() => navigation.navigate('HateFoods')}
              >
                <Text style={styles.columnBtnText}>음식점</Text>
              </TouchableOpacity>
            </Col>
          </Grid>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    backgroundColor: 'white'
  },
  titleText: {
    marginTop: '40%',
    fontSize: 40,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  gridStyle: {
    alignItems: 'center',
    marginLeft: '14%'
  },
  columnBtn: {
    width: '70%',
    height: 110,
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
