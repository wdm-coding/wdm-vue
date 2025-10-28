import * as THREE from 'three'
// 创建管道模型组内单个模型
const createModel = () => {
  const model = new THREE.Group()
  const geometry = new THREE.PlaneGeometry(400,200)
  const material = new THREE.MeshLambertMaterial({
      color: 0x00ffff
  })
  const mesh = new THREE.Mesh(geometry, material)
  mesh.rotateX(-Math.PI / 2)
  model.add(mesh)
  return model
}
// 创建管道模型组
export const createMesh = () => {
  const models = new THREE.Group()
  models.add(createModel())
  return models
}
