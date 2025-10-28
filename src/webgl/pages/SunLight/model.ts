import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import gui from '../../threejs-utils/gui'
// 创建管道模型组内单个模型
const createModel = () => {
  const model = new THREE.Group()
  const textureCube = new THREE.CubeTextureLoader()
  .setPath('/public/three-js/环境贴图/环境贴图6/')
  .load(['px.jpg','nx.jpg','py.jpg','ny.jpg','pz.jpg','nz.jpg'])
  textureCube.colorSpace = THREE.SRGBColorSpace // 设置颜色空间
  const loader = new GLTFLoader()
  const obj = {
    envMapIntensity: 2
  }
  loader.load('/public/three-js/gltf/gc.gltf',gltf => {
    model.add(gltf.scene)
    gltf.scene.traverse((child:any) => {
      if (child.isMesh) {
        child.castShadow = true // 开启投射阴影
        child.receiveShadow = true // 开启接收阴影
        child.material.envMap = textureCube // 设置环境贴图
        child.material.envMapIntensity = obj.envMapIntensity // 环境贴图强度
        child.material.needsUpdate = true // 更新材质
      }
    })
    gui.add(obj, 'envMapIntensity', 0, 5).name('环境贴图强度').onChange(() => {
      gltf.scene.traverse((child:any) => {
        if (child.isMesh) {
          child.material.envMapIntensity = obj.envMapIntensity
        }
      })
    })
  })
  return model
}
// 创建管道模型组
export const createMesh = () => {
  const models = new THREE.Group()
  models.add(createModel())
  return models
}
