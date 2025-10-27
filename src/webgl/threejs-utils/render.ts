import * as THREE from 'three'
export const glRender = () => {
  const render = new THREE.WebGLRenderer({
    antialias: true // 抗锯齿
  })
  return render
}