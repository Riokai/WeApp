import { StyleSheet, Platform } from 'react-native'

export default StyleSheet.create({
  pageWrapper: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'ios' ? 22 : 0
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  flexRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  line: {
    height: 0.4,
    opacity: 0.5,
    backgroundColor: 'darkgray'
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  colorGrey: {
    color: '#8a8a8a'
  }
})
