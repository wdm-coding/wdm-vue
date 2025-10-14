
/* 物理网格材质 */
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
const loadUrl = '/public/three-js/glb/car.glb'
export const createMesh = () => {
  const model = new THREE.Group()
  // 创建进度条
  const progressBar = document.getElementById('progressBar') as HTMLDivElement
  // 加载环境贴图
  const cubeTexture = new THREE.CubeTextureLoader()
  .setPath('/public/three-js/环境贴图/环境贴图1/')
  .load(['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg'])
  // 加载模型
  const loader = new GLTFLoader()
  loader.load(loadUrl,gltf => {
    // 设置物理材质清漆层
    const mesh = gltf.scene.getObjectByName('外壳01') as THREE.Mesh
    const material = mesh.material as THREE.MeshPhysicalMaterial
    mesh.material = new THREE.MeshPhysicalMaterial({
      color: material.color, // 颜色，默认值是白色
      metalness: 0.9, // 金属度 0-1，默认值是0.5
      roughness: 0.5, // 粗糙度 0-1，默认值是0.5
      envMap: cubeTexture, // 环境贴图
      envMapIntensity: 5, // 环境贴图强度，默认值是1
      clearcoat: 1, // 清漆层厚度，默认值是0
      clearcoatRoughness: 0.1 // 清漆层粗糙度，默认值是0.1
    })
    // 设置物理材质透光率 折射率 transmission 0-1  ior 1-2.33
    const blMesh = gltf.scene.getObjectByName('玻璃01') as THREE.Mesh
    blMesh.material as THREE.MeshPhysicalMaterial
    blMesh.material = new THREE.MeshPhysicalMaterial({
      metalness: 0, // 金属度 0-1，默认值是0.5
      roughness: 0, // 粗糙度 0-1，默认值是0.5
      transmission: 1, // 透光率0-1，默认值是0
      ior: 2.33, // 折射率，默认值是1.5 1-2.33
      envMap: cubeTexture, // 环境贴图
      envMapIntensity: 1 // 环境贴图强度，默认值是1
    })
    // 隐藏进度条
    const container = document.getElementsByClassName('progressBarContainer')[0] as HTMLDivElement
    container.style.display = 'none'
    // 添加模型到场景中
    model.add(gltf.scene)
  },progress => {
    const loadedProgress = progress.loaded / progress.total
    progressBar.style.width = loadedProgress * 400 + 'px'
    progressBar.textContent = `${(loadedProgress * 100).toFixed(2)}%`
    progressBar.style.textIndent = loadedProgress * 400 + 5 + 'px'
  })
  return model
}
