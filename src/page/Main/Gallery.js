import React, { Component } from 'react'
import { View, Text, TouchableHighlight, TextInput, ScrollView, StyleSheet, Image, Alert } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ImagePicker from 'react-native-image-crop-picker'
import IonIcon from 'react-native-vector-icons/Ionicons'
import { upload } from '../../service/qiniu'
import { shortShow } from '../../service/toast'
import * as galleryActions from '../../module/gallery'
import AddButton from '../../component/AddButton'
import CustomModal from '../../component/CustomModal'
import noPic from '../../asset/no_pic.png'
import MainLayout from './Layout'

class Gallery extends Component {
  constructor(props) {
    super(props)

    this.state = {
      avatarSource: {
        uri: 'http://mat1.gtimg.com/www/images/qq2012/qqlogo_2x.png'
      }
    }
  }

  async selectPic() {
    const { fetchUptoken } = this.props

    const upToken = await fetchUptoken()

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

  jumpToImageList() {
    const { navigator, bgcolor } = this.props

    navigator.push({
      component: MainLayout,
      params: {
        bgcolor,
        title: 'galler list',
        id: 'gallery-content'
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <TouchableHighlight onPress={() => this.jumpToImageList()} underlayColor="rgba(0, 0, 0, 0.1)">
            <View style={styles.albumContainer}>
              <View>
                <Image
                  // source={{ uri: 'https://timgsa.baidu.com/timg?image&quality=80&size=b10000_10000&sec=1478849223&di=36770cfae25d9a44c07c0b3477336b85&imgtype=jpg&src=http%3A%2F%2Fpic19.nipic.com%2F20120216%2F9330945_114313510105_2.jpg' }}
                  source={noPic}
                  style={styles.albumImage}
                  resizeMode="cover"
                />
              </View>
              <View style={styles.ablumInfo}>
                <View style={styles.ablumInfoInner}>
                  <View><Text style={{ color: '#313131' }}>Name</Text></View>
                  <View style={styles.albumIcon}>
                    <Text style={styles.albumIconText}>1111</Text>
                    <IonIcon name="ios-arrow-forward" size={20} color="#acacac" />
                  </View>
                </View>
              </View>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => {}} underlayColor="rgba(0, 0, 0, 0.1)">
            <View style={styles.albumContainer}>
              <View>
                <Image
                  source={{ uri: 'https://timgsa.baidu.com/timg?image&quality=80&size=b10000_10000&sec=1478849223&di=36770cfae25d9a44c07c0b3477336b85&imgtype=jpg&src=http%3A%2F%2Fpic19.nipic.com%2F20120216%2F9330945_114313510105_2.jpg' }}
                  style={styles.albumImage}
                  resizeMode="stretch"
                />
              </View>
              <View style={styles.ablumInfo}>
                <View style={styles.ablumInfoInner}>
                  <View><Text style={{ color: '#313131' }}>Name</Text></View>
                  <View style={styles.albumIcon}>
                    <Text style={styles.albumIconText}>1111</Text>
                    <IonIcon name="ios-arrow-forward" size={20} color="#acacac" />
                  </View>
                </View>
              </View>
            </View>
          </TouchableHighlight>
        </ScrollView>

        <CustomModal visible={false}>
          <View>
            <Text style={{ textAlign: 'center', fontSize: 20, marginBottom: 10 }}>Create New Album</Text>
            <TextInput
              placeholder="Enter text to see events"
              style={styles.textInput}
              onChangeText={text => console.log('text', text)}
              value=""
            />
          </View>
        </CustomModal>
        <AddButton onPress={this.selectPic.bind(this)} />
      </View>
    )
  }
}

const height = 90

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 2,
    paddingLeft: 10
  },
  albumContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  ablumInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  ablumInfoInner: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#d1d1d1',
    borderBottomWidth: 1,
    paddingVertical: 4
  },
  albumIcon: {
    flexDirection: 'row',
    width: 50,
    height,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  albumIconText: {
    marginRight: 10,
    color: '#7b7b7b'
  },
  albumImage: {
    width: height,
    height
  },
  uploadAvatar: {
    width: 220,
    height: 70
  },
  textInput: {
    width: 300,
    height: 40,
    paddingHorizontal: 20,
    borderColor: 'gray',
    borderWidth: 1
  }
})

function mapStateToProps({ galleryReducer }) {
  return { galleryReducer }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(galleryActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Gallery)
