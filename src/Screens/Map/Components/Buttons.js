import React, { useState } from 'react';
import { View, Button } from 'react-native';

export default function ScrollList({ find, setDistance }) {
  const dis = useState([100, 200, 300, 400, 500])[0];
  return (
    <View
      style={{
        position: 'absolute',
        width: '120%',
        // backgroundColor: 'red',
        alignItems: 'center',
        flexDirection: 'row'
      }}
    >
      {dis.map(item => {
        return (
          <Button
            title={`${item}m`}
            key={item}
            style={{ flex: 1 }}
            onPress={() => {
              // setDistance(e.target.value);
              find();
              setDistance(item / 1000);
            }}
          />
        );
      })}
    </View>
  );
}
