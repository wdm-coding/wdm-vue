import * as THREE from 'three'
// 解决模型闪烁问题
const createSphere = () => {
  const model = new THREE.Group()
  const geometry = new THREE.PlaneGeometry(100, 100) // 宽度，高度
  // 创建面模型
  const material = new THREE.MeshBasicMaterial({
    color: '#00fff0',
    side: THREE.DoubleSide // 双面渲染
  })
  const mesh = new THREE.Mesh(geometry, material)
  mesh.position.set(0, 0, 0)
  model.add(mesh)
  const geometry2 = new THREE.PlaneGeometry(50, 50)
  const material2 = new THREE.MeshBasicMaterial({
    color: '#fff000',
    side: THREE.DoubleSide // 双面渲染
  })
  const mesh2 = new THREE.Mesh(geometry2, material2)
  mesh2.position.set(0, 0, 0.1) // 稍微往后移动一点，避免闪烁问题
  model.add(mesh2)
  return model
}
export const model = createSphere()
