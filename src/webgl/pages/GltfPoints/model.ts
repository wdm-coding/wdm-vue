import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
/* gltf 几何体顶点 */
const createCurveColors = () => {
  const model = new THREE.Group()
  const loader = new GLTFLoader()
  loader.load('/public/three-js/glb/dx.glb', gltf => {
    const mesh = gltf.scene.children[0] as THREE.Mesh
    const att = mesh.geometry.attributes
    const position = att.position as THREE.BufferAttribute
    // console.log('position',position.count)
    // const x = position.getX(0)
    // console.log('x',x)
    // position.setY(0, 210)
    for(let i = 0; i < position.count; i++){
      const y = position.getY(i)
      position.setY(i, y * 2)
    }
    model.add(gltf.scene)
  })
  return model
}
export const createMesh = () => {
  const model = new THREE.Group()
  model.add(createCurveColors())
  return model
}
// 11.19

