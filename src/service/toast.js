import Toast from 'react-native-root-toast'

export function shortShow(message) {
  Toast.show(message, {
    duration: Toast.durations.SHORT,
    position: Toast.positions.BOTTOM,
    animation: true
  })
}
