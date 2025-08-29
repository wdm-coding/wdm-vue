import XZCollapse from './index.vue'
import XZCollapseItem from './xz-collapse-item.vue'
import XZIcon from '../XZIcon/index.vue'
import {
 mount
} from '@vue/test-utils'
import {
it,expect,describe
} from 'vitest'
// 虚拟dom写法
// import { h } from 'vue'
// describe('XZCollapse', () => {
//   it('should render correctly', () => {
//     const vnode = h(XZCollapseItem, { name: 'a',title: '测试标题' }, {
//       default: () => '测试内容666'
//     })
//     const wrapper = mount(XZCollapse,{
//       props: {
//         title: '测试标题'
//       },
//       slots: {
//         default: vnode
//       }
//     })
//     console.log(wrapper.html())
//     expect(wrapper.exists()).toBeTruthy()
//     expect(wrapper.attributes('title')).toBe('测试标题')
//   })
// })
// jsx 写法
describe('XZCollapse', () => {
  it('should render correctly', () => {
    const wrapper = mount(()=>
      <XZCollapse value={[]}>
          <XZCollapseItem name="a" title="测试标题a">
            测试内容aaa
          </XZCollapseItem>
          <XZCollapseItem name="b" title="测试标题b">
            测试内容bbb
          </XZCollapseItem>
      </XZCollapse>,
      {
        global: {
          stubs:['XZIcon']
        }
      }
    )
    // console.log(wrapper.html())
    const headers = wrapper.findAll('.xz-collapse-item__header') // 找到所有的头部元素
    const contents = wrapper.findAll('.xz-collapse-item__content') // 找到所有的内容元素
    // expect(headers.length).toBe(2) // 断言头部元素的数量为1
    // expect(contents.length).toBe(2) // 断言内容元素的数量为1
    // expect(headers[0].text()).toBe('测试标题a') // 断言第一个头部元素的文本为'测试标题'
    // expect(contents[0].text()).toBe('测试内容aaa') // 断言第一个内容元素的文本为'测试内容666'
    // expect(contents[1].text()).toBe('测试内容bbb') // 断言第一个头部元素的文本为'测试标题'
    // expect(contents[0].isVisible()).toBeTruthy() // 断言第一个内容元素是可见的
    // expect(contents[1].isVisible()).toBeFalsy() // 断言第二个内容元素是不可见的
    // 测试点开和关闭
    // headers[0].trigger('click') // 触发第一个头部元素的点击事件
    // console.log(contents[0].html())
    // console.log(contents[1].html())
    // expect(contents[1].isVisible()).toBeTruthy() // 断言第一个内容元素是可见的
    // headers[1].trigger('click') // 触发第二个头部元素的点击事件
    // expect(contents[1].isVisible()).toBeTruthy() 
    // expect(contents[1].isVisible()).toBeTruthy() // 断言第二个内容元素是可见的
  })
})