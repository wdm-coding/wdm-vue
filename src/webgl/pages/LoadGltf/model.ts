import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
const loadUrl = '/public/three-js/gltf/gc.gltf'
const createMesh = () => {
  const model = new THREE.Group()
  // 实例化加载器对象
  const loader = new GLTFLoader()
  // 加载模型
  loader.load(loadUrl,gltf => {
    gltf.scene.traverse(child => {
      if (child instanceof THREE.Mesh) {
        // if(child.name === '低模铁皮'){
        //   child.material.color.set('#00ffff')
        // }
      }
    })
    model.add(gltf.scene)
  })
  return model
}
// 1. 加载器对象加载模型
// 2. 设置相机参数，展现合适的视角
// 3. 设置渲染器参数，渲染模型
export const group = createMesh()
