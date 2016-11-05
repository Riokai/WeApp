import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput
} from 'react-native'
import HeaderBar from '../component/HeaderBar'
import commonStyle from '../style/common'
import Button from '../component/Button'

export default class Login extends Component {
  render() {
    const { navigator } = this.props

    return (
      <View style={commonStyle.pageWrapper}>
        <HeaderBar
          title="登录"
          statusBar={{ barStyle: 'default' }}
          textStyle={{ color: '#000' }}
          backgroundColor="#fff"
          navigator={navigator}
        />
        <View style={styles.listContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>用户名</Text>
            <TextInput
              autoFocus={true}
              multiline={true}
              style={styles.default}
              accessibilityLabel="I am the accessibility label for text input"
            />
          </View>
          {/* <View style={commonStyle.line} /> */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>密码</Text>
            <TextInput
              autoFocus={true}
              multiline={true}
              style={styles.default}
              accessibilityLabel="I am the accessibility label for text input"
            />
          </View>
          {/* <View style={commonStyle.line} /> */}
          <View style={styles.inputContainer}>
            <Button onPress={() => {}}>登录</Button>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: '#f3f3f4',
    paddingTop: 10,
    flex: 1
  },
  inputContainer: {
    backgroundColor: '#fff',
    // marginTop: 10,
    padding: 10
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 4
  },
  default: {
    height: 35,
    // borderWidth: 0.5,
    borderColor: '#0f0f0f',
    borderBottomWidth: 0.5,
    flex: 1,
    fontSize: 13,
    padding: 4,
    paddingHorizontal: 8
  }
})
