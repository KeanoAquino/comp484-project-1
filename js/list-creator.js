// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {

// Array of 24 Studio Ghibli movies with poster paths
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

// Get the container where movie selections will be added
const container = document.getElementById('movie-selections-container');

// Clear any existing content to prevent duplicates
container.innerHTML = '';

// Create 5 movie selection dropdowns
for (let i = 1; i <= 5; i++) {
    // Create the movie selection div
    const movieDiv = document.createElement('div');
    movieDiv.className = 'movie-selection';
    movieDiv.style.display = i === 1 ? 'block' : 'none'; // Only show first one initially
    movieDiv.dataset.index = i;

    // Create dropdown label and select
    const selectLabel = document.createElement('label');
    selectLabel.textContent = `Movie #${i}:`;
    
    const select = document.createElement('select');
    select.className = 'movie-dropdown';
    select.required = true;
    
    // Add default option
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Select a movie...';
    select.appendChild(defaultOption);
    
    // Add all 24 movies as options (disabled attribute will be added dynamically)
    movies.forEach(movie => {
        const option = document.createElement('option');
        option.value = movie.id;
        option.textContent = movie.title;
        select.appendChild(option);
    });
    
    selectLabel.appendChild(select);
    
    // Create review textarea (hidden initially)
    const reviewLabel = document.createElement('label');
    reviewLabel.className = 'review-input';
    reviewLabel.style.display = 'none';
    reviewLabel.textContent = 'Your Review (optional):';
    
    const textarea = document.createElement('textarea');
    textarea.maxLength = 500;
    textarea.rows = 4;
    textarea.placeholder = 'Write your review here...';
    
    reviewLabel.appendChild(textarea);
    
    // Add elements to the movie div
    movieDiv.appendChild(selectLabel);
    movieDiv.appendChild(reviewLabel);
    
    // Add to container
    container.appendChild(movieDiv);
}

// Handle dropdown changes
document.querySelectorAll('.movie-dropdown').forEach((dropdown, index) => {
    dropdown.addEventListener('change', function() {
        // Show review textarea for this movie
        const reviewInput = this.closest('.movie-selection').querySelector('.review-input');
        reviewInput.style.display = this.value ? 'block' : 'none';
        
        // Update disabled options across all dropdowns
        updateDisabledOptions();
        
        // Show next movie selection if there is one
        const nextSelection = document.querySelector(`.movie-selection[data-index="${index + 2}"]`);
        if (this.value && nextSelection) {
            nextSelection.style.display = 'block';
        }
    });
});

// Function to disable already-selected movies in other dropdowns (disabled attribute)
function updateDisabledOptions() {
    // Get all selected movie IDs
    const selectedIds = Array.from(document.querySelectorAll('.movie-dropdown'))
        .map(dropdown => dropdown.value)
        .filter(value => value !== '');
    
    // Update disabled attribute for all options
    document.querySelectorAll('.movie-dropdown option').forEach(option => {
        if (option.value === '') return; // Skip the default "Select a movie..." option
        
        // Disable if this movie is selected in another dropdown
        const isSelectedElsewhere = selectedIds.includes(option.value) && 
                                    option.parentElement.value !== option.value;
        option.disabled = isSelectedElsewhere;
    });
}

// Handle form submission
document.getElementById('user-list-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get user's name
    const userName = document.getElementById('user-name').value;
    
    // Get selected movies and reviews
    const selections = [];
    document.querySelectorAll('.movie-selection').forEach(movieDiv => {
        const dropdown = movieDiv.querySelector('.movie-dropdown');
        const textarea = movieDiv.querySelector('textarea');
        
        if (dropdown.value) {
            const movie = movies.find(m => m.id == dropdown.value);
            selections.push({
                id: movie.id,
                title: movie.title,
                poster: movie.poster,
                review: textarea.value || ''
            });
        }
    });
    
    // Validate that 5 movies were selected
    if (selections.length !== 5) {
        alert('Please select all 5 movies!');
        return;
    }
    
    // Encode data into URL
    const params = new URLSearchParams();
    params.set('name', userName);
    params.set('movies', selections.map(s => s.id).join(','));
    params.set('reviews', selections.map(s => encodeURIComponent(s.review)).join('|'));
    
    // Navigate to results page
    window.location.href = `user-list.html?${params.toString()}`;
});

}); // End DOMContentLoaded
