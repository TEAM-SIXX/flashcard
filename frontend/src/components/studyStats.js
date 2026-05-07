export default function Stats(container, tech) {
  if (!tech || tech.length === 0) {
    container.innerHTML = `<p>No data yet</p>`;
    return;
  }

  const counts = tech.reduce((acc, item) => {
    acc[item] = (acc[item] || 0) + 1;
    return acc;
  }, {});

  let listItems = Object.entries(counts)
    .map(([key, value]) => `<li>${key}: ${value}</li>`)
    .join("");

  container.innerHTML = `
    <div>
      <h2>Stats</h2>
      <p>Total technologies: ${tech.length}</p>
      <ul>
        ${listItems}
      </ul>
    </div>
  `;
}