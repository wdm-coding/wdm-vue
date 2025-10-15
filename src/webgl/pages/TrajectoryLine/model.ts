
/* 轨迹线条 */
import * as THREE from 'three'
const p1 = new THREE.Vector3(-100, 0, -100)
const p2 = new THREE.Vector3(100, 0, 100)
// 计算屏p1 和 p2 的中点
const cx = (p1.x + p2.x) / 2
const cz = (p1.z + p2.z) / 2
const h = 50
const centerPoint = new THREE.Vector3(cx, h, cz)
const arr = [p1,centerPoint,p2]
const createCurve = (arr:any[]) => {
  const model = new THREE.Group()
  // 样条曲线
  // const curve = new THREE.CatmullRomCurve3(arr)
  // 三维二次贝塞尔曲线
  const curve = new THREE.QuadraticBezierCurve3(arr[0], arr[1], arr[2])
  const points = curve.getPoints(100)
  const geometry = new THREE.BufferGeometry().setFromPoints(points)
  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0xff0000,
    linewidth: 2
  })
  const line = new THREE.Line(geometry, lineMaterial) // 线模型
  model.add(line)
  // 可视化三个点
  const pointGeometry = new THREE.BufferGeometry().setFromPoints(arr)
  const pointMaterial = new THREE.PointsMaterial({ color: 0x00ff00, size: 5 })
  const pointsMesh = new THREE.Points(pointGeometry, pointMaterial)
  model.add(pointsMesh)
  return model
}
export const createMesh = () => {
  const model = new THREE.Group()
  model.add(createCurve(arr))
  return model
}

