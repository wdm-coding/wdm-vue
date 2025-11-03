import * as THREE from 'three'
import { create3DHtml } from '../../threejs-utils/render'
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
  const dom = document.querySelector('.tag1') as HTMLElement
  dom.style.top = '20px'
  const tag = create3DHtml(dom)
  tag.position.y += 120
  cone.add(tag)
  group.add(cone)
  return group
}