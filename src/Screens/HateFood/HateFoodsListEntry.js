import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import { CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Row, Grid } from 'react-native-easy-grid';

export default function HateFoodsListEntry(props) {
  const [check, setCheck] = useState(false);
  /*
그림을 
ㅁ ㅁ
ㅁ ㅁ
ㅁ ㅁ
ㅁ ㅁ
ㅁ ㅁ
ㅁ ㅁ 
이런식으로 UI가 디자인 되었으면 좋겠다.
그러려면..!
HateFoodList에서
prop받은 data를 홀수 짝수 배열로 나누고
*/
  var checkIcon = null;
  if (check) {
    checkIcon = <Icon name="check-box-outline" size={30} />;
    // check-circle-outline
  } else {
    checkIcon = <Icon name="checkbox-blank-outline" size={30} />;
    // checkbox-blank-circle-outline
  }

  return (
    <View styles={styles.container}>
      {/* <CheckBox title={props.category} /> */}
      <TouchableOpacity style={styles.Box} onPress={() => setCheck(!check)}>
        {/* <Grid> */}
        <Icon name="food" size={30} />
        <Text style={styles.categoryText}>{props.category}</Text>
        {checkIcon}
        {/* </Grid> */}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  Box: {},
  categoryText: { textAlign: 'center' }
});
