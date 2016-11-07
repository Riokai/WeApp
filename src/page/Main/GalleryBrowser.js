/* @flow */

import React, { Component } from 'react'
import { View } from 'react-native'
import PhotoBrowser from 'react-native-photo-browser'

const list = [
  {
    caption: 'dddd',
    photo: 'https://timgsa.baidu.com/timg?image&quality=80&size=b10000_10000&sec=1478849223&di=36770cfae25d9a44c07c0b3477336b85&imgtype=jpg&src=http%3A%2F%2Fpic19.nipic.com%2F20120216%2F9330945_114313510105_2.jpg'
  },
  {
    caption: 'dddd',
    photo: 'https://timgsa.baidu.com/timg?image&quality=80&size=b10000_10000&sec=1478499832&di=354c75ba71807b7eb721be3accb2c57e&src=http://www.504524.cc/imgall/nfwwomrognwgsylofzrw63i/2014/f6/102/d/34.jpg'
  }
]

export default class GalleryBrowser extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <PhotoBrowser
          onBack={this.props.navigator.pop}
          mediaList={list}
          initialIndex={0}
          displayActionButton={false}
          displayNavArrows={true}
          onSelectionChanged={() => {}}
          onActionButton={() => {}}
          startOnGrid={false}
          enableGrid={true}
          useCircleProgress
        />
      </View>
    )
  }
}
