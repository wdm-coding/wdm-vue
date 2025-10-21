import * as THREE from 'three'
// 正交相机
export const orthographic = (containerWidth:number,containerHeight:number,s:number = 2.5,far:number = 8000) => {
  const k = containerWidth / containerHeight // 宽高比
  const camera = new THREE.OrthographicCamera(
    -s * k, // left // 左边的位置，与画布宽高比一致
    s * k, // right // 右边的位置，与画布宽高比一致
    s, // top
    -s, // bottom
    1, // near
    far // far
  )
  return camera
}
// 透视相机
export const perspective = (containerWidth:number,containerHeight:number) => {
  const k = containerWidth / containerHeight // 宽高比
  const camera  = new THREE.PerspectiveCamera(
    90, // 视野角度
    k, // 宽高比
    1, // 近剪裁面 相机距离近端截面的距离
    3000// 远剪裁面 相机距离远端截面的距离
  )
  return camera
}