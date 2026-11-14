export default function LegacyOverview({ missions, onOpenRecord }) {
  const recovered = missions.filter((mission) => mission.recoveryStatus === "partial");
  const notDocumentedRecovered = missions.filter((mission) => mission.recoveryStatus === "none-reported");

  return (
    <section className="legacy-overview" id="legacy" aria-labelledby="legacy-title">
      <div className="section-heading">
        <div>
          <div className="eyebrow">WHAT THE RECORDS SAY / PHYSICAL DISPOSITION</div>
          <h2 id="legacy-title">A legacy with different endings</h2>
          <p className="section-description">Some equipment was examined up close. Other records document no recovery. An inactive machine may still be at its site; its present condition is not always known.</p>
        </div>
      </div>
      <div className="legacy-columns">
        <section className="legacy-group" aria-labelledby="recovered-title">
          <div className="legacy-group-heading"><span className="legacy-count">0{recovered.length}</span><h3 id="recovered-title">Partly recovered</h3></div>
          <p className="legacy-intro">Apollo 12 astronauts removed selected Surveyor 3 components and returned them to Earth for study. The lander itself was not recovered.</p>
          {recovered.map((mission) => (
            <button className="legacy-record" key={mission.id} type="button" onClick={() => onOpenRecord(mission)}>
              <span>{mission.equipment.name}</span><span aria-hidden="true">↗</span>
            </button>
          ))}
        </section>
        <section className="legacy-group" aria-labelledby="not-recovered-title">
          <div className="legacy-group-heading"><span className="legacy-count">{String(notDocumentedRecovered.length).padStart(2, "0")}</span><h3 id="not-recovered-title">No recovery documented</h3></div>
          <p className="legacy-intro">These records do not report equipment being brought back from the Moon or Mars. The files describe last known sites and make the limits of current physical evidence explicit.</p>
          <div className="legacy-record-list">
            {notDocumentedRecovered.map((mission) => (
              <button className="legacy-record" key={mission.id} type="button" onClick={() => onOpenRecord(mission)}>
                <span>{mission.equipment.name}<small>{mission.destination} / {mission.id}</small></span><span aria-hidden="true">↗</span>
              </button>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
