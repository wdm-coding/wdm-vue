import * as THREE from 'three'
/* 颜色插值 */
const createCurveColors = () => {
  const model = new THREE.Group()
  const color1 = new THREE.Color(1, 0, 0)
  const color2 = new THREE.Color(0, 1, 0)
  // lerpColors 插值颜色，返回一个新的颜色对象
  // const color3 = new THREE.Color().lerpColors(color1, color2, 0.1)
  // console.log(color3)
  // lerp 插值颜色，直接修改原来的颜色对象
  // color1.lerp(color2, 0.1)
  // console.log(color1)
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
  const c1 = new THREE.Color(1,0,0)
  const c2 = new THREE.Color(0, 1, 0)
  for (let i = 0; i < length; i++) {
    const percent = i / length
    const c = c1.clone().lerp(c2, percent)
    colorArr.push(c.r, c.g, c.b)
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

