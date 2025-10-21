import * as THREE from 'three'
import mapData from './data'
const createModel = () => {
  const model = new THREE.Group()
  const pointerArr = mapData.map(item => new THREE.Vector2(...item))
  const shape = new THREE.Shape(pointerArr)
  const geo = new THREE.ShapeGeometry(shape)
  const mat = new THREE.MeshBasicMaterial({
    color: 0xff0000
  })
  const mesh = new THREE.Mesh(geo, mat)
  model.add(mesh)
  // 通过包围盒计算中心点和大小
  const box = new THREE.Box3()
  box.expandByObject(mesh)
  const size = new THREE.Vector3()
  box.getSize(size)
  const center = new THREE.Vector3()
  box.getCenter(center)
  console.log('size',size,'center',center)
  return model
}
export const createMesh = () => {
  const model = new THREE.Group()
  model.add(createModel())
  return model
}
