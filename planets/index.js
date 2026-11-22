import * as THREE from "three";
import { createEntity, textureLoader } from "../utils/createEntity";
import { CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer.js";

export const planetsData = [
  {
    name: "Mercury",
    nameRu: "Меркурий",
    type: "Планета земной группы",
    diameter: "4 879 км",
    distanceFromSun: "57.9 млн км (0.39 а.е.)",
    orbitalPeriod: "88 суток",
    dayLength: "58.6 земных дней",
    moons: "0",
    temperature: "от -180 до +430 °C",
    fact: "Самая быстрая и близкая к Солнцу планета. У неё практически нет атмосферы.",
    radius: 4.5,
    distance: 40,
    orbitSpeed: 0.04,
    rotationSpeed: 0.004,
    texture: "./2k_mercury.jpg",
  },
  {
    name: "Venus",
    nameRu: "Венера",
    type: "Планета земной группы",
    diameter: "12 104 км",
    distanceFromSun: "108.2 млн км (0.72 а.е.)",
    orbitalPeriod: "224.7 суток",
    dayLength: "243 дня (обратное вращение)",
    moons: "0",
    temperature: "+464 °C (парниковый ад)",
    fact: "Самая горячая планета в системе из-за плотной CO2 атмосферы. Вращается по часовой стрелке.",
    radius: 9.0,
    distance: 62,
    orbitSpeed: 0.025,
    rotationSpeed: 0.002,
    texture: "./2k_venus.jpg",
  },
  {
    name: "Earth",
    nameRu: "Земля",
    type: "Планета земной группы",
    diameter: "12 742 км",
    distanceFromSun: "149.6 млн км (1.0 а.е.)",
    orbitalPeriod: "365.25 суток",
    dayLength: "23 ч 56 мин",
    moons: "1 (Луна)",
    temperature: "+15 °C (средняя)",
    fact: "Единственная известная планета с жизнью, жидкими океанами и развитой биосферой.",
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
    nameRu: "Марс",
    type: "Планета земной группы",
    diameter: "6 779 км",
    distanceFromSun: "227.9 млн км (1.52 а.е.)",
    orbitalPeriod: "687 суток",
    dayLength: "24 ч 37 мин",
    moons: "2 (Фобос, Деймос)",
    temperature: "-65 °C",
    fact: "«Красная планета». Здесь находится Олимп — потухший вулкан высотой 21 км, крупнейший в системе.",
    distance: 120,
    radius: 6.2,
    orbitSpeed: 0.012,
    rotationSpeed: 0.018,
    texture: "./2k_mars.jpg",
  },
  {
    name: "Jupiter",
    nameRu: "Юпитер",
    type: "Газовый гигант",
    diameter: "139 820 км",
    distanceFromSun: "778.5 млн км (5.2 а.е.)",
    orbitalPeriod: "11.86 лет",
    dayLength: "9 ч 55 мин (самый быстрый день)",
    moons: "95",
    temperature: "-110 °C",
    fact: "Крупнейшая планета системы. Знаменитое Большое Красное Пятно — гигантский ураган размером больше Земли.",
    distance: 175,
    radius: 24.0,
    orbitSpeed: 0.006,
    rotationSpeed: 0.035,
    texture: "./2k_jupiter.jpg",
  },
  {
    name: "Saturn",
    nameRu: "Сатурн",
    type: "Газовый гигант",
    diameter: "116 460 км",
    distanceFromSun: "1.43 млрд км (9.58 а.е.)",
    orbitalPeriod: "29.45 лет",
    dayLength: "10 ч 33 мин",
    moons: "146 (рекордсмен)",
    temperature: "-140 °C",
    fact: "Обладает красивейшими ледяными кольцами, толщина которых местами составляет всего от 10 м до 1 км.",
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
    nameRu: "Уран",
    type: "Ледяной гигант",
    diameter: "50 724 км",
    distanceFromSun: "2.87 млрд км (19.2 а.е.)",
    orbitalPeriod: "84 года",
    dayLength: "17 ч 14 мин",
    moons: "28",
    temperature: "-195 °C",
    fact: "Вращается буквально «лёжа на боку» — наклон оси вращения 98 градусов. Самая холодная атмосфера.",
    distance: 300,
    radius: 13.0,
    orbitSpeed: 0.0025,
    rotationSpeed: 0.02,
    axialTilt: 98,
    texture: "./2k_uranus.jpg",
  },
  {
    name: "Neptune",
    nameRu: "Нептун",
    type: "Ледяной гигант",
    diameter: "49 244 км",
    distanceFromSun: "4.5 млрд км (30.1 а.е.)",
    orbitalPeriod: "164.8 года",
    dayLength: "16 ч 6 мин",
    moons: "16",
    temperature: "-200 °C",
    fact: "Самая далёкая планета. Здесь бушуют самые свирепые ветры в Солнечной системе — до 2 100 км/ч.",
    distance: 360,
    radius: 12.5,
    orbitSpeed: 0.0015,
    rotationSpeed: 0.02,
    texture: "./2k_neptune.jpg",
  },
];

function createMoon(moonData, planetDistance) {
  const moonOrbit = new THREE.Group();
  moonOrbit.position.x = planetDistance;

  const moon = createEntity({
    radius: moonData.radius,
    texturePath: moonData.texture,
    position: { x: moonData.distance, y: 0, z: 0 },
  });
  moon.castShadow = true;
  moon.receiveShadow = false;

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
  ring.castShadow = false;
  ring.receiveShadow = false;
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

  mesh.userData.planet = planet;

  const div = document.createElement("div");
  div.textContent = planet.nameRu || planet.name;
  div.className = "lable";
  const label = new CSS2DObject(div);
  label.position.y = planet.radius + 5;
  planet.mesh.add(label);

  if (data.axialTilt) {
    planet.mesh.rotation.x = THREE.MathUtils.degToRad(data.axialTilt);
  }

  if (data.name === "Earth") {
    planet.mesh.receiveShadow = true;
  }

  if (data.moon) {
    planet.moonOrbit = createMoon(data.moon, data.distance);
    orbit.add(planet.moonOrbit);
  }

  if (data.ring) {
    orbit.add(createRing(data.ring, data.distance));
  }
  return planet;
});
