import * as THREE from 'three'
interface CameraParams {
  width: number;
  height: number;
  near?: number;
  far?: number;
}
interface OrthographicParams extends CameraParams {
  s?: number;
}
interface PerspectiveParams extends CameraParams {
  per?: number;
}
// 正交相机
export const ortCamera = (orthographicParams:OrthographicParams) => {
  const {
    width,
    height,
    s = 2.5,
    near = 1,
    far = 8000
  } = orthographicParams
  const k = width / height // 宽高比
  const camera = new THREE.OrthographicCamera(
    -s * k, // left // 左边的位置，与画布宽高比一致
    s * k, // right // 右边的位置，与画布宽高比一致
    s, // top
    -s, // bottom
    near, // near
    far // far
  )
  return camera
}
// 透视相机
export const perCamera = (perspectiveParams:PerspectiveParams) => {
  const {
    width,
    height,
    per = 90,
    near = 1,
    far = 3000
  } = perspectiveParams
  const k = width / height // 宽高比
  const camera  = new THREE.PerspectiveCamera(
    per, // 视野角度
    k, // 宽高比
    near, // 近剪裁面 相机距离近端截面的距离
    far// 远剪裁面 相机距离远端截面的距离
  )
  return camera
}
