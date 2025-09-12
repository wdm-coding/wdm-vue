import {
it,expect,describe
} from 'vitest'
import XZInput from './index.vue'
import XZIcon from '../XZIcon/index.vue'
import { mount } from '@vue/test-utils'
describe('XZInput', () => {
  it('基本展示', () => {
    const wrapper = mount(XZInput,{
      props: {
        size: 'small',
        type: 'text'
      },
      slots: {
        prepend: () => '前置内容'
      }
    })
    console.log(wrapper.html())
    // classes 包含 xz-input--small 和 is-prepend
    expect(wrapper.classes()).toContain('xz-input--small')
    expect(wrapper.classes()).toContain('is-prepend')
    // input 是否渲染
    expect(wrapper.find('input').exists()).toBeTruthy()
    // type 是否正确
    expect(wrapper.find('input').attributes().type).toBe('text')
    // slot 是否正确渲染前置内容
    expect(wrapper.find('.xz-input__prepend').text()).toBe('前置内容')
  })
  it('测试textarea',() => {
    // type = textarea 时候，是否渲染 textarea
    const wrapper = mount(XZInput, {
      props: {
        type: 'textarea'
      }
    })
    expect(wrapper.find('textarea').exists()).toBeTruthy()
  })
  it('测试v-model',async () => {
    // 测试v-model:value 绑定是否正确
    const wrapper = mount(XZInput, {
      props: {
        type: 'text',
        value: '123'
      }
    })
    const input = wrapper.find('input')
    // 查看初始值
    expect(input.element.value).toBe('123')
    // 触发更新
    await input.setValue('456')
    expect(input.element.value).toBe('456')
    await wrapper.setProps({ value: '789' })
    expect(input.element.value).toBe('789')
  })
  it('测试clearable',async () => {
    const wrapper = mount(XZInput,{
      props: {
        type: 'text',
        clearable: true,
        value: '123'
      },
      global: {
        stubs: ['XZIcon'] // 替换 XZIcon 为 stub，避免渲染真实组件
      }
    })
    // 测试是否渲染清除图标
    const input = wrapper.find('input')
    await input.trigger('focus') // 触发点击清除图标的事件
    expect(wrapper.find('.xz-input__clear').exists()).toBeTruthy()
    await wrapper.get('.xz-input__clear').trigger('mousedown') // 触发点击清除图标的事件
    expect(input.element.value).toBe('') // 清除图标点击后，输入框的值应该为空
  })
  it('测试show-password',async () => {
    const wrapper = mount(XZInput, {
      props: {
        type: 'password',
        showPassword: true,
        value: '123'
      },
      global: {
        stubs: ['XZIcon'] // 替换 XZIcon 为 stub，避免渲染真实组件
      }
    })
    // 查看初始值是否为密码类型
    expect(wrapper.find('.xz-input__show-password').exists()).toBeTruthy()
    const input = wrapper.find('input')
    expect(input.attributes().type).toBe('password')
    await input.setValue('456')
    const eyeIcon = wrapper.find('.xz-input__show-password')
    expect(eyeIcon.exists()).toBeTruthy()
    expect(eyeIcon.attributes().icon).toBe('eye-slash')
    await eyeIcon.trigger('click')
    expect(input.attributes().type).toBe('text')
    expect(eyeIcon.attributes().icon).toBe('eye')
  })
  it('测试emits',async () => {
    const wrapper = mount(XZInput, {
      props: {
        type: 'text',
        value: '123'
      }
    })
    const input = wrapper.find('input')
    await input.setValue('456')
    expect(wrapper.emitted().input).toBeTruthy()
    expect(wrapper.emitted().change).toBeTruthy()
    expect(wrapper.emitted()['update:value']).toBeTruthy()
    await input.trigger('focus') // 触发点击清除图标的事件
    console.log('emitted',wrapper.emitted())
  })
})