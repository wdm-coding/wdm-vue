import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js' // 引入gltf加载器
const createMesh = () => {
  // // 实例化加载器对象
  // const loader = new GLTFLoader()
  // // 加载模型
  // const gltfModel = loader.load('/models/DamagedHelmet/glTF-Binary/DamagedHelmet.gltf')
  const geometry = new THREE.BoxGeometry(100, 100, 100)
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
  const mesh = new THREE.Mesh(geometry, material)
  return mesh
}
export const group = createMesh()
