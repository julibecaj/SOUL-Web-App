//artist
const track = document.querySelector('.carousel-track');
const cards = document.querySelectorAll('.artist-card');
const cardsPerSlide = 3;
const totalSlides = Math.ceil(cards.length / cardsPerSlide);
let currentSlide = 0;

setInterval(() => {
    currentSlide = (currentSlide + 1) % totalSlides;
    const slideWidth = track.offsetWidth / totalSlides;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
}, 4300); // every 4 seconds

//homepage soul
// Initialize the button in navbar
showCard(currentIndex);  //it shows me an error here but idk

function toggleMenu() {
    const menu = document.getElementById('dropdown-menu');
    menu.classList.toggle('show');
}

// Optional: Hide menu when clicking outside
document.addEventListener('click', function(event) {
    const profile = document.querySelector('.profile');
    if (!profile.contains(event.target)) {
        document.getElementById('dropdown-menu').classList.remove('show');
    }
});


//music
//profile
//playlist
//albums
//podcasts



//live feed...
//smth wrong here?!?! isnt working

document.addEventListener('DOMContentLoaded', function () {
    fakeCountUp('users-online', 0, 120, 3);
    fakeCountUp('users-registered', 1000, 6000, 50);
    fakeCountUp('listening-now', 0, 90, 2);
});

function fakeCountUp(id, start, max, step) {
    const el = document.getElementById(id);
    if (!el) return;
    let current = start;

    function update() {
        current += Math.floor(Math.random() * step) + 1;
        if (current > max) current = max;
        el.textContent = current.toLocaleString();
        if (current < max) {
            setTimeout(update, 500 + Math.random() * 500);
        }
    }
    update();
}

//corusel
document.addEventListener('DOMContentLoaded', function () {
    const track = document.querySelector('.carousel-track');
    const cards = Array.from(document.querySelectorAll('.artist-card'));
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    const cardsPerSlide = 3;
    let currentIndex = 0;

    function updateCarousel() {
        const cardWidth = cards[0].offsetWidth + 40; // 40px is the gap
        track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= cards.length - cardsPerSlide;
    }

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex -= cardsPerSlide;
            if (currentIndex < 0) currentIndex = 0;
            updateCarousel();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentIndex < cards.length - cardsPerSlide) {
            currentIndex += cardsPerSlide;
            if (currentIndex > cards.length - cardsPerSlide) currentIndex = cards.length - cardsPerSlide;
            updateCarousel();
        }
    });

    window.addEventListener('resize', updateCarousel);
    updateCarousel();
});
