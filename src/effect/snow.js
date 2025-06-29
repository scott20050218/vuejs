import * as THREE from 'three'
import { Points } from './points'

export class Snow{
  constructor(scene) {

    this.points = new Points(scene, {
      size: 30,
      opacity: 0.8,
      range: 1000,
      count: 600,
      setAnimation(position) {
        position.x -= position.speedX;
        position.y -= position.speedY;
        position.z -= position.speedZ;

        if (position.y <= 0) {
          position.y = this.range / 2;
        }
      },
      setPosition(position) {
        position.speedX = Math.random() - 0.5;
        position.speedY = Math.random() + 4;  // 下落速度
        position.speedZ = Math.random() - 0.5;
      },
      url: '../../src/assets/snow.png',
    })
    // this.scene = scene;
    //
    // // 范围
    // this.range = 1000;
    // // 雪花的个数
    // this.count = 600;
    //
    // this.pointList = [];
    //
    // this.init();
  }

  init() {
    // 粒子和粒子系统
    // PointCloud   Points

    // 材质
    this.material = new THREE.PointsMaterial({
      size: 30, // 粒子大小
      map: new THREE.TextureLoader().load('../../src/assets/snow.png'),
      transparent: true,  // 透明度
      opacity: 0.8,       // 模糊
      depthTest: false,   // 消除灰色背景
    })

    // 几何对象
    this.geometry = new THREE.BufferGeometry();

    // 添加顶点信息
    for (let i = 0; i < this.count; i++) {
      const position = new THREE.Vector3(
        Math.random() * this.range - this.range / 2,
        Math.random() * this.range,
        Math.random() * this.range - this.range / 2,
      )

      position.speedX = Math.random() - 0.5;
      position.speedY = Math.random() + 4;
      position.speedZ = Math.random() - 0.5;

      this.pointList.push(position)
    }
    console.log('生成粒子完成')
    this.geometry.setFromPoints(this.pointList);

    this.point = new THREE.Points(this.geometry, this.material)
    this.scene.add(this.point);
  }

  animation() {
    this.points.animation();
  }
}
