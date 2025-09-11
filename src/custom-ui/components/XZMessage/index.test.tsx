import {
it,expect,describe
} from 'vitest'
import createMessage,{destoryAll} from '@/custom-ui/components/XZMessage/index'
const rAF = async () => {
  return new Promise((res) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(async () => {
        res(null)
        await nextTick()
      })
    })
  })
}
describe('createMessage', () => {
  it('创建message组件', async () => {
    const instance = createMessage({message: '777', showClose: true, duration: 0, type: 'success'})
    await rAF()
    const html1 = document.body.innerHTML
    console.log('html',html1);
    const vm1 = document.querySelector('.xz-message')
    expect(vm1).toBeTruthy()
    instance.destory()
    await rAF()
    const html2 = document.body.innerHTML
    console.log('htm2',html2);
    const vm2 = document.querySelector('.xz-message')
    expect(vm2).toBeFalsy()
  })
  it('多次调用创建多个实例', async () => {
    const instance1 = createMessage({message: '777', showClose: true, duration: 0, type: 'success'})
    const instance2 = createMessage({message: '777', showClose: true, duration: 0, type: 'success'})
    const insArr = document.querySelectorAll('.xz-message')
    expect(insArr.length).toBe(2)
    destoryAll()
    await rAF()
    const desArr = document.querySelectorAll('.xz-message')
    expect(desArr.length).toBe(0)
  })
  it('创建多个实例设置正确的offset', async () => {
    const instance1 = createMessage({message: '777', showClose: true, duration: 0, type: 'success',offset:100})
    const instance2 = createMessage({message: '777', showClose: true, duration: 0, type: 'success',offset:50})
    await rAF()
    const insArr = document.querySelectorAll('.xz-message')
    expect(insArr.length).toBe(2)
    const top1 = getTopValue(insArr[0] as HTMLElement)
    const top2 = getTopValue(insArr[1] as HTMLElement)
    console.log('top1', top1,top2)
    expect(top1).toBe(100)
    expect(top2).toBe(150)
  })
})

const getTopValue = (element:Element) => {
  const styles = window.getComputedStyle(element)
  const topValue = styles.getPropertyValue('top')
  return Number.parseFloat(topValue)
}