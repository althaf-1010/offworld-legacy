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
      "Remains inside a 200-meter crater in Oceanus Procellarum. In November 1969, Apollo 12 astronauts inspected the lander and removed its television camera system, soil sampler scoop, cable, and sections of tubing for analysis on Earth.",
    recoveryStatus: "partial",
    location: {
      siteName: "Oceanus Procellarum (Ocean of Storms)",
      coordinateSource: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1967-035A",
      coordinateMeaning: "Surveyor 3 lunar touchdown site.",
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
          "The main engine failed to cut off at the correct moment during descent. Surveyor 3 bounced twice and settled on its third touchdown inside a lunar crater in Oceanus Procellarum.",
        reference: "https://science.nasa.gov/mission/surveyor-3/",
      },
      {
        type: "operations_end",
        date: "1967-05-03",
        description:
          "First-lunar-day operations ended. A NASA technical analysis dates the end of operations to May 3; it does not specify a precise shutdown mechanism.",
        reference: "https://ntrs.nasa.gov/api/citations/19720019081/downloads/19720019081.pdf",
      },
      {
        type: "contact_loss",
        date: "1967-05-04",
        description:
          "NASA identifies May 4 as the last contact with Surveyor 3, two days after lunar night began.",
        reference: "https://science.nasa.gov/mission/surveyor-3/",
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
    purpose: "Surveyor 3 tested lunar surface conditions and returned close-up images to help assess the Moon for future crewed landings.",
    legacy:
      "Surveyor 3 provided important information about the lunar surface. Apollo 12 astronauts later visited the spacecraft and retrieved components for examination on Earth.",
    media: {
      src: "/images/missions/surveyor-3.webp",
      width: 800,
      height: 800,
      nasaId: "AS12-48-7121",
      title: "View of Surveyor III in its crater",
      date: "November 20, 1969",
      credit: "NASA/JSC",
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
      "No recovery is documented. Sojourner operated for 83 sols; its last successful data arrived on September 27, 1997, and Pathfinder later sent a signal without data on October 7. Its present physical condition has not been directly confirmed.",
    recoveryStatus: "none-reported",
    location: {
      siteName: "Ares Vallis (Carl Sagan Memorial Station)",
      coordinateSource: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1996-068A",
      coordinateMeaning: "Pathfinder carrier landing site and Sojourner deployment area; the rover's final position is not plotted precisely.",
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
        type: "last_data",
        date: "1997-09-27",
        description:
          "Final successful data transmission from the Pathfinder lander and Sojourner rover on Sol 83. NASA notes that Sojourner was still functioning when the lander stopped communicating.",
        reference: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1996-068A",
      },
      {
        type: "contact_loss",
        date: "1997-10-07",
        description:
          "A final signal arrived from Pathfinder without spacecraft data. The last successful data session was September 27; recovery attempts continued for months.",
        reference: "https://mars.nasa.gov/internal_resources/815/",
      },
      {
        type: "carrier_closure",
        date: "1998-03-10",
        description:
          "NASA officially concluded the Mars Pathfinder mission after recovery efforts failed. This administrative closure came after Sojourner's surface operations and Pathfinder's last successful data transmission.",
        reference: "https://science.nasa.gov/resource/the-first-imp-image-from-mars/",
      },
    ],
    description:
      "The first successful rover to operate on Mars, exploring the terrain around Pathfinder.",
    purpose: "Sojourner was a technology demonstration for small mobile exploration and analyzed rocks and soil near the Pathfinder lander.",
    legacy:
      "Sojourner demonstrated the value of mobile robotic exploration and helped establish the foundations for later Mars rover missions.",
    media: {
      src: "/images/missions/sojourner.webp",
      width: 800,
      height: 405,
      nasaId: "PIA04318",
      title: 'Sojourner Sits Near “Rock Garden”',
      date: "Image added February 1, 2003",
      credit: "NASA/JPL-Caltech",
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
      {
        label: "NASA Science: Final Pathfinder Transmission and Mission Conclusion",
        url: "https://science.nasa.gov/resource/the-first-imp-image-from-mars/",
        claim: "Final data transmission on September 27, 1997; a final signal without data on October 7; and formal mission termination on March 10, 1998.",
      },
    ],

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
    operationalPeriod: "1969–1977",
    operationalStatus: "Inactive",
    physicalDisposition:
      "No recovery from the lunar surface is documented. The central station, SNAP-27 power unit, passive seismometer, and sensors were left at Oceanus Procellarum when transmissions were commanded off on September 30, 1977; their present condition has not been directly inspected.",
    recoveryStatus: "none-reported",
    location: {
      siteName: "Oceanus Procellarum (Apollo 12 landing site)",
      coordinateSource: "https://www.nasa.gov/wp-content/uploads/static/history/SP-4029/Apollo_18-31_ALSEP_Arrays_and_Status.htm",
      coordinateMeaning: "Published ALSEP instrument deployment site.",
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
          "Astronauts Alan Bean and Charles Conrad deployed the ALSEP central station and scientific instruments near the Lunar Module. Published ALSEP coordinates identify the central station site; the conflicting distance estimates are omitted because their source endpoints could not be reconciled.",
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
    purpose: "Apollo 12 ALSEP was deployed to make long-running geophysical and environmental measurements after the astronauts left the Moon.",
    legacy:
      "The Apollo Lunar Surface Experiments Package collected scientific measurements that helped researchers understand the Moon's interior and environment.",
    media: {
      src: "/images/missions/apollo-alsep.webp",
      width: 800,
      height: 774,
      nasaId: "AS12-47-6918",
      title: "View of part of the deployed Apollo Lunar Surface Experiment Package",
      date: "November 19, 1969",
      credit: "NASA/JSC",
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
        label: "NASA ALSEP Arrays and Status: Apollo 12 Deployment Coordinates",
        url: "https://www.nasa.gov/wp-content/uploads/static/history/SP-4029/Apollo_18-31_ALSEP_Arrays_and_Status.htm",
        claim: "Published latitude and longitude of the Apollo 12 ALSEP deployment site.",
      },
      {
        label: "Lunar and Planetary Institute: Apollo 12 ALSEP Record",
        url: "https://www.lpi.usra.edu/lunar/missions/apollo/apollo_12/experiments/alsep/",
        claim: "Detailed scientific experiments list, deployment sequence, and 1977 shutdown date.",
      },
      {
        label: "NASA Apollo Lunar Surface Journal: ALSEP Deployment and Apollo 12 Central Station",
        url: "https://www.nasa.gov/wp-content/uploads/static/history/alsj/HamishALSEP.html",
        claim: "Describes ALSEP deployment and identifies the Apollo 12 central station coordinates and its position relative to the Lunar Module.",
      },
    ],

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
      "No recovery is documented. LRV-1 was parked at the Hadley-Apennine VIP site about 160 meters east of Falcon's descent stage. LROC imagery identifies the resting site from orbit; it does not establish the present condition of every rover component.",
    recoveryStatus: "none-reported",
    location: {
      siteName: "Hadley-Apennine (VIP site, east of Falcon LM descent stage)",
      coordinateSource: "https://www.lroc.asu.edu/featured_sites/view_site/4",
      coordinateMeaning: "Lunar Roving Vehicle final VIP-site parking position from LROC site data.",
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
        type: "subsystem_failure",
        date: "1971-08-05",
        description:
          "Failure of the LCRU/GCTA television communications system (not a failure or last communication of the LRV itself). NASA Apollo 15 mission commentary dated August 6, 1971, reports that the LCRU was switched on the previous day (inferred August 5, 1971) and operated for approximately 13 minutes before its downlink failed; the cause remains undetermined, with an unconfirmed circuit-breaker problem suggested.",
        reference: "https://ntrs.nasa.gov/citations/19720008580",
      },
    ],
    description:
      "The first crewed rover driven on the Moon, vastly expanding astronauts' exploratory range during Apollo 15.",
    purpose: "LRV-1 let Apollo 15 astronauts travel farther from the Lunar Module while collecting samples and documenting the Hadley-Apennine region.",
    legacy:
      "LRV-1 traversed 27.8 km across the Hadley-Apennine terrain, enabling the collection of 77 kg of lunar samples—including the ancient 4.1-billion-year-old Genesis Rock—and proving mobility systems for extraterrestrial exploration.",
    media: {
      src: "/images/missions/apollo-15-lrv.webp",
      width: 1200,
      height: 1255,
      nasaId: "AS15-88-11901",
      title: "The Apollo 15 Rover at Its Final Parking Spot",
      date: "August 2, 1971",
      credit: "NASA/JSC / David R. Scott",
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
      "No recovery is documented. HiRISE precisely located the Viking 1 lander in an orbital image and identified likely locations for its heat shield, backshell, and parachute; the observation does not confirm the present condition of individual lander components.",
    recoveryStatus: "none-reported",
    location: {
      siteName: "Chryse Planitia (Thomas A. Mutch Memorial Station)",
      coordinateSource: "https://astrogeology.usgs.gov/search/map/Mars/Viking/Viking1_Lander_Coordinates",
      coordinateMeaning: "Viking 1 Lander touchdown site; both planetocentric and planetographic values are given.",
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
        type: "mission_closure",
        date: "1983-05-21",
        description:
          "Formal mission closure officially declared by NASA after six months of unsuccessful recovery attempts, marking administrative closure rather than the lander's operational end.",
        reference: "https://ntrs.nasa.gov/api/citations/20010071698/downloads/20010071698.pdf",
      },
    ],
    description:
      "The first American spacecraft to soft-land on Mars and operate successfully for over six years, performing groundbreaking biological and meteorological studies.",
    purpose: "Viking 1 investigated the Martian surface, atmosphere, weather, and soil chemistry, including experiments designed to test for evidence of life.",
    legacy:
      "Viking 1 operated for 2,245 Sols (over 6 Earth years), returning more than 50,000 images, providing long-term Martian weather data, and executing the first direct in situ chemical and biological searches on Mars.",
    media: {
      src: "/images/missions/viking-1-lander.webp",
      width: 1200,
      height: 427,
      nasaId: "PIA00381",
      title: "First Photograph Taken On Mars Surface",
      date: "July 20, 1976",
      credit: "NASA/JPL",
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
        label: "HiRISE Observation PSP_001521_2025: Viking Lander 1",
        url: "https://hirise.lpl.arizona.edu/PSP_001521_2025",
        claim: "Precisely locates the Viking 1 lander and identifies likely locations for the heat shield, backshell, and parachute in the orbital image.",
      },
      {
        label: "NASA JPL Viking Mission Overview",
        url: "https://mars.nasa.gov/missions/viking/",
        claim: "Mission parameters, 2245-Sol operational duration, and communications termination history.",
      },
      {
        label: "NASA Deep Space Chronicle: Viking 1 Mission Closure",
        url: "https://ntrs.nasa.gov/api/citations/20010071698/downloads/20010071698.pdf",
        claim: "Last transmission on November 11, 1982; accidental shutdown on November 13; and overall mission closure on May 21, 1983.",
      },
      {
        label: "USGS Astrogeology Science Center: Mars Landing Site Coordinates",
        url: "https://astrogeology.usgs.gov/search/map/Mars/Viking/Viking1_Lander_Coordinates",
        claim: "Explicit distinction between planetocentric (22.27° N, 48.00° W) and planetographic (22.48° N, 47.97° W) coordinate reference frames.",
      },
    ],

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
      "No recovery is documented. Opportunity's last known location was the western slope of Perseverance Valley on Endeavour Crater's rim. Dust covered its solar arrays during the 2018 storm; the rover's present physical condition has not been directly confirmed.",
    recoveryStatus: "none-reported",
    location: {
      siteName: "Perseverance Valley, western rim of Endeavour Crater (Final Location)",
      coordinateSource: null,
      coordinateMeaning: null,
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
        type: "mission_closure",
        date: "2019-02-13",
        description:
          "NASA officially declared formal mission termination at JPL after more than a thousand recovery commands sent since June 2018 went unanswered.",
        reference: "https://mars.nasa.gov/news/8413/nasas-opportunity-rover-mission-on-mars-comes-to-end/",
      },
    ],
    description:
      "A record-breaking solar-powered rover that arrived on Mars inside the MER-B landing system, deployed onto the surface, and operated for nearly 15 years searching for evidence of past liquid water.",
    purpose: "Opportunity investigated rocks and soils for evidence that liquid water had altered Mars and examined conditions relevant to past habitability.",
    legacy:
      "Designed for a 90-Sol mission and 1,000 meters of driving, Opportunity operated for 5,111 Sols and traveled 45.16 kilometers (28.06 miles). It uncovered decisive mineralogical evidence of past liquid water, including hematite 'blueberries' and jarosite formations.",
    media: {
      src: "/images/missions/opportunity-rover.webp",
      width: 1200,
      height: 939,
      nasaId: "PIA18079",
      title: "Self-Portrait by Freshly Cleaned Opportunity Mars Rover in March 2014",
      date: "March 22–24, 2014",
      credit: "NASA/JPL-Caltech/Cornell/Arizona State University",
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
