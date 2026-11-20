import * as THREE from "three";

const sphere = new THREE.SphereGeometry(30, 30, 30);

const textureLoader = new THREE.TextureLoader();
const sunTexture = textureLoader.load("../public/2k_sun.jpg");
sunTexture.colorSpace = THREE.SRGBColorSpace;

const sunMaterial = new THREE.MeshBasicMaterial({
  map: sunTexture,
});

const sun = new THREE.Mesh(sphere, sunMaterial);

export { sun };
