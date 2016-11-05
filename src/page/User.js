import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableHighlight } from 'react-native'
import HeaderBar from '../component/HeaderBar'
import LoginPage from './Login'
import commonStyle from '../style/common'

export default class User extends Component {
  render() {
    const { navigator } = this.props

    const getMenu = title => {
      return (
        <TouchableHighlight
          onPress={() => {
            navigator.push({
              component: LoginPage
            })
          }}
        >
          <View style={styles.menu}>
            <Text>{title}</Text>
          </View>
        </TouchableHighlight>
      )
    }

    return (
      <View style={commonStyle.pageWrapper}>
        <HeaderBar
          title="User"
          statusBar={{ barStyle: 'default' }}
          textStyle={{ color: '#000' }}
          backgroundColor="#fff"
          navigator={navigator}
        />
        <View style={styles.listContainer}>
          <View style={commonStyle.line} />
          {getMenu('登录')}
          <View style={commonStyle.line} />
          {getMenu('setting2')}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: '#f3f3f4',
    flex: 1
  },
  menu: {
    backgroundColor: 'white',
    padding: 10,
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row'
  }
})
