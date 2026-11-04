// Main JavaScript for Portfolio Website

// DOM Elements
const loadingScreen = document.getElementById('loading-screen');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    setupMobileMenu();
    setupCounterAnimation();
    setupSmoothScrolling();
    setupParticleEffect();
    setupThemeToggle();
    hideLoadingScreen();
});

// Hide loading screen after animations
function hideLoadingScreen() {
    setTimeout(() => {
        if (loadingScreen) {
            loadingScreen.style.display = 'none';
        }
    }, 2000);
}

// Mobile Menu Toggle
function setupMobileMenu() {
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            
            // Toggle hamburger/close icon
            const icon = mobileMenuBtn.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            } else {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            }
        });

        // Close mobile menu when clicking on links
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }
}

// Counter Animation
function setupCounterAnimation() {
    const counters = document.querySelectorAll('.counter');
    
    // Intersection Observer for counter animation
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                const duration = 2000; // 2 seconds
                const step = target / (duration / 16); // 60fps
                let current = 0;
                
                const timer = setInterval(() => {
                    current += step;
                    counter.textContent = Math.floor(current);
                    
                    if (current >= target) {
                        counter.textContent = target;
                        clearInterval(timer);
                    }
                }, 16);
                
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.7 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Smooth Scrolling for Navigation Links
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerOffset = 80;
                const elementPosition = targetSection.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Particle Effect
function setupParticleEffect() {
    const heroSection = document.querySelector('#home');
    if (!heroSection) return;
    
    // Create particle container
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container absolute inset-0 overflow-hidden pointer-events-none';
    heroSection.appendChild(particleContainer);
    
    // Create particles
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random horizontal position
        particle.style.left = Math.random() * 100 + '%';
        
        // Random color
        const colors = ['var(--neon-blue)', 'var(--neon-purple)', 'var(--neon-pink)'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        // Random animation duration
        particle.style.animationDuration = (Math.random() * 3 + 5) + 's';
        
        particleContainer.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 8000);
    }
    
    // Create particles at intervals
    setInterval(createParticle, 300);
}

// Intersection Observer for Animations
function initializeAnimations() {
    // Fade in animation for service cards
    const serviceCards = document.querySelectorAll('.service-card');
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        cardObserver.observe(card);
    });
    
    // Glitch effect for main heading
    const mainHeading = document.querySelector('h1');
    if (mainHeading) {
        const textContent = mainHeading.textContent;
        mainHeading.setAttribute('data-text', textContent);
        
        // Add glitch effect on hover
        mainHeading.addEventListener('mouseenter', function() {
            this.classList.add('glitch');
        });
        
        mainHeading.addEventListener('mouseleave', function() {
            this.classList.remove('glitch');
        });
    }
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('nav');
    if (window.scrollY > 100) {
        navbar.classList.add('bg-cyber-dark/95');
        navbar.classList.remove('bg-cyber-dark/80');
    } else {
        navbar.classList.add('bg-cyber-dark/80');
        navbar.classList.remove('bg-cyber-dark/95');
    }
});

// Typing Effect
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Mouse trail effect
function createMouseTrail() {
    let mouseX = 0, mouseY = 0;
    let trails = [];
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Create trail element
        const trail = document.createElement('div');
        trail.className = 'mouse-trail';
        trail.style.position = 'fixed';
        trail.style.left = mouseX + 'px';
        trail.style.top = mouseY + 'px';
        trail.style.width = '4px';
        trail.style.height = '4px';
        trail.style.background = 'var(--neon-blue)';
        trail.style.borderRadius = '50%';
        trail.style.pointerEvents = 'none';
        trail.style.zIndex = '9999';
        trail.style.opacity = '0.7';
        trail.style.transition = 'opacity 0.5s ease';
        
        document.body.appendChild(trail);
        trails.push(trail);
        
        // Fade out and remove trail
        setTimeout(() => {
            trail.style.opacity = '0';
            setTimeout(() => {
                if (trail.parentNode) {
                    trail.parentNode.removeChild(trail);
                }
                trails = trails.filter(t => t !== trail);
            }, 500);
        }, 100);
    });
}

// Initialize mouse trail on desktop only
if (window.innerWidth > 768) {
    createMouseTrail();
}

// Preloader progress
function updatePreloaderProgress() {
    const progressBar = document.querySelector('#loading-screen .h-full');
    if (progressBar) {
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 30;
            if (progress > 100) progress = 100;
            
            progressBar.style.width = progress + '%';
            
            if (progress >= 100) {
                clearInterval(interval);
            }
        }, 200);
    }
}

// Start preloader progress
updatePreloaderProgress();

// Error handling for images
document.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        e.target.style.display = 'none';
        console.log('Image failed to load:', e.target.src);
    }
}, true);

// Performance optimization: Lazy loading for images
if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
}

// Add cursor glow effect
document.addEventListener('mousemove', function(e) {
    const cursor = document.querySelector('.cursor-glow');
    if (!cursor) {
        const glowCursor = document.createElement('div');
        glowCursor.className = 'cursor-glow';
        glowCursor.style.position = 'fixed';
        glowCursor.style.width = '20px';
        glowCursor.style.height = '20px';
        glowCursor.style.background = 'radial-gradient(circle, rgba(0,212,255,0.3) 0%, transparent 70%)';
        glowCursor.style.borderRadius = '50%';
        glowCursor.style.pointerEvents = 'none';
        glowCursor.style.zIndex = '9999';
        glowCursor.style.transform = 'translate(-50%, -50%)';
        document.body.appendChild(glowCursor);
    }
    
    const glowElement = document.querySelector('.cursor-glow');
    if (glowElement) {
        glowElement.style.left = e.clientX + 'px';
        glowElement.style.top = e.clientY + 'px';
    }
});

// Console welcome message
// Theme Toggle Functionality
function setupThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeToggleMobile = document.getElementById('theme-toggle-mobile');
    const themeIcon = document.getElementById('theme-icon');
    const themeIconMobile = document.getElementById('theme-icon-mobile');
    
    // Get current theme from localStorage or default to dark
    const currentTheme = localStorage.getItem('theme') || 'dark';
    
    // Apply the current theme
    applyTheme(currentTheme);
    
    // Theme toggle handlers
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    if (themeToggleMobile) {
        themeToggleMobile.addEventListener('click', toggleTheme);
    }
    
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    }
    
    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        
        // Update icon for both desktop and mobile
        const icons = [themeIcon, themeIconMobile].filter(icon => icon);
        
        icons.forEach(icon => {
            if (theme === 'light') {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            } else {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            }
        });
    }
}

console.log(`
%c╔══════════════════════════════════════╗
║          🚀 GOHIGHLEVEL SPECIALIST    ║
║                                      ║
║  Portfolio Website - v1.0            ║
║  Built with cutting-edge tech        ║
║                                      ║
╚══════════════════════════════════════╝`, 
'color: #00d4ff; font-family: monospace; font-size: 12px; background: #0a0a0a; padding: 10px;');