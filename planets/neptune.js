import * as THREE from "three";
import { createEntity } from "..";

export const neptuneOrbit = new THREE.Group();

export const neptune = createEntity({
  radius: 12.5,
  texturePath: "../public/2k_neptune.jpg",
  roughness: 0.7,
  metalness: 0.1,
  position: {
    x: 360,
    y: 0,
    z: 0,
  },
});

neptuneOrbit.add(neptune);
