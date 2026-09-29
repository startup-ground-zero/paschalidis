function toggleLanguage() {
    const isGreek = document.body.classList.toggle('lang-el');
    document.documentElement.lang = isGreek ? 'el' : 'en';
    document.querySelector('.language').textContent = isGreek ? 'EN' : 'ΕΛ';
}

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