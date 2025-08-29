import {
describe, it, expect, vi
} from 'vitest'
import { mount } from '@vue/test-utils'
import XZButton from './index.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import XZIcon from '../XZIcon/index.vue'
describe('测试 XZButton 组件',() => {
  it('测试 XZButton 组件是否正确渲染',() => {
    const wrapper = mount(XZButton,{
      props: {
        type: 'primary',
        disabled: true,
        icon: 'arrow-right',
        loading: true
      },
      slots: {
        default: '按钮'
      },
      global: {
        // stubs: ['FontAwesomeIcon']
        stubs: ['XZIcon']
      }
    })
    console.log(wrapper.html()) // 打印渲染后的 HTML 结构，便于调试和验证
    // expect(wrapper.classes('xz-button')).toBeTruthy() // 断言渲染后的 HTML 结构中包含 xz-button 类名
    // expect(wrapper.get('button').text()).toBe('按钮') // 断言渲染后的 HTML 结构中包含按钮文本
    // expect(wrapper.find('button').text()).toBe('按钮') // 断言渲染后的 HTML 结构中包含按钮文本
    // wrapper.get('button').trigger('click') // 触发 click 事件
    // console.log(wrapper.emitted()) // 打印事件信息，便于调试和验证
    // expect(wrapper.emitted()).toHaveProperty('click') // 断言 wrapper 对象上有 click 事件属性
    // expect(wrapper.emitted().click).toBeTruthy() // 断言 click 事件被触发
    // expect(wrapper.attributes('disabled')).toBeDefined() // 断言 disabled 属性存在
    // expect(wrapper.classes()).toContain('xz-button--primary') // 断言渲染后的 HTML 结构中包含 xz-button--primary 类名
    // 测试icon
    // const iconEle = wrapper.findComponent(FontAwesomeIcon)
    // expect(iconEle.exists()).toBeTruthy() // 测试icon的存在性
    // expect(iconEle.attributes('icon')).toBe('fa-solid,fa-arrow-right') // 测试icon的属性值
    // 测试loading
    const iconEle = wrapper.findComponent(XZIcon)
    expect(iconEle.exists()).toBeTruthy() // 测试icon的存在性
    expect(iconEle.attributes('icon')).toBe('spinner') // 测试icon的属性值
    expect(wrapper.attributes('disabled')).toBeDefined() // 断言 disabled 属性存在
  })
})