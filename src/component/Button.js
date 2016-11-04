import React, { Component } from 'react'
import {
  TouchableHighlight,
  Text,
  StyleSheet
} from 'react-native'

export default class Button extends Component {
  constructor(props) {
    super(props)

    this.state = {
      active: false
    }
  }

  onHighlight() {
    this.setState({ active: true })
  }

  onUnhighlight() {
    this.setState({ active: false })
  }

  render() {
    const colorStyle = {
      color: this.state.active ? '#fff' : '#000',
    }

    return (
      <TouchableHighlight
        onHideUnderlay={this.onUnhighlight.bind(this)}
        onPress={this.props.onPress.bind(this)}
        onShowUnderlay={this.onHighlight.bind(this)}
        style={[styles.button, this.props.style]}
        underlayColor="rgba(0, 0, 0, 0.1)"
      >
        <Text style={[styles.buttonText, colorStyle]}>{this.props.children}</Text>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    flex: 1,
    height: 44,
    alignSelf: 'stretch',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  buttonText: {
    fontSize: 18,
    margin: 5,
    textAlign: 'center',
  }
})
