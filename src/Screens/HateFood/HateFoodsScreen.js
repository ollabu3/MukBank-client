import React, { useEffect, useState } from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import axios from 'axios';
// import { FlatList } from 'react-native-gesture-handler';
import { fakeData } from './fakeData';

export default function HateFoodsScreen({ navigation }) {
  const [notSelectedList, setNotSelectedList] = useState(fakeData);
  const [selectedList, setSelectedList] = useState([]);

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

  useEffect(() => {
    let aaa = [];
    axios('https://mukbank.xyz:5001/hello')
      .then(res => {
        for (let i = 0; i < 40; i++) {
          aaa.push(res.data + i);
        }
      })
      .then(() => {
        setNotSelectedList(aaa);
      });
    // setNotSelectedList(aaa);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'red' }}>
        <Text>selected</Text>
        <ScrollView horizontal>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            {selectedList.map((item, index) => (
              <View style={{ margin: 1 }}>
                <Button key={index} title={item} onPress={() => minus(item)} />
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
      {/* <Button title="back" onPress={() => navigation.navigate('Intro')} /> */}

      <View style={{ flex: 5, backgroundColor: 'skyblue' }}>
        <Text>notSelected</Text>
        <View style={{ flex: 8 }}>
          <ScrollView horizontal>
            <View
              style={{
                flex: 2,
                flexDirection: 'row',
                alignItems: 'flex-start'
              }}
            >
              {notSelectedList.map((item, index) => (
                <View style={{ margin: 1 }}>
                  <Button key={index} title={item} onPress={() => plus(item)} />
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
}
