import {
describe, it, expect, vi
} from 'vitest'
import { mount } from '@vue/test-utils'
import XZButton from './index.vue'

describe('测试 XZButton 组件',() => {
  it('测试 XZButton 组件是否正确渲染',() => {
    const wrapper = mount(XZButton,{
      props: {
        type: 'primary',
        disabled: true
      },
      slots: {
        default: '按钮'
      }
    })
    // console.log(wrapper.html()) // 打印渲染后的 HTML 结构，便于调试和验证
    // expect(wrapper.classes('xz-button')).toBeTruthy() // 断言渲染后的 HTML 结构中包含 xz-button 类名
    // expect(wrapper.get('button').text()).toBe('按钮') // 断言渲染后的 HTML 结构中包含按钮文本
    // expect(wrapper.find('button').text()).toBe('按钮') // 断言渲染后的 HTML 结构中包含按钮文本
    // wrapper.get('button').trigger('click') // 触发 click 事件
    // console.log(wrapper.emitted()) // 打印事件信息，便于调试和验证
    // expect(wrapper.emitted()).toHaveProperty('click') // 断言 wrapper 对象上有 click 事件属性
    // expect(wrapper.emitted().click).toBeTruthy() // 断言 click 事件被触发
    // expect(wrapper.attributes('disabled')).toBeDefined() // 断言 disabled 属性存在
  })
})