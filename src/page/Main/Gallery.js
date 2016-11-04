import React, { Component } from 'react'
import { View, Text, TouchableHighlight, ScrollView, StyleSheet, Image, Alert } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ImagePicker from 'react-native-image-crop-picker'
import IonIcon from 'react-native-vector-icons/Ionicons'
import { upload } from '../../service/qiniu'
import * as galleryActions from '../../module/gallery'
import AddButton from '../../component/AddButton'

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
      <View style={styles.container}>
        <ScrollView>
          <TouchableHighlight onPress={() => {}} underlayColor="rgba(0, 0, 0, 0.1)">
            <View style={styles.albumContainer}>
              <View>
                <Image
                  source={{ uri: 'http://mat1.gtimg.com/www/images/qq2012/qqlogo_2x.png' }}
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
          <TouchableHighlight onPress={() => {}} underlayColor="rgba(0, 0, 0, 0.1)">
            <View style={styles.albumContainer}>
              <View>
                <Image
                  source={{ uri: 'http://mat1.gtimg.com/www/images/qq2012/qqlogo_2x.png' }}
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


        {/* <TouchableOpacity onPress={() => this.selectPic()}>
          <Text>choose pic3</Text>
        </TouchableOpacity>

        <Image source={this.state.avatarSource} style={styles.uploadAvatar} /> */}
        <AddButton onPress={this.selectPic.bind(this)} />
      </View>
    )
  }
}

const height = 100

const styles = StyleSheet.create({
  container: {
    flex: 1
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
    borderBottomWidth: 1
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
  }
})

function mapStateToProps({ galleryReducer }) {
  return { galleryReducer }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(galleryActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Gallery)
