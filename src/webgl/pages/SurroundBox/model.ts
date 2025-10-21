import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
const loadUrl = '/public/three-js/gltf/gc.gltf'
// 包围盒Box3
const createModel = () => {
  const model = new THREE.Group()
  // 实例化包围盒
  const box3 = new THREE.Box3()
  // 加载模型
  const geometry = new THREE.BoxGeometry(50, 50, 50)
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
  const mesh = new THREE.Mesh(geometry, material)
  // 包围盒包围模型
  box3.expandByObject(mesh)
  // 添加到场景中
  model.add(mesh)
  // 实例化三维向量
  const vector3 = new THREE.Vector3()
  // 获取包围盒的大小
  box3.getSize(vector3)
  const geo = new THREE.BoxGeometry(vector3.x * 2, vector3.y * 2, vector3.z * 2)
  const mat = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    transparent: true,
    opacity: 0.5 
  })
  const box = new THREE.Mesh(geo, mat)
  model.add(box)
  console.log('vector3',vector3)
  return model
}
export const createMesh = () => {
  const model = new THREE.Group()
  model.add(createModel())
  return model
}
// 12.2
