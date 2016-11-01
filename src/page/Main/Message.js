import React, { Component } from 'react'
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  Animated
} from 'react-native'
import HeaderBar from '../../component/HeaderBar'
import commonStyle from '../../style/common'

export default class Message extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <TouchableHighlight
            onPress={() => {}}
            underlayColor="#ccc"
          >
            <View>
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
              <View style={commonStyle.line} />
            </View>
          </TouchableHighlight>
        </ScrollView>
        <View style={styles.backdrop}>
          <Animated.View style={{ height: 400, backgroundColor: '#fff'}}>
            <TouchableHighlight
              onPress={() => {}}
              underlayColor="#ccc"
            >
              <View>
                <View style={styles.msg}>
                  <View style={commonStyle.horizontal}>
                    <Text style={styles.textName}>Kai</Text>
                    <Text style={commonStyle.colorGrey}>1楼</Text>
                  </View>
                  <View>
                    <Text style={commonStyle.colorGrey}>2016-10-29 21:16:38</Text>
                  </View>
                  <View style={styles.wrapContent}>
                    <Text>dsfdsfdfdfdeee</Text>
                  </View>
                  <View style={[styles.wrapContent, commonStyle.flexRight]}>
                    <TouchableOpacity onPress={() => {}}>
                      <Text>回复</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={commonStyle.line} />
              </View>
            </TouchableHighlight>
          </Animated.View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  msg: {
    paddingVertical: 8,
    paddingHorizontal: 10
  },
  wrapContent: {
    marginTop: 5
  },
  textName: {
    color: '#2196F3'
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: .7,
    backgroundColor: '#000',
    flex: 1,
    justifyContent: 'flex-end'
  }

})
