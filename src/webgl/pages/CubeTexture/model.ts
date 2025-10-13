
/* 立方体纹理加载器加载环境贴图 envMap */
import * as THREE from 'three'
import { Object3D } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
const loadUrl = '/public/three-js/glb/jinshu.glb'
const createMesh = () => {
  const model = new THREE.Group()
  // 加载环境贴图
  const cubeTexture = new THREE.CubeTextureLoader()
  .setPath('/public/three-js/环境贴图/环境贴图0/')
  .load(['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg'])
  // 加载模型
  const loader = new GLTFLoader()
  loader.load(loadUrl,gltf => {
    gltf.scene.traverse((obj:Object3D ) => {
      const mesh = obj as THREE.Mesh
      if (mesh.isMesh) { //判断是否是网格模型
      console.log('obj',mesh)
        if (mesh.material instanceof THREE.MeshStandardMaterial) {
          mesh.material.metalness = 1  // 金属度设置为1
          mesh.material.roughness = 0.35  // 粗糙度设置为0.5
          mesh.material.envMap = cubeTexture  // 设置环境贴图
          mesh.material.envMapIntensity = 2  // 环境贴图强度设置为1
        }
      }
    })
    model.add(gltf.scene)
  })
  return model
}
export const group = createMesh()
