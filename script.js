document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for contacting AgriTech Solutions!');
    this.reset();
});

// Flashcard flip logic
document.querySelectorAll('.flashcard').forEach(card => {
    card.addEventListener('click', function() {
        card.classList.toggle('flipped');
    });
});
