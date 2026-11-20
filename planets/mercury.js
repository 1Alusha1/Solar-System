import * as THREE from "three";
import { createEntity } from "..";

export const mercuryOrbit = new THREE.Group();

export const mercury = createEntity({
  radius: 4.5,
  texturePath: "../public/2k_mercury.jpg",
  metalness: 0.1,
  position: {
    x: 40,
    y: 0,
    z: 0,
  },
});

mercuryOrbit.add(mercury);
