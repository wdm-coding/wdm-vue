import type { CreateMessageProps,MessageContext } from './types'
import { render,h } from 'vue'
import MessageConstructor from './MessageConstructor.vue'
import useZIndex from '../hooks/useZIndex'
// 创建实例数组
let seed = 1 // 定义一个种子，用于生成唯一标识符
const instances: MessageContext[] = shallowReactive([]) // 创建一个响应式数组，用于存储实例对象
const createMessage = (props: CreateMessageProps) => {
  const { nextZIndex } = useZIndex() // 调用useZIndex函数，但不使用返回值
  const id = `message_${seed++}` // 生成唯一标识符，并递增种子值
  const container = document.createElement('div') // 创建一个容器元素
  const destory = () => { // 定义一个destory函数，用于卸载组件并从DOM中移除容器第一个子元素
    const index = instances.findIndex(instance => instance.id === id) // 查找实例数组中唯一标识符匹配的索引值
    if (index !== -1) instances.splice(index, 1) // 如果找到了，则从数组中移除该实例对象
    render(null, container) // 卸载组件
  }
  // 手动调用删除，修改组件中的visible属性为false
  const manualDestory = () => {
    const instance = instances.find(instance => instance.id === id) // 查找实例数组中唯一标识符匹配的索引值
    if (instance) {
      instance.vm.exposed!.visible.value = false // 将组件中的visible属性设置为false，手动调用删除操作
    }
  }
  const newProps = { // 扩展props，添加onDestory属性并赋值给destory函数
    ...props,
    id,
    zIndex: nextZIndex(), // 设置z-index值，确保消息层叠显示时不会重叠
    onDestory: destory
  }
  const vnode = h(MessageConstructor, newProps) // 以MessageConstructor创建虚拟节点
  render(vnode, container) // 将虚拟节点渲染到容器中
  document.body.appendChild(container.firstElementChild!) // 将容器第一个子元素添加到body中，避免渲染空白节点container
  const instance = { // 创建实例对象
    id,
    vnode,
    props: newProps,
    vm: vnode.component!, // 获取组件实例对象，并将其赋值给instance对象的vm属性
    destory: manualDestory // 手动调用删除，修改组件中的visible属性为false
  } 
  instances.push(instance) // 将实例对象添加到数组中
  return instance // 返回实例对象
}
//  获取最后一个实例对象的底部偏移量，暂时返回0
export const getLastBottomOffset = (id:string) => {// 获取最后一个实例对象的底部偏移量，暂时返回0
  const idx = instances.findIndex(instance => instance.id === id) // 查找实例数组中唯一标识符匹配的索引值
  if(idx <= 0) return 0 // 如果找不到，则返回0
  const prevInstance = instances[idx - 1] // 获取上一个实例对象
  return prevInstance.vm.exposed!.bottomOffset.value
}
// 定义一个destoryAll函数，用于销毁所有实例对象
export const destoryAll = () => {
  document.querySelectorAll('.xz-message').forEach(el => el.remove())
  instances.forEach(instance => {
    instance.vm.exposed!.hideTransition.value = true
    instance.vm.exposed!.visible.value = false
  })
  instances.splice(0)
}
export default createMessage