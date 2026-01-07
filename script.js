// Preloader
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
    }, 500);
});

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.innerHTML = navLinks.classList.contains('active') 
            ? '✕' 
            : '☰';
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-links') && !e.target.closest('.mobile-menu-btn')) {
        navLinks.classList.remove('active');
        if (mobileMenuBtn) mobileMenuBtn.innerHTML = '☰';
    }
});

// Statistics Counter Animation
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    const speed = 200;
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const increment = target / speed;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                setTimeout(updateCounter, 1);
            } else {
                counter.textContent = target.toLocaleString();
            }
        };
        
        updateCounter();
    });
}

// FAQ Accordion
function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = question.querySelector('.faq-icon');
        
        question.addEventListener('click', () => {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    const otherIcon = otherItem.querySelector('.faq-icon');
                    otherAnswer.classList.remove('active');
                    if (otherIcon) otherIcon.textContent = '+';
                }
            });
            
            // Toggle current item
            answer.classList.toggle('active');
            if (icon) {
                icon.textContent = answer.classList.contains('active') ? '−' : '+';
            }
        });
    });
}

// Floating navigation hover effects
function initFloatingNav() {
    const floatingNavBtns = document.querySelectorAll('.floating-nav-btn');
    
    floatingNavBtns.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'scale(1.1) translateX(5px)';
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'scale(1) translateX(0)';
        });
    });
}

// Hide floating nav on mobile
function checkFloatingNav() {
    const floatingNav = document.querySelector('.floating-nav');
    if (window.innerWidth <= 768 && floatingNav) {
        floatingNav.style.display = 'none';
    } else if (floatingNav) {
        floatingNav.style.display = 'flex';
    }
}

// Set active state for bottom nav
function setActiveBottomNav() {
    const currentPage = window.location.pathname.split('/').pop();
    const bottomNavLinks = document.querySelectorAll('.bottom-nav a');
    
    bottomNavLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize FAQ accordion
    initFAQAccordion();
    
    // Initialize floating navigation
    initFloatingNav();
    
    // Set active state for bottom nav
    setActiveBottomNav();
    
    // Initialize counters if they exist
    const counters = document.querySelectorAll('.counter');
    if (counters.length > 0) {
        // Use Intersection Observer to trigger counters when visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        counters.forEach(counter => {
            observer.observe(counter.closest('.stats'));
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                navLinks.classList.remove('active');
                if (mobileMenuBtn) mobileMenuBtn.innerHTML = '☰';
            }
        });
    });
    
    // Check floating nav on load
    checkFloatingNav();
});

// Image Gallery Lightbox (Optional enhancement)
function initImageGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <img src="" alt="">
            <span class="close">&times;</span>
        </div>
    `;
    document.body.appendChild(lightbox);
    
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const lightboxImg = lightbox.querySelector('img');
            lightboxImg.src = img.src;
            lightbox.classList.add('active');
        });
    });
    
    lightbox.addEventListener('click', (e) => {
        if (e.target.classList.contains('close') || e.target === lightbox) {
            lightbox.classList.remove('active');
        }
    });
}

// Call gallery initialization if on home page
if (document.querySelector('.gallery-grid')) {
    initImageGallery();
}

// Form submission handler
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        // Show success message
        alert('Thank you! Your message has been sent. We will contact you soon.');
        form.reset();
    });
});

// Add FAQ icon if not present in HTML
document.querySelectorAll('.faq-question').forEach(question => {
    if (!question.querySelector('.faq-icon')) {
        const icon = document.createElement('span');
        icon.className = 'faq-icon';
        icon.textContent = '+';
        question.appendChild(icon);
    }
});

// Window resize event handlers
window.addEventListener('resize', function() {
    checkFloatingNav();
});