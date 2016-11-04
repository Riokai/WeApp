import React, { Component, PropTypes } from 'react'
import {
  View,
  Modal,
  StyleSheet,
} from 'react-native'
import Button from './Button'

export default class CustomModal extends Component {
  static propsTypes = {
    visiable: PropTypes.bool,
    onCancel: PropTypes.func,
    onOK: PropTypes.func
  }

  static defaultProps = {
    visiable: false
  }

  constructor(props) {
    super(props)

    this.state = {
      animationType: 'none',
      modalVisible: false,
      transparent: true
    }
  }

  render() {
    const modalBackgroundStyle = {
      backgroundColor: this.state.transparent ? 'rgba(0, 0, 0, 0.5)' : '#f5fcff',
    }

    const innerContainerTransparentStyle = this.state.transparent ? {
      backgroundColor: '#fff', padding: 20
    } : null

    return (
      <Modal
        animationType="slide"
        visible={this.props.visible}
        transparent={this.state.transparent}
      >
        <View style={[styles.container, modalBackgroundStyle]}>
          <View style={[styles.innerContainer, innerContainerTransparentStyle]}>
            {this.props.children}
            <View style={styles.btnWrapper}>
              <Button
                onPress={() => {}}
                style={styles.modalButton}
              >
                Close
              </Button>
              <Button
                onPress={() => {}}
                style={styles.modalButton}
              >
                OK
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  innerContainer: {
    borderRadius: 10,
    alignItems: 'center',
  },
  btnWrapper: {
    flexDirection: 'row'
  },
  modalButton: {
    marginTop: 10,
  }
})
