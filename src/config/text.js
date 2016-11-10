import { env } from './global'

let module = [
  {
    icon: 'md-calendar',
    name: '一起的日子',
    bgcolor: '#53ad58',
    key: 'together'
  },
  {
    icon: 'md-images',
    name: '相册',
    bgcolor: '#218588',
    key: 'gallery'
  },
  {
    icon: 'ios-text',
    name: '留言板',
    bgcolor: '#e22965',
    key: 'message'
  },
  {
    icon: 'md-checkbox-outline',
    name: '待办',
    bgcolor: '#4157af',
    key: 'todo'
  },
  {
    icon: 'md-time',
    name: '时光轴',
    bgcolor: '#ee4643',
    key: 'timeline'
  }
]

if (env === 'dev') {
  module = module.map(item => {
    item.name = 'section'

    return item
  })
}

export default {
  module
}
