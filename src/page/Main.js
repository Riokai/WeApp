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
import IonIcon from 'react-native-vector-icons/Ionicons'
import moduleConfig from '../config/module.json'
import TogetherPage from './Together'



export default class Main extends Component {
  handlePress() {
    // Alert.alert('title', '666', [
    //   {
    //     text: 'OK',
    //     onPress() {
    //       console.log('ok pressed')
    //     }
    //   }
    // ])
    const { navigator } = this.props

    navigator.push({
      component: TogetherPage
    })
  }

  render() {
    return (
      <ScrollView style={styles.scrollView}>
        {
          moduleConfig.map(item => {
            return (
              <TouchableHighlight onPress={this.handlePress.bind(this)} key={item.name}>
                <View style={[styles.section, { backgroundColor: item.bgcolor }]}>
                  <View style={styles.iconWrapper}>
                    {/* <Icon name={item.icon} size={40} color="#fff" /> */}
                    <IonIcon name={item.icon} size={40} color="#fff" />
                  </View>
                  <View style={styles.textWrapper}>
                    <Text style={styles.text}>{item.name}</Text>
                  </View>
                </View>
              </TouchableHighlight>
            )
          })
        }
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  scrollView: {
    paddingTop: 22
  },
  iconWrapper: {
    width: 80,
    paddingHorizontal:20
  },
  container: {
    paddingTop: 30,
    paddingHorizontal: 8
  },
  section: {
    height: 80,
    // display: 'flex',
    flex: 1,
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
    // borderRadius: 10,
    // overflow: 'hidden'
  },
  text: {
    position: 'relative',
    top: -2,
    left: -5,
    textAlign: 'left',
    color: 'white',
    fontSize: 20
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
