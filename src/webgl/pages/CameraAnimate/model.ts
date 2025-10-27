import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
const loadUrl = '/public/three-js/gltf/gc.gltf'
const createModel = () => {
  const model = new THREE.Group()
  // 实例化加载器对象
  const loader = new GLTFLoader()
  // 加载模型
  loader.load(loadUrl,gltf => {
    model.add(gltf.scene)
  })
  return model
}
export const createMesh = () => {
  const model = new THREE.Group()
  model.add(createModel())
  return model
}
