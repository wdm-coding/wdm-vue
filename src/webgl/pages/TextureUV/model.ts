import * as THREE from 'three'
import img from '@/assets/images/map2.jpg'
import avator from '@/assets/images/logo.jpeg'
const createMesh1 = () => {
  const vertices = new Float32Array([
    0,0,0,
    160,0,0,
    160,80,0,
    0,80,0
  ])
  const attribue = new THREE.BufferAttribute(vertices,3)
  const geometry = new THREE.BufferGeometry()
  geometry.attributes.position = attribue
  const indexes = new Uint16Array([
    0,1,2,0,2,3
  ])
  geometry.index = new THREE.BufferAttribute(indexes,1)
  const uvs = new Float32Array([
    0,0,
    1,0,
    1,1,
    0,1
  ])
  geometry.attributes.uv = new THREE.BufferAttribute(uvs,2)
  const texture = new THREE.TextureLoader().load(img)
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.DoubleSide // 双面可见面
  })
  const mesh = new THREE.Mesh(geometry, material)
  return mesh
}
const createMesh2 = () => {
  const geometry = new THREE.CircleGeometry(50,50)
  console.log(geometry.attributes.uv)
  const texture = new THREE.TextureLoader().load(avator)
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.DoubleSide // 双面可见面
  })
  const mesh = new THREE.Mesh(geometry, material)
  return mesh
}
export const group = createMesh2()
