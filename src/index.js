import React, { Component } from 'react'
import { Navigator } from 'react-native'
import MainPage from './page/Main'

export default class Root extends Component {
  constructor(props) {
    super(props)
  }

  _renderScene(route, navigator) {
    const { component: RouterComponent, params } = route

    return (
      <RouterComponent {...params} navigator={navigator}/>
    )
  }

  render() {
    return (
      <Navigator
        initialRoute={{
          name: 'Main',
          component: MainPage
        }}
        renderScene={(e, i) => this._renderScene(e, i)}
      />
    )
  }
}
