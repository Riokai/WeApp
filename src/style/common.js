import { StyleSheet, Platform } from 'react-native'

export default StyleSheet.create({
  pageWrapper: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'ios' ? 22 : 0
  }
})
