import * as THREE from 'three'
const arr = [
  new THREE.Vector2(50,210),
  new THREE.Vector2(50,-110),
  new THREE.Vector2(0,-580),
  new THREE.Vector2(-50,-110),
  new THREE.Vector2(-50,210)
]
/* 多边形轮廓Shape的父类Path */
const createEdges = () => {
  const model = new THREE.Group()
  const geometry = new THREE.BoxGeometry(100, 100, 100)
  const material = new THREE.MeshBasicMaterial({
 color: 0x00ff00, wireframe: false, transparent: true, opacity: 0.2 
})
  const mesh = new THREE.Mesh(geometry, material)
  // 长方体作为EdgesGeometry参数创建一个新的几何体
  const edges = new THREE.EdgesGeometry(geometry)
  // 创建一个线条几何体，并将其添加到长方体的子对象中
  const edgesMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 })
  // 创建一个线条网格，并将其添加到长方体的子对象中
  const edgesMesh = new THREE.LineSegments(edges, edgesMaterial)
  mesh.add(edgesMesh)
  model.add(mesh)
  model.position.x = 100
  return model
}
const createEdges2 = () => {
  const model = new THREE.Group()
  const geometry = new THREE.CylinderGeometry(50, 50, 100)
  const material = new THREE.MeshBasicMaterial({
 color: 0x00ff00, wireframe: false, transparent: true, opacity: 0.2 
})
  const mesh = new THREE.Mesh(geometry, material)
  // 长方体作为EdgesGeometry参数创建一个新的几何体
  const edges = new THREE.EdgesGeometry(geometry, 12)
  // 创建一个线条几何体，并将其添加到长方体的子对象中
  const edgesMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 })
  // 创建一个线条网格，并将其添加到长方体的子对象中
  const edgesMesh = new THREE.LineSegments(edges, edgesMaterial)
  mesh.add(edgesMesh)
  model.add(mesh)
  model.position.x = -100
  return model
}
export const createMesh = () => {
  const model = new THREE.Group()
  model.add(createEdges())
  model.add(createEdges2())
  return model
}

