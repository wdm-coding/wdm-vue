import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
export const curbIrregularMesh = () => {
  // 三维样条曲线
  const path = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-50, 20, 90),
      new THREE.Vector3(-10, 40, 40),
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(60, -60, 0),
      new THREE.Vector3(90, -40, 60),
      new THREE.Vector3(120, 30, 30)
  ])
  // 样条曲线path作为TubeGeometry参数生成管道
  const geometry = new THREE.TubeGeometry(path, 200, 5, 30)
  const material = new THREE.MeshLambertMaterial()
  const mesh = new THREE.Mesh(geometry, material)
  const pointsArr = path.getSpacedPoints(500)
  return { mesh,pointsArr }
}
// 工厂模型
export const factoryMesh = (fun?:any) => {
  const model = new THREE.Group()
  // 实例化加载器对象
  const loader = new GLTFLoader()
  // 加载模型
  loader.load('/public/three-js/gltf/gc.gltf',gltf => {
    fun(gltf)
    model.add(gltf.scene)
  })
  return model
}
// 长方体模型
export const cftMesh = (color = 0xffff00) => {
  const geometry = new THREE.BoxGeometry(50,150,50)
  const material = new THREE.MeshLambertMaterial({ color })
  const mesh = new THREE.Mesh(geometry, material)
  return mesh
}
//  地面模型
export const groundMesh = (color = 0x00ffff) => {
  const geometry = new THREE.PlaneGeometry(600,400)
  const material = new THREE.MeshLambertMaterial({
      color
  })
  const mesh = new THREE.Mesh(geometry, material)
  mesh.rotateX(-Math.PI / 2)
  return mesh
}