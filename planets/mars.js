import * as THREE from "three";
import { createEntity } from "..";

export const marsOrbit = new THREE.Group();

export const mars = createEntity({
  radius: 6.2,
  texturePath: "../public/2k_mars.jpg",
  roughness: 0.7,
  metalness: 0.1,
  position: {
    x: 120,
    y: 0,
    z: 0,
  },
});

marsOrbit.add(mars);
