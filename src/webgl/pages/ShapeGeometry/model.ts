
/* 轮廓填充 */
import * as THREE from 'three'
const arr = [
  new THREE.Vector2(110,210),
  new THREE.Vector2(110,-110),
  new THREE.Vector2(0,-280),
  new THREE.Vector2(-110,-110),
  new THREE.Vector2(-110,210)
]
const createCurve = () => {
  const model = new THREE.Group()
  const curve = new THREE.SplineCurve(arr)
  const points = curve.getPoints(100) // 曲线上的点数组，用于旋转成型曲面
  const shape = new THREE.Shape(points) // 轮廓对象，用于填充曲面
  const geometry = new THREE.ShapeGeometry(
    shape
  )
  const material = new THREE.MeshPhongMaterial({
    color: 0x00ff00,
    side: THREE.DoubleSide,
    wireframe: false
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

