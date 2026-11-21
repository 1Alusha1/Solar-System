import * as THREE from "three";

export function starGenerator(scene) {
  const starsCount = 3000;
  const positions = new Float32Array(starsCount * 3);

  for (let i = 0; i < starsCount * 3; i += 3) {
    const distance = 800 + Math.random() * 1200;

    const dir = new THREE.Vector3().randomDirection().multiplyScalar(distance);

    positions[i] = dir.x;
    positions[i + 1] = dir.y;
    positions[i + 2] = dir.z;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    color: "#fff",
    size: 2,
    sizeAttenuation: true,
  });

  const stars = new THREE.Points(geometry, material);
  scene.add(stars);
}