/* @flow */

import React, { Component } from 'react'
// import { View } from 'react-native'
// import PhotoBrowser from 'react-native-photo-browser'
import Gallery from 'react-native-gallery'

export default class GalleryBrowser extends Component {
  render() {
    const { data, index } = this.props

    console.log(data)

    return (
      <Gallery
        style={{ flex: 1, backgroundColor: 'black' }}
        initialPage={index}
        images={data}
        onSingleTapConfirmed={this.props.navigator.pop}
      />
      // <View style={{ flex: 1 }}>
      //   <PhotoBrowser
      //     onBack={this.props.navigator.pop}
      //     mediaList={data}
      //     initialIndex={index}
      //     displayActionButton={false}
      //     displayNavArrows={true}
      //     onSelectionChanged={() => {}}
      //     onActionButton={() => {}}
      //     startOnGrid={false}
      //     enableGrid={true}
      //     useCircleProgress
      //   />
      // </View>
    )
  }
}
