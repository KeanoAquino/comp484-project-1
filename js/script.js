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