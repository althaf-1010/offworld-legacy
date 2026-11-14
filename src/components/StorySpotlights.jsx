import { useState } from "react";

const FEATURED_IDS = ["M-001", "M-006"];

export default function StorySpotlights({ missions, onOpenStory }) {
  const [failedImages, setFailedImages] = useState(() => new Set());
  const stories = FEATURED_IDS.flatMap((id) => {
    const story = missions.find((mission) => mission.id === id);
    return story ? [story] : [];
  });

  return (
    <section className="story-spotlights" id="stories" aria-labelledby="stories-title">
      <div className="section-heading">
        <div>
          <div className="eyebrow">TWO WORLDS / TWO JOURNEYS</div>
          <h2 id="stories-title">Begin with a story</h2>
          <p className="section-description">A lunar rendezvous that brought machine parts home, and a Mars rover that worked for years beyond its planned life.</p>
        </div>
        <a className="text-link" href="#missions">VIEW ALL SIX FILES <span aria-hidden="true">↘</span></a>
      </div>
      <div className="spotlight-grid">
        {stories.map((mission) => (
          <article className="spotlight-card" key={mission.id}>
            {mission.media.src && !failedImages.has(mission.id) ? (
              <img src={mission.media.src} alt={mission.media.title} width={mission.media.width} height={mission.media.height} loading="lazy" decoding="async" onError={() => setFailedImages((failed) => new Set(failed).add(mission.id))} />
            ) : (
              <div className="spotlight-image-placeholder" role="img" aria-label={`${mission.media.title} unavailable`} />
            )}
            <div className="spotlight-shade" aria-hidden="true" />
            <a className="spotlight-credit" href={mission.media.sourceUrl} target="_blank" rel="noreferrer" aria-label={`Image credit ${mission.media.credit}; open NASA image ${mission.media.nasaId}`}>
              {mission.media.credit} · {mission.media.nasaId} <span aria-hidden="true">↗</span>
            </a>
            <div className="spotlight-copy">
              <div className="eyebrow">{mission.destination.toUpperCase()} / {mission.id}</div>
              <h3>{mission.equipment.name}</h3>
              <p>{mission.legacy}</p>
              <button type="button" onClick={() => onOpenStory(mission)}>FOLLOW THE TIMELINE <span aria-hidden="true">↗</span></button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
