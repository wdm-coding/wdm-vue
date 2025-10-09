import * as THREE from 'three'
import img from '@/assets/images/map2.jpg'
// 创建纹理贴图
const createMesh1 = () => {
  // 创建纹理加载器对象
  const loader = new THREE.TextureLoader()
  // 加载纹理贴图,返回纹理对象
  const texture = loader.load(
    img,
    () => {
      console.log('纹理加载完成')
    },
    undefined,
    err => {
      console.log('纹理加载失败', err)
    }
  )
  // 将纹理贴图赋值给材质的 map 属性
  const material = new THREE.MeshBasicMaterial({ 
    // color: '#00fff0',
    alphaTest: 1, // 设置透明度裁剪
    transparent: true, // 开启透明度
    map: texture
   })
  // 创建球体几何形状
  const geometry = new THREE.SphereGeometry(80, 32, 32)
  const mesh = new THREE.Mesh(geometry, material)
  return mesh
}
export const group = createMesh1()
