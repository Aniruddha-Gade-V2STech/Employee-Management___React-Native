import {StyleSheet} from 'react-native';
import {FONT_FAMILY} from '../utils/FontFamily';
import Color from '../utils/Color';

const STYLES = StyleSheet.create({
  radioTextStyle: {
    textAlign: 'left',
    color: Color.black,
    fontFamily: FONT_FAMILY.POPPINS_MEDIUM,
    marginLeft: 5,
    fontWeight: 600,
    letterSpacing: 0.3,
  },
  inputStyle: {
    borderRadius: 100,
    borderColor: Color.light_grey_1,
    fontSize: 14,
    paddingLeft: 5,
  },
  inputWrapper: {
    marginBottom: 10,
  },
  labelStyle: {
    fontSize: 13,
    fontFamily: FONT_FAMILY.POPPINS_MEDIUM,
    color: Color.black,
  },
  pageTextStyle: {
    fontFamily: FONT_FAMILY.POPPINS_REGULAR,
    color: Color.black,
    fontSize: 13,
  },
  bottomButtonView: {
    justifyContent: 'space-between',
    paddingHorizontal: '4%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: '2%',
    backgroundColor: Color.white,
  },
  screenMainView: {
    flex: 1,
    backgroundColor: Color.black,
    paddingHorizontal: '3%',
    paddingVertical: '2%',
  },
  bannerContainer: {
    flex: 1,
    paddingHorizontal: '3%',
  },
  headline: {
    color: Color.white,
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: Color.orange,
    paddingHorizontal: '3%',
    paddingVertical: '1%',
    borderRadius: 15,
    alignSelf: 'center',
  },
  headlineContainer: {
    paddingVertical: 10,
  },
});

export default STYLES;
