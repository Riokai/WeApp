import {
  // Auth,
  // ImgOps,
  // Conf,
  // Rs,
  Rpc
} from 'react-native-qiniu'


export function upload(path, uptoken) {
  return Rpc
          .uploadFile(path, uptoken, {})
          .catch(err => {
            console.log('catch', err)
          })
          .then(res => res.json())
}
