
/* 曲线组合 */
import * as THREE from 'three'
// 两条直线和一个圆弧组合成一个U型曲线模型
// 基本数据
const H = 200 // 直线高度
const R = 80 // 圆弧半径

const createCurve = () => {
  const model = new THREE.Group()
  const line1 = new THREE.LineCurve(
    new THREE.Vector2(R,H),
    new THREE.Vector2(R,0)
  )
  const curve = new THREE.ArcCurve(
    0,
    0,
    R,
    0,
    Math.PI,
    true
  )
  const line2 = new THREE.LineCurve(
    new THREE.Vector2(-R,0),
    new THREE.Vector2(-R,H)
  )
  const curvePath = new THREE.CurvePath()
  curvePath.curves.push(line1, curve, line2)
  const points = curvePath.getPoints(16) as THREE.Vector3[]
  const geometry = new THREE.BufferGeometry().setFromPoints(points)
  const material = new THREE.LineBasicMaterial({ color: 0x00ff00 })
  const line = new THREE.Line(geometry, material)
  model.add(line)
  const material2 = new THREE.PointsMaterial({ color: 0xff0000, size: 5 })
  const points2 = new THREE.Points(geometry, material2)
  model.add(points2)
  return model
}
export const createMesh = () => {
  const model = new THREE.Group()
  model.add(createCurve())
  return model
}

