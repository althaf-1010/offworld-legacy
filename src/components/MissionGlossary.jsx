const TERMS = [
  ["Lander", "A spacecraft designed to reach the surface and remain there. Surveyor and Viking carried science instruments on fixed landers."],
  ["Rover", "A mobile surface vehicle. Sojourner and Opportunity explored beyond the spot where their carrier spacecraft touched down."],
  ["Payload", "The instruments and equipment a spacecraft carries for its mission. A payload can reach the surface later than its carrier lands."],
  ["Science instrument", "A tool that measures or observes something, such as temperature, soil chemistry, images, or ground movement."],
  ["Communication relay", "A spacecraft or antenna that passes messages between a surface machine and Earth. A rover can still be working even if its relay link fails."],
  ["Surface operations", "The period when equipment performed work on the ground. It differs from later attempts to contact it or the formal closure of its mission."],
];

export default function MissionGlossary() {
  return (
    <section className="glossary" aria-labelledby="glossary-title">
      <div className="eyebrow">A FIELD GUIDE</div>
      <h2 id="glossary-title">A few useful terms</h2>
      <div className="glossary-grid">
        {TERMS.map(([term, definition], index) => (
          <article className="glossary-card" key={term}>
            <span className="glossary-index">0{index + 1}</span>
            <h3>{term}</h3>
            <p>{definition}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
