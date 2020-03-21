import React from 'react';
import { View, Text, ScrollView } from 'react-native';

export default function ScrollList(props) {
  console.log(props);
  return (
    <ScrollView>
      {props.notSelectedList.map(item => {
        return (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              margin: 10
            }}
          >
            <Text
              style={{
                fontSize: 25,
                fontWeight: 'bold',
                justifyContent: 'center'
              }}
              onPress={() => {
                props.selItem(item);
              }}
            >
              {item}
            </Text>
          </View>
        );
      })}
    </ScrollView>
  );
}
