import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  MainImg: {
    width: Dimensions.get('window').width,
    height: 300
  },
  title: {
    fontFamily: 'NanumGothic-Bold',
    fontSize: 25,
    color: 'black'
  },
  grid: {
    flexDirection: 'row',
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center'
  },
  gridLeft: {
    alignItems: 'center'
  },
  gridLeftSub: {
    fontFamily: 'NanumGothic-Bold',
    color: 'black'
  },
  gridRightContent: {
    fontFamily: 'NanumGothic'
  },
  divider: { backgroundColor: 'gray', margin: 10 }
});

export default styles;
