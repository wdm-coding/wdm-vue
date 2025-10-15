
/* 旋转成型 */
import * as THREE from 'three'
const arr = [
  new THREE.Vector2(10,60),
  new THREE.Vector2(25,30),
  new THREE.Vector2(150,-60)
]
const createCurve = () => {
  const model = new THREE.Group()
  const curve = new THREE.SplineCurve(arr) // 曲线对象，用于旋转成型曲面
  const points = curve.getPoints(100) // 曲线上的点数组，用于旋转成型曲面
  const geometry = new THREE.LatheGeometry(
    points,// 曲线数组
    132, // 细分数量
    50, // 以弧度为单位的起始角度
    Math.PI * 4 // 车床截面的弧度
  )
  const material = new THREE.MeshPhongMaterial({
    color: 0x00ff00,
    side: THREE.DoubleSide
  })
  const mesh = new THREE.Mesh(geometry, material)
  model.add(mesh)
  return model
}
export const createMesh = () => {
  const model = new THREE.Group()
  model.add(createCurve())
  return model
}

