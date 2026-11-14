import { useMemo, useState } from "react";
import { missions, destinations } from "./data/missions.js";
import { filterMissions } from "./data/schema.js";
import MissionCard from "./components/MissionCard.jsx";
import ExplorationMap from "./components/ExplorationMap.jsx";
import MissionGlossary from "./components/MissionGlossary.jsx";
import StorySpotlights from "./components/StorySpotlights.jsx";
import LegacyOverview from "./components/LegacyOverview.jsx";

function App() {
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All types");
  const [selectedMission, setSelectedMission] = useState(null);
  const [mapDestination, setMapDestination] = useState("Moon");

  function openMissionFile(mission) {
    setFilter(mission.destination);
    setCategory("All types");
    setQuery("");
    setSelectedMission(mission.id);
    requestAnimationFrame(() => document.getElementById(`mission-${mission.id}`)?.scrollIntoView({ behavior: "smooth", block: "start" }));
  }

  const filteredMissions = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    return filterMissions(missions, filter).filter((mission) => {
      const equipmentType = mission.equipment.type.toLocaleLowerCase();
      const matchesCategory = category === "All types" ||
        (category === "Rovers" && equipmentType.includes("rover")) ||
        (category === "Landers" && equipmentType.includes("lander")) ||
        (category === "Instruments" && equipmentType.includes("science"));
      if (!matchesCategory) return false;
      if (!normalizedQuery) return true;
      const searchable = [
        mission.mission.name,
        mission.mission.program,
        mission.equipment.name,
        mission.equipment.type,
        mission.equipment.designation,
        mission.location.siteName,
        mission.description,
        mission.purpose,
        mission.legacy,
        ...mission.events.map((event) => event.description),
      ]
        .filter(Boolean)
        .join(" ")
        .toLocaleLowerCase();
      return searchable.includes(normalizedQuery);
    });
  }, [category, filter, query]);

  return (
    <main id="top">
      <nav className="navbar" aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="Offworld Legacy home">
          OFFWORLD<span> LEGACY</span>
        </a>
        <span className="nav-tag">FIELD ARCHIVE / NASA SPACE APPS</span>
        <div className="nav-links"><a href="#stories">STORIES</a><a href="#missions">ARCHIVE</a><a href="#exploration">SURFACE INDEX</a><a href="#legacy">LEGACY</a></div>
      </nav>

      <header className="hero">
        <div className="hero-content">
          <div className="eyebrow">AN ARCHIVE OF HUMAN EXPLORATION</div>
          <h1>
            THE MACHINES
            <br />
            WE LEFT
            <br />
            <span>BEHIND.</span>
          </h1>
          <p>
            A field archive of NASA equipment that remains on the Moon and
            Mars. Follow each machine from launch to its final resting place.
          </p>
          <a href="#missions" className="explore-btn">
            EXPLORE THE ARCHIVE <span aria-hidden="true">↘</span>
          </a>
          <div className="hero-note">
            <span className="hero-note-dot" aria-hidden="true" />
            {String(missions.length).padStart(2, "0")} OBJECTS DOCUMENTED
            <span className="note-divider" aria-hidden="true">/</span>
            {destinations.length - 1} WORLDS
          </div>
        </div>

        <div className="hero-mark" aria-hidden="true">
          <div className="hero-mark-orbit" />
          <div className="hero-mark-world" />
          <div className="hero-mark-label">EARTH IS JUST THE BEGINNING</div>
          <span className="hero-mark-index">OL / 001—006</span>
        </div>
        <div className="hero-bottom-line" aria-hidden="true">
          <span>MOON</span><i /> <span>MARS</span><i /> <span>HUMAN FOOTPRINTS</span>
        </div>
        <a className="hero-image-credit" href="https://images.nasa.gov/details/as12-47-6918" target="_blank" rel="noreferrer" aria-label="Hero photograph credit: NASA Johnson Space Center, NASA image AS12-47-6918">
          NASA/JSC · AS12-47-6918 <span aria-hidden="true">↗</span>
        </a>
      </header>

      <StorySpotlights missions={missions} onOpenStory={openMissionFile} />

      <section className="archive" id="missions" aria-labelledby="archive-title">
        <div className="section-heading">
          <div>
            <div className="eyebrow">THE COLLECTION / 001</div>
            <h2 id="archive-title">Mission archive</h2>
            <p className="section-description">
              Six machines. Two worlds. Every record grounded in source material.
            </p>
          </div>
          <span className="collection-count" aria-live="polite">
            {String(filteredMissions.length).padStart(2, "0")} / {String(missions.length).padStart(2, "0")} RECORDS
          </span>
        </div>

        <div className="archive-controls">
          <div className="filters" role="group" aria-label="Filter by destination">
            {destinations.map((item) => (
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
          <label className="search-control">
            <span className="sr-only">Search the mission archive</span>
            <span className="search-icon" aria-hidden="true">⌕</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search records"
            />
          </label>
        </div>
        <div className="category-controls" role="group" aria-label="Filter by equipment category">
          {["All types", "Rovers", "Landers", "Instruments"].map((item) => (
            <button key={item} type="button" className={category === item ? "active" : ""} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>
          ))}
        </div>

        {filteredMissions.length > 0 ? (
          <div className="mission-grid" aria-live="polite">
            {filteredMissions.map((mission, index) => (
              <MissionCard
                key={mission.id}
                mission={mission}
                index={index}
                expanded={selectedMission === mission.id}
                onToggle={() =>
                  setSelectedMission((selected) => selected === mission.id ? null : mission.id)
                }
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <span className="eyebrow">NO MATCHING FILES</span>
            <p>Try another term or destination.</p>
            <button onClick={() => { setFilter("All"); setCategory("All types"); setQuery(""); }}>RESET ARCHIVE</button>
          </div>
        )}
      </section>

      <ExplorationMap destination={mapDestination} onDestinationChange={setMapDestination} onOpenRecord={openMissionFile} />

      <LegacyOverview missions={missions} onOpenRecord={openMissionFile} />

      <MissionGlossary />

      <section className="closing" aria-labelledby="closing-title">
        <div className="closing-coordinate">SURFACE RECORD / 001—006</div>
        <div className="eyebrow">A RECORD OF PRESENCE</div>
        <h2 id="closing-title">
          Not forgotten.
          <br />
          <span>Still part of the story.</span>
        </h2>
        <p>Every object is evidence of a journey—and a beginning for the next one.</p>
      </section>

      <footer>
        <a className="brand" href="#top">OFFWORLD<span> LEGACY</span></a>
        <span>AN INDEPENDENT NASA MISSION ARCHIVE</span>
        <a href="#missions" className="back-to-top">BACK TO ARCHIVE ↑</a>
      </footer>
    </main>
  );
}

export default App;
