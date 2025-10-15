import * as THREE from 'three'
const arr = [
  new THREE.Vector2(50,210),
  new THREE.Vector2(50,-110),
  new THREE.Vector2(0,-580),
  new THREE.Vector2(-50,-110),
  new THREE.Vector2(-50,210)
]
/* 拉伸成型 */
const createCurve = () => {
  const model = new THREE.Group()
  const curve = new THREE.SplineCurve(arr)
  const points = curve.getPoints(100) // 曲线上的点数组，用于旋转成型曲面
  const shape = new THREE.Shape(points) // 轮廓对象，用于填充曲面
  const arr2 = [
    new THREE.Vector2(1, 400),
    new THREE.Vector2(1, 210),
    new THREE.Vector2(-1, 210),
    new THREE.Vector2(-1, 400)
  ]
  const shape2 = new THREE.Shape(arr2) // 轮廓对象，用于填充曲面
  const geometry = new THREE.ExtrudeGeometry(
    [shape,shape2], // 轮廓对象，用于填充曲面
    {
      steps: 12, // 拉伸的细分数量，默认为12
      depth: 10, // 拉伸的距离，默认为100
      bevelEnabled: true, // 是否启用斜角，默认为false
      bevelThickness: 20, // 斜角厚度，默认为1
      bevelSize: 20, // 斜角大小，默认为1
      bevelOffset: 20, // 斜角偏移，默认为0
      bevelSegments: 20 // 斜角细分数量，默认为1
    }
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
// 扫描成型
const createExtrude = () => {
  // 定义扫描轮廓
  const shape = new THREE.Shape([
    new THREE.Vector2(0, 0),
    new THREE.Vector2(0, 10),
    new THREE.Vector2(10, 10),
    new THREE.Vector2(10, 0),
    new THREE.Vector2(0, 0)
  ])
  // 定义扫描路径
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-10,-50,-50),
    new THREE.Vector3(10, 10, 0),
    new THREE.Vector3(8, 50, 50),
    new THREE.Vector3(-5, 0, 100)
  ])
  // 创建扫描成型几何体
  const geometry = new THREE.ExtrudeGeometry(shape, {
    extrudePath: curve, // 扫描路径
    steps: 100 // 细分数量，默认为12
  })
  const material = new THREE.MeshPhongMaterial({
    color: 0x00ff00
  })
  const mesh = new THREE.Mesh(geometry, material)
  return mesh
}
export const createMesh = () => {
  const model = new THREE.Group()
  // model.add(createCurve())
  model.add(createExtrude())
  return model
}

