import * as THREE from 'three'
import { groundMesh,cftMesh } from '../../threejs-utils/models'
// 创建管道模型组内单个模型
const createModel = () => {
  const model = new THREE.Group()
  const ground = groundMesh()
  const cft = cftMesh()
  cft.position.set(0,75,0)
  model.add(cft)
  cft.castShadow = true // 长方体模型阴影投射设置
  ground.receiveShadow = true // 地面模型阴影接收设置
  model.add(ground)
  return model
}
// 创建管道模型组
export const createMesh = () => {
  const models = new THREE.Group()
  models.add(createModel())
  return models
}
