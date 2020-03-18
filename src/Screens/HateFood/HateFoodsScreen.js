import React, { useEffect, useState } from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
// import { FlatList } from 'react-native-gesture-handler';
import { fakeData } from './fakeData';

export default function HateFoodsScreen({ navigation }) {
  const [notSelectedList, setNotSelectedList] = useState(fakeData);
  const [selectedList, setSelectedList] = useState([]);

  return (
    <View style={{ flex: 1 }}>
      <Button title="back" onPress={() => navigation.navigate('Intro')} />
      <Text>selected</Text>
      <ScrollView horizontal>
        <View style={{ flex: 2, flexDirection: 'row' }}>
          {selectedList.map((item, index) => (
            <Button
              key={index}
              title={item}
              type="outline"
              onPress={() => minus(item)}
            />
          ))}
        </View>
      </ScrollView>

      <Text>notSelected</Text>
      <View style={{ flex: 9 }}>
        <ScrollView horizontal>
          <View style={{ flex: 2, flexDirection: 'row' }}>
            {notSelectedList.map((item, index) => (
              <Button key={index} title={item} onPress={() => plus(item)} />
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
