import React, { Component } from 'react'
import { View, Text, TouchableHighlight, TextInput, ScrollView, StyleSheet, Image } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import IonIcon from 'react-native-vector-icons/Ionicons'
import * as galleryActions from '../../module/gallery'
import AddButton from '../../component/AddButton'
import CustomModal from '../../component/CustomModal'
import noPic from '../../asset/no_pic.png'
import MainLayout from './Layout'
import { IMAGE_HOST } from '../../config/global'

class Gallery extends Component {
  componentDidMount() {
    const { fetchAlbumList } = this.props

    fetchAlbumList()
  }

  toggleAblumModal(isShow) {
    const { toggleModal } = this.props

    toggleModal(isShow)

    if (isShow) {
      setTimeout(() => {
        if (this.refs.input) {
          this.refs.input.focus()
        }
      }, 10)
    }
  }

  createAlbum() {
    const { addNewAlbum } = this.props

    addNewAlbum()
  }

  jumpToImageList({ name, _id, children }, current) {
    const { navigator, bgcolor, changeAlbumCurrent } = this.props

    changeAlbumCurrent(current)

    navigator.push({
      component: MainLayout,
      params: {
        bgcolor,
        _id,
        title: name,
        id: 'gallery-content'
      }
    })
  }

  render() {
    const { galleryReducer: { albumData, albumName, isShowModal }, setAlbumName } = this.props

    return (
      <View style={styles.container}>
        <ScrollView>
          {
            albumData.length ? albumData.map((album, index) => {
              const { children, name, _id } = album
              const source = children.length ? {
                uri: `${IMAGE_HOST}/${children[0].hash}-thumbnail`
              } : noPic

              return (
                <TouchableHighlight
                  onPress={() => this.jumpToImageList(album, index)}
                  underlayColor="rgba(0, 0, 0, 0.1)"
                  key={_id}
                >
                  <View style={styles.albumContainer}>
                    <View>
                      <Image
                        // source={{ uri: 'https://timgsa.baidu.com/timg?image&quality=80&size=b10000_10000&sec=1478849223&di=36770cfae25d9a44c07c0b3477336b85&imgtype=jpg&src=http%3A%2F%2Fpic19.nipic.com%2F20120216%2F9330945_114313510105_2.jpg' }}
                        source={source}
                        style={styles.albumImage}
                        resizeMode="cover"
                      />
                    </View>
                    <View style={styles.ablumInfo}>
                      <View style={styles.ablumInfoInner}>
                        <View><Text style={{ color: '#313131' }}>{name}</Text></View>
                        <View style={styles.albumIcon}>
                          <Text style={styles.albumIconText}>{children.length}</Text>
                          <IonIcon name="ios-arrow-forward" size={20} color="#acacac" />
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableHighlight>
              )
            }) : (
              <View style={{ flex: 1, marginTop: 50 }}>
                <Text style={{ fontSize: 18, textAlign: 'center' }}>暂无相册，快去创建吧</Text>
              </View>
            )
          }
        </ScrollView>

        <CustomModal
          visible={isShowModal}
          onCancel={this.toggleAblumModal.bind(this, false)}
          onOK={this.createAlbum.bind(this)}
        >
          <View>
            <Text style={{ textAlign: 'center', fontSize: 20, marginBottom: 10 }}>创建相册</Text>
            <TextInput
              ref="input"
              placeholder=""
              style={styles.textInput}
              // autoFocus={true}
              onChangeText={text => setAlbumName(text)}
              value={albumName}
            />
          </View>
        </CustomModal>
        <AddButton onPress={this.toggleAblumModal.bind(this, true)} />
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
