import * as THREE from 'three'
import avator from '@/assets/images/logo.jpeg'
const createMesh2 = () => {
  const texture = new THREE.TextureLoader().load(avator)
  const geometry = new THREE.PlaneGeometry(250,50)
  geometry.rotateX(-Math.PI / 2)
  // 设置阵列纹理贴图
  texture.wrapS = THREE.RepeatWrapping // 纹理水平方向重复模式 u
  // texture.wrapT = THREE.RepeatWrapping // 纹理垂直重复模式 v
  // const repeat = new THREE.Vector2(5, 5) // 设置纹理重复次数，默认是（1,1）
  // texture.repeat = repeat
  // texture.offset.x = -0.5 // 设置纹理偏移量  u
  // texture.offset.y = 0.5 // 设置纹理偏移量  v
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.DoubleSide // 双面可见面
  })
  const mesh = new THREE.Mesh(geometry, material)
  return { mesh, texture }
}
export const group = createMesh2()
