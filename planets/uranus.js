import * as THREE from "three";
import { createEntity } from "..";

export const uranusOrbit = new THREE.Group();

export const uranus = createEntity({
  radius: 13.0,
  texturePath: "../public/2k_uranus.jpg",
  roughness: 0.7,
  metalness: 0.1,
  position: {
    x: 300,
    y: 0,
    z: 0,
  },
});

uranusOrbit.add(uranus);
