import * as THREE from "three";

export function createOrbitLine(radius) {
  const curve = new THREE.EllipseCurve(0, 0, radius, radius, 0, 2 * Math.PI);
  const points = curve.getPoints(64);
  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  const material = new THREE.LineBasicMaterial({
    color: "#ffffff",
    transparent: true,
    opacity: 0.2,
  });
  const orbitLine = new THREE.LineLoop(geometry, material);

  orbitLine.rotation.x = Math.PI / 2;
  return orbitLine;
}