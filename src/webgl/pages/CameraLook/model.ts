import * as THREE from 'three'
const createModel = () => {
  const model = new THREE.Group()
  const geometry = new THREE.BoxGeometry(30, 120, 80)
  const material = new THREE.MeshLambertMaterial({ color: 0x00ff00 })
  const mesh = new THREE.Mesh(geometry, material)
  model.add(mesh)
  return model
}
export const createMesh = () => {
  const model = new THREE.Group()
  model.add(createModel())
  return model
}
