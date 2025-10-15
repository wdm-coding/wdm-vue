
/* 曲线组合 */
import * as THREE from 'three'
// 两条直线和一个圆弧组合成一个U型曲线模型
// 基本数据
const H = 200 // 直线高度
const R = 90 // 圆弧半径
const p1 = new THREE.Vector3(0,0,H)
const p2 = new THREE.Vector3(0,0,R)
const p3 = new THREE.Vector3(0,0,0)
const p4 = new THREE.Vector3(R,0,0)
const p5 = new THREE.Vector3(H,0,0)
const createCurve = () => {
  const model = new THREE.Group()
  const line1 = new THREE.LineCurve3(
    p1,
    p2
  )
  const curv = new THREE.QuadraticBezierCurve3(
    p2,
    p3,
    p4
  )
  const line2 = new THREE.LineCurve3(
    p4,
    p5
  )
  const curvePath = new THREE.CurvePath() as THREE.CurvePath<THREE.Vector3>
  curvePath.curves.push(line1, curv, line2)
  // 曲线管道
  const tubeGeometry = new THREE.TubeGeometry(
    curvePath, // 曲线路径
    15, // 细分段数
    R / 8, // 管径
    25, // 圆弧细分段数
    false // 是否闭合
  )
  const material = new THREE.MeshLambertMaterial({
    color: 0x00ff00,
    wireframe: false,
    side: THREE.DoubleSide 
  })
  const mesh = new THREE.Mesh(tubeGeometry, material)
  model.add(mesh)
  return model
}
export const createMesh = () => {
  const model = new THREE.Group()
  model.add(createCurve())
  return model
}

