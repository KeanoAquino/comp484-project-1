// Array of 24 Studio Ghibli movies with poster paths (same as list-creator.js)
const movies = [
    { id: 1, title: "Princess Mononoke", poster: "./assets/images/princess-mononoke.jpg" },
    { id: 2, title: "Spirited Away", poster: "./assets/images/spirited-away.jpg" },
    { id: 3, title: "The Wind Rises", poster: "./assets/images/the-wind-rises.jpg" },
    { id: 4, title: "Howl's Moving Castle", poster: "./assets/images/howls-moving-castle.jpg" },
    { id: 5, title: "Grave of the Fireflies", poster: "./assets/images/grave-of-the-fireflies.jpg" },
    { id: 6, title: "My Neighbor Totoro", poster: "./assets/images/my-neighbor-totoro.jpg" },
    { id: 7, title: "Kiki's Delivery Service", poster: "./assets/images/kikis-delivery-service.jpg" },
    { id: 8, title: "Castle in the Sky", poster: "./assets/images/castle-in-the-sky.jpg" },
    { id: 9, title: "Porco Rosso", poster: "./assets/images/porco-rosso.jpg" },
    { id: 10, title: "Nausicaä of the Valley of the Wind", poster: "./assets/images/nausicaa-of-the-valley-of-the-wind.jpg" },
    { id: 11, title: "Ponyo", poster: "./assets/images/ponyo.jpg" },
    { id: 12, title: "The Tale of the Princess Kaguya", poster: "./assets/images/the-tale-of-the-princess-kaguya.jpg" },
    { id: 13, title: "The Cat Returns", poster: "./assets/images/the-cat-returns.jpg" },
    { id: 14, title: "Whisper of the Heart", poster: "./assets/images/whisper-of-the-heart.jpg" },
    { id: 15, title: "From Up on Poppy Hill", poster: "./assets/images/from-up-on-poppy-hill.jpg" },
    { id: 16, title: "Arrietty", poster: "./assets/images/the-secret-world-of-arrietty.jpg" },
    { id: 17, title: "When Marnie Was There", poster: "./assets/images/when-marnie-was-there.jpg" },
    { id: 18, title: "Only Yesterday", poster: "./assets/images/only-yesterday.jpg" },
    { id: 19, title: "Pom Poko", poster: "./assets/images/pom-poko.jpg" },
    { id: 20, title: "Ocean Waves", poster: "./assets/images/ocean-waves.jpg" },
    { id: 21, title: "My Neighbors the Yamadas", poster: "./assets/images/my-neighbors-the-yamadas.jpg" },
    { id: 22, title: "Tales from Earthsea", poster: "./assets/images/tales-from-earthsea.jpg" },
    { id: 23, title: "Earwig and the Witch", poster: "./assets/images/earwig-and-the-witch.jpg" },
    { id: 24, title: "The Boy and the Heron", poster: "./assets/images/the-boy-and-the-heron.jpg" }
];

// Parse URL parameters
const params = new URLSearchParams(window.location.search);
const userName = params.get('name');
const movieIds = params.get('movies') ? params.get('movies').split(',') : [];
const reviews = params.get('reviews') ? params.get('reviews').split('|').map(r => decodeURIComponent(r)) : [];

// Display user's name
document.getElementById('user-name-display').textContent = `${userName}'s Top 5 Studio Ghibli Movies`;

// Display each movie using same structure as index.html
const container = document.getElementById('movies-container');

if (movieIds.length === 0) {
    container.innerHTML = '<p>No movies found. Please create a list from the home page.</p>';
} else {
    movieIds.forEach((id, index) => {
        const movie = movies.find(m => m.id == id);
        if (!movie) return;
        
        const review = reviews[index] || '';
        
        // Add horizontal rule before each movie (except first)
        if (index > 0) {
            const hr = document.createElement('hr');
            container.appendChild(hr);
        }
        
        const li = document.createElement('li');
        li.className = 'movie';
        li.innerHTML = `
            <img class="poster" src="${movie.poster}" alt="${movie.title} poster">
            <div class="movie-content">
                <h2 class="movie-title">${index + 1}. ${movie.title}</h2>
                <p class="movie-review">${review || '<em>No review provided</em>'}</p>
            </div>
        `;
        
        container.appendChild(li);
    });
    
    // Add final horizontal rule
    const hrFinal = document.createElement('hr');
    container.appendChild(hrFinal);
}
