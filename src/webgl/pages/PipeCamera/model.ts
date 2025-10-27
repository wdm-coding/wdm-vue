import * as THREE from 'three'
import { curbIrregularMesh } from '../../threejs-utils/models'
// 创建管道模型组内单个模型
const createModel = () => {
  const model = new THREE.Group()
  // 纹理贴图加载器
  const textureLoader = new THREE.TextureLoader()
  // 加载纹理贴图
  const texture = textureLoader.load('/public/three-js/环境贴图/diffuse.jpg')
  texture.wrapS = THREE.RepeatWrapping //UV坐标U方向阵列模式
  texture.repeat.x = 10 //纹理沿着管道方向阵列(UV坐标U方向)
  const { mesh } = curbIrregularMesh()
  mesh.material.map = texture //纹理贴图赋值给材质
  mesh.material.needsUpdate = true //材质更新标记，否则纹理贴图不显示
  mesh.material.side = THREE.DoubleSide //双面可见
  model.add(mesh)
  return model
}
// 创建管道模型组
export const createMesh = () => {
  const models = new THREE.Group()
  models.add(createModel())
  return models
}
// 获取管道路径点数组
export const getPoints = () => {
  const { pointsArr } = curbIrregularMesh()
  return pointsArr
}
