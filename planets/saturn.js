import * as THREE from "three";
import { createEntity } from "..";

export const saturnOrbit = new THREE.Group();

const ringGeometry = new THREE.RingGeometry(23.0, 35.5, 64);
const ringMaterial = new THREE.MeshBasicMaterial({
  color: "#e2bf7d", // тёплый золотисто-песочный цвет пыли и льда
  side: THREE.DoubleSide,
  transparent: true,
  opacity: 0.75, // лёгкая прозрачность делает кольцо воздушным и живым
});

export const ring = new THREE.Mesh(ringGeometry, ringMaterial);
ring.position.x = 240;
ring.rotation.x = THREE.MathUtils.degToRad(115);

export const saturn = createEntity({
  radius: 19.5,
  texturePath: "./2k_saturn.jpg",
  roughness: 0.7,
  metalness: 0.1,
  position: {
    x: 240,
    y: 0,
    z: 0,
  },
});

saturnOrbit.add(saturn);
saturnOrbit.add(ring);
