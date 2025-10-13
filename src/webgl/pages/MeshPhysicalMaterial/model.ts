
/* 物理网格材质 */
import * as THREE from 'three'
import { Object3D } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
const loadUrl = '/public/three-js/glb/car.glb'
const createMesh = () => {
  const model = new THREE.Group()
  // 加载环境贴图
  const cubeTexture = new THREE.CubeTextureLoader()
  .setPath('/public/three-js/环境贴图/环境贴图1/')
  .load(['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg'])
  // 加载模型
  const loader = new GLTFLoader()
  loader.load(loadUrl,gltf => {
    const mesh = gltf.scene.getObjectByName('外壳01') as THREE.Mesh
    const material = mesh.material as THREE.MeshStandardMaterial
    mesh.material = new THREE.MeshPhysicalMaterial({
      color: material.color, // 颜色，默认值是白色
      metalness: 0.9, // 金属度 0-1，默认值是0.5
      roughness: 0.5, // 粗糙度 0-1，默认值是0.5
      envMap: cubeTexture, // 环境贴图
      envMapIntensity: 5, // 环境贴图强度，默认值是1
      clearcoat: 1, // 清漆层厚度，默认值是0
      clearcoatRoughness: 0.1 // 清漆层粗糙度，默认值是0.1
    })
    model.add(gltf.scene)
  })
  return model
}
// 9.6 物理材质透光率
export const group = createMesh()
