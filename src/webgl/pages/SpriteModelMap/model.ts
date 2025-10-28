import * as THREE from 'three'
// 精灵模型
const createModel = () => {
  const model = new THREE.Group()
  // 贴图
  const texture = new THREE.TextureLoader().load('/public/three-js/环境贴图/光点.png')
  // 创建精灵材质
  const spriteMaterial = new THREE.SpriteMaterial({
    color: 0xffff00,
    map: texture,
    transparent: true
  })
  // 创建精灵并添加到模型组中
  const sprite = new THREE.Sprite(spriteMaterial)
  model.add(sprite)
  const geometry = new THREE.PlaneGeometry(100, 100)
  const material = new THREE.MeshBasicMaterial({
    color: 0x00ffff,
    side: THREE.DoubleSide
  })
  const mesh = new THREE.Mesh(geometry, material)
  mesh.position.set(0, 0, 0)
  model.add(mesh)
  const geometry2 = new THREE.BoxGeometry(25, 100, 50)
  const material2 = new THREE.MeshLambertMaterial({
    color: 0x00ff00,
    side: THREE.DoubleSide
  })
  const mesh2 = new THREE.Mesh(geometry2, material2)
  mesh2.position.set(100, 0, 0)
  model.add(mesh2)
  sprite.scale.set(10, 10, 0)
  sprite.position.set(100, 55, 0)
  return model
}
// 创建管道模型组
export const createMesh = () => {
  const models = new THREE.Group()
  models.add(createModel())
  return models
}
