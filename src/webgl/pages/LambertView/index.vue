<script setup lang='ts'>
  import * as THREE from 'three'
  import type {
    Scene, PerspectiveCamera, WebGLRenderer, Mesh, BoxGeometry, MeshBasicMaterial,MeshLambertMaterial
  } from 'three'
  console.log(THREE)
  const container = useTemplateRef<HTMLDivElement>('container')
  let scene: Scene
  let camera: PerspectiveCamera
  let renderer: WebGLRenderer
  let cube: Mesh<BoxGeometry, MeshLambertMaterial>
  const initThree = () => {
    if (!container.value) return
    // 1. 创建场景
    scene = new THREE.Scene()
    scene.background = new THREE.Color(0x000000)
    // 2. 添加物体
    const geometry = new THREE.BoxGeometry(50,50,50) // 创建几何体
    // 创建漫反射材质
    const material = new THREE.MeshLambertMaterial({ 
      color: 0x00ff00 // 绿色
    })
    cube = new THREE.Mesh(geometry, material) // 创建网格
    cube.position.set(0,0,0)  // 设置网格位置
    scene.add(cube) // 将网格添加到场景中
    // 添加光源
    const pointLight = new THREE.PointLight(0xffffff, 1.0)
    pointLight.intensity = 10 // 设置光照强度
    pointLight.decay = 0.2 // 衰减系数 光源距离越远，光照强度衰减得越快 0 表示不衰减 1 表示线性衰减 2 表示二次方衰减
    pointLight.position.set(100,100,200) // 设置光源位置
    pointLight.position.set(100,0,0) // 设置光源在x轴正方向
    pointLight.position.set(0,100,0) // 设置光源在y轴正方向
    pointLight.position.set(0,0,100) // 设置光源在z轴正方向
    scene.add(pointLight) // 将光源添加到场景中
    // 3. 创建相机 透视相机（PerspectiveCamera）
    camera = new THREE.PerspectiveCamera(
      50, // 视野角度
      container.value.clientWidth / container.value.clientHeight, // 宽高比
      1, // 近剪裁面 相机距离近端截面的距离
      1000// 远剪裁面 相机距离远端截面的距离
    )
    // 设置相机位置
    camera.position.set(150,150,150) // 斜45度方向看立方体
    camera.lookAt(0, 0, 0) // 设置看向的位置 lookAt 与 position 两个点的连线即为相机看向的方向
    // 4. 创建渲染器
    renderer = new THREE.WebGLRenderer({ antialias: true }) // 抗锯齿
    renderer.setSize(container.value.clientWidth, container.value.clientHeight) // 设置渲染器大小
    container.value.appendChild(renderer.domElement) // 将渲染器添加到容器中
    // 5.辅助坐标轴
    const axesHelper = new THREE.AxesHelper(150)
    scene.add(axesHelper) // 添加到场景中
    renderer.render(scene, camera) // 渲染场景和相机
    // 处理窗口大小变化
    window.addEventListener('resize', handleResize)
  }

  function handleResize() {
    if (!container.value) return
    camera.aspect = container.value.clientWidth / container.value.clientHeight
    camera.updateProjectionMatrix()
    renderer.setSize(container.value.clientWidth, container.value.clientHeight)
  }
  onMounted(() => {
    initThree()
  })
  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
    if (renderer) {
      renderer.dispose()
    }
  })
  defineOptions({
    name: 'LambertView'
  })
</script>


<template>
  <div class='three-d-view'>
    <div class="wrap-text">红R、绿G、蓝B分别对应坐标系的x、y、z轴</div>
    <div ref="container" class="three-container" />
  </div>
</template>
<style lang="scss" scoped>
.three-d-view{
  width: 100%;
  height: 100%;
  position: relative;
  .three-container {
    width: 100%;
    height: 100%;
  }
  .wrap-text{
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
    color: #fff;
    font-size: 14px;
    background-color: rgba(0,0,0,0.5);
    padding: 4px 8px;
    border-radius: 4px;
  }
}
</style>
