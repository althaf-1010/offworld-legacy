/**
 * @fileoverview OFFWORLD LEGACY — Mission and Equipment Records
 * Authoritative digital archive documenting NASA equipment left behind on the Moon and Mars.
 */

import { validateMissions, getDestinations } from "./schema.js";

/**
 * Canonically documented equipment records left offworld.
 * @type {import("./types.js").EquipmentRecord[]}
 */
export const missions = [
  {
    id: "M-001",
    mission: {
      name: "Surveyor 3",
      program: "Surveyor Program",
      spacecraftId: "1967-035A",
      launchDate: "1967-04-17",
    },
    equipment: {
      name: "Surveyor 3 Lunar Lander",
      type: "Lunar lander",
    },
    destination: "Moon",
    landingDate: "1967-04-20",
    deploymentDate: null,
    operationalPeriod: "1967",
    operationalStatus: "Inactive",
    physicalDisposition:
      "Intact inside a 200-meter crater in Oceanus Procellarum. In November 1969, Apollo 12 astronauts inspected the lander and retrieved approximately 10 kg of components—including the TV camera and soil scoop—which were returned to Earth for analysis.",
    location: {
      siteName: "Oceanus Procellarum (Ocean of Storms)",
      coordinates: {
        latitude: -3.0163,
        longitude: -23.418,
        display: "3.02° S, 23.42° W",
      },
    },
    events: [
      {
        type: "launch",
        date: "1967-04-17",
        description: "Launched from Cape Kennedy aboard Atlas-Centaur AC-12.",
        reference: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1967-035A",
      },
      {
        type: "landing",
        date: "1967-04-20",
        description:
          "Soft-landed inside a lunar crater in Oceanus Procellarum after three brief vernier engine rebounds.",
        reference: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1967-035A",
      },
      {
        type: "shutdown",
        date: "1967-05-04",
        description:
          "First lunar sunset; transmissions ceased and the lander did not resume operations after the lunar night.",
        reference: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1967-035A",
      },
      {
        type: "crew_visit",
        date: "1969-11-20",
        description:
          "Apollo 12 astronauts Charles Conrad Jr. and Alan L. Bean visited the lander, photographed its condition, and retrieved parts for terrestrial analysis.",
        reference: "https://ntrs.nasa.gov/citations/19720015162",
      },
    ],
    description:
      "An uncrewed spacecraft that explored the lunar surface before Apollo 12 astronauts visited it.",
    legacy:
      "Surveyor 3 provided important information about the lunar surface. Apollo 12 astronauts later visited the spacecraft and retrieved components for examination on Earth.",
    media: {
      src: "/images/missions/surveyor-3.webp",
      width: 800,
      height: 800,
      nasaId: "AS12-48-7121",
      title: "View of Surveyor III in its crater",
      date: "November 20, 1969",
      sourceUrl: "https://images.nasa.gov/details/as12-48-7121",
    },
    references: [
      {
        label: "NASA NSSDCA Master Catalog: Surveyor 3",
        url: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1967-035A",
        claim: "Mission parameters, landing coordinates, and spacecraft identifier 1967-035A.",
        nssdcId: "1967-035A",
      },
      {
        label: "NASA Images Archive Record AS12-48-7121",
        url: "https://images.nasa.gov/details/as12-48-7121",
        claim: "Historical photograph of Surveyor 3 inside its crater taken during Apollo 12 EVA.",
      },
      {
        label: "NASA SP-284 Analysis of Surveyor 3 Samples",
        url: "https://ntrs.nasa.gov/citations/19720015162",
        claim: "Scientific evaluation of returned TV camera, sampling scoop, and structural tubing.",
      },
    ],

    // Backward-compatibility properties for existing UI components
    name: "Surveyor 3",
    year: "1967",
    type: "Lunar lander",
    status: "Inactive",
    image: "/images/missions/surveyor-3.webp",
    imageWidth: 800,
    imageHeight: 800,
    imageId: "AS12-48-7121",
    imageTitle: "View of Surveyor III in its crater",
    imageDate: "November 20, 1969",
    imageSource: "https://images.nasa.gov/details/as12-48-7121",
  },
  {
    id: "M-002",
    mission: {
      name: "Mars Pathfinder",
      program: "Discovery Program",
      spacecraftId: "1996-068A",
      launchDate: "1996-12-04",
    },
    equipment: {
      name: "Sojourner",
      type: "Mars rover",
      designation: "MFEX (Microrover Flight Experiment)",
    },
    destination: "Mars",
    landingDate: null,
    deploymentDate: "1997-07-06",
    operationalPeriod: "1997",
    operationalStatus: "Inactive",
    physicalDisposition:
      "Intact on the Martian regolith in Ares Vallis near Carl Sagan Memorial Station. Operated for 83 Sols until communication through the Pathfinder lander ceased on September 27, 1997.",
    location: {
      siteName: "Ares Vallis (Carl Sagan Memorial Station)",
      coordinates: {
        latitude: 19.33,
        longitude: -33.55,
        display: "19.33° N, 33.55° W",
      },
    },
    events: [
      {
        type: "launch",
        date: "1996-12-04",
        description: "Launched from Cape Canaveral Air Station aboard a Delta II 7925.",
        reference: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1996-068A",
      },
      {
        type: "landing",
        date: "1997-07-04",
        description:
          "Mars Pathfinder lander carrying Sojourner safely touched down in Ares Vallis via parachute and airbag retraction.",
        reference: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1996-068A",
      },
      {
        type: "deployment",
        date: "1997-07-06",
        description:
          "Sojourner rolled down the lander deployment ramp onto Martian soil on Sol 2, initiating mobile robotic surface operations.",
        reference: "https://mars.nasa.gov/mars-exploration/missions/pathfinder/",
      },
      {
        type: "contact_loss",
        date: "1997-09-27",
        description:
          "Final successful communications session received through the Pathfinder base station on Sol 83.",
        reference: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1996-068A",
      },
    ],
    description:
      "The first successful rover to operate on Mars, exploring the terrain around Pathfinder.",
    legacy:
      "Sojourner demonstrated the value of mobile robotic exploration and helped establish the foundations for later Mars rover missions.",
    media: {
      src: "/images/missions/sojourner.webp",
      width: 800,
      height: 405,
      nasaId: "PIA04318",
      title: 'Sojourner Sits Near "Rock Garden"',
      date: "NASA image archive record",
      sourceUrl: "https://images.nasa.gov/details/PIA04318",
    },
    references: [
      {
        label: "NASA NSSDCA Master Catalog: Mars Pathfinder",
        url: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1996-068A",
        claim: "Spacecraft mission details, landing date, and catalog ID 1996-068A.",
        nssdcId: "1996-068A",
      },
      {
        label: "NASA Images Archive Record PIA04318",
        url: "https://images.nasa.gov/details/PIA04318",
        claim: "Archival photograph of Sojourner rover on the Martian surface near 'Rock Garden'.",
      },
      {
        label: "NASA JPL Mars Pathfinder Overview",
        url: "https://mars.nasa.gov/mars-exploration/missions/pathfinder/",
        claim: "Mission summary, 83-Sol operational longevity, and science objectives.",
      },
    ],

    // Backward-compatibility properties for existing UI components
    name: "Sojourner",
    year: "1997",
    type: "Mars rover",
    status: "Inactive",
    image: "/images/missions/sojourner.webp",
    imageWidth: 800,
    imageHeight: 405,
    imageId: "PIA04318",
    imageTitle: 'Sojourner Sits Near "Rock Garden"',
    imageDate: "NASA image archive record",
    imageSource: "https://images.nasa.gov/details/PIA04318",
  },
  {
    id: "M-003",
    mission: {
      name: "Apollo 12",
      program: "Apollo Program",
      spacecraftId: "1969-099C",
      launchDate: "1969-11-14",
    },
    equipment: {
      name: "Apollo ALSEP",
      type: "Science instruments",
      designation: "Apollo 12 ALSEP Package",
    },
    destination: "Moon",
    landingDate: null,
    deploymentDate: "1969-11-19",
    operationalPeriod: "1969–1972",
    operationalStatus: "Inactive",
    physicalDisposition:
      "Central station, SNAP-27 plutonium RTG power unit, passive seismometer, and instrument sensors remain deployed in place on the lunar regolith in Oceanus Procellarum. Science transmission was commanded off on September 30, 1977 due to budget constraints.",
    location: {
      siteName: "Oceanus Procellarum (Apollo 12 landing site)",
      coordinates: {
        latitude: -3.0094,
        longitude: -23.4246,
        display: "3.01° S, 23.42° W",
      },
    },
    events: [
      {
        type: "launch",
        date: "1969-11-14",
        description: "Launched aboard Saturn V SA-507 from Kennedy Space Center LC-39A.",
        reference: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-099C",
      },
      {
        type: "landing",
        date: "1969-11-19",
        description:
          "Apollo 12 Lunar Module Intrepid carrying the ALSEP scientific payload touched down in Oceanus Procellarum.",
        reference: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-099C",
      },
      {
        type: "deployment",
        date: "1969-11-19",
        description:
          "Astronauts Alan Bean and Charles Conrad deployed the central station and scientific instruments ~180 meters northwest of the Lunar Module.",
        reference: "https://www.lpi.usra.edu/lunar/missions/apollo/apollo_12/experiments/alsep/",
      },
      {
        type: "shutdown",
        date: "1977-09-30",
        description:
          "NASA officially commanded off all Apollo ALSEP stations, concluding nearly eight years of lunar environmental and seismic telemetry.",
        reference: "https://www.lpi.usra.edu/lunar/missions/apollo/apollo_12/experiments/alsep/",
      },
    ],
    description:
      "A collection of scientific experiments deployed by Apollo astronauts to study the Moon.",
    legacy:
      "The Apollo Lunar Surface Experiments Packages collected scientific measurements that helped researchers understand the Moon's interior and environment.",
    media: {
      src: "/images/missions/apollo-alsep.webp",
      width: 800,
      height: 774,
      nasaId: "AS12-47-6918",
      title: "View of part of the deployed Apollo Lunar Surface Experiment Package",
      date: "November 19, 1969",
      sourceUrl: "https://images.nasa.gov/details/as12-47-6918",
    },
    references: [
      {
        label: "NASA NSSDCA Master Catalog: Apollo 12 ALSEP",
        url: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-099C",
        claim: "Experiment package inventory, landing coordinates, and spacecraft catalog designation 1969-099C.",
        nssdcId: "1969-099C",
      },
      {
        label: "NASA Images Archive Record AS12-47-6918",
        url: "https://images.nasa.gov/details/as12-47-6918",
        claim: "Archival photograph of deployed Apollo 12 ALSEP central station and instruments.",
      },
      {
        label: "Lunar and Planetary Institute: Apollo 12 ALSEP Record",
        url: "https://www.lpi.usra.edu/lunar/missions/apollo/apollo_12/experiments/alsep/",
        claim: "Detailed scientific experiments list, deployment sequence, and 1977 shutdown date.",
      },
    ],

    // Backward-compatibility properties for existing UI components
    name: "Apollo ALSEP",
    year: "1969–1972",
    type: "Science instruments",
    status: "Inactive",
    image: "/images/missions/apollo-alsep.webp",
    imageWidth: 800,
    imageHeight: 774,
    imageId: "AS12-47-6918",
    imageTitle: "View of part of the deployed Apollo Lunar Surface Experiment Package",
    imageDate: "November 19, 1969",
    imageSource: "https://images.nasa.gov/details/as12-47-6918",
  },
];

// Run runtime schema validation to guarantee archive integrity
const validation = validateMissions(missions);
if (!validation.valid) {
  // eslint-disable-next-line no-console
  console.error("Mission data validation failed:", validation.errors);
  throw new Error("Mission data validation failed. Check schema errors.");
}

export const destinations = getDestinations(missions);
export default missions;
