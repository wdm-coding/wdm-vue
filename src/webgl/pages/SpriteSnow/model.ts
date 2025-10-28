import * as THREE from 'three'
import { factoryMesh } from '../../threejs-utils/models'
const createSnow = () => {
  const model = new THREE.Group()
  for (let i = 0; i < 9000; i++) {
    const texture1 = new THREE.TextureLoader().load('/public/three-js/环境贴图/雪花.png')
    const texture2 = new THREE.TextureLoader().load('/public/three-js/环境贴图/雨滴.png')
    const spriteMaterial = new THREE.SpriteMaterial({
      map: i % 2 === 0 ? texture1 : texture2
    })
    const sprite = new THREE.Sprite(spriteMaterial)
    sprite.scale.set(1, 1, 1)
    const x = (Math.random() - 0.5) * 800
    const y = Math.random() * 300
    const z = (Math.random() - 0.5) * 800
    sprite.position.set(x, y, z)
    model.add(sprite)
  }
  // 雨滴动画效果
  const clock = new THREE.Clock()
  const loopSnow = () => {
    const t = clock.getDelta()
    model.children.forEach((sprite:any) => {
      sprite.position.y -= t * 80
      if (sprite.position.y < 0) {
        sprite.position.y = 300
      }
    })
    requestAnimationFrame(loopSnow)
  }
  loopSnow()
  return model
}

export const createModel = () => {
  const model = new THREE.Group()
  const gc = factoryMesh()
  model.add(gc)
  const snow = createSnow()
  model.add(snow)
  return model
}