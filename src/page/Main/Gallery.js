import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ImagePicker from 'react-native-image-crop-picker'
import { upload } from '../../service/qiniu'
import * as galleryActions from '../../module/gallery'

class Gallery extends Component {
  constructor(props) {
    super(props)

    this.state = {
      avatarSource: {
        uri: 'http://mat1.gtimg.com/www/images/qq2012/qqlogo_2x.png'
      }
    }
  }

  selectPic() {
    const { fetchUptoken } = this.props

    fetchUptoken().then(upToken => {
      if (!upToken) {
        Alert.alert(
          'Info',
          'server error',
          [{
            text: 'OK'
          }]
        )

        return
      }

      ImagePicker.openPicker({
        multiple: true
      }).then(images => {
        this.setState({
          avatarSource: {
            uri: images[0].path
          }
        })
        upload(images[0].path, upToken).then(data => {
          if (data.hash) {
            Alert.alert(
              'image upload successful',
              'image upload successful',
              [{
                text: 'OK'
              }]
            )
          }
        })
      }, err => console.log('err', err))
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

function mapStateToProps({ galleryReducer }) {
  return { galleryReducer }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(galleryActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Gallery)
