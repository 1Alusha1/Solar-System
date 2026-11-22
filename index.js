import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { sun } from "./planets/sun.js";
import { planets } from "./planets/index.js";
import GUI from "lil-gui";
import { createOrbitLine } from "./utils/createOrbitLine.js";
import { starGenerator } from "./utils/starGenerator.js";
import {
  CSS2DObject,
  CSS2DRenderer,
} from "three/addons/renderers/CSS2DRenderer.js";

const lableRenderer = new CSS2DRenderer();
lableRenderer.setSize(innerWidth, innerHeight);
lableRenderer.domElement.style.position = "absolute";
lableRenderer.domElement.style.top = "0";
lableRenderer.domElement.style.pointerEvents = "none";
document.body.appendChild(lableRenderer.domElement);

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
const defaultCameraPos = {
  x: 0,
  y: 180,
  z: 420,
};

const defauldTarget = {
  x: 0,
  y: 0,
  z: 0,
};

const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

document.body.appendChild(renderer.domElement);

const pointer = new THREE.Vector2();

const raycaster = new THREE.Raycaster();
const clickable = planets.map((p) => p.mesh);

function getHoveredPlanet() {
  raycaster.setFromCamera(pointer, camera);
  const hits = raycaster.intersectObjects(clickable);
  return hits.length ? hits[0].object : null;
}

addEventListener("pointermove", (e) => {
  pointer.x = (e.clientX / innerWidth) * 2 - 1;
  pointer.y = -(e.clientY / innerHeight) * 2 + 1;
});

addEventListener("resize", () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
  lableRenderer.setSize(innerWidth, innerHeight);
});

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const pointLight = new THREE.PointLight("#fff", 3, 10000);
pointLight.position.set(0, 0, 0);
pointLight.decay = 0;
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

let hovered = null;
let selected = null;

let downX = 0,
  downY = 0;

addEventListener("pointerdown", (e) => {
  downX = e.clientX;
  downY = e.clientY;
});

addEventListener("pointerup", (e) => {
  const moved = Math.hypot(e.clientX - downX, e.clientY - downY);
  if (moved > 5) return;
  if (hovered) {
    selectPlanet(hovered.userData.planet);
    isResetting = false;
  } else {
    selected = null;
    isResetting = true;
    cardObject.visible = false;
  }
});

let isResetting = false;
addEventListener("keydown", (e) => {
  if (e.code === "Escape") {
    selected = null;
    isResetting = true;
    cardObject.visible = false;
  }
});

const target = new THREE.Vector3();

const cardDiv = document.createElement("div");
cardDiv.className = "planet-card";
cardDiv.style.display = "none";
const cardObject = new CSS2DObject(cardDiv);
cardObject.visible = false;
scene.add(cardObject);

function selectPlanet(planet) {
  selected = planet;
  cardObject.visible = true;
  cardDiv.innerHTML = `
    <div class="card-header">
      <div>
        <h3 class="card-title">${planet.nameRu || planet.name} <span class="card-subtitle">(${planet.name})</span></h3>
        <div class="card-type">${planet.type || "Планета"}</div>
      </div>
      <button id="close-card" class="card-close" title="Закрыть (Esc)">✕</button>
    </div>
    <div class="card-body">
      <div class="card-row"><span>Диаметр:</span> <b>${planet.diameter || "-"}</b></div>
      <div class="card-row"><span>Расстояние от Солнца:</span> <b>${planet.distanceFromSun || "-"}</b></div>
      <div class="card-row"><span>Период обращения (год):</span> <b>${planet.orbitalPeriod || "-"}</b></div>
      <div class="card-row"><span>Длительность суток:</span> <b>${planet.dayLength || "-"}</b></div>
      <div class="card-row"><span>Спутники:</span> <b>${planet.moons || "0"}</b></div>
      <div class="card-row"><span>Температура:</span> <b>${planet.temperature || "-"}</b></div>
    </div>
    ${planet.fact ? `<div class="card-fact">${planet.fact}</div>` : ""}
  `;
  cardDiv.style.display = "block";

  const closeBtn = cardDiv.querySelector("#close-card");
  if (closeBtn) {
    closeBtn.onclick = (e) => {
      e.stopPropagation();
      selected = null;
      isResetting = true;
      cardObject.visible = false;
    };
  }
}

function animate() {
  const delta = clock.getDelta();
  const step = delta * 60 * timeScale;
  sun.rotation.y += 0.002 * step;

  const hit = getHoveredPlanet();
  if (hit !== hovered) {
    if (hovered) hovered.material.emissive.set(0x000000);
    if (hit) hit.material.emissive.set(0x333333);
    hovered = hit;

    document.body.style.cursor = hovered ? "pointer" : "default";
  }

  if (selected) {
    cardObject.visible = true;
    selected.mesh.getWorldPosition(target);
    controls.target.lerp(target, 0.05);

    cardObject.position.copy(target);

    const cameraoffset = {
      x: 0,
      y: selected.radius * 0.5,
      z: selected.radius * 6.5,
    };

    const desiredCameraPos = target.clone().add(cameraoffset);
    camera.position.lerp(desiredCameraPos, 0.05);
  } else if (isResetting) {
    camera.position.lerp(defaultCameraPos, 0.05);
    controls.target.lerp(defauldTarget, 0.05);
    cardObject.visible = false;
    cardDiv.style.display = "none";
  } else {
    cardObject.visible = false;
    cardDiv.style.display = "none";
  }

  if (camera.position.distanceTo(defaultCameraPos) < 1) {
    isResetting = false;
  }

  for (const planet of planets) {
    planet.orbit.rotation.y += planet.orbitSpeed * step;
    planet.mesh.rotation.y += planet.rotationSpeed * step;

    if (planet.moonOrbit) {
      planet.moonOrbit.rotation.y += planet.moon.speed * step;
    }
  }

  controls.update();
  renderer.render(scene, camera);
  lableRenderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();
