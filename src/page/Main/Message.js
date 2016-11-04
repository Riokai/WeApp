import React, { Component } from 'react'
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Animated,
  Easing
} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as MsgActions from '../../module/message'
import MsgItem from '../../component/MsgItem'
import commonStyle from '../../style/common'

class Message extends Component {
  constructor(props) {
    super(props)

    this.state = {
      y: new Animated.Value(400),
      showBackdrop: false
    }
  }

  componentWillReceiveProps(nextProps) {
    const { messageReducer } = nextProps

    if (messageReducer.isShowBackdrop) {
      Animated.timing(
        this.state.y,
        {
          easing: Easing.ease,
          duration: 200,
          toValue: 0,
        }
      ).start()
    }
  }

  handleHideMsg() {
    Animated.timing(
      this.state.y,
      {
        easing: Easing.ease,
        duration: 200,
        toValue: 400
      }
    ).start(() => {
      setTimeout(() => {
        this.props.toggleBackdrop()
      }, 100)
    })
  }

  render() {
    const { messageReducer, toggleBackdrop } = this.props
    const { isShowBackdrop } = messageReducer

    return (
      <View style={styles.container}>
        <ScrollView>
          {
            messageReducer.data.map((item, index) => {
              return (
                <MsgItem
                  key={index}
                  data={item}
                  toggleBackdrop={toggleBackdrop}
                />
              )
            })
          }
        </ScrollView>
        {
          isShowBackdrop ? (
            <View style={[commonStyle.fullScreen, styles.backdrop]}>
              <TouchableWithoutFeedback onPress={() => this.handleHideMsg()}>
                <View style={[commonStyle.fullScreen, styles.backdropContent]} />
              </TouchableWithoutFeedback>
              <Animated.View
                style={{
                  height: 400,
                  backgroundColor: '#fff',
                  transform: [
                    { translateY: this.state.y }
                  ]
                }}
              >
                <TouchableHighlight
                  onPress={() => {}}
                  underlayColor="#ccc"
                >
                  <View>
                    <View style={styles.msg}>
                      <View style={commonStyle.horizontal}>
                        <Text style={styles.textName}>Kai</Text>
                        <Text style={commonStyle.colorGrey}>1楼</Text>
                      </View>
                      <View>
                        <Text style={commonStyle.colorGrey}>2016-10-29 21:16:38</Text>
                      </View>
                      <View style={styles.wrapContent}>
                        <Text>dsfdsfdfdfdeee</Text>
                      </View>
                      <View style={[styles.wrapContent, commonStyle.flexRight]}>
                        <TouchableOpacity onPress={() => {}}>
                          <Text>回复</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View style={commonStyle.line} />
                  </View>
                </TouchableHighlight>
              </Animated.View>
            </View>
          ) : null
        }
      </View>
    )
  }
}

function mapStateToProps({ messageReducer }) {
  return { messageReducer }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(MsgActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Message)

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  msg: {
    paddingVertical: 8,
    paddingHorizontal: 10
  },
  wrapContent: {
    marginTop: 5
  },
  textName: {
    color: '#2196F3'
  },
  backdrop: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  backdropContent: {
    opacity: 0.7,
    backgroundColor: '#000',
  }
})
