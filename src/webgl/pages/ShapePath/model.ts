import * as THREE from 'three'
const arr = [
  new THREE.Vector2(50,210),
  new THREE.Vector2(50,-110),
  new THREE.Vector2(0,-580),
  new THREE.Vector2(-50,-110),
  new THREE.Vector2(-50,210)
]
/* 多边形轮廓Shape的父类Path */
const createShape = () => {
  const model = new THREE.Group()
  const shape = new THREE.Shape()
  const currentPoint = shape.currentPoint // 当前点 (0,0)
  shape.moveTo(10, 20)
  shape.lineTo(100, 20)
  shape.lineTo(100, 100)
  shape.lineTo(0, 200)
  shape.lineTo(-100, 100)
  shape.lineTo(-100, 20)
  console.log('currentPoint',shape.currentPoint)
  const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: 20 // 细分数量，默认为12
  })
  const material = new THREE.MeshPhongMaterial({
    color: 0x00ff00,
    side: THREE.DoubleSide,
    wireframe: false
  })
  const mesh = new THREE.Mesh(geometry, material)
  model.add(mesh)
  model.position.y = 100
  return model
}
/* 多边形轮廓Shape绘制相对圆弧 */
const createShapeArc = () => {
  const model = new THREE.Group()
  const shape = new THREE.Shape()
  const currentPoint = shape.currentPoint // 当前点 (0,0)
  shape.moveTo(100, 0)
  shape.arc(-50, 0, 50, 0, Math.PI / 2)
  shape.lineTo(0, 50)
  shape.arc(0,-50,50,0,-Math.PI)
  console.log('currentPoint',currentPoint)
  const geometry = new THREE.ShapeGeometry(shape,10)
  const material = new THREE.MeshPhongMaterial({
    color: 0x00ff00,
    side: THREE.DoubleSide,
    wireframe: false
  })
  const mesh = new THREE.Mesh(geometry, material)
  model.add(mesh)
  model.position.z = 100
  return model
}
/* 多边形轮廓Shape绘制绝对圆弧 */
const createShapeAbsArc = () => {
  const model = new THREE.Group()
  const shape = new THREE.Shape()
  shape.lineTo(150, 0)
  shape.absarc(100, 0, 50, 0, Math.PI / 2)
  shape.lineTo(0, 50)
  shape.absarc(0,0,50,0,-Math.PI)
  const currentPoint = shape.currentPoint // 当前点 (0,0)
  console.log('currentPoint',currentPoint)
  const geometry = new THREE.ShapeGeometry(shape)
  const material = new THREE.MeshPhongMaterial({
    color: 0x00ff00,
    side: THREE.DoubleSide,
    wireframe: false
  })
  const mesh = new THREE.Mesh(geometry, material)
  model.add(mesh)
  model.position.z = 100
  model.position.y = -100
  return model
}
/* 多边形轮廓Shape绘制内孔属性 */
const createShapeHoles = () => {
  const model = new THREE.Group()
  const shape = new THREE.Shape()
  shape.lineTo(150, 0)
  shape.lineTo(150, 150)
  shape.lineTo(0, 150)
  const circlePath = new THREE.Path()
  circlePath.absarc(70, 70, 20, 0, Math.PI * 2)
  const path2 = new THREE.Path()
  path2.moveTo(120, 120)
  path2.lineTo(120, 140)
  path2.lineTo(140, 140)
  path2.lineTo(140, 120)
  shape.holes.push(circlePath,path2)
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: 20,
    bevelEnabled: true,
    bevelThickness: 1,
    bevelSize: 1,
    bevelOffset: 0,
    bevelSegments: 2
  })
  const material = new THREE.MeshPhongMaterial({
    color: 0x00ff00,
    side: THREE.DoubleSide,
    wireframe: false
  })
  const mesh = new THREE.Mesh(geometry, material)
  model.add(mesh)
  model.position.x = 200
  return model
}
export const createMesh = () => {
  const model = new THREE.Group()
  model.add(createShape())
  model.add(createShapeArc())
  model.add(createShapeAbsArc())
  model.add(createShapeHoles())
  return model
}

