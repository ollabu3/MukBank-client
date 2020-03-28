import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function ScrollList({ find, setDistance, distance }) {
  const dis = useState([100, 200, 300, 400, 500])[0];
  return (
    <View
      style={{
        position: 'absolute',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingBottom: 1
      }}
    >
      {dis.map(item => {
        return (
          <TouchableOpacity
            style={{}}
            key={item}
            onPress={() => {
              setDistance(item / 1000);
              find();
            }}
          >
            <Text
              style={{
                backgroundColor: '#feee7d',
                borderColor: 'red',
                borderWidth: 2,
                borderRadius: 10,
                fontSize: 20,
                paddingLeft: 3,
                paddingRight: 3
              }}
            >
              {item}m
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
