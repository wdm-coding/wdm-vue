import * as THREE from 'three'
// Object3D：三维对象基类，所有三维对象的父类
// Mesh：网格模型对象，继承自Object3D
// Point：点模型对象，继承自Object3D
// Line：线模型对象，继承自Object3D

// 三维向量 Vector3：三维空间中的一个点，有三个分量x,y,z
// const vector = new THREE.Vector3()
// vector.set(1, 2, 3) // 设置x,y,z分量
// vector.setX(10) // 设置x分量
// vector.setY(20) // 设置y分量
// vector.setZ(30) // 设置z分量
// vector.normalize() // 向量归一化，长度变为1
// console.log('vector:', vector)

// 法向量 normal
// 纹理坐标 uv

const createSphere = () => {
  // SphereGeometry：球体
  // const geometry = new THREE.SphereGeometry(20, 32, 16) // 半径，宽度分段，竖直分段
  const geometry = new THREE.PlaneGeometry(100, 100) // 宽度，高度
  // const geometry = new THREE.BoxGeometry(50, 50, 50) // 宽度，高度，深度
  // 创建面模型
  const material = new THREE.MeshBasicMaterial({
    color: '#00fff0', 
    wireframe: false,
    transparent: true,
    opacity: 1
  })
  material.side = THREE.DoubleSide // 双面可见面
  material.color = new THREE.Color('#ff00f0') // 设置颜色
  material.color.r = 0.5 // 设置红色分量
  material.color.g = 0.4 // 设置绿色分量
  material.color.b = 0.1 // 设置蓝色分量
  material.color.setRGB(0.1, 0.5, 0.9) // 设置rgb分量，范围0-1
  material.color.setHSL(0.5, 0.5, 0.5) // 设置hsl分量，范围0-1
  material.color.setHex(0x00ff00) // 设置16进制颜色
  material.color.add(new THREE.Color('#0000ff')) // 颜色叠加
  material.color.multiply(new THREE.Color('#ffff00')) // 颜色相乘
  material.color.lerp(new THREE.Color('#00ff00'), 0.5) // 颜色插值
  material.color.setStyle('rgb(255,0,0)') // 设置css颜色
  const mesh = new THREE.Mesh(geometry, material)
  console.log('material:', mesh.material)
  console.log('geometry:', mesh.geometry)
  // 三维向量 Vector3：三维空间中的一个点，有三个分量x,y,z
  // const vector = new THREE.Vector3()
  // vector.set(10, 20, 10) // 设置x,y,z分量
  // vector.normalize() // 向量归一化，长度变为1
  // mesh.translateOnAxis(vector, 50) // 沿着法向量方向平移150单位距离
  // 欧拉角 Euler：三维空间中的旋转，有三个分量x,y,z
  // const euler = new THREE.Euler()
  // euler.set(Math.PI / 2,Math.PI,0) // 设置x,y,z分量，角度转弧度
  // mesh.setRotationFromEuler(euler) // 设置旋转
  return mesh
}
export const model1 = createSphere()

export const model2 = createSphere()
