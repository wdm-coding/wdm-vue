import * as THREE from 'three'
import { factoryMesh } from '../../threejs-utils/models'
// 创建管道模型组内单个模型
const createModel = () => {
  const model = new THREE.Group()
  const mesh = factoryMesh()
  model.add(mesh)
  return model
}
// 创建管道模型组
export const createMesh = () => {
  const models = new THREE.Group()
  models.add(createModel())
  return models
}
