import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableHighlight,
  ScrollView
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class Main extends Component {
  handlePress() {
    Alert.alert('title', '666', [
      {
        text: 'OK',
        onPress() {
          console.log('ok pressed')
        }
      }
    ])
  }

  render() {
    return (
      <ScrollView style={styles.scrollView}>
        <TouchableHighlight>
          <View style={[styles.section, styles.bgRed]}>
            <View style={styles.iconWrapper}>
              <Icon name="rocket" size={30} color="#900" />
            </View>
            <View style={styles.textWrapper}>
              <Text>Section 1</Text>
            </View>
          </View>
        </TouchableHighlight>
      </ScrollView>


      // <View style={styles.container}>
      //   <TouchableHighlight style={styles.touchable} underlayColor='transparent' onPress={this.handlePress}>
      //     <View style={[styles.section, styles.bgRed]}>
      //     </View>
      //   </TouchableHighlight>
      //   <TouchableHighlight style={styles.touchable} underlayColor='transparent' onPress={this.handlePress}>
      //     <View style={[styles.section, styles.bgGreen]}>
      //         <Text style={styles.text}>Section 2</Text>
      //     </View>
      //   </TouchableHighlight>
      //   <TouchableHighlight style={styles.touchable} underlayColor='transparent' onPress={this.handlePress}>
      //     <View style={[styles.section, styles.bgBlue]}>
      //         <Text style={styles.text}>Section 3</Text>
      //     </View>
      //   </TouchableHighlight>
      // </View>
    )
  }
}

const styles = StyleSheet.create({
  scrollView: {
    paddingTop: 30
  },
  iconWrapper: {
    width: 40
  },
  container: {
    paddingTop: 30,
    paddingHorizontal: 10
  },
  section: {
    height: 40,
    // display: 'flex',
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // borderRadius: 10,
    // overflow: 'hidden'
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
