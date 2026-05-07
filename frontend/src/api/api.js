/**
 * FRONTEND API & BRIDGE
 * -----------------------------------------
 * This file handles the data flow. It can talk to George's 
 * backend server or pull from our local masterQuestions.js bank.
 */

import { MASTER_QUESTIONS } from './database/masterQuestions.js';

const API_BASE = 'http://localhost:5000/api';

// --- TEAM BACKEND CONNECTIONS ---

export const analyzeJD = async (payload) => {
    try {
        const res = await fetch(`${API_BASE}/analyze-jd`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        return await res.json();
    } catch (err) {
        console.warn("Backend not detected, falling back to local logic.");
        return null;
    }
};

export const generateDeck = async (technologies) => {
    const res = await fetch(`${API_BASE}/generate-deck`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ technologies })
    });
    return await res.json();
};

// --- MY DATA ARCHITECT LOGIC (Local Frontend) ---

/**
 * This function matches the scanner results to our local database
 * so the app works even without the backend server running.
 */
export function getQuestionsByStack(techList) {
    if (!techList || techList.length === 0) return [];

    // Map the objects to just their names
    const stackNames = techList.map(item => item.name);

    // Filter our master list for matches
    const filtered = MASTER_QUESTIONS.filter(q => 
        stackNames.includes(q.tech)
    );

    console.log(`Frontend Logic: ${filtered.length} questions ready.`);
    return filtered;
}