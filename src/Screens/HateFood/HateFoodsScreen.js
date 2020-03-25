import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  PermissionsAndroid,
  Alert,
  TouchableHighlight,
  Dimensions,
  Button,
  TouchableOpacity
} from 'react-native';
import axios from 'axios';
import { Avatar, ListItem } from 'react-native-elements';
// import { Button } from 'react-native-elements';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import { FlatList } from 'react-native-gesture-handler';
import { fakeData } from './fakeData';
// import ScrollList from './ScrollList';
import { ScrollView } from 'react-native-gesture-handler';

export default function HateFoodsScreen({ navigation }) {
  const [notSelected, setNotSelected] = useState(null); // 초기 값을 데이터 베이스에서 불러와서 넣어 줘야 한다.
  const [selected, setSelected] = useState(null); // 초기 값을 데이터 베이스에서 불러와서 넣어 줘야 한다.
  const slected = true;
  // 위치 권한 허용 Alert
  async function PermissionsLocation() {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'ReactNativeCode Location Permission',
        message: 'ReactNativeCode App needs access to your location '
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      // Alert.alert('Location Permission Granted.');
      navigation.navigate('Map');
    } else {
      Alert.alert('Location Permission Not Granted');
    }
  }

  // 카테고리 정보를 가져옴
  // useEffect(() => {
  //   axios('https://mukbank.xyz:5001/restaurant/category').then(res => {
  //     setNotSelectedList(res.data.sort());
  //   });
  // }, []);

  function ScrollList() {
    return (
      <ScrollView>
        {fakeData.map(item => {
          return (
            <View>
              <TouchableOpacity
                style={[
                  styles.notSelectedBG,
                  {
                    width: Dimensions.get('window').width,
                    alignItems: 'stretch',
                    flexDirection: 'row'
                  }
                ]}
                onPress={() => {
                  console.log('');
                }}
              >
                <View>
                  <Avatar
                    rounded
                    width={70}
                    imageProps={{ resizeMode: 'cover' }}
                    containerStyle={{ flex: 1 }}
                    source={{
                      uri:
                        'https://i.pinimg.com/474x/42/8a/bb/428abb048635b7bdaf71b629e8e9c70e.jpg'
                    }}
                  />
                </View>
                <View style={{ marginLeft: 3 }}>
                  <Text style={styles.notSelectedTitle}>{item}</Text>
                  <Text style={styles.notSelectedDes}>description</Text>
                </View>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.titlefraim}>
        <Text style={styles.title}>오늘은 그닥...</Text>
      </View>
      <ScrollList />
      <TouchableOpacity
        onPress={() => {
          PermissionsLocation();
        }}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'skyblue',
          borderRadius: 26,
          height: 60
        }}
      >
        <Text style={{ fontSize: 30 }}>음식 추천해줘</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  titlefraim: {
    alignItems: 'center',
    backgroundColor: '#5babd4'
  },
  title: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 35
  },
  notSelectedTitle: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 35
  },
  notSelectedDes: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 35
  },
  notSelectedBG: {
    backgroundColor: 'white'
  },

  selectedTitle: { fontWeight: 'bold', color: 'black', fontSize: 35 },

  selectedDes: { fontWeight: 'bold', color: 'black', fontSize: 35 },
  selectedBG: { backgroundColor: '#d8d8d8' }
});
