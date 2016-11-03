import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Platform } from 'react-native'
import ImagePicker from 'react-native-image-picker'

const options = {
  title: '选择图片',
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
}

export default class Gallery extends Component {
  selectPic() {
    console.log('ImagePicker', ImagePicker.showImagePicker)
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response)

      if (response.didCancel) {
        console.log('User cancelled image picker')
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton)
      } else {
        // You can display the image using either data...
        // const source = {uri: 'data:image/jpegbase64,' + response.data, isStatic: true}
        let source = {
          uri: `data:image/jpegbase64,${response.data}`,
          isStatic: true
        }

        // or a reference to the platform specific asset location
        if (Platform.OS === 'ios') {
          source = {
            uri: response.uri.replace('file://', ''),
            isStatic: true
          }
        } else {
          source = {
            uri: response.uri,
            isStatic: true
          }
        }

        this.setState({
          avatarSource: source
        })
      }
    })
  }

  render() {
    return (
      <View>
        <TouchableOpacity onPress={this.selectPic}>
          <Text>choose pic</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
