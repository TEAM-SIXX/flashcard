let currentIndex = 0;
let isFlipped = false;

const initDeck = () => {
    currentIndex = 0;
    isFlipped = false;
    window.appState.filteredDeck = window.filterDueCards(window.appState.currentDeck);
    if (window.appState.filteredDeck.length === 0) {
        alert("No cards due for review. Come back later or generate new ones.");
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
    document.getElementById('card-front-text').innerText = card.front;
    document.getElementById('card-back-text').innerText = card.back;
    document.getElementById('card-counter').innerText = 'Card ' + (currentIndex + 1) + ' of ' + deck.length;
    document.getElementById('card-tech-badge').innerText = card.tech;
    document.getElementById('card-diff-badge').innerText = card.difficulty;
    isFlipped = false;
    document.getElementById('flip-card').classList.remove('flipped');
    const bookmarks = window.getLocalStorageData('bookmarks');
    document.getElementById('bookmark-btn').innerText = bookmarks[card.id] ? '\u2605' : '\u2606';
};

const setupControls = () => {
    document.getElementById('flip-card').onclick = () => {
        isFlipped = !isFlipped;
        document.getElementById('flip-card').classList.toggle('flipped');
    };
    document.getElementById('next-btn').onclick = () => { currentIndex++; renderCard(); };
    document.getElementById('prev-btn').onclick = () => { currentIndex--; renderCard(); };
    document.querySelectorAll('.rate-btn').forEach(btn => {
        btn.onclick = (e) => {
            const rating = parseInt(e.target.dataset.rating);
            const card = window.appState.filteredDeck[currentIndex];
            let srsData = window.getLocalStorageData('srs_data');
            const defaultSRS = { easeFactor: 2.5, interval: 0, repetitions: 0, nextReview: Date.now() };
            srsData[card.id] = window.updateSRS(srsData[card.id] || defaultSRS, rating);
            window.setLocalStorageData('srs_data', srsData);
            currentIndex++;
            renderCard();
        };
    });
    document.getElementById('bookmark-btn').onclick = () => {
        const card = window.appState.filteredDeck[currentIndex];
        let bookmarks = window.getLocalStorageData('bookmarks');
        bookmarks[card.id] = !bookmarks[card.id];
        window.setLocalStorageData('bookmarks', bookmarks);
        document.getElementById('bookmark-btn').innerText = bookmarks[card.id] ? '\u2605' : '\u2606';
    };
    document.getElementById('search-cards').oninput = applyFilters;
    document.getElementById('filter-difficulty').onchange = applyFilters;
    document.getElementById('ai-gen-btn').onclick = async () => {
        const card = window.appState.filteredDeck[currentIndex];
        const existingIds = window.appState.currentDeck.map(c => c.id);
        const btn = document.getElementById('ai-gen-btn');
        btn.innerText = 'Generating...';
        btn.disabled = true;
        try {
            const data = await window.generateMoreCards(card.tech, existingIds);
            if (data.success) { window.appState.currentDeck.push(...data.cards); applyFilters(); }
        } catch (e) { alert("Failed: " + e.message); }
        finally { btn.innerText = '\u2728 Generate AI Cards for this Tech'; btn.disabled = false; }
    };
    document.getElementById('export-btn').onclick = () => {
        const blob = new Blob([JSON.stringify(window.appState.currentDeck, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a'); a.href = url; a.download = 'study_deck.json'; a.click();
        URL.revokeObjectURL(url);
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

document.addEventListener('keydown', (e) => {
    if (!document.getElementById('view-study').classList.contains('active')) return;
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if (e.key === ' ') { e.preventDefault(); document.getElementById('flip-card').click(); }
    if (e.key === 'ArrowRight') document.getElementById('next-btn').click();
    if (e.key === 'ArrowLeft') document.getElementById('prev-btn').click();
    if (e.key === 'b' || e.key === 'B') document.getElementById('bookmark-btn').click();
    if (e.key >= '1' && e.key <= '5') { const btn = document.querySelector('.rate-btn[data-rating="' + e.key + '"]'); if (btn) btn.click(); }
});

window.initDeck = initDeck;
