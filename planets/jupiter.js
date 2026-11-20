import * as THREE from "three";
import { createEntity } from "..";

export const jupiterOrbit = new THREE.Group();

export const jupiter = createEntity({
  radius: 24.0,
  texturePath: "../public/2k_jupiter.jpg",
  roughness: 0.7,
  metalness: 0.1,
  position: {
    x: 175,
    y: 0,
    z: 0,
  },
});

jupiterOrbit.add(jupiter);
