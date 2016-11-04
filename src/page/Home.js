import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import TabNavigator from 'react-native-tab-navigator'
import IonIcon from 'react-native-vector-icons/Ionicons'
import MainPage from './Main'
import UserPage from './User'

export default class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      active: 'main'
      // active: 'user'
    }
  }

  render() {
    const mainIcon = color => (
      <IonIcon name="ios-keypad" size={30} color={color} />
    )

    const userIcon = color => (
      <IonIcon name="md-person" size={30} color={color} />
    )

    const normalColor = '#b1b1b3'
    const activeColor = '#1daceb'

    return (
      <View style={styles.container}>
        <TabNavigator
          tabBarStyle={{ opacity: 0.9 }}
          sceneStyle={{ paddingBottom: 0 }}
          // tabBarStyle={{ backgroundColor: '#fff' }}
        >
          <TabNavigator.Item
            title="main"
            selected={this.state.active === 'main'}
            titleStyle={styles.title}
            onPress={() => this.setState({ active: 'main' })}
            renderIcon={() => mainIcon(normalColor)}
            renderSelectedIcon={() => mainIcon(activeColor)}
          >
            <MainPage navigator={this.props.navigator} />
          </TabNavigator.Item>
          <TabNavigator.Item
            title="user"
            titleStyle={styles.title}
            selected={this.state.active === 'user'}
            onPress={() => this.setState({ active: 'user' })}
            renderIcon={() => userIcon(normalColor)}
            renderSelectedIcon={() => userIcon(activeColor)}
          >
            <UserPage navigator={this.props.navigator} />
          </TabNavigator.Item>
        </TabNavigator>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    fontSize: 14,
    height: 3
  }
})
