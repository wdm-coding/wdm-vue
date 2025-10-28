import * as THREE from 'three'
export const createModel = () => {
  const model = new THREE.Group()
  const geometry = new THREE.BoxGeometry(50, 50, 50)
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
  const gc = new THREE.Mesh(geometry, material)
  model.add(gc)
  return model
}