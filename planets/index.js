import * as THREE from "three";
import { createEntity, textureLoader } from "../utils/createEntity";

export const planetsData = [
  {
    name: "Mercury",
    radius: 4.5,
    distance: 40,
    orbitSpeed: 0.04,
    rotationSpeed: 0.004,
    texture: "./2k_mercury.jpg",
  },
  {
    name: "Venus",
    radius: 9.0,
    distance: 62,
    orbitSpeed: 0.025,
    rotationSpeed: 0.002,
    texture: "./2k_venus.jpg",
  },

  {
    name: "Earth",
    distance: 88,
    radius: 9.8,
    orbitSpeed: 0.018,
    rotationSpeed: 0.02,
    texture: "./2k_earth_daymap.jpg",
    axialTilt: 23.4,
    moon: {
      radius: 2.6,
      distance: 13.5,
      speed: 0.05,
      texture: "./2k_moon.jpg",
    },
  },
  {
    name: "Mars",
    distance: 120,
    radius: 6.2,
    orbitSpeed: 0.012,
    rotationSpeed: 0.018,
    texture: "./2k_mars.jpg",
  },
  {
    name: "Jupiter",
    distance: 175,
    radius: 24.0,
    orbitSpeed: 0.006,
    rotationSpeed: 0.035,
    texture: "./2k_jupiter.jpg",
  },
  {
    name: "Saturn",
    distance: 240,
    radius: 19.5,
    orbitSpeed: 0.004,
    rotationSpeed: 0.03,
    texture: "./2k_saturn.jpg",
    ring: {
      inner: 23,
      outer: 35.5,
      texture: "./2k_saturn_ring_alpha.png",
    },
  },
  {
    name: "Uranus",
    distance: 300,
    radius: 13.0,
    orbitSpeed: 0.0025,
    rotationSpeed: 0.02,
    axialTilt: 98,
    texture: "./2k_uranus.jpg",
  },
  {
    name: "Neptune",
    distance: 360,
    radius: 12.5,
    orbitSpeed: 0.0015,
    rotationSpeed: 0.02,
    texture: "./2k_neptune.jpg",
  },
];

function createMoon(moonData, planetDistance) {
  const moonOrbit = new THREE.Group();
  moonOrbit.position.x = planetDistance; // центр орбиты = центр планеты

  const moon = createEntity({
    radius: moonData.radius,
    texturePath: moonData.texture,
    position: { x: moonData.distance, y: 0, z: 0 }, // расстояние от планеты
  });
  moon.castShadow = true;
  moon.receiveShadow = true;

  moonOrbit.add(moon);
  return moonOrbit;
}

const createRing = (ringData, distance) => {
  const ringGeometry = new THREE.RingGeometry(
    ringData.inner,
    ringData.outer,
    64,
  );
  const pos = ringGeometry.attributes.position;
  const uv = ringGeometry.attributes.uv;
  const v3 = new THREE.Vector3();

  for (let i = 0; i < pos.count; i++) {
    v3.fromBufferAttribute(pos, i);
    const radius = v3.length();

    const u = (radius - ringData.inner) / (ringData.outer - ringData.inner);

    uv.setXY(i, u, 0.5);
  }

  const texture = textureLoader.load(ringData.texture);
  texture.colorSpace = THREE.SRGBColorSpace;

  const ringMaterial = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.DoubleSide,
    transparent: true,
    alphaTest: 0.05,
  });

  const ring = new THREE.Mesh(ringGeometry, ringMaterial);
  ring.position.x = distance;
  ring.rotation.x = THREE.MathUtils.degToRad(115);
  ring.castShadow = true;
  ring.receiveShadow = true;
  return ring;
};

export const planets = planetsData.map((data) => {
  const orbit = new THREE.Group();
  const mesh = createEntity({
    radius: data.radius,
    texturePath: data.texture,
    position: { x: data.distance, y: 0, z: 0 },
  });
  orbit.add(mesh);
  const planet = { ...data, orbit, mesh };

  if (data.axialTilt) {
    planet.mesh.rotation.x = THREE.MathUtils.degToRad(data.axialTilt);
  }

  if (data.name === "Earth") {
    planet.mesh.castShadow = true;
    planet.mesh.receiveShadow = true;
  }

  if (data.moon) {
    planet.moonOrbit = createMoon(data.moon, data.distance); // своя маленькая функция
    orbit.add(planet.moonOrbit);
  }

  if (data.ring) {
    orbit.add(createRing(data.ring, data.distance));
  }
  return planet;
});
