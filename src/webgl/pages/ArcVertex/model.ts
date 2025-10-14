
/* 圆弧顶点 */
import * as THREE from 'three'
export const createMesh = () => {
  const model = new THREE.Group()
  const geometry = new THREE.BufferGeometry() // 顶点几何体
  const R = 100  // 半径
  const N = 100   // 顶点数
  const sp = 2 * Math.PI / N   // 间隔弧度
  // 设置圆心坐标
  const cx = 100
  const cy = 100
  const arr = [] // 顶点数组
  for (let i = 0; i < N; i++) {
    const angle = i * sp
    const x = R * Math.cos(angle) + cx // 弧度转角度，再乘以半径得到x坐标
    const y = R * Math.sin(angle) + cy // 弧度转角度，再乘以半径得到y坐标
    arr.push(x, y, 0) // 存储顶点坐标数组
  }
  // 创建顶点属性缓冲区对象
  const vertices = new Float32Array(arr) // 顶点数据
  const atttibute = new THREE.BufferAttribute(vertices, 3) // 顶点属性缓冲区对象 3表示每个顶点有三个分量
  geometry.setAttribute('position', atttibute) // 设置几何体顶点属性
  // 线材质
  const material = new THREE.LineBasicMaterial({
    color: 0x00ff00
  })
  // 线模型
  const mesh = new THREE.LineLoop(geometry, material)
  model.add(mesh) // 将线模型添加到组中
  return model
}
