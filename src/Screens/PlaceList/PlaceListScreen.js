import React, { useState, useEffect, isValidElement } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import PlaceListEntry from './PlaceListEntry';

export default function PlaceListScreen(props) {
  // const [fakeList, setFakeList] = useState(FakeData);
  // console.log(fakeList[0].id);
  // console.log(props, '프롭스');
  // console.log(props);
  // console.log(props.fakeList[0].id);
  return (
    <View style={styles.container}>
      <ScrollView>
        {props.fakeList.map(item => (
          <View>
            <PlaceListEntry
              key={item.id}
              list={item}
              handleListClick={props.handleListClick}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2
  }
});
