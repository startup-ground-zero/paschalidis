function toggleLanguage() {
    const isGreek = document.body.classList.toggle('lang-el');
    document.documentElement.lang = isGreek ? 'el' : 'en';
    document.querySelector('.language').textContent = isGreek ? 'EN' : 'ΕΛ';
}

function toggleNavigation(button) {
    const menu = document.querySelector('.page-links');
    const isOpen = menu.classList.toggle('open');
    button.classList.toggle('active', isOpen);
    button.setAttribute('aria-expanded', String(isOpen));
}

document.querySelectorAll('.page-links a').forEach((link) => {
    link.addEventListener('click', () => {
        const menu = document.querySelector('.page-links');
        const button = document.querySelector('.nav-toggle');
        menu.classList.remove('open');
        button.classList.remove('active');
        button.setAttribute('aria-expanded', 'false');
    });
});

function openImage(source, description) {
    const lightbox = document.querySelector('.lightbox');
    const image = lightbox.querySelector('img');
    image.src = source;
    image.alt = description;
    lightbox.classList.add('open');
}

function closeImage() {
    document.querySelector('.lightbox').classList.remove('open');
}