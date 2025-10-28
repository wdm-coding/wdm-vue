import * as THREE from 'three'
import { groundMesh,cftMesh } from '../../threejs-utils/models'
// 创建管道模型组内单个模型
const createModel = () => {
  const model = new THREE.Group()
   for(let i = -3; i < 4; i++){
    const geometry = new THREE.BoxGeometry(50,150,50)
    const material = new THREE.MeshLambertMaterial({ color: 0xffff00 })
    const mesh = new THREE.Mesh(geometry, material)
    mesh.position.set(0, 75, i * 150)
    mesh.castShadow = true // 长方体模型阴影投射设置
    model.add(mesh)
  }
  const ground = groundMesh()
  ground.receiveShadow = true // 地面模型阴影接收设置
  ground.scale.set(1,3,1)
  model.add(ground)
  return model
}
// 创建管道模型组
export const createMesh = () => {
  const models = new THREE.Group()
  models.add(createModel())
  return models
}
