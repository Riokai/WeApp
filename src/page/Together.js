import React, { Component } from 'react'
import { View, Text } from 'react-native'
import commonStyle from '../style/common'
import moment from 'moment'
import 'moment-duration-format'

export default class Together extends Component {
  constructor(props) {
    super(props)

    this.state = {
      text: ''
    }
  }

  componentDidMount() {
    setInterval(() => {
      this.getText()
    }, 1000);
  }

  getText() {
    const timeBefore = moment('2014-01-12', 'YYYY-MM-DD')
    const timeNow = moment()
    const timeDelta = moment.duration(timeNow.diff(timeBefore))
    const format = 'D天H小时m分s秒'
    const text = timeDelta.format(format)

    this.setState({text})
  }

  render() {
    return (
      <View style={commonStyle.pageWrapper}>
        <Text>{this.state.text}</Text>
      </View>
    )
  }
}
