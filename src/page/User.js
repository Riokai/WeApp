import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableHighlight } from 'react-native'
import HeaderBar from '../component/HeaderBar'
import commonStyle from '../style/common'

export default class User extends Component {
  getMenu(title) {
    return (
      <TouchableHighlight onPress={() => console.log(11111)}>
        <View style={styles.menu}>
          <Text>{title}</Text>
        </View>
      </TouchableHighlight>
    )
  }

  render() {
    return (
      <View style={commonStyle.pageWrapper}>
        <HeaderBar
          title="User"
          statusBar={{barStyle: 'default'}}
          textStyle={{color: '#000'}}
          backgroundColor="#fff"
          navigator={this.props.navigator}
        />
        <View style={styles.listContainer}>
          <View style={commonStyle.line} />
          {this.getMenu('setting1')}
          <View style={commonStyle.line} />
          {this.getMenu('setting2')}
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
    padding: 10, height: 60,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row'
  }
})
