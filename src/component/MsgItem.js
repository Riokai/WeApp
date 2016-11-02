import React, { Component, PropTypes } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native'
import commonStyle from '../style/common'

const shapeData = {
  name: PropTypes.string,
  date: PropTypes.string,
  floor: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  content: PropTypes.string
}

export default class MsgItem extends Component {
  static propTypes = {
    data: PropTypes.shape(shapeData).isRequired,
    toggleBackdrop: PropTypes.func.isRequired
  }

  handleShowMsg() {
    const { toggleBackdrop } = this.props

    toggleBackdrop(true)
  }

  render() {
    const { data } = this.props

    return (
      <TouchableHighlight
        onPress={() => {}}
        underlayColor="#ccc"
      >
        <View>
          <View style={styles.msg}>
            <View style={commonStyle.horizontal}>
              <Text style={styles.textName}>{data.name}</Text>
              <Text style={commonStyle.colorGrey}>{data.floor}楼</Text>
            </View>
            <View><Text style={commonStyle.colorGrey}>{data.date}</Text></View>
            <View style={styles.wrapContent}>
              <Text>{data.content}</Text>
            </View>
            <View style={[styles.wrapContent, commonStyle.horizontal]}>
              <TouchableOpacity onPress={() => this.handleShowMsg()}>
                <Text>展开</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {}}>
                <Text>回复</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={commonStyle.line} />
        </View>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  }
})
