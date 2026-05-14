const { analyzeJD } = require('../api');

const initJdInput = (switchView) => {
    const btn = document.getElementById('analyze-btn');
    
    btn.onclick = async () => {
        const text = document.getElementById('jd-text').value;
        const url = document.getElementById('jd-url').value;
        
        if (!text && !url) return alert('Please paste text or URL');
        
        btn.innerText = 'Analyzing...';
        btn.disabled = true;

        try {
            const data = await analyzeJD({ text, url });
            if (data.success) {
                window.appState.extractedTech = data.technologies;
                renderTech(data.technologies);
                switchView('view-tech');
            }
        } catch (error) {
            alert('Error: ' + error.message);
        } finally {
            btn.innerText = 'Extract Technologies';
            btn.disabled = false;
        }
    };
};

module.exports = { initJdInput };