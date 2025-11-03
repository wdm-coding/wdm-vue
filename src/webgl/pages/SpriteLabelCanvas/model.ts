import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { create3DHtml, create3DSprite } from '../../threejs-utils/render'
export const createGroup = () => {
  const group = new THREE.Group()
  const loader = new GLTFLoader()
  loader.load('/public/three-js/glb/gc.glb', gltf => {
    const gc = gltf.scene
    const arr = ['设备A', '设备B', '停车场']
    const img = ['故障.png', '警告.png', '雪花.png']
    for (let i = 0; i < arr.length; i++) {
      const dom = document.querySelector('.tag')?.cloneNode() as HTMLElement
      const tag = create3DSprite(dom)
      dom.style.pointerEvents = 'none'
      dom.textContent = arr[i]
      const obj = gc.getObjectByName(`${arr[i]}标注`) as THREE.Mesh
      const canvas = createCanvas(arr[i])
      const texture = new THREE.CanvasTexture(canvas)
      const spriteMaterial = new THREE.SpriteMaterial({ map: texture })
      const sprite = new THREE.Sprite(spriteMaterial)
      const y = 4
      const x = canvas.width / canvas.height * y
      sprite.scale.set(x, y, 1)
      sprite.position.y = y / 2
      obj.add(sprite)
    }
    group.add(gc)
  })
  return group
}
// 创建一个canvas对象，绘制几何图案或添加文字
const createCanvas = (name: string) => {
  const canvas = document.createElement('canvas') // 创建一个canvas对象
  const arr = name.split('') // 分割为单独字符串
  let num = 0
  const reg = /[\u4e00-\u9fa5]/ // 正则表达式，匹配汉字范围
  for (let i = 0; i < arr.length; i++) {
    if (reg.test(arr[i])) { //判断是不是汉字
      num += 1
    } else {
      num += 0.5 //英文字母或数字累加0.5
    }
  }
  // 根据字符串符号类型和数量、文字font-size大小来设置canvas画布宽高度
  const h = 80 //根据渲染像素大小设置，过大性能差，过小不清晰
  const w = h + num * 16
  canvas.width = w
  canvas.height = h
  const h1 = h * 0.6
  const c = canvas.getContext('2d') as CanvasRenderingContext2D // 获取2D绘图上下文
  c.fillStyle = 'rgba(0,0,0,0.5)' // 定义轮廓颜色，黑色半透明 
  const R = h1 / 2  // 绘制半圆+矩形轮廓
  c.arc(R, R, R, -Math.PI / 2, Math.PI / 2, true) //顺时针半圆
  c.arc(w - R, R, R, Math.PI / 2, -Math.PI / 2, true) //顺时针半圆
  c.fill() // 填充半圆+矩形轮廓
  c.beginPath() // 绘制箭头
  const h2 = h - h1
  c.moveTo(w / 2 - h2 * 0.6, h1)
  c.lineTo(w / 2 + h2 * 0.6, h1)
  c.lineTo(w / 2, h)
  c.fill()
  // 文字
  c.beginPath()
  c.translate(w / 2, h1 / 2)
  c.fillStyle = '#ffffff' //文本填充颜色
  c.font = 'normal 30px 宋体' //字体样式设置
  c.textBaseline = 'middle' //文本与fillText定义的纵坐标
  c.textAlign = 'center' //文本居中(以fillText定义的横坐标)
  c.fillText(name, 0, 0)
  return canvas
}