
/* SetFromPoints */
import * as THREE from 'three'
export const createMesh = () => {
  const model = new THREE.Group()
  const geometry = new THREE.BufferGeometry() // 顶点几何体
  // 设置顶点数组 yoz平面坐标系中绘制矩形，顶点顺序为逆时针
  // const pointsArr = [
  //   new THREE.Vector3(0, 0, 0),
  //   new THREE.Vector3(0, 100, 0),
  //   new THREE.Vector3(0, 100, 100),
  //   new THREE.Vector3(0, 0, 100)
  // ]
  // 设置顶点数组 xoy平面坐标系中绘制矩形，顶点顺序为逆时针
  const pointsArr = [
    new THREE.Vector2(0, 0),
    new THREE.Vector2(100,0),
    new THREE.Vector2(100, 100),
    new THREE.Vector2(0, 100)
  ]
  // 设置顶点数组到几何体中
  geometry.setFromPoints(pointsArr) // 传入顶点数组，自动计算顶点索引
  // 线材质
  const material = new THREE.LineBasicMaterial({
    color: 0x00ff00
  })
  // 线模型
  const mesh = new THREE.LineLoop(geometry, material)
  model.add(mesh) // 将线模型添加到组中
  return model
}
