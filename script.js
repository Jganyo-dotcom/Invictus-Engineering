/**
 * INVICTUS ENGINEERING CORE PROTOCOL INTERFACE CONTROLLER
 * Advanced single page controller containing mobile navigation drawers,
 * continuous randomized grid image gallery loops, and intersection observer hooks.
 */

// Target Document DOM Elements Selector Register Nodes
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = menuBtn ? menuBtn.querySelector('i') : null;
const galleryContainer = document.getElementById('shuffling-gallery');

// ================================================================= */
// 1. MOBILE RESPONSIVE NAVBAR OVERLAY NAVIGATION SYSTEM             */
// ================================================================= */
if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
        const isClosed = mobileMenu.classList.contains('hidden');
        if (isClosed) {
            mobileMenu.classList.remove('hidden');
            setTimeout(() => {
                mobileMenu.classList.remove('scale-y-0');
            }, 10);
            if (menuIcon) {
                menuIcon.classList.remove('fa-bars');
                menuIcon.classList.add('fa-xmark');
            }
        } else {
            closeMobileDrawer();
        }
    });
}

function closeMobileDrawer() {
    if (mobileMenu) {
        mobileMenu.classList.add('scale-y-0');
        if (menuIcon) {
            menuIcon.classList.remove('fa-xmark');
            menuIcon.classList.add('fa-bars');
        }
        setTimeout(() => {
            mobileMenu.classList.add('hidden');
        }, 300);
    }
}

// ================================================================= */
// 2. SINGLE PAGE APPLICATION ROUTER (WITH WINDOW SNAP BEHAVIOR)      */
// ================================================================= */
function navigateTo(sectionId) {
    closeMobileDrawer();
    
    const activeSection = document.querySelector('.page-section.active');
    const targetSection = document.getElementById(sectionId);
    
    if (activeSection && targetSection && activeSection.id !== sectionId) {
        activeSection.style.opacity = '0';
        activeSection.style.transform = 'translateY(24px)';
        
        setTimeout(() => {
            activeSection.classList.remove('active');
            
            targetSection.classList.add('active');
            targetSection.offsetHeight; // Forces paint rendering calculations loop updates 
            
            targetSection.style.opacity = '1';
            targetSection.style.transform = 'translateY(0)';
            
            window.scrollTo({ top: 0, behavior: 'smooth' });
            updateActiveNavbarIndicators(sectionId);
            
            // Re-trigger scroll observer capture scan for the newly rendered view context path
            triggerObserverScan();
        }, 300);
    }
}

function updateActiveNavbarIndicators(sectionId) {
    const desktopLinks = document.querySelectorAll('.nav-link');
    desktopLinks.forEach(link => {
        const targetAction = link.getAttribute('onclick');
        if (targetAction && targetAction.includes(sectionId)) {
            link.classList.remove('text-slate-400');
            link.classList.add('text-cyan-400');
        } else {
            link.classList.remove('text-cyan-400');
            link.classList.add('text-slate-400');
        }
    });
}

// ================================================================= */
// 3. SECURE DATA INTAKE CONTACT FORM SUBMISSION INTERFACES          */
// ================================================================= */
function handleFormSubmit(event) {
    event.preventDefault();
    const form = document.getElementById('contact-form');
    const successFrame = document.getElementById('form-success');
    
    if (form && successFrame) {
        form.classList.add('hidden');
        successFrame.classList.remove('hidden');
    }
}

function resetContactForm() {
    const form = document.getElementById('contact-form');
    const successFrame = document.getElementById('form-success');
    
    if (form && successFrame) {
        form.reset();
        successFrame.classList.add('hidden');
        form.classList.remove('hidden');
    }
}

// ================================================================= */
// 4. RANDOM CONTINUOUS SHUFFLE GRID IMAGE GALLERY ENGINE            */
// ================================================================= */
function initializeGalleryEngine() {
    if (!galleryContainer) return;

    setInterval(() => {
        const cards = Array.from(galleryContainer.children);
        if (cards.length === 0) return;

        cards.forEach(card => {
            card.style.opacity = '0.2';
            card.style.transform = 'scale(0.92)';
        });

        setTimeout(() => {
            // Fisher-Yates array placement logic loops processing
            for (let i = cards.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                galleryContainer.appendChild(cards[j]);
            }

            const refreshedCards = Array.from(galleryContainer.children);
            refreshedCards.forEach(card => {
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            });
        }, 600);

    }, 6000); // Shuffles positions every 6 seconds smoothly
}

// ================================================================= */
// 5. NATIVE HIGH-PERFORMANCE SCROLL REVEAL OBSERVER INTERACTION     */
// Uses the IntersectionObserver API to trace window positions code loops. */
// Elements dynamically receive classes to "form/assemble" on scroll. */
// ================================================================= */
let scrollObserver;

function initializeScrollRevealEngine() {
    const observerOptions = {
        root: null, // Scans visibility layout variables relative to the viewport window bounds
        rootMargin: '0px',
        threshold: 0.12 // Element reveals once 12% is completely visible within scanning lines
    };

    scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Target has entered view coordinates: snap and form element layout
                entry.target.classList.add('revealed');
                // Unobserve targets once animation loop forms to save system cycles
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    triggerObserverScan();
}

function triggerObserverScan() {
    // Collect all unregistered targeting view nodes inside active visible workspace context paths
    const revealTargets = document.querySelectorAll('.scroll-reveal');
    revealTargets.forEach(target => {
        // Ensure elements navigating back into focus don't duplicate animations if already loaded
        if (!target.classList.contains('revealed')) {
            scrollObserver.observe(target);
        }
    });
}

// Global window event initialization thread mount execution sequence
document.addEventListener('DOMContentLoaded', () => {
    initializeGalleryEngine();
    initializeScrollRevealEngine();
});