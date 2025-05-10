// Theme Toggle
document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const icon = document.querySelector('#theme-toggle i');
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
});

// Load Theme
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    document.querySelector('#theme-toggle i').classList.replace('fa-moon', 'fa-sun');
}

// Back to Top
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
    backToTop.style.display = window.scrollY > 300 ? 'block' : 'none';
});
backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Smooth Scrolling
document.querySelectorAll('.nav-link').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    });
});

// Custom Cursor & Trail
let trailX = 0, trailY = 0;
document.addEventListener('mousemove', (e) => {
    const cursor = document.querySelector('.custom-cursor');
    const trail = document.querySelector('.cursor-trail');
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
    setTimeout(() => {
        trail.style.left = `${e.clientX}px`;
        trail.style.top = `${e.clientY}px`;
    }, 50);
});

// Scroll Progress
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    document.querySelector('.scroll-progress').style.width = `${scrollPercent}%`;
});

// Form Feedback
document.getElementById('contact-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    const feedback = document.getElementById('form-feedback');
    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: { 'Accept': 'application/json' }
        });
        if (response.ok) {
            feedback.innerHTML = '<p class="text-success">Message sent successfully!</p>';
            form.reset();
        } else {
            feedback.innerHTML = '<p class="text-danger">Failed to send message. Please try again.</p>';
        }
    } catch (error) {
        feedback.innerHTML = '<p class="text-danger">An error occurred. Please try again later.</p>';
    }
    setTimeout(() => feedback.innerHTML = '', 3000);
});

// Lazy Load Images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[loading="lazy"]');
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.src = entry.target.src;
                obs.unobserve(entry.target);
            }
        });
    }, { rootMargin: '0px 0px 100px 0px' });
    images.forEach(img => observer.observe(img));
});

// Interactive Card Tilt
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});