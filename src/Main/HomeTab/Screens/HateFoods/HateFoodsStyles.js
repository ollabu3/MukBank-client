import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  // Btn자리
  titleText: {
    fontFamily: 'NanumGothic-ExtraBold',
    textAlign: 'center',
    fontSize: 35,
    color: 'black'
  },
  completeBtn: {
    backgroundColor: '#feee7d',
    borderRadius: 10
  },

  //Entry자리
  boxMargin: {
    marginBottom: '2.5%',
    marginTop: '2.5%',
    marginLeft: '8%',
    marginRight: '8%'
  },
  Box: {
    height: 140,
    borderRadius: 10,
    justifyContent: 'center',
    backgroundColor: 'white',
    elevation: 4
  },
  categoryImage: { height: '80%', width: '80%', position: 'relative' },
  categoryText: {
    textAlign: 'center',
    fontFamily: 'NanumGothic-Bold',
    fontSize: 20,
    color: 'black'
  }
});

export default styles;
