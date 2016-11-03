import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import ImagePicker from 'react-native-image-crop-picker'

export default class Gallery extends Component {
  constructor(props) {
    super(props)

    this.state = {
      avatarSource: {
        uri: 'http://mat1.gtimg.com/www/images/qq2012/qqlogo_2x.png'
      }
    }
  }

  // eslint-disable-next-line
  selectPic() {
    ImagePicker.openPicker({
      multiple: true
    }).then(images => {
      console.log(images)
      this.setState({
        avatarSource: {
          uri: images[0].path
        }
      })
    })
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
