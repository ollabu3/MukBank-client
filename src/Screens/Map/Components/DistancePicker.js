import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Picker } from 'react-native';

export default function DistancePicker({ setDistance, distance }) {
  const [selectedValue, setSelectedValue] = useState('100');
  const dis = useState([100, 200, 300, 400, 500])[0];
  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedValue}
        style={{ height: 30, width: 110 }}
        onValueChange={(itemValue, itemIndex) => {
          setDistance(itemValue / 1000);
          setSelectedValue(itemValue);
        }}
      >
        {dis.map((distance, index) => {
          return (
            <Picker.Item key={index} label={distance + 'm'} value={distance} />
          );
        })}
      </Picker>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginLeft: 10,
    flex: 1,
    top: 0,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: '#d1d1d1',
    alignItems: 'center'
  }
});
