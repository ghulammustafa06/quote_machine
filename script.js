document.addEventListener('DOMContentLoaded', () => {
    const generateQuoteBtn = document.getElementById('generate-quote');
    const quoteText = document.getElementById('quote-text');
    const quoteAuthor = document.getElementById('quote-author');
    const nameInput = document.getElementById('name');
    const topicSelect = document.getElementById('topic');
    const moodSelect = document.getElementById('mood');
    const saveQuoteBtn = document.getElementById('save-quote');
    const shareQuoteBtn = document.getElementById('share-quote');
    const quoteDisplay = document.querySelector('.quote-display');

    const quotes = {
        inspiration: [
            { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
            { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
            { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" }
        ],
        love: [
            { text: "Love all, trust a few, do wrong to none.", author: "William Shakespeare" },
            { text: "The greatest happiness of life is the conviction that we are loved.", author: "Victor Hugo" },
            { text: "To love and be loved is to feel the sun from both sides.", author: "David Viscott" }
        ],
        success: [
            { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
            { text: "The only place where success comes before work is in the dictionary.", author: "Vidal Sassoon" },
            { text: "Success is not how high you have climbed, but how you make a positive difference to the world.", author: "Roy T. Bennett" }
        ]
    };

    const themes = [
        { name: 'default', backgroundColor: '#f0f0f0', textColor: '#333' },
        { name: 'dark', backgroundColor: '#2c3e50', textColor: '#ecf0f1' },
        { name: 'nature', backgroundColor: '#27ae60', textColor: '#ffffff' }
    ];

    let currentQuote = {};

    function generateQuote() {
        const name = nameInput.value.trim();
        const topic = topicSelect.value;
        const mood = moodSelect.value;

        if (!name || !topic || !mood) {
            alert('Please fill in all fields');
            return;
        }

        const topicQuotes = quotes[topic];
        const randomQuote = topicQuotes[Math.floor(Math.random() * topicQuotes.length)];

        let personalizedQuote = randomQuote.text.replace(/you/g, name);
        quoteText.textContent = `"${personalizedQuote}"`;
        quoteAuthor.textContent = `- ${randomQuote.author}`;

        currentQuote = { text: personalizedQuote, author: randomQuote.author };

        applyRandomTheme();
    }

    function saveQuote() {
        if (!currentQuote.text) {
            alert('Please generate a quote first');
            return;
        }

        const savedQuotes = JSON.parse(localStorage.getItem('savedQuotes')) || [];
        savedQuotes.push(currentQuote);
        localStorage.setItem('savedQuotes', JSON.stringify(savedQuotes));
        alert('Quote saved successfully!');
    }

    function shareQuote() {
        if (!currentQuote.text) {
            alert('Please generate a quote first');
            return;
        }

        const twitterUrl = `https://twitter.com/intent/tweet?text="${encodeURIComponent(currentQuote.text)}" - ${encodeURIComponent(currentQuote.author)}`;
        window.open(twitterUrl, '_blank');
    }

    function applyRandomTheme() {
        const randomTheme = themes[Math.floor(Math.random() * themes.length)];
        document.body.style.backgroundColor = randomTheme.backgroundColor;
        document.body.style.color = randomTheme.textColor;
        quoteDisplay.style.backgroundColor = randomTheme.name === 'default' ? '#f9f9f9' : randomTheme.backgroundColor;
        quoteDisplay.style.color = randomTheme.textColor;
    }

    generateQuoteBtn.addEventListener('click', generateQuote);
    saveQuoteBtn.addEventListener('click', saveQuote);
    shareQuoteBtn.addEventListener('click', shareQuote);
});
