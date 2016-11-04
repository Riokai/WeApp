import React, { Component } from 'react'
import {
  Text,
  StyleSheet,
  TouchableHighlight
} from 'react-native'

export default class AddButton extends Component {
  render() {
    return (
      <TouchableHighlight
        style={styles.container}
        underlayColor="rgba(41, 157, 235, .7)"
        onPress={this.props.onPress}
      >
        <Text style={styles.text}>+</Text>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#299deb',
    borderRadius: 40,
    overflow: 'hidden',
    width: 45,
    height: 45,
    justifyContent: 'center'
  },
  text: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 30,
    top: -2,
    left: 1,
    fontWeight: '300'
  }
})
