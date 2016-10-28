import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  // Alert,
  TouchableHighlight,
  ScrollView
} from 'react-native'
import { connect } from 'react-redux'
// import Icon from 'react-native-vector-icons/FontAwesome'
import IonIcon from 'react-native-vector-icons/Ionicons'
import HeaderBar from '../component/HeaderBar'
import moduleConfig from '../config/module.json'
import MainLayout from './Main/Layout'
import commonStyle from '../style/common'

class Main extends Component {
  handlePress(item) {
    const { navigator } = this.props
    const { bgcolor, name, key } = item

    navigator.push({
      component: MainLayout,
      params: { bgcolor, title: name, id: key }
    })
  }

  render() {
    const { mainReducer } = this.props

    return (
      <View style={commonStyle.pageWrapper}>
        <HeaderBar
          title="Module"
          statusBar={{barStyle: 'default'}}
          textStyle={{color: '#000'}}
          backgroundColor="#fff"
          navigator={this.props.navigator}
        />
        <ScrollView style={styles.scrollView}>
          {
            moduleConfig.map(item => {
              return (
                <TouchableHighlight onPress={this.handlePress.bind(this, item)} key={item.name}>
                  <View style={[styles.section, { backgroundColor: item.bgcolor }]}>
                    <View style={styles.iconWrapper}>
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
      </View>
    )
  }
}

const styles = StyleSheet.create({
  scrollView: {
    // paddingTop: 22
    backgroundColor: '#f3f3f4'
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
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
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

function mapStateToProps({ mainReducer }) {
  return { mainReducer };
}

export default connect(mapStateToProps)(Main);
