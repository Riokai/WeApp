import React, { Component } from 'react'
import {
  View,
  TouchableWithoutFeedback,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions
} from 'react-native'
import ImagePicker from 'react-native-image-crop-picker'
import AddButton from '../../component/AddButton'
import { upload } from '../../service/qiniu'
import { shortShow } from '../../service/toast'
import GalleryBrowserPage from './GalleryBrowser'

export default class GalleryContent extends Component {
  viewPic() {
    const { navigator } = this.props

    navigator.push({
      component: GalleryBrowserPage
    })
  }

  async selectPic() {
    const { fetchUptoken } = this.props

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
      shortShow('图片上传成功')
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          <TouchableWithoutFeedback onPress={this.viewPic.bind(this)} style={styles.imageItem}>
            <Image
              source={{ uri: 'https://timgsa.baidu.com/timg?image&quality=80&size=b10000_10000&sec=1478849223&di=36770cfae25d9a44c07c0b3477336b85&imgtype=jpg&src=http%3A%2F%2Fpic19.nipic.com%2F20120216%2F9330945_114313510105_2.jpg' }}
              style={styles.albumImage}
              resizeMode="stretch"
            />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={this.viewPic.bind(this)}>
            <Image
              source={{ uri: 'https://timgsa.baidu.com/timg?image&quality=80&size=b10000_10000&sec=1478849223&di=36770cfae25d9a44c07c0b3477336b85&imgtype=jpg&src=http%3A%2F%2Fpic19.nipic.com%2F20120216%2F9330945_114313510105_2.jpg' }}
              style={styles.albumImage}
              resizeMode="stretch"
            />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={this.viewPic.bind(this)}>
            <Image
              source={{ uri: 'https://timgsa.baidu.com/timg?image&quality=80&size=b10000_10000&sec=1478849223&di=36770cfae25d9a44c07c0b3477336b85&imgtype=jpg&src=http%3A%2F%2Fpic19.nipic.com%2F20120216%2F9330945_114313510105_2.jpg' }}
              style={styles.albumImage}
              resizeMode="stretch"
            />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={this.viewPic.bind(this)}>
            <Image
              source={{ uri: 'https://timgsa.baidu.com/timg?image&quality=80&size=b10000_10000&sec=1478849223&di=36770cfae25d9a44c07c0b3477336b85&imgtype=jpg&src=http%3A%2F%2Fpic19.nipic.com%2F20120216%2F9330945_114313510105_2.jpg' }}
              style={[styles.albumImage, { marginRight: 0 }]}
              resizeMode="stretch"
            />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={this.viewPic.bind(this)}>
            <Image
              source={{ uri: 'https://timgsa.baidu.com/timg?image&quality=80&size=b10000_10000&sec=1478849223&di=36770cfae25d9a44c07c0b3477336b85&imgtype=jpg&src=http%3A%2F%2Fpic19.nipic.com%2F20120216%2F9330945_114313510105_2.jpg' }}
              style={styles.albumImage}
              resizeMode="stretch"
            />
          </TouchableWithoutFeedback>
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
  }
})
