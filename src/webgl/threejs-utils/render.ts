import * as THREE from 'three'
import { CSS2DRenderer,CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js'
import { CSS3DRenderer,CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js'
import { CSS3DSprite } from 'three/examples/jsm/Addons.js'
export const glRender = () => {
  const render = new THREE.WebGLRenderer({
    antialias: true // 抗锯齿
  })
  return render
}
// CSS2DRenderer 渲染器
export const cssRender = () => {
  const renderer = new CSS2DRenderer()
  return renderer
}
// CSS3DRenderer 渲染器
export const css3Render = () => {
  const renderer = new CSS3DRenderer()
  return renderer
}
// html元素2d标签
export const createHtml = (dom:HTMLElement) => {
  const tag = new CSS2DObject(dom)
  return tag
}
// html3d元素标签
export const create3DHtml = (dom:HTMLElement) => {
  const tag = new CSS3DObject(dom)
  return tag
}
// html精灵标签
export const create3DSprite = (dom:HTMLElement) => {
  const tag = new CSS3DSprite(dom)
  return tag
}