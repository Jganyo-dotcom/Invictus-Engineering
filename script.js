// Target Document Object Interface Elements
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = menuBtn.querySelector('i');

// Mobile Responsive Drawer Handler
menuBtn.addEventListener('click', () => {
    const isOpened = mobileMenu.classList.contains('hidden');
    if (isOpened) {
        mobileMenu.classList.remove('hidden');
        setTimeout(() => {
            mobileMenu.classList.remove('scale-y-0');
        }, 10);
        menuIcon.classList.remove('fa-bars');
        menuIcon.classList.add('fa-xmark');
    } else {
        closeMobileDrawer();
    }
});

function closeMobileDrawer() {
    mobileMenu.classList.add('scale-y-0');
    menuIcon.classList.remove('fa-xmark');
    menuIcon.classList.add('fa-bars');
    setTimeout(() => {
        mobileMenu.classList.add('hidden');
    }, 300);
}

// Single Page Switching Logic Engine
function navigateTo(sectionId) {
    closeMobileDrawer();
    
    const activeSection = document.querySelector('.page-section.active');
    const targetSection = document.getElementById(sectionId);
    
    if (activeSection && activeSection.id !== sectionId) {
        activeSection.style.opacity = '0';
        activeSection.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            activeSection.classList.remove('active');
            
            targetSection.classList.add('active');
            targetSection.offsetHeight; // Forces style recalculation loop 
            
            targetSection.style.opacity = '1';
            targetSection.style.transform = 'translateY(0)';
            
            window.scrollTo({ top: 0, behavior: 'smooth' });
            updateActiveNavLinks(sectionId);
        }, 300);
    }
}

// Desktop Active Text Status Highlighting Filter
function updateActiveNavLinks(sectionId) {
    const desktopLinks = document.querySelectorAll('.nav-link');
    desktopLinks.forEach(link => {
        const clickAttr = link.getAttribute('onclick');
        if (clickAttr && clickAttr.includes(sectionId)) {
            link.classList.remove('text-slate-400');
            link.classList.add('text-cyan-400');
        } else {
            link.classList.remove('text-cyan-400');
            link.classList.add('text-slate-400');
        }
    });
}

// Contact Matrix Data Form Controllers
function handleFormSubmit(event) {
    event.preventDefault();
    const form = document.getElementById('contact-form');
    const successBox = document.getElementById('form-success');
    
    form.classList.add('hidden');
    successBox.classList.remove('hidden');
}

function resetContactForm() {
    const form = document.getElementById('contact-form');
    const successBox = document.getElementById('form-success');
    
    form.reset();
    successBox.classList.add('hidden');
    form.classList.remove('hidden');
}