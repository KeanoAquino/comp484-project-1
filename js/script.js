document.querySelectorAll('.show-more-btn').forEach(button => {
    button.addEventListener('click', function() {
        const review = this.previousElementSibling;
        review.classList.toggle('collapsed');
        
        if (review.classList.contains('collapsed')) {
            this.textContent = 'Show More';
        } else {
            this.textContent = 'Show Less';
        }
    });
});

const movies = [
    { id: 1, title: "Princess Mononoke" },
    { id: 2, title: "Spirited Away" },
    { id: 3, title: "The Wind Rises" },
    { id: 4, title: "My Neighbor Totoro" },
    { id: 5, title: "Howl's Moving Castle" },
    { id: 6, title: "Kiki's Delivery Service" },
    { id: 7, title: "Ponyo" },
    { id: 8, title: "Castle in the Sky" },
    { id: 9, title: "Nausicaä of the Valley of the Wind" },
    { id: 10, title: "Porco Rosso" },
    { id: 11, title: "The Tale of the Princess Kaguya" },
    { id: 12, title: "Whisper of the Heart" },
    { id: 13, title: "The Cat Returns" },
    { id: 14, title: "From Up on Poppy Hill" },
    { id: 15, title: "Arrietty" },
    { id: 16, title: "When Marnie Was There" },
    { id: 17, title: "Grave of the Fireflies" },
    { id: 18, title: "Only Yesterday" },
    { id: 19, title: "Pom Poko" },
    { id: 20, title: "My Neighbors the Yamadas" },
    { id: 21, title: "Tales from Earthsea" },
    { id: 22, title: "The Boy and the Heron" },
    { id: 23, title: "Ocean Waves" },
    { id: 24, title: "Earwig and the Witch" }
];

// Get the container where movie selections will be added
const container = document.getElementById('movie-selections-container');

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

// Function to disable already-selected movies in other dropdowns
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