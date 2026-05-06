// Modified SM-2 Spaced Repetition Algorithm
const updateSRS = (cardData, quality) => {
    // quality: 1-5 (1 = black out, 5 = perfect)
    let { easeFactor, interval, repetitions, nextReview } = cardData;

    if (quality >= 3) {
        if (repetitions === 0) interval = 1;
        else if (repetitions === 1) interval = 6;
        else interval = Math.round(interval * easeFactor);
        repetitions++;
    } else {
        repetitions = 0;
        interval = 1;
    }

    easeFactor = Math.max(1.3, easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));
    
    nextReview = Date.now() + (interval * 24 * 60 * 60 * 1000); // Convert days to ms

    return { ...cardData, easeFactor, interval, repetitions, nextReview };
};

const getLocalStorageData = (key) => JSON.parse(localStorage.getItem(key) || '{}');
const setLocalStorageData = (key, data) => localStorage.setItem(key, JSON.stringify(data));

const filterDueCards = (cards) => {
    const userData = getLocalStorageData('srs_data');
    return cards.filter(c => {
        const state = userData[c.id];
        // If no state, or if nextReview date has passed
        return !state || Date.now() >= state.nextReview;
    });
};

module.exports = { updateSRS, getLocalStorageData, setLocalStorageData, filterDueCards };