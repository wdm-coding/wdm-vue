import * as THREE from 'three'
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
// html元素标签
export const createHtml = (dom:HTMLElement) => {
  dom.style.top = '-60px'
  const tag = new CSS2DObject(dom)
  return tag
}
// 工程模型
export const createCone = () => {
  const group = new THREE.Group()
  const geo = new THREE.ConeGeometry(25, 80)
  geo.translate(0, 40, 0) //y轴正方向，平移高度一半
  const mat = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
  const cone = new THREE.Mesh(geo, mat)
  cone.position.set(50, 0, 50)
  // 可视化模型的局部坐标系
  const axesHelper = new THREE.AxesHelper(100)
  cone.add(axesHelper)
  const tag = createHtml(document.querySelector('.tag1') as HTMLElement)
  tag.position.y += 80
  cone.add(tag)
  group.add(cone)
  return group
}