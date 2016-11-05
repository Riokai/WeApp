import React, { Component, PropTypes } from 'react'
import { View, Text, StatusBar, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import IonIcon from 'react-native-vector-icons/Ionicons'

const StatusBarShape = {
  barStyle: PropTypes.oneOf(['light-content', 'default']),
  networkActivityIndicatorVisible: PropTypes.bool,
  showHideTransition: PropTypes.oneOf(['fade', 'slide']),
  hidden: PropTypes.bool,
  translucent: PropTypes.bool,
  backgroundColor: PropTypes.string,
  animated: PropTypes.bool
}

export default class HeaderBar extends Component {
  static propType = {
    style: View.propTypes.style,
    navigator: PropTypes.object,
    leftButtonTitle: PropTypes.string,
    textStyle: PropTypes.object,
    hide: PropTypes.bool,
    statusBar: PropTypes.shape(StatusBarShape),
  }

  static defaultProps = {
    statusBar: {
      barStyle: 'light-content',
      hidden: false,
      translucent: false,
      animated: false,
    },
    textStyle: {},
    backgroundColor: '#fff'
  }

  render() {
    const { navigator, backgroundColor } = this.props
    const bgStatus = Platform.OS !== 'ios' && (
      backgroundColor === '#fff' || backgroundColor === 'white'
    ) ? '#000000' : backgroundColor

    return (
      <View style={[{ backgroundColor }, this.props.style]}>
        <StatusBar
          style={styles.statusBar}
          backgroundColor={bgStatus}
          {...this.props.statusBar}
        />
        {
          Platform.OS === 'ios' ? (
            <View
              style={[styles.iosStatusBar, {
                backgroundColor
              }]}
            />) : null
        }
        <View style={styles.navBar}>
          {
            navigator.getCurrentRoutes().length > 1 ? (
              <View style={styles.backBtn}>
                <TouchableOpacity onPress={() => navigator.pop()}>
                  <IonIcon name="md-arrow-back" size={28} color="#fff" />
                </TouchableOpacity>
              </View>
            ) : null
          }
          <View style={styles.navBarTitleContainer}>
            <Text style={[styles.title, this.props.textStyle]}>{this.props.title}</Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2cacef',
  },
  iosStatusBar: {
    position: 'absolute',
    top: -22,
    left: 0,
    right: 0,
    height: 22
  },
  statusBar: {
    height: Platform.OS === 'ios' ? 20 : 0
  },
  title: {
    fontSize: 20,
    color: '#fff'
  },
  backBtn: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    flex: 1,
    justifyContent: 'center',
    // backgroundColor: 'red',
    left: 10
  },
  navBar: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: Platform.OS === 'ios' ? 44 : 50
  },
  navBarTitleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 60,
    top: 0,
    right: 60,
    bottom: 0,
  }
})
