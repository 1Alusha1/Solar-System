import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { sun } from "./planets/sun.js";
import { planets } from "./planets/index.js";
import GUI from "lil-gui";
import { createOrbitLine } from "./utils/createOrbitLine.js";
import { starGenerator } from "./utils/starGenerator.js";

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

const pointLight = new THREE.PointLight("#fff", 3, 10000);
pointLight.position.set(0, 0, 0);
pointLight.decay = 0
pointLight.castShadow = true;
pointLight.shadow.bias = -0.001;

pointLight.shadow.mapSize.width = 2048;
pointLight.shadow.mapSize.height = 2048;
pointLight.shadow.camera.near = 23;
pointLight.shadow.camera.far = 1000;

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

helpersFolder.add(axesHelper, "visible").name("X/Y/Z");
helpersFolder.add(gridHelper, "visible").name("Grid");
helpersFolder.add(lightHelper, "visible").name("Light");
helpersFolder.close();


for (const planet of planets) {
  scene.add(planet.orbit);

  let line = createOrbitLine(planet.distance);
  scene.add(line);
}

starGenerator(scene);

const clock = new THREE.Clock();


function animate() {
  controls.update();
  renderer.render(scene, camera);
  const delta = clock.getDelta();

  const step = delta * 60 * timeScale;

  sun.rotation.y += 0.002 * step;

  for (const planet of planets) {
    planet.orbit.rotation.y += planet.orbitSpeed * step;
    planet.mesh.rotation.y += planet.rotationSpeed * step;

    if (planet.moonOrbit) {
      planet.moonOrbit.rotation.y += planet.moon.speed * step;
    }
  }
  requestAnimationFrame(animate);
}

animate();
