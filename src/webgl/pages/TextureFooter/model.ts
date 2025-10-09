import * as THREE from 'three'
import avator from '@/assets/images/logo.jpeg'
const createMesh2 = () => {
  const texture = new THREE.TextureLoader().load(avator)
  const geometry = new THREE.PlaneGeometry(2500,2500)
  geometry.rotateX(-Math.PI / 2)
  // 设置阵列纹理贴图
  texture.wrapS = THREE.RepeatWrapping // 纹理重复模式
  texture.wrapT = THREE.RepeatWrapping // 纹理重复模式
  const repeat = new THREE.Vector2(50, 50) // 设置纹理重复次数，默认是（1,1）
  texture.repeat = repeat
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.DoubleSide // 双面可见面
  })
  const mesh = new THREE.Mesh(geometry, material)
  return mesh
}
export const group = createMesh2()
