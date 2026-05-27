/**
 * Navigation des slides de fond (Arrière-plan)
 */
const slideNavigator = name => {
    let slides = document.querySelectorAll('.bg-slide');
    slides.forEach(slide => {
        slide.classList.remove('active');
        if (slide.classList.contains(name)) {
            slide.classList.add('active');
        }
    });
};

/**
 * Navigation des sections de contenu
 */
const sectionNavigator = name => {
    let sections = document.querySelectorAll('section');
    let header = document.querySelector('header');
    sections.forEach(section => {
        section.classList.remove('section-show');
        if (section.classList.contains(name)) {
            section.classList.add('section-show');
            if (header) header.classList.add('active');
        }
    });
};

/**
 * Reset du header
 */
window.resetHeader = () => {
    const header = document.querySelector('header');
    if (header) header.classList.remove('active');
    closeMenuMobile();
};

/**
 * GESTION DU MENU MOBILE (Toggle)
 * Déclarée sur l'objet window pour être accessible depuis le 'onclick' du HTML
 */
window.toggleMenu = () => {
    const menu = document.querySelector('.menu');
    const navMobile = document.querySelector('.nav-mobile');
    
    if (menu && navMobile) {
        menu.classList.toggle('active');
        navMobile.classList.toggle('active');
    }
};

/**
 * Force la fermeture du menu mobile après un clic sur un lien
 */
const closeMenuMobile = () => {
    const menu = document.querySelector('.menu');
    const navMobile = document.querySelector('.nav-mobile');
    
    if (menu && navMobile) {
        menu.classList.remove('active');
        navMobile.classList.remove('active');
    }
};

/**
 * Initialisation de la vue par défaut (Affiche la section 'about' ou 'home')
 */
window.initNavigator = () => {
    const navList = document.querySelectorAll('.nav-btn');
    navList.forEach(el => {
        el.classList.remove('active');
        if (el.getAttribute('data-target') === 'about') {
            el.classList.add('active');
        }
    });
    sectionNavigator('about');
};

/**
 * Initialisation unique au chargement complet du DOM
 */
window.addEventListener('load', () => {
    
    // 1. Gestion des boutons de l'arrière-plan (Slides 1, 2, 3)
    const slideBtnList = document.querySelectorAll('.slide-btn');
    slideBtnList.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            slideBtnList.forEach(el => el.classList.remove('active'));
            this.classList.add('active');
            slideNavigator(this.getAttribute('data-target'));
        });
    });

    // 2. Gestion des clics sur les boutons de navigation (Bureau et Mobile)
    const navList = document.querySelectorAll('.nav-btn');
    navList.forEach(nav => {
        nav.addEventListener('click', function (e) {
            // On n'annule le comportement par défaut que si c'est un lien de section (#)
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
            }
            
            // Gestion des classes actives
            navList.forEach(el => el.classList.remove('active'));
            this.classList.add('active');
            
            // Navigation vers la section cible
            const target = this.getAttribute('data-target');
            if (target) {
                sectionNavigator(target);
            }
            
            // Fermeture automatique du menu sur version mobile
            closeMenuMobile();
        });
    });
});