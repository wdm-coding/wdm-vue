import * as THREE from 'three'
import { factoryMesh } from '../../threejs-utils/models'
export const createModel = () => {
  const model = new THREE.Group()
  const g1 = new THREE.BoxGeometry(20,20,20)
  const m1 = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
  const mesh1 = new THREE.Mesh(g1, m1)
  mesh1.position.set(-30,10,0)
  model.add(mesh1)
  const g2 = new THREE.SphereGeometry(10,32,32)
  const m2 = new THREE.MeshBasicMaterial({ color: 0x0000ff })
  const mesh2 = new THREE.Mesh(g2, m2)
  mesh2.position.set(30,10,0)
  model.add(mesh2)
  const g3 = new THREE.CylinderGeometry(5,5,20,32)
  const m3 = new THREE.MeshBasicMaterial({ color: 0xff0000 })
  const mesh3 = new THREE.Mesh(g3, m3)
  mesh3.position.set(0,10,0)
  model.add(mesh3)
  return { model,objects: [mesh1,mesh2,mesh3] }
}
export const selectModles = (event: MouseEvent, dom:HTMLDivElement, camera:THREE.Camera, objects:any) => {
  const cunchu = objects.getObjectByName('存储罐')
  const child = cunchu.children
  child.forEach((item:any) => {
    item.traverse((v:any) => {
      if(v.isMesh){
        v.parent = item
      }
    })
  })
  console.log('cunchu',child)
  // 1. 坐标轴转化
  const { offsetX, offsetY } = event
  const { width, height } = dom.getBoundingClientRect()
  const x = offsetX / width * 2 - 1
  const y = -(offsetY / height) * 2 + 1
  // 2. 射线计算(鼠标点击位置 + 相机参数计算 射线方程)
  const raycaster = new THREE.Raycaster()
  raycaster.setFromCamera(
    new THREE.Vector2(x, y),
    camera
  )
  // 3. 射线交叉计算
  const intersects = raycaster.intersectObjects(child, true)
  return intersects
}

export const createGc = () => {
  const group = new THREE.Group()
  const gc = factoryMesh((gltf:any) => {
    
  })
  group.add(gc)
  return group
}