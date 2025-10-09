import * as THREE from 'three'
const createMesh = () => {
  const geometry = new THREE.BoxGeometry(50, 50, 50) // 宽度，高度，深度
  // 创建面模型
  const material = new THREE.MeshBasicMaterial({
    color: '#00fff0', 
    wireframe: false,
    transparent: true,
    opacity: 1
  })
  const mesh1 = new THREE.Mesh(geometry, material)
  const mesh2 = new THREE.Mesh(geometry, material)
  mesh2.translateX(60) // 沿x轴平移60
  // 创建一个组对象
  // const group = new THREE.Group()
  const group = new THREE.Object3D() // Object3D是所有3D对象的基类，Group继承自Object3D
  // group.add(mesh1) // 将mesh1添加到组对象中
  // group.add(mesh2) // 将mesh2添加到组对象中
  group.add(mesh1, mesh2) // 将mesh1和mesh2同时添加到组对象中
  return group
}
export const group = createMesh()
