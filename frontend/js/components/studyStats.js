const { getLocalStorageData } = require('../utils/helpers');

const renderDashboard = () => {
    const srsData = getLocalStorageData('srs_data');
    const deck = window.appState.currentDeck || [];
    
    // Group by tech
    const techStats = {};
    deck.forEach(c => {
        if (!techStats[c.tech]) techStats[c.tech] = { total: 0, mastered: 0 };
        techStats[c.tech].total++;
        if (srsData[c.id] && srsData[c.id].interval >= 21) { // Considered mastered if interval > 21 days
            techStats[c.tech].mastered++;
        }
    });

    const ringsContainer = document.getElementById('mastery-rings');
    ringsContainer.innerHTML = Object.entries(techStats).map(([tech, stat]) => {
        const pct = Math.round((stat.mastered / stat.total) * 100);
        return `
            <div class="mastery-ring-container">
                <div class="mastery-ring" style="background: conic-gradient(var(--primary) ${pct}%, var(--border) ${pct}%);">
                    <div class="mastery-ring-inner">${pct}%</div>
                </div>
                <h4>${tech}</h4>
            </div>
        `;
    }).join('');

    // Identify Weak Areas (Low ease factor or failed repeatedly)
    const weakAreas = Object.entries(srsData)
        .filter(([id, data]) => data.easeFactor < 2.0 || data.repetitions === 0)
        .map(([id]) => deck.find(c => c.id === id))
        .filter(Boolean)
        .slice(0, 5); // Top 5 weak cards

    const weakList = document.getElementById('weak-areas');
    weakList.innerHTML = weakAreas.map(c => `<li><strong>${c.tech}:</strong> ${c.front}</li>`).join('');
};

module.exports = { renderDashboard };