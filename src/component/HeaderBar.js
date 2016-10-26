import React, { Component, PropTypes } from 'react'
import { View, Text, StatusBar, StyleSheet, Platform } from 'react-native'

const StatusBarShape = {
    barStyle: PropTypes.oneOf(['light-content', 'default',]),
    networkActivityIndicatorVisible: PropTypes.bool,
    showHideTransition:PropTypes.oneOf(['fade', 'slide']),
    hidden: PropTypes.bool,
    translucent: PropTypes.bool,
    backgroundColor: PropTypes.string,
    animated:PropTypes.bool
}

export default class HeaderBar extends Component {
  static propType = {
    style: View.propTypes.style,
    navigator: PropTypes.object,
    leftButtonTitle: PropTypes.string,
    popEnabled: PropTypes.bool,
    onLeftButtonClick: PropTypes.func,
    title: PropTypes.string,
    titleView: PropTypes.element,
    hide: PropTypes.bool,
    statusBar: PropTypes.shape(StatusBarShape),
  }

  static defaultProps = {
    statusBar: {
      barStyle: 'default',
      hidden: false,
      translucent:false,
      animated:false,
    }
  }

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <StatusBar
          style={styles.statusBar}
          {...this.props.statusBar}
        />
         <View style={styles.navBar}>
           <View style={styles.navBarTitleContainer}>
             <Text style={styles.title}>{this.props.title}</Text>
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
  statusBar: Platform.OS === 'ios' ? 20 : 0,
  title: {
    fontSize: 20,
    color: '#fff'
  },
  navBar: {
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
