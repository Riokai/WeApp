import React, { Component } from 'react'
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import HeaderBar from '../../component/HeaderBar'
import commonStyle from '../../style/common'

export default class Message extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.msg}>
            <View style={commonStyle.horizontal}>
              <Text style={styles.textName}>Kai</Text>
              <Text style={commonStyle.colorGrey}>1楼</Text>
            </View>
            <View><Text style={commonStyle.colorGrey}>2016-10-29 21:16:38</Text></View>
            <View style={styles.wrapContent}>
              <Text>dsfdsfdfdfdeee</Text>
            </View>
            <View style={[styles.wrapContent, commonStyle.flexRight]}>
              <TouchableOpacity onPress={() => {}}>
                <Text>回复</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={commonStyle.line}></View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {

  },
  msg: {
    paddingVertical: 8,
    paddingHorizontal: 10
  },
  wrapContent: {
    marginTop: 5
  },
  textName: {
    color: '#4a82da'
  }

})
