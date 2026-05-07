const renderTech = (technologies) => {
    const container = document.getElementById('tech-list');
    container.innerHTML = technologies.map(t => {
        const cls = t.priority === 'Required' ? 'required' : 'nice-to-have';
        return '<div class="tech-item ' + cls + '"><div class="tech-name">' + t.name + '</div><div class="tech-meta">' + t.category + ' &bull; ' + t.priority + ' &bull; Freq: ' + t.frequency + '</div></div>';
    }).join('');
};

const initTechDisplay = (switchView) => {
    document.getElementById('generate-deck-btn').onclick = async () => {
        const techNames = window.appState.extractedTech.map(t => t.name);
        const btn = document.getElementById('generate-deck-btn');
        btn.innerText = 'Building Deck...';
        btn.disabled = true;
        try {
            const data = await window.generateDeck(techNames);
            if (data.success) {
                window.appState.currentDeck = data.deck;
                window.appState.filteredDeck = data.deck;
                window.initDeck();
                switchView('view-study');
            }
        } catch (error) {
            alert('Error: ' + error.message);
        } finally {
            btn.innerText = 'Generate Study Deck';
            btn.disabled = false;
        }
    };
};

window.renderTech = renderTech;
window.initTechDisplay = initTechDisplay;
