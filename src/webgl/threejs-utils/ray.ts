import * as THREE from 'three'
interface RaySelectParams {
  event: MouseEvent,
  container:HTMLDivElement,
  camera:THREE.Camera,
  meshs:THREE.Mesh[]
}
export const raySelect = (params:RaySelectParams) => {
  const {
    event,
    container,
    camera,
    meshs 
  } = params
  // 1. 坐标轴转化
  const { offsetX, offsetY } = event
  const { width, height } = container.getBoundingClientRect()
  const x = offsetX / width * 2 - 1
  const y = -(offsetY / height) * 2 + 1
  // 2. 射线计算(鼠标点击位置 + 相机参数计算 射线方程)
  const raycaster = new THREE.Raycaster()
  raycaster.setFromCamera(
    new THREE.Vector2(x, y),
    camera
  )
  // 3. 射线交叉计算
  const intersects = raycaster.intersectObjects(meshs, true)
  return intersects
}