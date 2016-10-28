import React, { Component } from 'react'
import { View } from 'react-native'
import HeaderBar from '../../component/HeaderBar'
import commonStyle from '../../style/common'

import Together from './Together'
import Message from './Message'
import Gallery from './Gallery'
import Todo from './Todo'
import Timeline from './Timeline'

export default class MainLayout extends Component {
  handleShowChildren() {
    const { id } = this.props
    console.log('id', id);
    let Children

    switch (id) {
      case 'together':
        Children = Together
        break
      case 'message':
        Children = Message
        break
      case 'gallery':
        Children = Gallery
        break
      case 'todo':
        Children = Todo
        break
      case 'timeline':
        Children = Timeline
        break
      default:
        Children = Together
    }

    return <Children />
  }

  render() {
    const { navigator, bgcolor, title } = this.props

    return (
      <View style={commonStyle.pageWrapper}>
        <HeaderBar
          title={title}
          navigator={navigator}
          backgroundColor={bgcolor}
        />
        {this.handleShowChildren()}
      </View>
    )
  }
}
