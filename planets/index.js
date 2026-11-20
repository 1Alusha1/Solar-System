import { mercuryOrbit, mercury } from "./mercury";
import { venusOrbit, venushOrbit, venus } from "./venus";
import { earthOrbit, earth, moonOrbit, moon } from "./earth";
import { marsOrbit, mars } from "./mars";
import { jupiterOrbit, jupiter } from "./jupiter";
import { saturnOrbit, saturn, ring } from "./saturn";
import { uranusOrbit, uranus } from "./uranus";
import { neptuneOrbit, neptune } from "./neptune";

export const planets = [
  {
    name: "Mercury",
    orbit: mercuryOrbit,
    mesh: mercury,
    orbitSpeed: 0.04,
    rotationSpeed: 0.004,
    orbitRadius: 40,
  },
  {
    name: "Venus",
    orbit: venusOrbit,
    mesh: venus,
    orbitSpeed: 0.025,
    rotationSpeed: 0.002,
    orbitRadius: 62,
  },
  {
    name: "Earth",
    orbit: earthOrbit,
    mesh: earth,
    orbitSpeed: 0.018,
    rotationSpeed: 0.02,
    orbitRadius: 88,
  },
  {
    name: "Mars",
    orbit: marsOrbit,
    mesh: mars,
    orbitSpeed: 0.012,
    rotationSpeed: 0.018,
    orbitRadius: 120,
  },
  {
    name: "Jupiter",
    orbit: jupiterOrbit,
    mesh: jupiter,
    orbitSpeed: 0.006,
    rotationSpeed: 0.035,
    orbitRadius: 175,
  },
  {
    name: "Saturn",
    orbit: saturnOrbit,
    mesh: saturn,
    orbitSpeed: 0.004,
    rotationSpeed: 0.03,
    orbitRadius: 240,
  },
  {
    name: "Uranus",
    orbit: uranusOrbit,
    mesh: uranus,
    orbitSpeed: 0.0025,
    rotationSpeed: 0.02,
    orbitRadius: 300,
  },
  {
    name: "Neptune",
    orbit: neptuneOrbit,
    mesh: neptune,
    orbitSpeed: 0.0015,
    rotationSpeed: 0.02,
    orbitRadius: 360,
  },
];

export {
  mercuryOrbit,
  mercury,
  venusOrbit,
  venushOrbit,
  venus,
  earthOrbit,
  earth,
  moonOrbit,
  moon,
  marsOrbit,
  mars,
  jupiterOrbit,
  jupiter,
  saturnOrbit,
  saturn,
  ring,
  uranusOrbit,
  uranus,
  neptuneOrbit,
  neptune,
};
