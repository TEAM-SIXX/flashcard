const { generateDeck } = require('../api');

const renderTech = (technologies) => {
    const container = document.getElementById('tech-list');
    container.innerHTML = technologies.map(t => `
        <div class="tech-item ${t.priority === 'Required' ? 'required' : 'nice-to-have'}">
            <div class="tech-name">${t.name}</div>
            <div class="tech-meta">${t.category} • ${t.priority} • Freq: ${t.frequency}</div>
        </div>
    `).join('');
};

const initTechDisplay = (switchView) => {
    document.getElementById('generate-deck-btn').onclick = async () => {
        const techNames = window.appState.extractedTech.map(t => t.name);
        const btn = document.getElementById('generate-deck-btn');
        btn.innerText = 'Building Deck...';
        btn.disabled = true;

        try {
            const data = await generateDeck(techNames);
            if (data.success) {
                window.appState.currentDeck = data.deck;
                window.appState.filteredDeck = data.deck;
                initDeck();
                switchView('view-study');
            }
        } catch (error) {
            alert('Error generating deck');
        } finally {
            btn.innerText = 'Generate Study Deck';
            btn.disabled = false;
        }
    };
};

module.exports = { renderTech, initTechDisplay, initDeck }; // initDeck exposed to be called circularly