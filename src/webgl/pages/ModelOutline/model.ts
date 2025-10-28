import * as THREE from 'three'
import { factoryMesh } from '../../threejs-utils/models'
export const createModel = () => {
  const model = new THREE.Group()
  const gc = factoryMesh((gltf:any) => {
    gltf.scene.traverse((child:any) => {
      if (child.isMesh) {
        // child.material.outlineWidth = 0.05
      }
    })
  })
  model.add(gc)
  return model
}
// 15.7