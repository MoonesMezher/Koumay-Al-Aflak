// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    once: true,
    offset: 50,
    easing: 'ease-in-out',
    delay: 100,
    disable: 'mobile'
});

// Touch detection for AOS on mobile
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
if (isMobile) {
    AOS.refreshHard();
}

// Splash screen functionality
document.addEventListener('DOMContentLoaded', function() {
    const splashScreen = document.getElementById('splashScreen');
    const mainContent = document.getElementById('mainContent');
    const skipSplashBtn = document.getElementById('skipSplash');
    
    // Function to hide splash screen and show main content
    function hideSplashScreen() {
        splashScreen.classList.add('hidden');
        
        // Show main content after splash screen fades out
        setTimeout(() => {
            mainContent.style.opacity = '1';
            
            // Initialize logo animation
            const logoLetter = document.querySelector('.logo-letter');
            logoLetter.style.animation = 'logoSpin 20s linear infinite';
            
            // Initialize header scroll effect
            initHeaderScroll();
        }, 800);
    }
    
    // Auto-hide splash screen after 3.5 seconds
    const splashTimeout = setTimeout(hideSplashScreen, 3500);
    
    // Skip splash screen button
    skipSplashBtn.addEventListener('click', function() {
        clearTimeout(splashTimeout);
        hideSplashScreen();
    });
    
    // Also hide splash screen if user presses Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !splashScreen.classList.contains('hidden')) {
            clearTimeout(splashTimeout);
            hideSplashScreen();
        }
    });
    
    // Handle touch events for splash screen
    splashScreen.addEventListener('touchstart', function(e) {
        if (e.target === splashScreen) {
            clearTimeout(splashTimeout);
            hideSplashScreen();
        }
    });
});

// Header scroll effect
function initHeaderScroll() {
    const header = document.getElementById('mainHeader');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.classList.remove('scrolled');
            return;
        }
        
        if (currentScroll > lastScroll && !header.classList.contains('scrolled')) {
            // Scrolling down
            header.classList.add('scrolled');
        } else if (currentScroll < lastScroll && header.classList.contains('scrolled')) {
            // Scrolling up
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
}

// Form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // In a real application, you would send the form data to a server here
        alert('تم استلام استفسارك بنجاح، وسنتواصل معك قريباً.');
        contactForm.reset();
    });
}

// Handle window resize for responsive adjustments
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        AOS.refresh();
        // Close mobile menu on large screens
        if (window.innerWidth > 991) {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        }
    }, 250);
});

// Prevent zoom on double-tap for mobile
let lastTouchEnd = 0;
document.addEventListener('touchend', function(event) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);
