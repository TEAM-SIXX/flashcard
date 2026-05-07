const { initJdInput } = require('./frontend/js/components/jdInput');
const { renderTech, initTechDisplay } = require('./components/techDisplay');
const { initDeck } = require('./components/flashcardDeck');
const { renderDashboard } = require('./frontend/js/components/studyStats');

// Global State
window.appState = {
    extractedTech: [],
    currentDeck: [],
    filteredDeck: []
};

// View Router
const switchView = (viewId) => {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.getElementById(viewId).classList.add('active');
};

// Theme Toggle
const initTheme = () => {
    const saved = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', saved);
    document.getElementById('theme-toggle').innerText = saved === 'dark' ? '☀️ Theme' : '🌙 Theme';
    
    document.getElementById('theme-toggle').onclick = () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        document.getElementById('theme-toggle').innerText = next === 'dark' ? '☀️ Theme' : '🌙 Theme';
    };
};

// Pomodoro Timer
const initTimer = () => {
    let time = 25 * 60;
    let timerInterval = null;
    const display = document.getElementById('timer-display');
    const btn = document.getElementById('timer-btn');

    const updateDisplay = () => {
        const m = Math.floor(time / 60).toString().padStart(2, '0');
        const s = (time % 60).toString().padStart(2, '0');
        display.innerText = `${m}:${s}`;
    };

    btn.onclick = () => {
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
            btn.innerText = 'Start Pomodoro';
        } else {
            timerInterval = setInterval(() => {
                time--;
                updateDisplay();
                if (time <= 0) {
                    clearInterval(timerInterval);
                    timerInterval = null;
                    alert('Pomodoro over! Take a break.');
                    time = 25 * 60;
                    updateDisplay();
                    btn.innerText = 'Start Pomodoro';
                }
            }, 1000);
            btn.innerText = 'Pause';
        }
    };
};

// Bootstrap App
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initTimer();
    initJdInput(switchView);
    initTechDisplay(switchView);
    
    document.getElementById('dashboard-btn').onclick = () => {
        renderDashboard();
        switchView('view-dashboard');
    };
});