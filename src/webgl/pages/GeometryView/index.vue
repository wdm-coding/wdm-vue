<script setup lang='ts'>
  import * as THREE from 'three'
  // 引入轨道控制器扩展库OrbitControls.js
  import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
  import Stats from 'three/addons/libs/stats.module.js'
  import type {
    Scene, PerspectiveCamera, WebGLRenderer, Mesh, BoxGeometry, MeshBasicMaterial,MeshLambertMaterial
  } from 'three'
  const container = useTemplateRef<HTMLDivElement>('container')
  let scene: Scene
  let camera: PerspectiveCamera
  let renderer: WebGLRenderer
  let controls: OrbitControls
  let stats: Stats
  const initThree = () => {
    if (!container.value) return
    stats = new Stats()
    stats.dom.style.position = 'absolute'
    container.value.appendChild( stats.dom )
    // 1. 创建场景
    scene = new THREE.Scene()
    scene.background = new THREE.Color(0x000000)
    // 2. 添加长方体
    const geometry = new THREE.BoxGeometry(100,100,100) // 创建几何体
    // 创建漫反射材质
    const material = new THREE.MeshLambertMaterial({ 
      color: 0x00ff00 // 绿色
    })
    const mesh = new THREE.Mesh(geometry, material)
    mesh.position.set(0,0,0)
    scene.add(mesh)
    // 3. 添加球体
    const sphereGeometry = new THREE.SphereGeometry(50,50,20) // 创建球体几何体
    const sphereMaterial = new THREE.MeshLambertMaterial({ 
      color: 0x0000ff, // 蓝色
      wireframe: true // 线框模式
    })
    const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial)
    sphereMesh.position.set(150,0,0)
    scene.add(sphereMesh)
    // 4. 添加圆柱体
    const cylinderGeometry = new THREE.CylinderGeometry(50,50,100,20) // 创建圆柱体几何体
    const cylinderMaterial = new THREE.MeshLambertMaterial({ 
      color: 0xff0000, // 红色
      wireframe: true // 线框模式
    })
    const cylinderMesh = new THREE.Mesh(cylinderGeometry, cylinderMaterial)
    cylinderMesh.position.set(-150,0,0)
    scene.add(cylinderMesh)
    // 5. 添加矩形平面
    const planeGeometry = new THREE.PlaneGeometry(200,200) // 创建平面几何体
    const planeMaterial = new THREE.MeshLambertMaterial({ 
      color: 0xffff00, // 黄色
      side: THREE.DoubleSide // 双面可见
    })
    const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial)
    planeMesh.position.set(100,100,-100)
    scene.add(planeMesh)
    // 添加圆形平面
    const circleGeometry = new THREE.CircleGeometry(50,50) // 创建圆形几何体
    const circleMaterial = new THREE.MeshLambertMaterial({ 
      color: 0xff00ff, // 紫色
      side: THREE.DoubleSide // 双面可见
    })
    const circleMesh = new THREE.Mesh(circleGeometry, circleMaterial)
    circleMesh.position.set(-100,100,-100)
    scene.add(circleMesh)
    // 6. 添加网格辅助线
    const gridHelper = new THREE.GridHelper(500, 50) // 大小500，分割线50
    scene.add(gridHelper)
    // 3. 添加点光源
    const pointLight = new THREE.PointLight(0xffffff, 1.0)
    pointLight.decay = 0.2 // 衰减系数 光源距离越远，光照强度衰减得越快 0 表示不衰减 1 表示线性衰减 2 表示二次方衰减
    pointLight.position.set(200,200,200) // 设置光源位置
    scene.add(pointLight) // 将光源添加到场景中
    // 添加环境光
    const ambientLight = new THREE.AmbientLight(0xffffff, 1) // 环境光颜色、强度
    scene.add(ambientLight) // 将环境光添加到场景中
    // 添加平行光
    const directionalLight = new THREE.DirectionalLight(0xffffff, 10) // 平行光颜色、强度
    directionalLight.position.set(200,200,200) // 设置平行光位置斜45度方向
    scene.add(directionalLight) // 将平行光添加到场景中
    // 平行光可视化位置辅助线
    const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 10,0xff0000)
    scene.add(directionalLightHelper)
    // 4. 创建相机 透视相机（PerspectiveCamera）
    camera = new THREE.PerspectiveCamera(
      90, // 视野角度
      container.value.clientWidth / container.value.clientHeight, // 宽高比
      1, // 近剪裁面 相机距离近端截面的距离
      2000// 远剪裁面 相机距离远端截面的距离
    )
    // 设置相机位置
    camera.position.set(200,200,200) // 斜45度方向看立方体
    camera.lookAt(0, 0, 0) // 设置看向的位置 lookAt 与 position 两个点的连线即为相机看向的方向
    // camera.lookAt(1000,0,1000)
    // 5. 创建渲染器
    renderer = new THREE.WebGLRenderer({ antialias: true }) // 抗锯齿
    renderer.setSize(container.value.clientWidth, container.value.clientHeight) // 设置渲染器大小
    container.value.appendChild(renderer.domElement) // 将渲染器添加到容器中
    // 6.辅助坐标轴
    const axesHelper = new THREE.AxesHelper(250)
    scene.add(axesHelper) // 添加到场景中
    renderer.render(scene, camera) // 渲染场景和相机
    // 7. 创建相机控件
    controls = new OrbitControls(camera, renderer.domElement)
    // controls.target.set(1000, 0, 1000) // 设置控制器指向的点
    controls.enableDamping = true // 启用阻尼（惯性）
  }
  const animationId = ref<any|null>(null)
  function animate() {
    controls.update()
    stats.update()
    renderer.render(scene, camera)
    animationId.value = requestAnimationFrame(animate)
  }
  function handleResize() {
    if (!container.value) return
    renderer.setSize(container.value.clientWidth, container.value.clientHeight) // 更新渲染器大小
    camera.aspect = container.value.clientWidth / container.value.clientHeight // 设置相机的宽高比
    camera.updateProjectionMatrix() // 更新投影矩阵，以便在窗口大小改变时保持正确的投影效果。
  }
  onMounted(() => {
    initThree()
    window.addEventListener('resize', handleResize)
    animate()
  })
  onBeforeUnmount(() => {
    stats.dom && container.value?.removeChild(stats.dom)
    window.removeEventListener('resize', handleResize)
    animationId.value && cancelAnimationFrame(animationId.value)
    renderer && renderer.dispose()
  })
  defineOptions({
    name: 'GeometryView'
  })
</script>


<template>
  <div class='three-d-view'>
    <div class="wrap-text">
      <p>红R、绿G、蓝B分别对应坐标系的x、y、z轴</p>
      <ul style="margin-top: 15px;margin-left: 15px;">
        <li>旋转：拖动鼠标左键</li>
        <li>缩放：滚动鼠标中键</li>
        <li>平移：拖动鼠标右键</li>
      </ul>
    </div>
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
