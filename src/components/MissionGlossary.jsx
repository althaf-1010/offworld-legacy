const TERMS = [
  ["Lander", "A spacecraft designed to reach the surface and remain there. Surveyor and Viking carried science instruments on fixed landers."],
  ["Rover", "A mobile surface vehicle. Sojourner and Opportunity explored beyond the spot where their carrier spacecraft touched down."],
  ["Payload", "The instruments and equipment a spacecraft carries for its mission. A payload can reach the surface later than its carrier lands."],
  ["Science instrument", "A tool that measures or observes something, such as temperature, soil chemistry, images, or ground movement."],
  ["Communication relay", "A spacecraft or antenna that passes messages between a surface machine and Earth. A rover can still be working even if its relay link fails."],
  ["Surface operations", "The period when equipment performed work on the ground. It differs from later attempts to contact it or the formal closure of its mission."],
  ["LCRU", "Lunar Communications Relay Unit: the Apollo 15 rover unit that relayed commands and telemetry between the rover and Earth through the lunar module."],
  ["GCTA", "Ground-Controlled Television Assembly: the camera system mounted on the Apollo 15 rover and operated from Earth to show the lunar module's ascent."],
  ["RTG", "Radioisotope thermoelectric generator: a power source that turns heat from radioactive decay into electricity. Apollo ALSEP stations used SNAP-27 RTGs."],
  ["APXS", "Alpha Particle X-ray Spectrometer: Sojourner's instrument for studying the chemical composition of Martian rocks and soil."],
  ["Pancam", "Panoramic Camera: Opportunity's pair of cameras used to make detailed color images of the Martian landscape and rover."],
  ["PSE", "Passive Seismic Experiment: an ALSEP instrument that measured ground vibrations, including moonquakes and impacts."],
  ["EVA", "Extravehicular activity: work an astronaut performs outside a spacecraft, such as walking on the Moon during an Apollo mission."],
];

export default function MissionGlossary() {
  return (
    <section className="glossary" aria-labelledby="glossary-title">
      <div className="eyebrow">A FIELD GUIDE</div>
      <h2 id="glossary-title">A few useful terms</h2>
      <div className="glossary-grid">
        {TERMS.map(([term, definition], index) => (
          <article className="glossary-card" key={term}>
            <span className="glossary-index">{String(index + 1).padStart(2, "0")}</span>
            <h3>{term}</h3>
            <p>{definition}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
