import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
/* 相机控件 */
const createModel = () => {
  const model = new THREE.Group()
  const grap = 50
  for (let i = 0; i < 10; i++) {
    const geometry = new THREE.BoxGeometry(20, 20, 20)
    const material = new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff })
    const mesh = new THREE.Mesh(geometry, material)
    mesh.position.x = i * grap
    model.add(mesh)
    for (let j = 0; j < 10; j++) {
      const geometry = new THREE.BoxGeometry(20, 20, 20)
      const material = new THREE.MeshBasicMaterial({
        color: Math.random() * 0xffffff
      })
      const mesh = new THREE.Mesh(geometry, material)
      mesh.position.x = i * grap
      mesh.position.z = j * grap
      model.add(mesh)
    }
  }
  return model
}
export const createMesh = () => {
  const model = new THREE.Group()
  model.add(createModel())
  return model
}

