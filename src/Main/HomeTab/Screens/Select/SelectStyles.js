import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: 'white'
  },
  headRow: {
    // backgroundColor: 'pink',
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  titleText: {
    fontFamily: 'NanumGothic-ExtraBold',
    fontSize: 40,
    color: 'black'
  },
  btnCol: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  btn: {
    height: '100%',
    width: '100%',
    borderRadius: 11,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5
  },
  btnMargin: {
    marginRight: '5%',
    marginLeft: '5%'
  },
  selectText: {
    fontFamily: 'NanumGothic-Bold',
    fontSize: 25,
    color: 'black'
  },
  imgStyle: {
    height: '90%',
    width: '65%',
    position: 'relative',
    marginTop: '5%'
  }
});

export default styles;
