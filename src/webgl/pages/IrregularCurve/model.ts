
/* 不规则曲线Curve */
import * as THREE from 'three'
const p1 = new THREE.Vector2(-10, 0)
const p2 = new THREE.Vector2(-5, 15)
const p3 = new THREE.Vector2(20, 15)
const p4 = new THREE.Vector2(10, 0)
// 创建三维样条曲线 从一系列的点创建一条平滑的三维样条曲线。
const createCatmullRomCurve3 = () => {
  const model = new THREE.Group()
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3( -10, 0, 10 ),
    new THREE.Vector3( -5, 5, 5 ),
    new THREE.Vector3( 0, 0, 0 ),
    new THREE.Vector3( 5, -5, 5 ),
    new THREE.Vector3( 10, 0, 10 )
  ])
  const points = curve.getPoints(10)
  const geometry = new THREE.BufferGeometry().setFromPoints(points)
  const material = new THREE.PointsMaterial({
    color: 0x00ff00,
    size: 2
  })
  const mesh = new THREE.Points(geometry, material) // 点模型
  const lineM = new THREE.LineBasicMaterial({
    color: 0xff0000,
    linewidth: 2
  })
  const line = new THREE.Line(geometry, lineM) // 线模型
  model.add(mesh)
  model.add(line)
  return model
}



// 创建三维三次贝塞尔曲线（CubicBezierCurve3）一条平滑的三维 三次贝塞尔曲线， 由起点、终点和两个控制点所定义。
const createCubicBezierCurve3 = () => {
  const model = new THREE.Group()
  const curve = new THREE.CubicBezierCurve3(
    new THREE.Vector3( -10, 0, 0 ),
    new THREE.Vector3( -5, 15, 0 ),
    new THREE.Vector3( 20, 15, 0 ),
    new THREE.Vector3( 10, 0, 0 )
  )
  const points = curve.getPoints(10)
  const geometry = new THREE.BufferGeometry().setFromPoints(points)
  const material = new THREE.PointsMaterial({
    color: 0xfff000,
    size: 2
  })
  const mesh = new THREE.Points(geometry, material) // 点模型
   const lineM = new THREE.LineBasicMaterial({
    color: 0xfff000,
    linewidth: 2
  })
  const line = new THREE.Line(geometry, lineM) // 线模型
  model.add(mesh)
  model.add(line)
  return model
}
// 创建一条平滑的三维 二次贝塞尔曲线， 由起点、终点和一个控制点所定义。
const createQuadraticBezierCurve3 = () => {
  const model = new THREE.Group()
  const curve = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3( -10, 0, 0 ),
    new THREE.Vector3( 20, 15, 0 ),
    new THREE.Vector3( 10, 0, 0 )
  )
  const points = curve.getPoints(10)
  const geometry = new THREE.BufferGeometry().setFromPoints(points)
  const material = new THREE.PointsMaterial({
    color: 0x00ffff,
    size: 2
  })
  const mesh = new THREE.Points(geometry, material) // 点模型
   const lineM = new THREE.LineBasicMaterial({
    color: 0x00ffff,
    linewidth: 2
  })
  const line = new THREE.Line(geometry, lineM) // 线模型
  model.add(mesh)
  model.add(line)
  return model
}

// 创建一条平滑的二维 三次贝塞尔曲线， 由起点、终点和两个控制点所定义CubicBezierCurve。
const createCubicBezierCurve = () => {
  const model = new THREE.Group()
  const curve = new THREE.CubicBezierCurve(p1, p2, p3, p4)
  const points = curve.getPoints(10)
  const geometry = new THREE.BufferGeometry().setFromPoints(points)
  const material = new THREE.PointsMaterial({
    color: 0x00ff00,
    size: 2
  })
  const mesh = new THREE.Points(geometry, material) // 点模型
  const lineM = new THREE.LineBasicMaterial({
    color: 0xff0000,
    linewidth: 2
  })
  const line = new THREE.Line(geometry, lineM) // 线模型
  model.add(mesh)
  model.add(line)
  return model
}
// 创建二维二次贝塞尔曲线（QuadraticBezierCurve） 由起点、终点和一个控制点所定义。
const createQuadraticBezierCurve = () => {
  const model = new THREE.Group()
  const curve = new THREE.QuadraticBezierCurve(p1, p3, p4)
  const points = curve.getPoints(10)
  const geometry = new THREE.BufferGeometry().setFromPoints(points)
  const material = new THREE.PointsMaterial({
    color: 0x00ff00,
    size: 2
  })
  const mesh = new THREE.Points(geometry, material) // 点模型
  const lineM = new THREE.LineBasicMaterial({
    color: 0xff0000,
    linewidth: 2
  })
  const line = new THREE.Line(geometry, lineM) // 线模型
  model.add(mesh)
  model.add(line)
  return model
}
export const createMesh = () => {
  const model = new THREE.Group()
  // 加载三维样条曲线
  model.add(createCatmullRomCurve3())
  // 二维三次贝塞尔曲线
  model.add(createCubicBezierCurve())
  // 二维二次贝塞尔曲线
  model.add(createQuadraticBezierCurve())
  // 加载三维 二次贝塞尔曲线
  model.add(createQuadraticBezierCurve3())
  // 加载三维 三次贝塞尔曲线
  model.add(createCubicBezierCurve3())
  return model
}

// 11.7 样条，贝塞尔曲线

