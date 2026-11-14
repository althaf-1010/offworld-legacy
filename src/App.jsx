import { useState } from "react";
import { missions } from "./data/missions.js";
import "./index.css";

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
                {mission.image ? (
                  <img
                    src={mission.image}
                    alt={mission.imageTitle}
                    width={mission.imageWidth}
                    height={mission.imageHeight}
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <div className="image-placeholder">
                    <span>IMAGE PENDING SOURCING</span>
                  </div>
                )}
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
