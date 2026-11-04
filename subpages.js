function applyLanguage(isGreek) {
    document.body.classList.toggle('lang-el', isGreek);
    document.documentElement.lang = isGreek ? 'el' : 'en';
    document.querySelector('.language').textContent = isGreek ? 'EN' : 'ΕΛ';
    document.querySelectorAll('[data-aria-en]').forEach((element) => {
        element.setAttribute('aria-label', isGreek ? element.dataset.ariaEl : element.dataset.ariaEn);
    });
}

function toggleLanguage() {
    const isGreek = !document.body.classList.contains('lang-el');
    applyLanguage(isGreek);
    try { localStorage.setItem('site-lang', isGreek ? 'el' : 'en'); } catch (error) {}
}

let savedLanguage = null;
try { savedLanguage = localStorage.getItem('site-lang'); } catch (error) {}
applyLanguage(savedLanguage !== 'en');

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

let lightboxOpener = null;

function openImage(source, description) {
    const lightbox = document.querySelector('.lightbox');
    const image = lightbox.querySelector('img');
    lightboxOpener = document.activeElement;
    image.src = source;
    image.alt = description;
    lightbox.classList.add('open');
    lightbox.querySelector('.close').focus();
}

function closeImage() {
    document.querySelector('.lightbox').classList.remove('open');
    if (lightboxOpener) lightboxOpener.focus();
}

document.addEventListener('keydown', (event) => {
    const lightbox = document.querySelector('.lightbox');
    if (event.key === 'Escape' && lightbox && lightbox.classList.contains('open')) closeImage();
});

document.querySelectorAll('.project[onclick]').forEach((card) => {
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            card.click();
        }
    });
});
