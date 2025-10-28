import * as THREE from 'three'
interface LightParams {
  color?: number;
  intensity?: number;
  position?: [number, number, number];
}
// 创建平行光
export const dirLight = (params:LightParams) => {
  const {
    color = 0xffffff,
    intensity = 1,
    position = [100, 60, 50]
  } = params
  const directionalLight = new THREE.DirectionalLight(color, intensity) // 平行光颜色、强度
  directionalLight.position.set(...position) // 设置平行光位置斜45度方向
  return directionalLight
}
// 创建环境光
export const ambLight = (params:LightParams) => {
  const {
    color = 0xffffff,
    intensity = 0.4
  } = params
  const ambient = new THREE.AmbientLight(color, intensity) // 平行光颜色、强度
  return ambient
}
// 创建聚光灯
interface SpotLightParams extends LightParams {
  position?: [number, number, number];
  angle?: number;
}
export const spotLight = (params:SpotLightParams) => {
  const {
    color = 0xffffff,
    intensity = 1.0
  } = params
  const spotLight = new THREE.SpotLight(color,intensity)
  return spotLight
}