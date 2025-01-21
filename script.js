// Scroll reveal animation
window.addEventListener('DOMContentLoaded', () => {
    const scrollElements = document.querySelectorAll('.scroll-reveal');
    
    const elementInView = (el) => {
        const elementTop = el.getBoundingClientRect().top;
        return elementTop <= (window.innerHeight || document.documentElement.clientHeight) * 0.8;
    };
    
    const displayScrollElement = (element) => {
        element.classList.add('scrolled');
    };
    
    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el)) {
                displayScrollElement(el);
            }
        });
    };
    
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });
});

// Typing animation for hero section
document.addEventListener('DOMContentLoaded', () => {
    const titles = document.querySelectorAll('.typing-text');
    titles.forEach(title => {
        const text = title.textContent;
        title.textContent = '';
        let i = 0;
        const typing = setInterval(() => {
            if (i < text.length) {
                title.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typing);
            }
        }, 100);
    });
});

// Project hover effect
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// Counter animation for stats
const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    
    const updateCounter = () => {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
};

// Initialize counter animations when in view
const observeStats = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statsNumbers = entry.target.querySelectorAll('.stat-item h2, .stat-item h3');
            statsNumbers.forEach(number => {
                const target = parseInt(number.textContent);
                animateCounter(number, target);
            });
            observeStats.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelector('#stats').forEach(stat => observeStats.observe(stat));

// Parallax effect for floating shapes
document.addEventListener('mousemove', (e) => {
    const shapes = document.querySelectorAll('.shape');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    shapes.forEach(shape => {
        const speed = shape.getAttribute('data-speed') || 2;
        const moveX = (x * speed) * 50;
        const moveY = (y * speed) * 50;
        shape.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
});

// Update the smooth scroll functionality
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for buttons with data-href
    document.querySelectorAll('[data-href]').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const href = button.getAttribute('data-href');
            let targetSection;
            
            // Special handling for "View My Work" button
            if (href === '#projects') {
                targetSection = document.querySelector('#work');
            } else {
                targetSection = document.querySelector(href);
            }
            
            if (targetSection) {
                // Add offset for fixed header
                const headerOffset = 80;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Add active state to the section
                document.querySelectorAll('section').forEach(section => {
                    section.classList.remove('active');
                });
                targetSection.classList.add('active');

                // Highlight the section
                targetSection.classList.add('highlight');
                setTimeout(() => {
                    targetSection.classList.remove('highlight');
                }, 1000);
            }
        });
    });

    // Check for hash in URL on page load
    if (window.location.hash) {
        const targetSection = document.querySelector(window.location.hash);
        if (targetSection) {
            setTimeout(() => {
                const headerOffset = 80;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }, 100);
        }
    }
});

// Update contact form button to scroll to contact section
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        const targetSection = document.querySelector(href);
        
        if (targetSection) {
            const headerOffset = 80;
            const elementPosition = targetSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Animate skill bars when they come into view
const observeSkills = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.skill-progress');
            progressBars.forEach(bar => {
                const progress = bar.getAttribute('data-progress');
                bar.style.width = `${progress}%`;
            });
            observeSkills.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelector('#skills')?.forEach(section => observeSkills.observe(section));

// Contact form handling
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            try {
                // Here you would typically send the data to your server
                // For now, we'll just simulate a response
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                // Show success message
                alert('Message sent successfully!');
                contactForm.reset();
            } catch (error) {
                // Show error message
                alert('Failed to send message. Please try again.');
            } finally {
                // Reset button state
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }
});

// Prevent zoom on double tap for mobile devices
document.addEventListener('touchstart', function(event) {
    if (event.touches.length > 1) {
        event.preventDefault();
    }
}, { passive: false });

// Handle mobile scroll performance
let ticking = false;
window.addEventListener('scroll', function() {
    if (!ticking) {
        window.requestAnimationFrame(function() {
            handleScrollAnimation();
            ticking = false;
        });
        ticking = true;
    }
});

// Optimize animations for mobile
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
if (isMobile) {
    document.documentElement.style.setProperty('--animation-duration', '0.3s');
}

// Improve form handling on mobile
const formInputs = document.querySelectorAll('input, textarea');
formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        // Add padding to prevent virtual keyboard from covering input
        document.body.style.paddingBottom = '50vh';
    });
    
    input.addEventListener('blur', () => {
        document.body.style.paddingBottom = '0';
    });
});

// Add image loading optimization
document.addEventListener('DOMContentLoaded', () => {
    const projectImages = document.querySelectorAll('.project-image img');
    
    projectImages.forEach(img => {
        img.parentElement.classList.add('loading');
        
        img.onload = function() {
            this.parentElement.classList.remove('loading');
        }
        
        img.onerror = function() {
            this.parentElement.classList.remove('loading');
            this.parentElement.classList.add('error');
        }
    });
});

// Add lazy loading for images
const lazyLoadImages = () => {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                observer.unobserve(img);
            }
        });
    });

    const imgs = document.querySelectorAll('.project-image img[data-src]');
    imgs.forEach(img => imageObserver.observe(img));
};

// Initialize lazy loading if supported
if ('IntersectionObserver' in window) {
    lazyLoadImages();
}

// Performance optimizations
document.addEventListener('DOMContentLoaded', () => {
    // Detect device capabilities
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Adjust animations based on device capabilities
    if (isMobile || prefersReducedMotion) {
        document.documentElement.style.setProperty('--animation-duration', '0s');
    }

    // Optimize scroll performance
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(() => {
                scrollTimeout = null;
                // Perform scroll-based updates
                handleScrollAnimation();
            }, 16); // ~60fps
        }
    }, { passive: true });

    // Optimize image loading
    const images = document.querySelectorAll('img[loading="lazy"]');
    if ('loading' in HTMLImageElement.prototype) {
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
});

// Touch device optimizations
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
}

// Resize handler with debounce
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Update layouts if needed
        updateLayouts();
    }, 250);
});

function updateLayouts() {
    // Add any specific layout updates needed
    const isMobile = window.innerWidth <= 768;
    document.body.classList.toggle('is-mobile', isMobile);
}

// Animation handler
document.addEventListener('DOMContentLoaded', () => {
    // Set animation index for staggered animations
    document.querySelectorAll('.service-card').forEach((card, index) => {
        card.style.setProperty('--card-index', index);
    });

    document.querySelectorAll('.project-item').forEach((item, index) => {
        item.style.setProperty('--item-index', index);
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '50px'
    };

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                animationObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.skill-card, .service-card, .project-item').forEach(element => {
        animationObserver.observe(element);
    });

    // Smooth scroll animation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Parallax effect for hero section
    const heroSection = document.querySelector('#hero');
    window.addEventListener('scroll', () => {
        if (heroSection) {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.5;
            heroSection.style.transform = `translate3d(0, ${rate}px, 0)`;
        }
    });

    // Add animation class when scrolling into view
    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    });

    document.querySelectorAll('.scroll-reveal').forEach((element) => {
        animateOnScroll.observe(element);
    });

    // Initialize skill progress bars
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        setTimeout(() => {
            bar.style.width = `${progress}%`;
        }, 500);
    });

    // Animate skills when they come into view
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                const progressBar = entry.target.querySelector('.skill-progress');
                if (progressBar) {
                    const progress = progressBar.getAttribute('data-progress');
                    progressBar.style.width = `${progress}%`;
                }
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe all skill cards
    document.querySelectorAll('.skill-card').forEach(card => {
        skillsObserver.observe(card);
    });
});

// Disable animations if user prefers reduced motion
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.setProperty('--animation-duration', '0s');
} 