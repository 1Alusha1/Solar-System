import * as THREE from "three";
import { createEntity } from "..";

export const venusOrbit = new THREE.Group();
export const venushOrbit = venusOrbit;

export const venus = createEntity({
  radius: 9.0,
  texturePath: "./2k_venus.jpg",
  roughness: 0.7,
  metalness: 0.1,
  position: {
    x: 62,
    y: 0,
    z: 0,
  },
});

venusOrbit.add(venus);
