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
import { Bar } from 'react-native-progress'
import * as galleryActions from '../../module/gallery'
import AddButton from '../../component/AddButton'
import { upload } from '../../service/qiniu'
import { shortShow } from '../../service/toast'
import GalleryBrowserPage from './GalleryBrowser'
import { IMAGE_HOST } from '../../config/global'

class GalleryContent extends Component {
  viewPic(index) {
    const { galleryReducer, navigator } = this.props
    const { albumData, albumCurrent } = galleryReducer
    const data = albumData[albumCurrent].children

    const processData = data.map(item => {
      return `${IMAGE_HOST}/${item.hash}`
    })

    navigator.push({
      component: GalleryBrowserPage,
      params: {
        data: processData,
        index
      }
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
                  onPress={this.viewPic.bind(this, index)}
                  // onPress={() => {}}
                  style={styles.imageItem}
                >
                  <Image
                    source={{ uri: `${IMAGE_HOST}/${item.hash}-thumbnail` }}
                    style={[styles.albumImage, {
                      marginRight: index % 4 === 3 ? 0 : 2
                    }]}
                    resizeMode="stretch"
                  />
                </TouchableWithoutFeedback>
              )
            }) : (
              <View style={{ flex: 1, marginTop: 50 }}>
                <Text style={{ fontSize: 18, textAlign: 'center' }}>暂无图片，快去上传吧</Text>
              </View>
            )
          }
        </ScrollView>
        <View style={styles.progress}>
          <Bar progress={0.8} width={200} />
        </View>
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
  progress: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: 'center'
  }
})

function mapStateToProps({ galleryReducer }) {
  return { galleryReducer }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(galleryActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(GalleryContent)
