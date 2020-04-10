import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  logoSpace: {
    flex: 1.5
    // ,backgroundColor: 'red'
  },
  logoStyle: {
    resizeMode: 'contain',
    height: '100%',
    width: '100%'
  },
  btnSpace: {
    flex: 1.5
  },
  signinBtn: {
    height: 45,
    width: '100%',
    borderRadius: 50,
    elevation: 2
  },
  signinImg: {
    resizeMode: 'contain',
    height: '50%',
    width: '50%'
  },
  btnMargin: { marginTop: '3%', marginBottom: '3%' },
  btnText: { fontSize: 15, fontFamily: 'NanumGothic-Bold' }
});
export default styles;
