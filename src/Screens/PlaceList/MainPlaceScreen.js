import React, { useState, useEffect } from 'react';
import { Linking, Alert, View, Text, Button, StyleSheet } from 'react-native';
import { FakeData } from './FakeData';
import PlaceListScreen from './PlaceListScreen';

export default function MainPlaceScreen({ navigation }) {
  // console.log(this.props);
  const [mainPlace, setMainPlace] = useState(FakeData[0]);
  const [fakeList, setFakeList] = useState(FakeData);

  function handleListClick(main) {
    setMainPlace(main);
  }

  // 다시선택 누를 시 fakeDatalist가 랜덤으로 선택돼서 mainscreen에 뿌려짐
  const randomNum = Math.floor(Math.random() * fakeList.length); //최댓값도 포함, 최솟값도 포함
  const randomList = fakeList[randomNum];
  function handleRandomBtnClick(main) {
    setMainPlace(main);
  }

  const showAlert = () => {
    // console.log(phoneCall);

    Alert.alert('전화하시겠습니까?', `${mainPlace.phoneNumber}`, [
      {
        text: '전화',
        onPress: () =>
          Linking.openURL(`tel: ${mainPlace.phoneNumber.split('-').join('')}`)
      },
      {
        text: '아니요'
      }
    ]);
  };

  return (
    <View style={styles.container}>
      <Text> 이곳은 어떠신가요?</Text>
      <View>
        <Text>{mainPlace.place}</Text>
        <Text>{mainPlace.menu}</Text>
        <Text>{mainPlace.distance}</Text>
        <Text>{mainPlace.phoneNumber}</Text>
      </View>
      <View>
        <Button
          title="다시선택"
          onPress={() => handleRandomBtnClick(randomList)}
        />
        <Button title="전화" onPress={showAlert} style={styles.btn} />
        <Button title="길찾기" />
      </View>
      <PlaceListScreen fakeList={fakeList} handleListClick={handleListClick} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  btn: {
    backgroundColor: '#4ba37b',
    width: 100,
    borderRadius: 50,
    alignItems: 'center',
    marginTop: 100,
    textAlign: 'center',
    padding: 20
  }
});
