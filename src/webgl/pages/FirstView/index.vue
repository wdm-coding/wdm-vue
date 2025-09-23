<script setup lang='ts'>
  import * as THREE from 'three'
  import type {
    Scene, PerspectiveCamera, WebGLRenderer, Mesh, BoxGeometry, MeshBasicMaterial 
  } from 'three'
  console.log(THREE)
  const container = useTemplateRef<HTMLDivElement>('container')
  let scene: Scene
  let camera: PerspectiveCamera
  let renderer: WebGLRenderer
  let cube: Mesh<BoxGeometry, MeshBasicMaterial>
  const initThree = () => {
    if (!container.value) return
    // 1. 创建场景
    scene = new THREE.Scene()
    scene.background = new THREE.Color(0x000000)
    // 2. 创建相机
    camera = new THREE.PerspectiveCamera(
      75,  // 视角
      container.value.clientWidth / container.value.clientHeight, // 宽高比
      0.5, // 近裁剪面
      1000 // 远裁剪面
    )
    camera.position.z = 5 // 相机距离原点5个单位长度
    // 3. 创建渲染器
    renderer = new THREE.WebGLRenderer({ antialias: true }) // 抗锯齿
    renderer.setSize(container.value.clientWidth, container.value.clientHeight) // 设置渲染器大小
    container.value.appendChild(renderer.domElement) // 将渲染器添加到容器中
    // 4. 添加物体
    const geometry = new THREE.BoxGeometry() // 创建几何体
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 }) // 创建材质
    cube = new THREE.Mesh(geometry, material) // 创建网格
    scene.add(cube) // 将网格添加到场景中
    // 5. 处理窗口大小变化
    window.addEventListener('resize', handleResize)
  }
  function animate() {
    requestAnimationFrame(animate)
    // 旋转立方体
    if (cube) {
      cube.rotation.x += 0.01
      cube.rotation.y += 0.01
    }
    renderer.render(scene, camera)
  }

  function handleResize() {
    if (!container.value) return
    camera.aspect = container.value.clientWidth / container.value.clientHeight
    camera.updateProjectionMatrix()
    renderer.setSize(container.value.clientWidth, container.value.clientHeight)
  }
  onMounted(() => {
    initThree()
    animate()
  })
  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
    if (renderer) {
      renderer.dispose()
    }
  })
  defineOptions({
    name: 'FirstView'
  })
</script>


<template>
  <div class='first-view'>
    <div ref="container" class="three-container" />
  </div>
</template>
<style lang="scss" scoped>
.first-view{
  width: 100%;
  height: 100%;
}
.three-container {
  width: 100%;
  height: 100%;
}
</style>
