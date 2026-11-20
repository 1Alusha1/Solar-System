import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { sun } from "./planets/sun.js";
import { planets, moonOrbit, moon } from "./planets/index.js";
import { ring } from "./planets/saturn.js";
import GUI from "lil-gui";

const gui = new GUI();

let timeScale = 1;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  3000,
);
camera.position.set(0, 180, 420);

const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

document.body.appendChild(renderer.domElement);

addEventListener("resize", () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const pointLight = new THREE.PointLight("#fff", 10000, 10000);
pointLight.position.set(0, 0, 0);

pointLight.castShadow = true;
pointLight.shadow.bias = -0.001;

pointLight.shadow.mapSize.width = 2048;
pointLight.shadow.mapSize.height = 2048;
pointLight.shadow.camera.near = 23;
pointLight.shadow.camera.far = 500;

gui
  .add({ timeScale: 1 }, "timeScale", -2, 5, 0.1)
  .name("Скорость времени")
  .onChange((value) => {
    timeScale = value;
  });



const axesHelper = new THREE.AxesHelper(100);
const gridHelper = new THREE.GridHelper(800, 40);
const lightHelper = new THREE.PointLightHelper(pointLight, 35);

axesHelper.visible = false;
gridHelper.visible = false;
lightHelper.visible = false;

scene.add(axesHelper, gridHelper, lightHelper);

scene.add(sun);
scene.add(pointLight);

const helpersFolder = gui.addFolder("Helpers");

helpersFolder.add(axesHelper,"visible").name("X/Y/Z");
helpersFolder.add(gridHelper,"visible").name("Grid");
helpersFolder.add(lightHelper,"visible").name("Light");
helpersFolder.close()


for (const planet of planets) {
  scene.add(planet.orbit);
  let line = createOrbitLine(planet.orbitRadius);
  scene.add(line);

  if (planet.ring) {
    scene.add(ring);
  }
}

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

  const textureLoader = new THREE.TextureLoader();
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

function createOrbitLine(radius) {
  const curve = new THREE.EllipseCurve(0, 0, radius, radius, 0, 2 * Math.PI);
  const points = curve.getPoints(64);
  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  const material = new THREE.LineBasicMaterial({
    color: "#ffffff",
    transparent: true,
    opacity: 0.2,
  });
  const orbitLine = new THREE.LineLoop(geometry, material);

  orbitLine.rotation.x = Math.PI / 2;
  return orbitLine;
}

function starGenerator() {
  const starsCount = 3000;
  const positions = new Float32Array(starsCount * 3);

  for (let i = 0; i < starsCount * 3; i += 3) {
    const distance = 800 + Math.random() * 1200;

    const dir = new THREE.Vector3().randomDirection().multiplyScalar(distance);

    positions[i] = dir.x;
    positions[i + 1] = dir.y;
    positions[i + 2] = dir.z;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    color: "#fff",
    size: 2,
    sizeAttenuation: true,
  });

  const stars = new THREE.Points(geometry, material);
  scene.add(stars);
}

starGenerator();

const clock = new THREE.Clock();

function animate() {
  renderer.render(scene, camera);
  controls.update();
  const delta = clock.getDelta();

  const step = delta * 60 * timeScale;

  sun.rotation.y += 0.002 * step;

  for (const planet of planets) {
    planet.orbit.rotation.y += planet.orbitSpeed * step;

    if (planet.name === "Earth") {
      planet.mesh.castShadow = true;
      planet.mesh.receiveShadow = true;
    }
    if (planet.mesh) {
      planet.mesh.rotation.y += planet.rotationSpeed * step;
    }
  }

  if (moonOrbit) {
    moonOrbit.rotation.y += 0.05 * step;
  }

  if (moon) {
    moon.castShadow = true;
    moon.receiveShadow = true;
    moon.rotation.y += 0.01 * step;
  }

  requestAnimationFrame(animate);
}

animate();
