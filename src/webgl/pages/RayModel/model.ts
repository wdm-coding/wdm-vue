import { isUtf8 } from 'buffer'
import * as THREE from 'three'
export const createModel = () => {
  const model = new THREE.Group()
  const geometry = new THREE.BufferGeometry()
  const vertices = new Float32Array([
    50,50,0,
    50,0,50,
    50,0,-50
  ])
  const attr = new THREE.BufferAttribute(vertices, 3)
  geometry.attributes.position = attr
  const material = new THREE.MeshLambertMaterial({ color: 0x00ffff,side: THREE.DoubleSide })
  const mesh = new THREE.Mesh(geometry, material)
  model.add(mesh)
  const params = {
    origin: new THREE.Vector3(0, 25, 0),
    direction: new THREE.Vector3(1, 0, 0).normalize()
  }
  const ray = new THREE.Ray(params.origin, params.direction)
  const p1 = new THREE.Vector3(50,50,0)
  const p2 = new THREE.Vector3(50,0,50)
  const p3 = new THREE.Vector3(50,0,-50)
  const point = new THREE.Vector3()
  const result = ray.intersectTriangle(
    p1, p2, p3,
    false, // 背面是否可见
    point // 交点
  )
  console.log(result)
  if(result){
    const rayHelper = new THREE.ArrowHelper(
      new THREE.Vector3(1, 0, 0).normalize(),
      params.origin,
      100,
      0xff0000
    )
    model.add(rayHelper)
  }
  return model
}