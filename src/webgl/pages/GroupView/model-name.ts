import * as THREE from 'three'
const createMesh = () => {
  const group1 = new THREE.Group()
  group1.name = '高层'
  for(let i = -3;i < 4;i++){
    const geometry1 = new THREE.BoxGeometry(20, 60, 10) // 宽度，高度，深度
    const material1 = new THREE.MeshBasicMaterial({ color: '#00fff0' })
    const mesh = new THREE.Mesh(geometry1, material1)
    mesh.position.x = i * 30
    mesh.name = (i + 4) + '号楼'
    group1.add(mesh)
  }
  group1.translateY(30)
  const group2 = new THREE.Group()
  group2.name = '别墅'
  for(let i = -3;i < 4;i++){
    const geometry2 = new THREE.BoxGeometry(20, 30, 10) // 宽度，高度，深度
    const material2 = new THREE.MeshBasicMaterial({ color: '#00fff0' })
    const mesh = new THREE.Mesh(geometry2, material2)
    mesh.position.x = i * 30
    mesh.name = (i + 4) + '号别墅'
    group2.add(mesh)
  }
  group2.position.z = 40
  group2.translateY(15)
  const group = new THREE.Object3D() // Object3D是所有3D对象的基类，Group继承自Object3D
  group.name = '小区' // 给组对象命名
  group.add(group1, group2) // 将mesh1和mesh2同时添加到组对象中
  // 递归获取节点的name属性
  group.traverse(obj => {
    // console.log('节点名称：', obj.name)
    if (obj instanceof THREE.Mesh) { // 判断是否为网格对象
      console.log('节点名称：', obj.name)
      obj.material.color = new THREE.Color(0xffff00) // 设置颜色
    }else{
      console.log('其他类型对象：', obj.name)
    }
  })
  // 根据名称获取组对象
  const obj:any = group.getObjectByName('6号楼') // 根据名称获取组对象
  obj.material.color = new THREE.Color(0xff0000) // 修改对象颜色
  // let count = 0
  // const timer = setInterval(() => {
  //   count++
  //   if(count > 7) count = 1
  //   const obj:any = group.getObjectByName(`${count}号楼`) // 根据名称获取组对象
  //   obj.material.color = new THREE.Color(0xff0000) // 修改对象颜色
  //   // 重置其他对象颜色
  //   for(let i = 1;i < 8;i++){
  //     if(i !== count){
  //       const obj:any = group.getObjectByName(`${i}号楼`) // 根据名称获取组对象
  //       obj.material.color = new THREE.Color(0xffff00) // 修改对象颜色
  //     }
  //   }
  // }, 1000)
  
  return group
}
export const group = createMesh()
