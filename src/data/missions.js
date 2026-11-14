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
  {
    id: "M-004",
    mission: {
      name: "Apollo 15",
      program: "Apollo Program",
      spacecraftId: "1971-063C",
      launchDate: "1971-07-26",
    },
    equipment: {
      name: "Apollo 15 Lunar Roving Vehicle",
      type: "Lunar rover",
      designation: "LRV-1",
    },
    destination: "Moon",
    landingDate: null,
    deploymentDate: "1971-07-31",
    operationalPeriod: "1971",
    operationalStatus: "Inactive",
    physicalDisposition:
      "Parked at the Hadley-Apennine VIP site approximately 160 meters east of the Falcon Lunar Module descent stage. The rover chassis and wheels remain in place on the lunar regolith along with the attached Lunar Communications Relay Unit (LCRU) and Ground-Controlled Television Assembly (GCTA). Decades later, the resting site was resolved from lunar orbit by the Lunar Reconnaissance Orbiter Camera (LROC).",
    location: {
      siteName: "Hadley-Apennine (VIP site, east of Falcon LM descent stage)",
      coordinates: {
        latitude: 26.13174,
        longitude: 3.63803,
        display: "26.13° N, 3.64° E (Mean Earth/Polar Axis, LROC)",
      },
    },
    events: [
      {
        type: "launch",
        date: "1971-07-26",
        description:
          "Launched aboard a Saturn V (SA-510) rocket from Kennedy Space Center LC-39A.",
        reference: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1971-063C",
      },
      {
        type: "landing",
        date: "1971-07-30",
        description:
          "Apollo 15 Lunar Module Falcon carrying LRV-1 touched down at Hadley-Apennine at landing coordinates 26.13239° N, 3.63330° E (separate from the rover's final resting position).",
        reference: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1971-063C",
      },
      {
        type: "deployment",
        date: "1971-07-31",
        description:
          "Astronauts David Scott and James Irwin deployed LRV-1 from Falcon's descent stage Quad 1, initiating the first crewed roving operations on lunar soil.",
        reference: "https://www.lpi.usra.edu/lunar/missions/apollo/apollo_15/surface_opp/",
      },
      {
        type: "milestone",
        date: "1971-08-02",
        description:
          "Commander David Scott parked LRV-1 at the final VIP site (~160 m east of the LM) to allow the Ground-Controlled Television Assembly (GCTA) to televise the ascent stage liftoff.",
        reference: "https://www.lpi.usra.edu/lunar/missions/apollo/apollo_15/surface_opp/",
      },
      {
        type: "contact_loss",
        date: "1971-08-05",
        description:
          "Failure of the LCRU/GCTA television communications system (not a failure or last communication of the LRV itself). NASA Apollo 15 mission commentary dated August 6, 1971, reports that the LCRU was switched on the previous day (inferred August 5, 1971) and operated for approximately 13 minutes before its downlink failed; the cause remains undetermined, with an unconfirmed circuit-breaker problem suggested.",
        reference: "https://ntrs.nasa.gov/citations/19720008580",
      },
    ],
    description:
      "The first crewed rover driven on the Moon, vastly expanding astronauts' exploratory range during Apollo 15.",
    legacy:
      "LRV-1 traversed 27.8 km across the Hadley-Apennine terrain, enabling the collection of 77 kg of lunar samples—including the ancient 4.1-billion-year-old Genesis Rock—and proving mobility systems for extraterrestrial exploration.",
    media: {
      src: null,
      width: null,
      height: null,
      nasaId: "AS15-88-11901",
      title: "Apollo 15 Lunar Roving Vehicle parked at the VIP site",
      date: "August 2, 1971",
      sourceUrl: "https://images.nasa.gov/details/as15-88-11901",
    },
    references: [
      {
        label: "NASA NSSDCA Master Catalog: Apollo 15 LM / ALSEP",
        url: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1971-063C",
        claim: "Spacecraft mission parameters and Lunar Module Falcon catalog identifier 1971-063C (separate from rover equipment designation LRV-1).",
        nssdcId: "1971-063C",
      },
      {
        label: "NASA Images Archive Record AS15-88-11901",
        url: "https://images.nasa.gov/details/as15-88-11901",
        claim: "Surface photograph of LRV-1 at its final parking location taken by Commander David Scott at the conclusion of EVA-3 (distinct from later orbital imagery).",
      },
      {
        label: "NASA LROC Observation: Apollo 15 Landing Site",
        url: "https://www.lroc.asu.edu/featured_sites/view_site/4",
        claim: "Orbital imagery from the Lunar Reconnaissance Orbiter Camera (LROC) confirming the LRV-1 VIP-site parking position (26.13174° N, 3.63803° E) in the Mean Earth/Polar Axis system.",
      },
      {
        label: "NASA MSC Apollo 15 Mission Report (NASA-TM-X-67991 / MSC-05161)",
        url: "https://ntrs.nasa.gov/citations/19720008580",
        claim: "Documentation of LRV-1 GCTA television liftoff coverage and subsequent LCRU/GCTA television communications system downlink failure.",
      },
    ],

    // Backward-compatibility properties for existing UI components
    name: "Apollo 15 Lunar Roving Vehicle (LRV-1)",
    year: "1971",
    type: "Lunar rover",
    status: "Inactive",
    image: null,
    imageWidth: null,
    imageHeight: null,
    imageId: "AS15-88-11901",
    imageTitle: "Apollo 15 Lunar Roving Vehicle parked at the VIP site",
    imageDate: "August 2, 1971",
    imageSource: "https://images.nasa.gov/details/as15-88-11901",
  },
  {
    id: "M-005",
    mission: {
      name: "Viking 1",
      program: "Viking Program",
      spacecraftId: "1975-075C",
      launchDate: "1975-08-20",
    },
    equipment: {
      name: "Viking 1 Lander",
      type: "Mars lander",
      designation: "Thomas A. Mutch Memorial Station",
    },
    destination: "Mars",
    landingDate: "1976-07-20",
    deploymentDate: null,
    operationalPeriod: "1976–1982",
    operationalStatus: "Inactive",
    physicalDisposition:
      "Intact on the volcanic plains of Chryse Planitia. The three-legged titanium body, radioisotope thermoelectric generators (RTGs), inactive soil sampler arm, meteorology boom, and steerable antennas remain on the Martian surface; the landing site and discarded entry hardware were imaged from orbit by MRO's HiRISE camera.",
    location: {
      siteName: "Chryse Planitia (Thomas A. Mutch Memorial Station)",
      coordinates: {
        latitude: 22.27,
        longitude: -48.00,
        display: "22.27° N, 48.00° W (Planetocentric) / 22.48° N, 47.97° W (Planetographic)",
      },
    },
    events: [
      {
        type: "launch",
        date: "1975-08-20",
        description:
          "Launched aboard a Titan IIIE-Centaur from Cape Canaveral Air Force Station Launch Complex 41.",
        reference: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1975-075C",
      },
      {
        type: "landing",
        date: "1976-07-20",
        description:
          "Viking 1 Lander separated from the orbiter and touched down softly on Chryse Planitia at 11:53:06 UTC, achieving the first successful long-duration Mars surface landing.",
        reference: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1975-075C",
      },
      {
        type: "milestone",
        date: "1976-07-20",
        description:
          "Returned the first photograph taken from the surface of Mars (PIA00381), revealing its footpad and the surrounding rock-strewn plain.",
        reference: "https://images.nasa.gov/details/PIA00381",
      },
      {
        type: "milestone",
        date: "1982-11-11",
        description:
          "Last transmission received on Earth from Viking 1 Lander on Sol 2245, according to NASA technical-history sources.",
        reference: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1975-075C",
      },
      {
        type: "contact_loss",
        date: "1982-11-13",
        description:
          "End of lander communications / shutdown date reported by NASA's Viking project overview and NSSDCA, following a command-related anomaly.",
        reference: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1975-075C",
      },
      {
        type: "shutdown",
        date: "1983-05-21",
        description:
          "Formal mission closure officially declared by NASA after six months of unsuccessful recovery attempts, marking administrative closure rather than the lander's operational end.",
        reference: "https://mars.nasa.gov/missions/viking/",
      },
    ],
    description:
      "The first American spacecraft to soft-land on Mars and operate successfully for over six years, performing groundbreaking biological and meteorological studies.",
    legacy:
      "Viking 1 operated for 2,245 Sols (over 6 Earth years), returning more than 50,000 images, providing long-term Martian weather data, and executing the first direct in situ chemical and biological searches on Mars.",
    media: {
      src: null,
      width: null,
      height: null,
      nasaId: "PIA00381",
      title: "First Photograph Taken on Mars Surface (Viking 1)",
      date: "July 20, 1976",
      sourceUrl: "https://images.nasa.gov/details/PIA00381",
    },
    references: [
      {
        label: "NASA NSSDCA Master Catalog: Viking 1 Lander",
        url: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1975-075C",
        claim: "Spacecraft catalog ID 1975-075C (distinct from orbiter 1975-075A), landing coordinates, and operational timeline.",
        nssdcId: "1975-075C",
      },
      {
        label: "NASA Images Archive Record PIA00381",
        url: "https://images.nasa.gov/details/PIA00381",
        claim: "First photograph transmitted from the surface of Mars showing Viking 1 footpad and regolith.",
      },
      {
        label: "NASA JPL Viking Mission Overview",
        url: "https://mars.nasa.gov/missions/viking/",
        claim: "Mission parameters, 2245-Sol operational duration, and communications termination history.",
      },
      {
        label: "USGS Astrogeology Science Center: Mars Landing Site Coordinates",
        url: "https://astrogeology.usgs.gov/search/map/Mars/Viking/Viking1_Lander_Coordinates",
        claim: "Explicit distinction between planetocentric (22.27° N, 48.00° W) and planetographic (22.48° N, 47.97° W) coordinate reference frames.",
      },
    ],

    // Backward-compatibility properties for existing UI components
    name: "Viking 1 Lander",
    year: "1976–1982",
    type: "Mars lander",
    status: "Inactive",
    image: null,
    imageWidth: null,
    imageHeight: null,
    imageId: "PIA00381",
    imageTitle: "First Photograph Taken on Mars Surface (Viking 1)",
    imageDate: "July 20, 1976",
    imageSource: "https://images.nasa.gov/details/PIA00381",
  },
  {
    id: "M-006",
    mission: {
      name: "Mars Exploration Rover",
      program: "Mars Exploration Program",
      spacecraftId: "2003-032A",
      launchDate: "2003-07-08",
    },
    equipment: {
      name: "Opportunity Rover",
      type: "Mars rover",
      designation: "MER-B",
    },
    destination: "Mars",
    landingDate: null,
    deploymentDate: "2004-01-31",
    operationalPeriod: "2004–2018",
    operationalStatus: "Inactive",
    physicalDisposition:
      "Intact on the western slope of Perseverance Valley on the rim of Endeavour Crater. Opportunity arrived on Mars encased within the MER-B entry and lander system (Challenger Memorial Station) and was deployed after touchdown. At the end of its mission, its solar arrays became coated with atmospheric dust, while its Pancam mast and robotic arm remained deployed.",
    location: {
      siteName: "Perseverance Valley, western rim of Endeavour Crater (Final Location)",
      coordinates: null,
    },
    events: [
      {
        type: "launch",
        date: "2003-07-08",
        description:
          "Launched aboard a Delta II Heavy (7925H) rocket from Cape Canaveral Space Launch Complex 17B at 03:18 UTC (July 7, 20:18 PDT Pacific local time).",
        reference: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=2003-032A",
      },
      {
        type: "landing",
        date: "2004-01-25",
        description:
          "The MER-B entry and lander system (Challenger Memorial Station) carrying Opportunity touched down inside Eagle Crater, Meridiani Planum, at 05:05 UTC.",
        reference: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=2003-032A",
      },
      {
        type: "deployment",
        date: "2004-01-31",
        description:
          "Opportunity was deployed from the landed base station, rolling down the egress ramp onto Martian soil on Sol 7 to initiate surface operations.",
        reference: "https://mars.nasa.gov/mer/mission/timeline/",
      },
      {
        type: "milestone",
        date: "2015-03-24",
        description:
          "Completed an official marathon driving distance (42.195 km / 26.219 miles) on Sol 3968, the first wheeled vehicle to do so on another world.",
        reference: "https://mars.nasa.gov/mer/mission/timeline/",
      },
      {
        type: "contact_loss",
        date: "2018-06-10",
        description:
          "Last communication and telemetry session received on Sol 5111 before a severe planet-encircling dust storm deprived the solar arrays of sunlight in Perseverance Valley.",
        reference: "https://mars.nasa.gov/news/8413/nasas-opportunity-rover-mission-on-mars-comes-to-end/",
      },
      {
        type: "shutdown",
        date: "2019-02-13",
        description:
          "NASA officially declared formal mission termination at JPL after more than a thousand recovery commands sent since June 2018 went unanswered.",
        reference: "https://mars.nasa.gov/news/8413/nasas-opportunity-rover-mission-on-mars-comes-to-end/",
      },
    ],
    description:
      "A record-breaking solar-powered rover that arrived on Mars inside the MER-B landing system, deployed onto the surface, and operated for nearly 15 years searching for evidence of past liquid water.",
    legacy:
      "Designed for a 90-Sol mission and 1,000 meters of driving, Opportunity operated for 5,111 Sols and traveled 45.16 kilometers (28.06 miles). It uncovered decisive mineralogical evidence of past liquid water, including hematite 'blueberries' and jarosite formations.",
    media: {
      src: null,
      width: null,
      height: null,
      nasaId: "PIA18079",
      title: "Opportunity Self-Portrait After Martian Wind Dust Cleaning",
      date: "March 24, 2014",
      sourceUrl: "https://images.nasa.gov/details/PIA18079",
    },
    references: [
      {
        label: "NASA NSSDCA Master Catalog: Opportunity Rover",
        url: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=2003-032A",
        claim: "Spacecraft designation 2003-032A, UTC launch timeline, and landing coordinates in Meridiani Planum.",
        nssdcId: "2003-032A",
      },
      {
        label: "NASA Images Archive Record PIA18079",
        url: "https://images.nasa.gov/details/PIA18079",
        claim: "Archival self-portrait of Opportunity taken by Pancam after a solar panel cleaning event.",
      },
      {
        label: "NASA JPL Opportunity Mission Conclusion Release",
        url: "https://mars.nasa.gov/news/8413/nasas-opportunity-rover-mission-on-mars-comes-to-end/",
        claim: "Documentation of June 10, 2018 last contact, February 13, 2019 formal mission termination, and 45.16 km traverse record.",
      },
      {
        label: "NASA JPL Mars Exploration Rover Overview",
        url: "https://mars.nasa.gov/mer/",
        claim: "Mission profile detailing arrival in landing package, Sol 7 deployment egress, and exploration of Endeavour Crater.",
      },
    ],

    // Backward-compatibility properties for existing UI components
    name: "Opportunity Rover",
    year: "2004–2018",
    type: "Mars rover",
    status: "Inactive",
    image: null,
    imageWidth: null,
    imageHeight: null,
    imageId: "PIA18079",
    imageTitle: "Opportunity Self-Portrait After Martian Wind Dust Cleaning",
    imageDate: "March 24, 2014",
    imageSource: "https://images.nasa.gov/details/PIA18079",
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
