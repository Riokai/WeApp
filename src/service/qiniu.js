import {
  // Auth,
  // ImgOps,
  // Conf,
  // Rs,
  Rpc
} from 'react-native-qiniu'

const uptoken = 'oxBowt2F4le6E0e6fobAIJ1VRH0JucG_hdkU7x8j:ovQ5IBYP3m88monJurchn9LckjU=:eyJzY29wZSI6InJpb3NpdGUiLCJkZWFkbGluZSI6MTQ3ODE3MDMwM30='

export function upload(path) {
  return Rpc
          .uploadFile(path, uptoken, {})
          .catch(err => {
            console.log('catch', err)
          })
          .then(res => res.json())
}
