import * as THREE from "three";
export const textureLoader = new THREE.TextureLoader();

export function createEntity({
  radius = 2,
  widthSegments = 30,
  heightSegments = 30,
  texturePath,
  roughness,
  metalness,
  position = { x: 0, y: 0, z: 0 },
}) {
  const sphere = new THREE.SphereGeometry(
    radius,
    widthSegments,
    heightSegments,
  );

  const texture = textureLoader.load(texturePath);
  texture.colorSpace = THREE.SRGBColorSpace;

  const material = new THREE.MeshStandardMaterial({
    map: texture,
    roughness,
    metalness,
  });

  const entity = new THREE.Mesh(sphere, material);
  entity.position.set(position.x, position.y, position.z);

  return entity;
}
