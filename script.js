document.addEventListener('DOMContentLoaded', () => {
    const generateQuoteBtn = document.getElementById('generate-quote');
    const quoteText = document.getElementById('quote-text');
    const quoteAuthor = document.getElementById('quote-author');
    const nameInput = document.getElementById('name');
    const topicSelect = document.getElementById('topic');
    const moodSelect = document.getElementById('mood');
    const saveQuoteBtn = document.getElementById('save-quote');
    const shareQuoteBtn = document.getElementById('share-quote');
    const copyQuoteBtn = document.getElementById('copy-quote');
    const quoteDisplay = document.querySelector('.quote-display');
    const favoritesList = document.getElementById('favorites-list');
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const dailyQuote = document.getElementById('daily-quote');
    const dailyAuthor = document.getElementById('daily-author');
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const categoryBtns = document.querySelectorAll('.category-btn');
    const profileBtn = document.getElementById('profile-btn');
    const profileModal = document.getElementById('profile-modal');
    const closeModal = document.querySelector('.close');
    const saveProfileBtn = document.getElementById('save-profile');
    const profileName = document.getElementById('profile-name');
    const profileEmail = document.getElementById('profile-email');

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
    let currentCategory = 'all';

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
        personalizedQuote = `In your ${mood} mood, remember: ${personalizedQuote}`;
        
        quoteText.textContent = `"${personalizedQuote}"`;
        quoteAuthor.textContent = `- ${randomQuote.author}`;

        currentQuote = { text: personalizedQuote, author: randomQuote.author };

        applyRandomTheme();

        quoteDisplay.classList.remove('quote-animation');
        void quoteDisplay.offsetWidth; 
        quoteDisplay.classList.add('quote-animation');

        quoteDisplay.classList.remove('fade-in');
        void quoteDisplay.offsetWidth; 
        quoteDisplay.classList.add('fade-in');

        updateRatingStars(0);
    
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
        updateFavoritesList();
    }

    function shareQuote() {
        if (!currentQuote.text) {
            alert('Please generate a quote first');
            return;
        }

        const twitterUrl = `https://twitter.com/intent/tweet?text="${encodeURIComponent(currentQuote.text)}" - ${encodeURIComponent(currentQuote.author)}`;
        window.open(twitterUrl, '_blank');
    }

    function copyQuote() {
        if (!currentQuote.text) {
            alert('Please generate a quote first');
            return;
        }

        const quoteString = `"${currentQuote.text}" - ${currentQuote.author}`;
        navigator.clipboard.writeText(quoteString).then(() => {
            alert('Quote copied to clipboard!');
        }, (err) => {
            console.error('Could not copy text: ', err);
        });
    }

    function updateFavoritesList() {
        const savedQuotes = JSON.parse(localStorage.getItem('savedQuotes')) || [];
        favoritesList.innerHTML = '';
        savedQuotes.forEach((quote, index) => {
            const li = document.createElement('li');
            li.textContent = `"${quote.text}" - ${quote.author}`;
            favoritesList.appendChild(li);
        });

        const newItems = favoritesList.querySelectorAll('li');
        newItems.forEach(item => item.classList.add('slide-in'));

    }

    function applyRandomTheme() {
        const randomTheme = themes[Math.floor(Math.random() * themes.length)];
        document.body.style.backgroundColor = randomTheme.backgroundColor;
        document.body.style.color = randomTheme.textColor;
        quoteDisplay.style.backgroundColor = randomTheme.name === 'default' ? '#f9f9f9' : randomTheme.backgroundColor;
        quoteDisplay.style.color = randomTheme.textColor;
    }

    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
        const icon = darkModeToggle.querySelector('i');
        icon.classList.toggle('fa-moon');
        icon.classList.toggle('fa-sun');
    }

    function setDailyQuote() {
        const today = new Date().toDateString();
        const storedDate = localStorage.getItem('dailyQuoteDate');

        if (today !== storedDate) {
            const topics = Object.keys(quotes);
            const randomTopic = topics[Math.floor(Math.random() * topics.length)];
            const topicQuotes = quotes[randomTopic];
            const randomQuote = topicQuotes[Math.floor(Math.random() * topicQuotes.length)];

            dailyQuote.textContent = `"${randomQuote.text}"`;
            dailyAuthor.textContent = `- ${randomQuote.author}`;

            localStorage.setItem('dailyQuoteDate', today);
            localStorage.setItem('dailyQuoteText', randomQuote.text);
            localStorage.setItem('dailyQuoteAuthor', randomQuote.author);
        } else {
            dailyQuote.textContent = `"${localStorage.getItem('dailyQuoteText')}"`;
            dailyAuthor.textContent = `- ${localStorage.getItem('dailyQuoteAuthor')}`;
        }
    }

    generateQuoteBtn.addEventListener('click', generateQuote);
    saveQuoteBtn.addEventListener('click', saveQuote);
    shareQuoteBtn.addEventListener('click', shareQuote);
    copyQuoteBtn.addEventListener('click', copyQuote);
    darkModeToggle.addEventListener('click', toggleDarkMode);

    ratingStars.forEach(star => {
        star.addEventListener('click', () => {
            const rating = parseInt(star.getAttribute('data-rating'));
            updateRatingStars(rating);
        });
    });

    setDailyQuote();
    updateFavoritesList();

    generateQuoteBtn.addEventListener('click', generateQuote);
    saveQuoteBtn.addEventListener('click', saveQuote);
    shareQuoteBtn.addEventListener('click', shareQuote);
    copyQuoteBtn.addEventListener('click', copyQuote);

function searchQuotes(query) {
        const results = Object.values(quotes).flat().filter(quote => 
            quote.text.toLowerCase().includes(query.toLowerCase()) ||
            quote.author.toLowerCase().includes(query.toLowerCase())
        );
        displaySearchResults(results);
    }

    function displaySearchResults(results) {
        quoteDisplay.innerHTML = '';
        results.forEach(quote => {
            const quoteElement = document.createElement('div');
            quoteElement.classList.add('search-result', 'fade-in');
            quoteElement.innerHTML = `
                <p>"${quote.text}"</p>
                <p>- ${quote.author}</p>
            `;
            quoteDisplay.appendChild(quoteElement);
        });
    }

    function filterByCategory(category) {
        currentCategory = category;
        categoryBtns.forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-category="${category}"]`).classList.add('active');

        if (category === 'all') {
            displaySearchResults(Object.values(quotes).flat());
        } else {
            displaySearchResults(quotes[category]);
        }
    }

    function openProfileModal() {
        profileModal.style.display = 'block';
        const storedName = localStorage.getItem('userName');
        const storedEmail = localStorage.getItem('userEmail');
        if (storedName) profileName.value = storedName;
        if (storedEmail) profileEmail.value = storedEmail;
    }

    function closeProfileModal() {
        profileModal.style.display = 'none';
    }

    function saveProfile() {
        const name = profileName.value.trim();
        const email = profileEmail.value.trim();
        if (name) localStorage.setItem('userName', name);
        if (email) localStorage.setItem('userEmail', email);
        closeProfileModal();
        alert('Profile saved successfully!');
    }

    
    setDailyQuote();
    updateFavoritesList();
    filterByCategory('all');

    updateFavoritesList();
});   
