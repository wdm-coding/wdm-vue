import * as THREE from 'three'

const createMesh = () => {
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
  return mesh
}
export const mesh = createMesh()

const createSquare = () => {
  // 创建几何体对象
  const geometry = new THREE.BufferGeometry()
  // 顶点坐标数据 - 类型化数组
  // const vertices = new Float32Array([
  //   // 第一个三角形
  //   0,0,0, // 0
  //   80,0,0, // 1
  //   80,80,0, // 2
  //   // 第二个三角形
  //   0,0,0, // 3
  //   80,80,0, // 4
  //   0,80,0 // 5
  // ])
  // 根据索引删除重复顶点
  const vertices = new Float32Array([
    0,0,0, // 0
    80,0,0, // 1
    80,80,0, // 2
    0,80,0 // 3
  ])
  // 0,1,2 第一个三角形 0,2,3 第二个三角形
  const indices = new Uint16Array([
    0,1,2,
    0,2,3
  ])
  // 设置索引缓冲区对象
  geometry.setIndex(new THREE.BufferAttribute(indices, 1))  // 1个一组表示一个三角形顶点索引
  // 创建属性缓冲区对象
  const attribute = new THREE.BufferAttribute(vertices, 3) // 3个一组表示一个顶点坐标
  // 设置几何体订单位置属性
  geometry.attributes.position = attribute
  // 设置法线数据
  const normals = new Float32Array([
    0,0,1,
    0,0,1,
    0,0,1,
    0,0,1,
    0,0,1,
    0,0,1
  ])
  geometry.attributes.normal = new THREE.BufferAttribute(normals, 3)
  // 创建点模型
  // const material = new THREE.PointsMaterial({ color: 0xfff000, size: 10 })
  // const mesh = new THREE.Points(geometry, material)
  // 创建线模型
  // const material = new THREE.LineBasicMaterial({ color: 0xfff000 })
  // const mesh = new THREE.LineLoop(geometry, material) // 线条闭环
  // const mesh = new THREE.Line(geometry, material) // 线条不闭环
  // 创建面模型
  const material = new THREE.MeshLambertMaterial({
    color: 0xfff000, 
    side: THREE.DoubleSide, 
    wireframe: false 
  })
  const mesh = new THREE.Mesh(geometry, material)
  return mesh
}
export const square = createSquare()

const createSphere = () => {
  // SphereGeometry：球体
  const geometry = new THREE.SphereGeometry(50, 32, 16) // 半径，宽度分段，竖直分段
  geometry.scale(0.5, 0.5, 0.5) // x,y,z轴缩放
  geometry.translate(50, 50, 0) // x,y,z轴平移
  geometry.rotateX(Math.PI / 4) // x轴旋转45度
  geometry.rotateY(Math.PI / 4) // y轴旋转45度
  geometry.rotateZ(Math.PI / 4) // z轴旋转45度
  geometry.computeBoundingBox() // 计算边界盒
  geometry.computeBoundingSphere() // 计算边界球
  geometry.center() // 边界盒中心点平移到原点
  console.log('geometry:', geometry)
  // 创建面模型
  const material = new THREE.MeshLambertMaterial({
    color: 0xfff000, 
    side: THREE.DoubleSide, 
    wireframe: true 
  })
  const mesh = new THREE.Mesh(geometry, material)
  return mesh
}
export const sphere = createSphere()
