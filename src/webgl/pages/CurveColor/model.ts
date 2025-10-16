import * as THREE from 'three'
/* 曲线渐变色 */
const createCurveColors = () => {
  const model = new THREE.Group()
  const geometry = new THREE.BufferGeometry()
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-10, 0, -10),
    new THREE.Vector3(-5, 10, -5),
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(5, 10, 5),
    new THREE.Vector3(10, 0, 10)
  ])
  const points = curve.getSpacedPoints(100)
  geometry.setFromPoints(points)
  const pos = geometry.attributes.position //顶点位置属性
  const length = pos.count //顶点数量
  const colorArr:any[] = []
  for (let i = 0; i < length; i++) {
    const percent = i / length
    colorArr.push(percent, 0, 1 - percent)
  }
  const colors = new Float32Array(colorArr)
  const colorAttribute = new THREE.BufferAttribute(colors, 3)
  geometry.attributes.color = colorAttribute
  const material = new THREE.LineBasicMaterial({ vertexColors: true })
  const line = new THREE.Line(geometry, material)
  model.add(line)
  return model
}
export const createMesh = () => {
  const model = new THREE.Group()
  model.add(createCurveColors())
  return model
}
// 11.19

