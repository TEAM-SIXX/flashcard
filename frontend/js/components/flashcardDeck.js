const { updateSRS, getLocalStorageData, setLocalStorageData, filterDueCards } = require('../utils/helpers');
const { generateMoreCards } = require('../api');

let currentIndex = 0;
let isFlipped = false;

const initDeck = () => {
    currentIndex = 0;
    isFlipped = false;
    window.appState.filteredDeck = filterDueCards(window.appState.currentDeck);
    if(window.appState.filteredDeck.length === 0) {
        alert("Great job! No cards are due for review right now. Come back later or generate new ones.");
        return;
    }
    renderCard();
    setupControls();
};

const renderCard = () => {
    const deck = window.appState.filteredDeck;
    if (currentIndex >= deck.length) currentIndex = 0;
    if (currentIndex < 0) currentIndex = deck.length - 1;

    const card = deck[currentIndex];
    const srsData = getLocalStorageData('srs_data')[card.id];
    
    document.getElementById('card-front-text').innerText = card.front;
    document.getElementById('card-back-text').innerText = card.back;
    document.getElementById('card-counter').innerText = `Card ${currentIndex + 1} of ${deck.length}`;
    document.getElementById('card-tech-badge').innerText = card.tech;
    document.getElementById('card-diff-badge').innerText = card.difficulty;
    
    // Reset flip state
    isFlipped = false;
    document.getElementById('flip-card').classList.remove('flipped');
    
    // Update bookmark icon
    const bookmarks = getLocalStorageData('bookmarks');
    document.getElementById('bookmark-btn').innerText = bookmarks[card.id] ? '★' : '☆';
};

const setupControls = () => {
    // Flip
    document.getElementById('flip-card').onclick = () => {
        isFlipped = !isFlipped;
        document.getElementById('flip-card').classList.toggle('flipped');
    };

    // Navigation
    document.getElementById('next-btn').onclick = () => { currentIndex++; renderCard(); };
    document.getElementById('prev-btn').onclick = () => { currentIndex--; renderCard(); };

    // Rating (SRS)
    document.querySelectorAll('.rate-btn').forEach(btn => {
        btn.onclick = (e) => {
            const rating = parseInt(e.target.dataset.rating);
            const card = window.appState.filteredDeck[currentIndex];
            
            let srsData = getLocalStorageData('srs_data');
            const defaultSRS = { easeFactor: 2.5, interval: 0, repetitions: 0, nextReview: Date.now() };
            const current = srsData[card.id] || defaultSRS;
            
            srsData[card.id] = updateSRS(current, rating);
            setLocalStorageData('srs_data', srsData);

            // Auto advance
            currentIndex++; 
            renderCard();
        };
    });

    // Bookmark
    document.getElementById('bookmark-btn').onclick = () => {
        const card = window.appState.filteredDeck[currentIndex];
        let bookmarks = getLocalStorageData('bookmarks');
        bookmarks[card.id] = !bookmarks[card.id];
        setLocalStorageData('bookmarks', bookmarks);
        document.getElementById('bookmark-btn').innerText = bookmarks[card.id] ? '★' : '☆';
    };

    // Search & Filter
    document.getElementById('search-cards').oninput = applyFilters;
    document.getElementById('filter-difficulty').onchange = applyFilters;

    // Generate More AI Cards
    document.getElementById('ai-gen-btn').onclick = async () => {
        const card = window.appState.filteredDeck[currentIndex];
        const existingIds = window.appState.currentDeck.map(c => c.id);
        const btn = document.getElementById('ai-gen-btn');
        btn.innerText = 'Generating...';
        btn.disabled = true;
        
        try {
            const data = await generateMoreCards(card.tech, existingIds);
            if(data.success) {
                window.appState.currentDeck.push(...data.cards);
                applyFilters(); // re-apply filters to include new cards
            }
        } catch(e) { alert("Failed to generate"); }
        finally { btn.innerText = '✨ Generate AI Cards for this Tech'; btn.disabled = false; }
    };

    // Export
    document.getElementById('export-btn').onclick = () => {
        const blob = new Blob([JSON.stringify(window.appState.currentDeck, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a'); a.href = url; a.download = 'study_deck.json'; a.click();
    };
};

const applyFilters = () => {
    const search = document.getElementById('search-cards').value.toLowerCase();
    const diff = document.getElementById('filter-difficulty').value;
    
    window.appState.filteredDeck = window.appState.currentDeck.filter(c => {
        const matchText = c.front.toLowerCase().includes(search) || c.tech.toLowerCase().includes(search);
        const matchDiff = diff === 'all' || c.difficulty === diff;
        return matchText && matchDiff;
    });
    currentIndex = 0;
    renderCard();
};

// Keyboard Shortcuts
document.addEventListener('keydown', (e) => {
    if (!document.getElementById('view-study').classList.contains('active')) return;
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    if (e.key === ' ') { e.preventDefault(); document.getElementById('flip-card').click(); }
    if (e.key === 'ArrowRight') document.getElementById('next-btn').click();
    if (e.key === 'ArrowLeft') document.getElementById('prev-btn').click();
    if (e.key === 'b' || e.key === 'B') document.getElementById('bookmark-btn').click();
    if (e.key >= '1' && e.key <= '5') document.querySelector(`.rate-btn[data-rating="${e.key}"]`).click();
});

module.exports = { initDeck };