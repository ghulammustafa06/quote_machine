document.addEventListener('DOMContentLoaded', () => {
    const generateQuoteBtn = document.getElementById('generate-quote');
    const quoteText = document.getElementById('quote-text');
    const quoteAuthor = document.getElementById('quote-author');
    const nameInput = document.getElementById('name');
    const topicSelect = document.getElementById('topic');
    const moodSelect = document.getElementById('mood');

    const quotes = {
        inspiration: [
            { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
            { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" }
        ],
        love: [
            { text: "Love all, trust a few, do wrong to none.", author: "William Shakespeare" },
            { text: "The greatest happiness of life is the conviction that we are loved.", author: "Victor Hugo" }
        ],
        success: [
            { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
            { text: "The only place where success comes before work is in the dictionary.", author: "Vidal Sassoon" }
        ]
    };

    generateQuoteBtn.addEventListener('click', () => {
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
    });
});