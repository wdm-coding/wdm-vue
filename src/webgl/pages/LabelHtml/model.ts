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
  // 获取世界坐标位置
  const worldPos = new THREE.Vector3()
  mesh.getWorldPosition(worldPos)
  group.add(mesh)
  const tag = createHtml(document.querySelector('.tag1') as HTMLElement)
  // 设置标签位置为mesh的世界坐标
  tag.position.copy(worldPos)
  group.add(tag)
  return group
}