import * as THREE from 'three'
// 创建几何体对象
const geometry = new THREE.BufferGeometry()

// 顶点坐标数据 - 类型化数组
const vertices = new Float32Array([
  0,0,0,
  50,0,0,
  0,100,0,
  0,0,10,
  0,0,100,
  50,0,10
])
// 创建属性缓冲区对象
const attribute = new THREE.BufferAttribute(vertices, 3) // 3个一组表示一个顶点坐标
// 设置几何体位置属性
geometry.attributes.position = attribute
// 创建点模型
// const material = new THREE.PointsMaterial({ color: 0xfff000, size: 10 })
// const mesh = new THREE.Points(geometry, material)
// 创建线模型
// const material = new THREE.LineBasicMaterial({ color: 0xfff000 })
// const mesh = new THREE.LineLoop(geometry, material) // 线条闭环
// const mesh = new THREE.Line(geometry, material) // 线条不闭环
// 创建面模型
const material = new THREE.MeshBasicMaterial({ color: 0xfff000, side: THREE.DoubleSide })
const mesh = new THREE.Mesh(geometry, material)

export default mesh
