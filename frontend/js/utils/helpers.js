/**
 * PROJECT: TechStack Flashcard Generator
 * LOGIC LAYER: Helpers and Utilities
 * -----------------------------------------
 * This file handles the 'Brain' of the app: 
 * 1. SRS (Spaced Repetition) for smart studying.
 * 2. JD Scanning to find tech keywords.
 */

// --- 1. SPACED REPETITION LOGIC (Modified SM-2) ---

export const updateSRS = (cardData, quality) => {
    // quality is a rating from 1 to 5 (1=Hard, 5=Easy)
    let { easeFactor, interval, repetitions, nextReview } = cardData;

    if (quality >= 3) {
        // If the user got it right, increase the interval
        if (repetitions === 0) {
            interval = 1;
        } else if (repetitions === 1) {
            interval = 6;
        } else {
            interval = Math.round(interval * easeFactor);
        }
        repetitions++;
    } else {
        // If the user failed, reset the cycle
        repetitions = 0;
        interval = 1;
    }

    // Calculating the new difficulty factor (Ease Factor)
    easeFactor = Math.max(1.3, easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));
    
    // Calculate the next time the user should see this card
    nextReview = Date.now() + (interval * 24 * 60 * 60 * 1000); 

    return { ...cardData, easeFactor, interval, repetitions, nextReview };
};

// Quick helpers for dealing with local storage
export const getLocalStorageData = (key) => JSON.parse(localStorage.getItem(key) || '{}');
export const setLocalStorageData = (key, data) => localStorage.setItem(key, JSON.stringify(data));

// This filters cards to show only the ones that are 'Due' for review
export const filterDueCards = (cards) => {
    const userData = getLocalStorageData('srs_data');
    return cards.filter(card => {
        const state = userData[card.id];
        // If we haven't seen it, or the review date is now/past, it's due
        return !state || Date.now() >= state.nextReview;
    });
};


// --- 2. TECH SCANNER LOGIC (Job Description Parser) ---

// Mapping for keywords we want to detect in the JD text box
export const TECH_MAP = {
    "react": { name: "React", category: "Frontend", color: "#61DBFB" },
    "javascript": { name: "JavaScript", category: "Frontend", color: "#F7DF1E" },
    "js": { name: "JavaScript", category: "Frontend", color: "#F7DF1E" },
    "python": { name: "Python", category: "Backend", color: "#3776AB" },
    "flask": { name: "Flask", category: "Backend", color: "#40afbf" },
    "sql": { name: "SQL", category: "Database", color: "#003B57" },
    "git": { name: "Git", category: "Tools", color: "#F05032" }
};

/**
 * Scans the input text for tech keywords defined in our TECH_MAP.
 */
export function extractTech(rawInput) {
    if (!rawInput || rawInput.length < 5) {
        return []; // Don't scan if the text is empty or too short
    }
    
    let text = rawInput.toLowerCase();
    let foundTech = [];
    let seen = [];

    // Loop through the map to see what matches the input
    for (let key in TECH_MAP) {
        if (text.includes(key)) {
            let techObj = TECH_MAP[key];
            
            // Checking duplicates (e.g. if 'js' and 'javascript' both match)
            if (!seen.includes(techObj.name)) {
                foundTech.push(techObj);
                seen.push(techObj.name);
            }
        }
    }
    return foundTech;
}
