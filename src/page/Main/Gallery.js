import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Platform, StyleSheet, Image } from 'react-native'

export default class Gallery extends Component {
  constructor(props) {
    super(props)

    this.state = {
      avatarSource: {
        uri: 'http://mat1.gtimg.com/www/images/qq2012/qqlogo_2x.png'
      }
    }
  }

  selectPic() {
  }

  render() {
    return (
      <View>
        <TouchableOpacity onPress={() => this.selectPic()}>
          <Text>choose pic3</Text>
        </TouchableOpacity>

        <Image source={this.state.avatarSource} style={styles.uploadAvatar} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  uploadAvatar: {
    width: 220,
    height: 70
  }
})
