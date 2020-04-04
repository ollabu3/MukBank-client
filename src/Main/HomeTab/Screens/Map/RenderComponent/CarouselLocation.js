import React from 'react';
import { View, Text, Alert, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Row, Grid, Col } from 'react-native-easy-grid';

export default function CarouselLocation({
  styles,
  item,
  navigation,
  datas,
  count,
  phone,
  like,
  postLike,
  selectedIndex
}) {
  return (
    <>
      <View style={styles.detailContainer}>
        <Grid>
          <Row style={{ alignItems: 'center' }}>
            {phone ? (
              <Icon
                name="phone"
                size={25}
                color="black"
                onPress={() => {
                  Alert.alert('전화하시겠습니까?', `${phone}`, [
                    {
                      text: '전화',
                      onPress: () =>
                        Linking.openURL(`tel: ${phone.split('-').join('')}`)
                    },
                    {
                      text: '아니요'
                    }
                  ]);
                }}
              />
            ) : (
              <></>
            )}
          </Row>
          <Row>
            <View
              style={{ flexDirection: 'row', justifyContent: 'flex-start' }}
            >
              {like ? (
                <Icon
                  name="cards-heart"
                  size={25}
                  color="red"
                  onPress={() => {
                    postLike();
                  }}
                />
              ) : (
                <Icon
                  name="heart-outline"
                  size={25}
                  color="black"
                  onPress={() => {
                    postLike();
                  }}
                />
              )}
              {like ? <Text>{count + 1}</Text> : <Text>{Number(count)}</Text>}
            </View>
          </Row>
        </Grid>
      </View>
    </>
  );
}
