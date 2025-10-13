
/* PBR材质的金属度和粗糙度是相反的，金属度高，粗糙度低 */
import * as THREE from 'three'
import { Object3D } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
const loadUrl = '/public/three-js/glb/jinshu.glb'
const createMesh = () => {
  const model = new THREE.Group()
  // 实例化加载器对象
  const loader = new GLTFLoader()
  // 加载模型
  loader.load(loadUrl,gltf => {
    gltf.scene.traverse((obj:Object3D ) => {
      const mesh = obj as THREE.Mesh
      if (mesh.isMesh) { //判断是否是网格模型
      console.log('obj',mesh)
        if (mesh.material instanceof THREE.MeshStandardMaterial) {
          mesh.material.metalness = 1  // 金属度设置为1
          mesh.material.roughness = 0.5  // 粗糙度设置为0.5
        }
      }
    })
    model.add(gltf.scene)
  })
  return model
}
export const group = createMesh()
