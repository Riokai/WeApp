import React, { Component } from 'react'
import {
  View,
  TouchableWithoutFeedback,
  Image,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions
} from 'react-native'
import ImagePicker from 'react-native-image-crop-picker'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as galleryActions from '../../module/gallery'
import AddButton from '../../component/AddButton'
import { upload } from '../../service/qiniu'
import { shortShow } from '../../service/toast'
import GalleryBrowserPage from './GalleryBrowser'

class GalleryContent extends Component {
  viewPic() {
    const { navigator } = this.props

    navigator.push({
      component: GalleryBrowserPage
    })
  }

  async selectPic() {
    const { fetchUptoken, addImage, _id } = this.props

    const upToken = await fetchUptoken()

    if (!upToken) {
      shortShow('server error')

      return
    }

    let images

    try {
      images = await ImagePicker.openPicker({
        multiple: true
      })
    } catch (e) {
      shortShow('未选择图片')

      return
    }

    this.setState({
      avatarSource: {
        uri: images[0].path
      }
    })

    const data = await upload(images[0].path, upToken)

    if (data.hash) {
      const dataHash = await addImage(_id, data.hash)

      if (dataHash) {
        shortShow('图片上传到服务器成功')
      }
    } else {
      shortShow('图片上传到七牛失败')
    }
  }

  render() {
    const { galleryReducer } = this.props
    const { albumData, albumCurrent } = galleryReducer
    const data = albumData[albumCurrent].children


    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {
            data.length ? data.map((item, index) => {
              return (
                <TouchableWithoutFeedback
                  key={index}
                  onPress={this.viewPic.bind(this)}
                  style={styles.imageItem}
                >
                  <Image
                    source={{ uri: `http://riosite.qiniudn.com/${item.hash}-thumbnail` }}
                    style={styles.albumImage}
                    resizeMode="stretch"
                  />
                </TouchableWithoutFeedback>
              )
            }) : (
              <View style={{ flex: 1, marginTop: 50 }}>
                <Text style={styles.text}>暂无图片，快去上传吧</Text>
              </View>
            )
          }
        </ScrollView>
        <AddButton onPress={this.selectPic.bind(this)} />
      </View>
    )
  }
}

const windowWidth = Dimensions.get('window').width - 6

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  imageItem: {
    marginRight: 2,
  },
  albumImage: {
    marginRight: 2,
    marginBottom: 2,
    width: windowWidth / 4,
    height: windowWidth / 4
  },
  text: {
    fontSize: 18,
    textAlign: 'center'
  }
})

function mapStateToProps({ galleryReducer }) {
  return { galleryReducer }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(galleryActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(GalleryContent)
