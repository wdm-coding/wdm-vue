import * as THREE from 'three'
// 精灵模型
const createModel = () => {
  const model = new THREE.Group()
  // 创建精灵材质
  const spriteMaterial = new THREE.SpriteMaterial({
    color: 0x00ffff
  })
  // 创建精灵并添加到模型组中
  const sprite = new THREE.Sprite(spriteMaterial)
  sprite.scale.set(100, 100, 10)
  sprite.position.set(0, 100, 0)
  model.add(sprite)
  const geometry = new THREE.PlaneGeometry(100, 100)
  const material = new THREE.MeshBasicMaterial({
    color: 0x00ffff,
    side: THREE.DoubleSide
  })
  const mesh = new THREE.Mesh(geometry, material)
  mesh.position.set(0, 0, 0)
  model.add(mesh)
  return model
}
// 创建管道模型组
export const createMesh = () => {
  const models = new THREE.Group()
  models.add(createModel())
  return models
}
