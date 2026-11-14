import { useState } from "react";

const EVENT_LABELS = {
  launch: "Launch",
  landing: "Landing",
  deployment: "Deployment",
  operations_end: "Operations ended",
  milestone: "Milestone",
  shutdown: "Shutdown",
  contact_loss: "Last contact",
  crew_visit: "Crew visit",
  carrier_closure: "Carrier mission closure",
  mission_closure: "Mission formally closed",
  last_data: "Last data received",
  subsystem_failure: "Subsystem failure",
};

const DATE_FORMAT = new Intl.DateTimeFormat("en", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

function formatDate(value) {
  return DATE_FORMAT.format(new Date(`${value}T00:00:00Z`));
}

function MissionCard({ mission, index, expanded, onToggle }) {
  const [imageFailed, setImageFailed] = useState(false);
  const detailsId = `mission-details-${mission.id}`;
  const { mission: identity, equipment, media, location } = mission;

  return (
    <article className={`mission-card ${expanded ? "is-expanded" : ""}`} id={`mission-${mission.id}`}>
      <div className="card-top">
        <span>FIELD FILE / {mission.id}</span>
        <span className="status"><i aria-hidden="true" />{mission.operationalStatus}</span>
      </div>

      <figure className="mission-image">
        {media.src && !imageFailed ? (
          <img
            src={media.src}
            alt={media.title}
            width={media.width}
            height={media.height}
            loading={index < 3 ? "eager" : "lazy"}
            fetchPriority={index === 0 ? "high" : "auto"}
            decoding="async"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="image-placeholder" role="img" aria-label="NASA image unavailable">
            <span>IMAGE NOT AVAILABLE</span>
            <span className="placeholder-record">NASA / {media.nasaId}</span>
          </div>
        )}
        <figcaption>
          <span>{mission.destination.toUpperCase()} SURFACE</span>
          <span>NASA IMAGE / {media.nasaId}</span>
        </figcaption>
      </figure>

      <div className="destination">{mission.destination} <span>/</span> {equipment.type}</div>
      <p className="mission-name">{identity.name}</p>
      <h3>{equipment.name}</h3>
      <p className="mission-description">{mission.description}</p>

      <div className="card-meta">
        <span>OPERATIONAL PERIOD</span>
        <span>{mission.operationalPeriod}</span>
      </div>

      <button
        className="mission-link"
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        aria-controls={detailsId}
      >
        <span>{expanded ? "CLOSE MISSION FILE" : "OPEN MISSION FILE"}</span>
        <span className="toggle-mark" aria-hidden="true">{expanded ? "−" : "↗"}</span>
      </button>

      {expanded && (
        <div className="mission-details" id={detailsId}>
          <section className="detail-section" aria-labelledby={`${detailsId}-facts`}>
            <div className="eyebrow" id={`${detailsId}-facts`}>MISSION PROFILE</div>
            <p className="purpose-label">WHY IT WAS SENT</p>
            <p className="disposition-copy mission-purpose">{mission.purpose}</p>
            <dl className="fact-grid">
              <div>
                <dt>Program</dt>
                <dd>{identity.program}</dd>
              </div>
              {identity.spacecraftId && (
                <div>
                  <dt>Spacecraft ID</dt>
                  <dd>{identity.spacecraftId}</dd>
                </div>
              )}
              {equipment.designation && (
                <div>
                  <dt>Equipment designation</dt>
                  <dd>{equipment.designation}</dd>
                </div>
              )}
              <div>
                <dt>Launch</dt>
                <dd><time dateTime={identity.launchDate}>{formatDate(identity.launchDate)}</time></dd>
              </div>
              {mission.landingDate && (
                <div>
                  <dt>Equipment landing</dt>
                  <dd><time dateTime={mission.landingDate}>{formatDate(mission.landingDate)}</time></dd>
                </div>
              )}
              {mission.deploymentDate && (
                <div>
                  <dt>Surface deployment</dt>
                  <dd><time dateTime={mission.deploymentDate}>{formatDate(mission.deploymentDate)}</time></dd>
                </div>
              )}
              <div>
                <dt>Location</dt>
                <dd>{location.siteName}</dd>
              </div>
              <div>
                <dt>Coordinates</dt>
                <dd>{location.coordinates?.display ?? "Not established in this archive"}</dd>
              </div>
              <div>
                <dt>Surface operations</dt>
                <dd>{mission.operationalPeriod} · {mission.operationalStatus}</dd>
              </div>
            </dl>
            {mission.landingDate === null && (
              <p className="date-note">The timeline records the carrier landing; this profile lists when the equipment itself reached the surface.</p>
            )}
          </section>

          <section className="detail-section" aria-labelledby={`${detailsId}-disposition`}>
            <div className="eyebrow" id={`${detailsId}-disposition`}>PRESENT DISPOSITION</div>
            <p className="disposition-copy">{mission.physicalDisposition}</p>
          </section>

          <section className="detail-section" aria-labelledby={`${detailsId}-timeline`}>
            <div className="eyebrow" id={`${detailsId}-timeline`}>MISSION TIMELINE</div>
            <ol className="event-list">
              {mission.events.map((event, eventIndex) => (
                <li className="event-item" key={`${event.type}-${event.date}-${eventIndex}`}>
                  <time className="event-date" dateTime={event.date}>{formatDate(event.date)}</time>
                  <div className="event-body">
                    <strong>{EVENT_LABELS[event.type]}</strong>
                    <p>{event.description}</p>
                    {event.reference && (
                      <a href={event.reference} target="_blank" rel="noreferrer">
                        EVENT SOURCE <span aria-hidden="true">↗</span>
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section className="detail-section" aria-labelledby={`${detailsId}-legacy`}>
            <div className="eyebrow" id={`${detailsId}-legacy`}>SCIENTIFIC LEGACY</div>
            <p className="disposition-copy">{mission.legacy}</p>
          </section>

          <section className="detail-section image-record" aria-labelledby={`${detailsId}-image`}>
            <div className="eyebrow" id={`${detailsId}-image`}>IMAGE RECORD</div>
            <p className="image-title">{media.title}</p>
            <p className="image-date">{media.date} <span>·</span> NASA ID {media.nasaId}</p>
            <p className="image-credit">Image credit: {media.credit}</p>
            <a href={media.sourceUrl} target="_blank" rel="noreferrer" className="source-link">
              VIEW NASA IMAGE RECORD <span aria-hidden="true">↗</span>
            </a>
          </section>

          <section className="detail-section references" aria-labelledby={`${detailsId}-references`}>
            <div className="eyebrow" id={`${detailsId}-references`}>SOURCES & REFERENCES</div>
            <ul>
              {mission.references.map((reference) => (
                <li key={reference.url}>
                  <a href={reference.url} target="_blank" rel="noreferrer">
                    {reference.label} <span aria-hidden="true">↗</span>
                  </a>
                  <p>{reference.claim}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>
      )}
    </article>
  );
}

export default MissionCard;
