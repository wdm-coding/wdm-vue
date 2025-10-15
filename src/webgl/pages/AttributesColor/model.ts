import * as THREE from 'three'
/* 多边形轮廓Shape的父类Path */
const createPointColors = () => {
  const model = new THREE.Group()
  const geometry = new THREE.BufferGeometry() //创建一个几何体对象
  const vertices = new Float32Array([
    0,0,0,
    50,0,0,
    0,25,0
  ])
  geometry.attributes.position = new THREE.BufferAttribute(vertices, 3) //设置顶点位置信息
  const colors = new Float32Array([
      1, 0, 0, //顶点1颜色
      0, 0, 1, //顶点2颜色
      1, 0.2, 1 //顶点3颜色
  ])
  geometry.attributes.color = new THREE.BufferAttribute(colors, 3) //设置顶点颜色信息
  const material = new THREE.PointsMaterial({ 
    // color: 0xff0000,
    vertexColors: true,//默认false，设置为true表示使用顶点颜色渲染
    size: 5 
  }) //创建一个材质对象，设置颜色和点的大小
  const mesh = new THREE.Points(geometry, material) //创建一个网格对象，将几何体和材质组合到一起
  model.add(mesh)
  return model
}
const createLineColors = () => {
  const model = new THREE.Group()
  const geometry = new THREE.BufferGeometry() //创建一个几何体对象
  const vertices = new Float32Array([
    0,0,0,
    50,0,0,
    0,25,0
  ])
  geometry.attributes.position = new THREE.BufferAttribute(vertices, 3) //设置顶点位置信息
  const colors = new Float32Array([
      1, 0, 0, //顶点1颜色
      0, 0, 1, //顶点2颜色
      1, 0.2, 1 //顶点3颜色
  ])
  geometry.attributes.color = new THREE.BufferAttribute(colors, 3) //设置顶点颜色信息
  const material = new THREE.LineBasicMaterial({ 
    // color: 0xff0000,
    vertexColors: true//默认false，设置为true表示使用顶点颜色渲染
  })
  const mesh = new THREE.LineLoop(geometry, material) //创建一个网格对象，将几何体和材质组合到一起
  model.add(mesh)
  model.position.y = 100
  model.position.x = 50
  return model
}
const createAreaColors = () => {
  const model = new THREE.Group()
  const geometry = new THREE.BufferGeometry() //创建一个几何体对象
  const vertices = new Float32Array([
    0,0,0,
    50,0,0,
    0,25,0
  ])
  geometry.attributes.position = new THREE.BufferAttribute(vertices, 3) //设置顶点位置信息
  const colors = new Float32Array([
      1, 0, 0, //顶点1颜色
      0, 0, 1, //顶点2颜色
      0, 1, 0 //顶点3颜色
  ])
  geometry.attributes.color = new THREE.BufferAttribute(colors, 3) //设置顶点颜色信息
  const material = new THREE.MeshBasicMaterial({ 
    // color: 0xff0000,
    vertexColors: true, //默认false，设置为true表示使用顶点颜色渲染
    side: THREE.DoubleSide // 双面显示
  })
  const mesh = new THREE.Mesh(geometry, material) //创建一个网格对象，将几何体和材质组合到一起
  model.add(mesh)
  model.position.x = -100
  return model
}
export const createMesh = () => {
  const model = new THREE.Group()
  model.add(createPointColors())
  model.add(createLineColors())
  model.add(createAreaColors())
  return model
}
// 11.19

