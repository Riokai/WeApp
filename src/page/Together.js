import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import commonStyle from '../style/common'
import HeaderBar from '../component/HeaderBar'
import moment from 'moment'
import 'moment-duration-format'

export default class Together extends Component {
  constructor(props) {
    super(props)

    this.state = {
      text: ''
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  componentDidMount() {
    console.log('navi', this.props.navigator.getCurrentRoutes())
    this.timer = setInterval(() => {
      this.getText()
    }, 1000)
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
    const { navigator, bgcolor } = this.props

    return (
      <View style={commonStyle.pageWrapper}>
        <HeaderBar title="Section 2" navigator={navigator} backgroundColor={bgcolor} />
        <Text style={styles.text}>{this.state.text}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    marginTop: 30,
    textAlign: 'center'
  }
})
