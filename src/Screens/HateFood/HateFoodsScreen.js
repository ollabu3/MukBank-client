import React, { useEffect, useState } from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
// import { FlatList } from 'react-native-gesture-handler';
import { fakeData } from './fakeData';

export default function HateFoodsScreen({ navigation }) {
  const [notSelectedList, setNotSelectedList] = useState(fakeData);
  const [selectedList, setSelectedList] = useState([]);

  console.log(notSelectedList);

  function set() {
    setNotSelectedList([]);
    setSelectedList([]);
  }

  function plus(selected) {
    let selectedArr = selectedList;
    let notSelectedArr = notSelectedList.filter(item => selected !== item);
    selectedArr.push(selected);
    setNotSelectedList(notSelectedArr);
    setSelectedList(selectedArr);
  }

  function minus(selected) {
    let notSelectedArr = notSelectedList;
    let selectedArr = selectedList.filter(item => selected !== item);
    notSelectedArr.push(selected);

    notSelectedArr.sort((a, b) => {
      return a - b;
    });
    setNotSelectedList(notSelectedArr);
    setSelectedList(selectedArr);
  }

  return (
    <View style={{ flex: 1 }}>
      <Button title="back" onPress={() => navigation.navigate('Intro')} />
      <Text>selected</Text>
      <ScrollView horizontal>
        <View style={{ flex: 2, flexDirection: 'row' }}>
          {selectedList.map(item => (
            <Button title={item} onPress={() => minus(item)} />
          ))}
        </View>
      </ScrollView>

      <Text>notSelected</Text>
      <View style={{ flex: 9 }}>
        <ScrollView horizontal>
          <View style={{ flex: 2, flexDirection: 'row' }}>
            {notSelectedList.map(item => (
              <Button title={item} onPress={() => plus(item)} />
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
