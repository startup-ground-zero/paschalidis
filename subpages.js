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

function synchronizeCompanyFooter() {
    const linksByLanguage = {
        en: [
            ['index.html#about', 'About'],
            ['vision-culture.html', 'Vision & Culture'],
            ['services.html', 'Services'],
            ['green-energy.html', 'Green Energy'],
            ['projects.html', 'Projects'],
            ['index.html#process', 'Process'],
            ['index.html#contact', 'Contact']
        ],
        el: [
            ['index.html#about', 'Σχετικά'],
            ['vision-culture.html', 'Όραμα & Κουλτούρα'],
            ['services.html', 'Υπηρεσίες'],
            ['green-energy.html', 'Πράσινη Ενέργεια'],
            ['projects.html', 'Έργα'],
            ['index.html#process', 'Διαδικασία'],
            ['index.html#contact', 'Επικοινωνία']
        ]
    };
    const headingsByLanguage = {
        en: ['Company', 'Explore'],
        el: ['Εταιρεία', 'Περιήγηση']
    };

    document.querySelectorAll('.footer-grid[data-lang]').forEach((footerGrid) => {
        footerGrid.querySelectorAll('.footer-col').forEach((column) => {
            if (['Services', 'Υπηρεσίες'].includes(column.querySelector('h4')?.textContent.trim())) {
                column.remove();
            }
        });

        const companyColumn = Array.from(footerGrid.querySelectorAll('.footer-col')).find((column) => {
            return ['Company', 'Εταιρεία'].includes(column.querySelector('h4')?.textContent.trim());
        });

        if (!companyColumn) return;

        const createListItems = (links) => links.map(([href, label]) => {
            const item = document.createElement('li');
            const link = document.createElement('a');
            link.href = href;
            link.textContent = label;
            item.append(link);
            return item;
        });
        const [companyHeading, exploreHeading] = headingsByLanguage[footerGrid.dataset.lang];
        const companyLinks = linksByLanguage[footerGrid.dataset.lang];
        companyColumn.querySelector('h4').textContent = companyHeading;
        companyColumn.querySelector('ul').replaceChildren(...createListItems(companyLinks.slice(0, 4)));

        const exploreColumn = document.createElement('div');
        exploreColumn.className = 'footer-col';
        const heading = document.createElement('h4');
        heading.textContent = exploreHeading;
        const list = document.createElement('ul');
        list.replaceChildren(...createListItems(companyLinks.slice(4)));
        exploreColumn.append(heading, list);
        companyColumn.after(exploreColumn);
    });
}

synchronizeCompanyFooter();