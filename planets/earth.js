import * as THREE from "three";
import { createEntity } from "..";

export const earthOrbit = new THREE.Group();
export const moonOrbit = new THREE.Group();
moonOrbit.position.set(88, 0, 0);

export const moon = createEntity({
  radius: 2.6,
  texturePath: "./2k_moon.jpg",
  roughness: 0.7,
  metalness: 0.1,
  position: {
    x: 13.5,
    y: 0,
    z: 0,
  },
});

export const earth = createEntity({
  radius: 9.8,
  texturePath: "./2k_earth_daymap.jpg",
  roughness: 0.7,
  metalness: 0.1,
  position: {
    x: 88,
    y: 0,
    z: 0,
  },
});

moonOrbit.add(moon);
earthOrbit.add(earth, moonOrbit);
