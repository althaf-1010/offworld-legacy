import { useState } from "react";
import "./index.css";

const missions = [
  {
    id: "M-001",
    name: "Surveyor 3",
    destination: "Moon",
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
    description:
      "An uncrewed spacecraft that explored the lunar surface before Apollo 12 astronauts visited it.",
    legacy:
      "Surveyor 3 provided important information about the lunar surface. Apollo 12 astronauts later visited the spacecraft and retrieved components for examination on Earth.",
  },
  {
    id: "M-002",
    name: "Sojourner",
    destination: "Mars",
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
    description:
      "The first successful rover to operate on Mars, exploring the terrain around Pathfinder.",
    legacy:
      "Sojourner demonstrated the value of mobile robotic exploration and helped establish the foundations for later Mars rover missions.",
  },
  {
    id: "M-003",
    name: "Apollo ALSEP",
    destination: "Moon",
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
    description:
      "A collection of scientific experiments deployed by Apollo astronauts to study the Moon.",
    legacy:
      "The Apollo Lunar Surface Experiments Packages collected scientific measurements that helped researchers understand the Moon's interior and environment.",
  },
];

function App() {
  const [filter, setFilter] = useState("All");
  const [selectedMission, setSelectedMission] = useState(null);

  const filtered = missions.filter(
    (mission) =>
      filter === "All" || mission.destination === filter
  );

  return (
    <main>
      <nav className="navbar">
        <a className="brand" href="#">
          OFFWORLD<span> LEGACY</span>
        </a>
        <span className="nav-tag">NASA SPACE APPS 2026</span>
      </nav>

      <section className="hero">
        <div className="hero-content">
          <div className="eyebrow">AN ARCHIVE OF HUMAN EXPLORATION</div>
          <h1>
            THE MISSIONS
            <br />
            THAT LEFT A
            <br />
            <span>LEGACY.</span>
          </h1>
          <p>
            Discover the stories of NASA equipment left behind
            on the Moon and Mars. Every machine has a story.
          </p>
          <a href="#missions" className="explore-btn">
            EXPLORE THE ARCHIVE <span>↗</span>
          </a>
          <div className="coordinates">
            28°N 15°W <span>·</span> BEYOND EARTH
          </div>
        </div>

        <div className="hero-orbit" aria-hidden="true">
          <div className="orbit-ring">
            <div className="orbit-moon" />
          </div>
          <div className="orbit-dot" />
          <span className="orbit-label">HUMANITY / 001</span>
        </div>
      </section>

      <section className="archive" id="missions">
        <div className="section-heading">
          <div>
            <div className="eyebrow">THE COLLECTION / 001</div>
            <h2>Mission Archive</h2>
            <p className="section-description">
              Machines that became part of another world.
            </p>
          </div>
          <span className="collection-count">
            {String(filtered.length).padStart(2, "0")} RECORDS
          </span>
        </div>

        <div className="filters" aria-label="Filter missions">
          {["All", "Moon", "Mars"].map((item) => (
            <button
              key={item}
              className={filter === item ? "active" : ""}
              onClick={() => setFilter(item)}
              aria-pressed={filter === item}
            >
              {item}
              {item === "All" && <span>{missions.length}</span>}
            </button>
          ))}
        </div>

        <div className="mission-grid">
          {filtered.map((mission) => (
            <article className="mission-card" key={mission.id}>
              <div className="card-top">
                <span>FILE / {mission.id}</span>
                <span className="status">{mission.status}</span>
              </div>

              <figure className="mission-image">
                <img
                  src={mission.image}
                  alt={mission.imageTitle}
                  width={mission.imageWidth}
                  height={mission.imageHeight}
                  loading="lazy"
                  decoding="async"
                />
                <figcaption>
                  NASA IMAGE / {mission.imageId}
                </figcaption>
              </figure>

              <div className="destination">
                {mission.destination.toUpperCase()} / {mission.type}
              </div>

              <h3>{mission.name}</h3>
              <p className="mission-description">
                {mission.description}
              </p>

              <div className="card-meta">
                <span>MISSION PERIOD</span>
                <span>{mission.year}</span>
              </div>

              <button
                className="mission-link"
                onClick={() =>
                  setSelectedMission(
                    selectedMission === mission.id ? null : mission.id
                  )
                }
                aria-expanded={selectedMission === mission.id}
              >
                {selectedMission === mission.id
                  ? "CLOSE MISSION FILE"
                  : "EXPLORE MISSION FILE"}
                <span>
                  {selectedMission === mission.id ? "−" : "↗"}
                </span>
              </button>

              {selectedMission === mission.id && (
                <div className="mission-details">
                  <div className="eyebrow">SCIENTIFIC LEGACY</div>
                  <p>{mission.legacy}</p>

                  <div className="eyebrow image-credit-heading">
                    IMAGE RECORD
                  </div>
                  <p>{mission.imageTitle}</p>
                  <p className="image-id">
                    NASA ID: {mission.imageId}
                  </p>
                  <a
                    className="source-link"
                    href={mission.imageSource}
                    target="_blank"
                    rel="noreferrer"
                  >
                    VIEW NASA IMAGE RECORD ↗
                  </a>
                </div>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="closing">
        <div className="eyebrow">BEYOND THE MISSION</div>
        <h2>
          Not forgotten.
          <br />
          <span>Never without a story.</span>
        </h2>
      </section>

      <footer>
        <span>ORBIT OF D. × OFFWORLD LEGACY</span>
        <span>EXPLORING THE STORIES BEYOND EARTH.</span>
        <span className="footer-year">NASA SPACE APPS 2026</span>
      </footer>
    </main>
  );
}

export default App;
