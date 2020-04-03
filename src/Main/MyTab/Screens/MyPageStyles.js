import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: { flex: 1 },
  profileBox: {
    flex: 1.2,
    backgroundColor: 'white'
  },
  profileText: {
    marginTop: 10,
    marginBottom: 5,
    textAlign: 'center',
    fontFamily: 'NanumGothic-Bold',
    fontSize: 20,
    color: 'black'
  },
  likeContainer: { flex: 2, alignItems: 'center' },
  LogoutBtn: {
    alignItems: 'flex-end',
    marginRight: '10%'
  },
  likeBox: {
    backgroundColor: 'white',
    width: '93%',
    height: 100,
    marginTop: '2.5%',
    borderRadius: 4,
    elevation: 2
  }
});

export default styles;
