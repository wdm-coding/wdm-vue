import * as THREE from 'three'
import { CSS2DRenderer,CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js'
// CSS2DRenderer 渲染器
export const createRenderer = () => {
  const renderer = new CSS2DRenderer()
  return renderer
}

// html元素标签
export const createHtml = (dom:HTMLElement) => {
  const tag = new CSS2DObject(dom)
  return tag
}
export const createGroup = () => {
  const group = new THREE.Group()
  const geo = new THREE.BoxGeometry(100, 100, 100)
  const mat = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
  const mesh = new THREE.Mesh(geo, mat)
  const tag = createHtml(document.querySelector('.tag1') as HTMLElement)
  mesh.add(tag)
  group.add(mesh)
  const pos = geo.attributes.position
  const index = 5
  tag.position.set(pos.getX(index), pos.getY(index), pos.getZ(index))
  return group
}
// 圆锥标签
export const createCone = () => {
  const group = new THREE.Group()
  const geo = new THREE.ConeGeometry(100, 100)
  const mat = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
  const mesh = new THREE.Mesh(geo, mat)
  const tag = createHtml(document.querySelector('.tag1') as HTMLElement)
  mesh.add(tag)
  group.add(mesh)
  tag.position.set(0, 100, 0)
  return group
}