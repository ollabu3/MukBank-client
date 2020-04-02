import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: {
    flex: 10
  },
  carousel: {
    position: 'absolute',
    flex: 1,
    bottom: '1%',
    height: 90
  },
  carouselRenderContainer: {
    padding: 3,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,80,0.5)',
    borderWidth: 1,
    borderRadius: 15
  },
  imageConstainer: {
    flex: 2,
    justifyContent: 'center'
  },
  renderImage: {
    width: '100%',
    height: 70,
    borderColor: 'red',
    borderWidth: 1
  },
  contentsContainer: { flex: 6, marginLeft: 5 },
  detailContainer: { flex: 2, alignItems: 'flex-end', marginRight: 10 },
  contentsText: {
    fontFamily: 'NanumGothic',
    fontSize: 12,
    color: 'black'
  },
  detailBtnContainer: {
    borderRadius: 5,
    borderWidth: 2,
    marginRight: 10,
    marginTop: 10
  },
  detailBtn: {
    backgroundColor: 'rgb(255,255,80)',
    padding: 2,
    fontSize: 15,
    color: 'black'
  },
  currentLocation: {
    backgroundColor: 'white',
    margin: 2,
    marginTop: 13,
    padding: 6,
    width: 35,
    height: 35
  },
  WaingImageText: {
    flex: 1,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 4
  },
  markerNum: {
    position: 'absolute',
    bottom: '25%',
    fontSize: 15,
    fontWeight: 'bold',
    color: 'red'
  }
});
export default styles;
