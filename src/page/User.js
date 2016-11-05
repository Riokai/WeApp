import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableHighlight } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import HeaderBar from '../component/HeaderBar'
import LoginPage from './Login'
import commonStyle from '../style/common'
import * as loginActions from '../module/login'

class User extends Component {
  componentDidMount() {
    const { readData } = this.props

    readData()
  }

  render() {
    const { navigator, loginReducer: { profile }, removeProfile } = this.props

    const getMenu = (title, handlePress) => {
      return (
        <TouchableHighlight
          onPress={handlePress}
        >
          <View style={styles.menu}>
            <Text>{title}</Text>
          </View>
        </TouchableHighlight>
      )
    }

    return (
      <View style={commonStyle.pageWrapper}>
        <HeaderBar
          title="User"
          statusBar={{ barStyle: 'default' }}
          textStyle={{ color: '#000' }}
          backgroundColor="#fff"
          navigator={navigator}
        />
        <View style={styles.listContainer}>
          <View style={commonStyle.line} />
          {
            profile.nickname ? (
              <View>
                {getMenu(profile.nickname, () => {})}
                <View style={commonStyle.line} />
                {getMenu('退出', () => {
                  removeProfile()
                })}
              </View>
            ) : (
              <View>
                {getMenu('登录', () => {
                  navigator.push({
                    component: LoginPage
                  })
                })}
              </View>
            )
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: '#f3f3f4',
    flex: 1
  },
  menu: {
    backgroundColor: 'white',
    padding: 10,
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row'
  }
})

function mapStateToProps({ loginReducer }) {
  return { loginReducer }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(loginActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(User)
