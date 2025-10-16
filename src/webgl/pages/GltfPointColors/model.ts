import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
/* 山脉地形高度可视化 */
const createCurveColors = () => {
  const model = new THREE.Group()
  const loader = new GLTFLoader()
  loader.load('/public/three-js/glb/dx.glb', gltf => {
    const mesh = gltf.scene.children[0] as THREE.Mesh
    const att = mesh.geometry.attributes
    const position = att.position as THREE.BufferAttribute
    // 获取所有顶点的Y坐标
    const yArray = []
    for(let i = 0; i < position.count; i++){
      const y = position.getY(i)
      const x = position.getX(i)
      const z = position.getZ(i)
      position.setY(i, y * 2)
      position.setX(i, x * 2)
      position.setZ(i, z * 2)
      yArray.push(y)
    }
    // 去重
    const uniqueYArray = Array.from(new Set(yArray))
    uniqueYArray.sort((a, b) => a - b)
    // 获取最大最小值
    const maxY = uniqueYArray[uniqueYArray.length - 1]
    const minY = uniqueYArray[0]
    const height = maxY - minY
    console.log('uniqueYArray',height)
    // 计算每个顶点的颜色值
    const clolorArray = []
    const c1 = new THREE.Color(0x00ff00) // 山谷颜色
    const c2 = new THREE.Color(0xff0000) // 山顶颜色
    const c3 = new THREE.Color(0xffff00) // 山顶颜色
    for (let i = 0; i < position.count; i++) {
      const currentY = position.getY(i)
      const percente = currentY / height
      if(percente < 0.5) {
        const color = c1.clone().lerp(c3, percente * 2)
        clolorArray.push(color.r, color.g, color.b)
      }else{
        const color = c3.clone().lerp(c2, (percente - 0.5) * 2)
        clolorArray.push(color.r, color.g, color.b)
      }
    }
    // 设置顶点颜色属性
    const colors = new Float32Array(clolorArray)
    const colorAttribute = new THREE.BufferAttribute(colors, 3)
    mesh.geometry.setAttribute('color', colorAttribute)
    // 设置材质的顶点颜色属性为true，以便使用顶点颜色进行渲染
    const material = mesh.material as THREE.MeshPhongMaterial
    material.vertexColors = true
    model.add(gltf.scene)
  })
  return model
}
export const createMesh = () => {
  const model = new THREE.Group()
  model.add(createCurveColors())
  return model
}

