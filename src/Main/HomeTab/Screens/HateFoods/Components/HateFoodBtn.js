import React from 'react';
import { Button } from 'react-native-elements';

import styles from '../HateFoodsStyles';

export default function({ navigation, postHateList, hateList }) {
  return (
    <>
      <Button
        raised
        title="선택 완료"
        style={styles.completeBtn}
        titleStyle={{
          fontFamily: 'NanumGothic-Bold',
          // color: 'black',
          fontSize: 23
        }}
        containerStyle={{ height: 77 }}
        buttonStyle={{
          height: '100%',
          // backgroundColor: '#feee7d',
          borderRadius: 10
        }}
        onPress={() => {
          postHateList();
          navigation.navigate('Map', { parent: '음식점', hateList });
        }}
      />
    </>
  );
}
