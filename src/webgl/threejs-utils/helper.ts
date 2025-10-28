import * as THREE from 'three'
// xyz辅助线设置
export const axesHelperLine = (scene:THREE.Scene,size:number) => {
  const axesHelper = new THREE.AxesHelper(size)
  scene.add(axesHelper)
  return axesHelper
}
// 聚广源辅助对象，可视化聚广源
export const spotLightHelperLine = (scene:THREE.Scene,spotLights:THREE.SpotLight) => {
  const spotLightHelper = new THREE.SpotLightHelper(spotLights,0xffffff)
  scene.add(spotLightHelper)
  return spotLightHelper
}
// 相机辅助对象，可视化相机
export const cameraHelperLine = (scene:THREE.Scene,camera:THREE.Camera) => {
  const cameraHelper = new THREE.CameraHelper(camera)
  scene.add(cameraHelper)
  return cameraHelper
}
// 平行光辅助对象，可视化平行光
export const dirLightHelperLine = (scene:THREE.Scene,dirLight:THREE.DirectionalLight) => {
  const dirLightHelper = new THREE.DirectionalLightHelper(dirLight,5,0xffffff)
  scene.add(dirLightHelper)
  return dirLightHelper
}