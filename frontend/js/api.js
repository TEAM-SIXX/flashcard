const API_BASE = 'http://localhost:5000/api';

const analyzeJD = async (payload) => {
    const res = await fetch(`${API_BASE}/analyze-jd`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
    return res.json();
};

const generateDeck = async (technologies) => {
    const res = await fetch(`${API_BASE}/generate-deck`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ technologies })
    });
    return res.json();
};

const generateMoreCards = async (techName, existingIds) => {
    const res = await fetch(`${API_BASE}/generate-more`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ techName, existingCardIds: existingIds })
    });
    return res.json();
};

module.exports = { analyzeJD, generateDeck, generateMoreCards };