import * as THREE from 'three'
// 本地坐标系和世界坐标系
const createMesh = () => {
  const group = new THREE.Group()
  const geometry = new THREE.BoxGeometry(20, 20, 20) // 宽度，高度，深度
  const material = new THREE.MeshBasicMaterial({ color: '#00fff0' })
  const mesh = new THREE.Mesh(geometry, material)
  mesh.position.x = 50 // 本地坐标系：模型的.position属性
  group.add(mesh)
  group.position.x = 50 // 世界坐标系，模型自身.position和所有父对象.position累加的坐标
  // 一个模型的世界坐标，说的是，模型自身.position和所有父对象.position累加的坐标。
  const v3 = new THREE.Vector3()
  mesh.getWorldPosition(v3) // 世界坐标系位置
  console.log('group world', v3) // 100 0 0
  // 给子对象添加一个局部坐标系
  const meshAxesHelper = new THREE.AxesHelper(50)
  mesh.add(meshAxesHelper)
  mesh.position.z = 50
  group.position.y = 50
  return group
}
// 改变模型局部坐标系
const createMesh2 = () => {
  const group = new THREE.Group()
  const geometry = new THREE.BoxGeometry(20, 20, 20) // 宽度，高度，深度
  const material = new THREE.MeshBasicMaterial({ color: '#00fff0' })
  const mesh = new THREE.Mesh(geometry, material)
  geometry.translate(10,0,0)
  group.add(mesh)
  group.position.x = 20 // 世界坐标系，模型自身.position和所有父对象.position累加的坐标
  return group
}
// 移除模型

const createMesh3 = () => {
  const group = new THREE.Group()
  const geometry = new THREE.BoxGeometry(20, 20, 20) // 宽度，高度，深度
  const material = new THREE.MeshLambertMaterial({ color: '#00fff0' })
  const mesh1 = new THREE.Mesh(geometry, material)
  const material2 = material.clone() // 克隆材质，单独控制材质属性
  const mesh2 = new THREE.Mesh(geometry, material2)
  mesh2.position.x = 50
  group.add(mesh1,mesh2)
  // 移除mesh1，
  // group.remove(mesh1)
  // 隐藏mesh2
  // mesh2.visible = false
  material.visible = false // 隐藏材质，所有用这个材质的模型都会隐藏
  return group
}



export const group = createMesh3()
