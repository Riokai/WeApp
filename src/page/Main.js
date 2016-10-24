import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableHighlight
} from 'react-native'

export default class Main extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={() => {
          Alert.alert('title', '666', [
            {
              text: 'OK',
              onPress() {
                console.log('ok pressed')
              }
            }
          ])
        }}>
          <View style={[styles.section, styles.bgRed]}>

              <Text style={styles.text}>Section 1</Text>
          </View>
        </TouchableHighlight>
        <View style={[styles.section, styles.bgGreen]}>
          <Text style={styles.text}>Section 2</Text>
        </View>
        <View style={[styles.section, styles.bgBlue]}>
          <Text style={styles.text}>Section 3</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    paddingHorizontal: 10
  },
  section: {
    height: 80,
    // display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10
  },
  text: {
    textAlign: 'center',
    color: 'white'
  },
  bgRed: {
    backgroundColor: 'red',
  },
  bgGreen: {
    backgroundColor: 'green'
  },
  bgBlue: {
    backgroundColor: 'blue'
  }
})
