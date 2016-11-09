import React, { Component } from 'react'
import { Navigator } from 'react-native'
import { Provider } from 'react-redux'
// import MainPage from './page/Main'
import createStore from './store'
import HomePage from './page/Home'

const store = createStore()

export default class Root extends Component {
  // eslint-disable-next-line
  renderScene(route, navigator) {
    const { component: RouterComponent, params } = route
    return (
      <RouterComponent
        {...params}
        navigator={navigator}
        // {...route.passProps}
      />
    )
  }

  render() {
    return (
      <Provider store={store}>
        <Navigator
          initialRoute={{
            name: 'Home',
            component: HomePage
          }}
          renderScene={(e, i) => this.renderScene(e, i)}
        />
      </Provider>
    )
  }
}
