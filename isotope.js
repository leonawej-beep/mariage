/**
 * Sélecteur personnalisé (Correction de .trin() en .trim())
 */
const select = (el, all = false) => {
    el = el.trim(); 
    if (all) {
        return [...document.querySelectorAll(el)];    
    } else {
        return document.querySelector(el);
    }
};

/**
 * Gestionnaire d'événements (Correction de addEventlistener en addEventListener)
 */
const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
        if (all) {
            selectEl.forEach(e => e.addEventListener(type, listener));
        } else {
            selectEl.addEventListener(type, listener);
        }
    }
};

/**
 * Initialisation d'Isotope pour le Portfolio
 */
window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
        // Attention : assurez-vous que la librairie Isotope est bien chargée globalement
        let portfolioIsotope = new Isotope(portfolioContainer, {
            itemSelector: '.portfolio-item',
            layoutMode: 'fitRows' // Optionnel : alignement standard recommandé
        });

        let portfolioFilters = select('#portfolio-filters li', true);

        // Correction de ClassList en classList
        on('click', '#portfolio-filters li', function (e) {
            e.preventDefault();
            
            portfolioFilters.forEach(function (el) {
                el.classList.remove('filter-active');
            });
            this.classList.add('filter-active');

            portfolioIsotope.arrange({
                filter: this.getAttribute('data-filter'),
            });
            
            // Correction sécurisée pour éviter un crash si AOS ou GLightbox n'est pas défini
            if (typeof AOS !== 'undefined') {
                AOS.refresh();
            } else if (typeof GLightbox !== 'undefined') {
                // Si vous utilisez glightbox.js présent dans vos scripts
                // GLIGHTBOX_INSTANCE.refresh(); 
            }
        }, true);
    }
});