import * as THREE from 'three'
// 精灵模型
export const createModel = () => {
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
  const sprite = new THREE.Sprite(spriteMaterial) as THREE.Sprite & { change: () => void }
  model.add(sprite)
  const geometry2 = new THREE.BoxGeometry(25, 100, 50)
  const material2 = new THREE.MeshLambertMaterial({
    color: 0x00ff00,
    side: THREE.DoubleSide
  })
  const mesh = new THREE.Mesh(geometry2, material2)
  model.add(mesh)
  sprite.scale.set(10, 10, 0)
  sprite.position.set(0, 55, 20)
  const sprite2 = sprite.clone()
  sprite2.position.set(0, 55, -20)
  sprite2.material = new THREE.SpriteMaterial({
    color: 0x00ffff,
    map: texture,
    transparent: true
  })
  model.add(sprite2)
  sprite.change = () => {
    mesh.material.color.set(0xff0000)
  }
  sprite2.change = () => {
    mesh.material.color.set(0x0000ff)
  }
  return { model,objects: [sprite,sprite2] }
}
export const selectModles = (event: MouseEvent, dom:HTMLDivElement, camera:THREE.Camera, objects:any) => {
  // 1. 坐标轴转化
  const { offsetX, offsetY } = event
  const { width, height } = dom.getBoundingClientRect()
  const x = offsetX / width * 2 - 1
  const y = -(offsetY / height) * 2 + 1
  // 2. 射线计算(鼠标点击位置 + 相机参数计算 射线方程)
  const raycaster = new THREE.Raycaster()
  raycaster.setFromCamera(
    new THREE.Vector2(x, y),
    camera
  )
  // 3. 射线交叉计算
  const intersects = raycaster.intersectObjects(objects, true)
  return intersects
}

