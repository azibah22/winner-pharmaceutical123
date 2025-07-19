document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const hasSubmenuItems = document.querySelectorAll('.has-submenu');

    // Toggle mobile menu
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Handle submenu toggles
    hasSubmenuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            if (window.innerWidth <= 992) {
                e.preventDefault();
                item.classList.toggle('active');
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Close menu when window is resized above mobile breakpoint
    window.addEventListener('resize', () => {
        if (window.innerWidth > 992) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            hasSubmenuItems.forEach(item => item.classList.remove('active'));
        }
    });

    // Products Slideshow
    let currentSlideIndex = 0;
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    let slideInterval;

    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Show current slide
        if (slides[index]) {
            slides[index].classList.add('active');
            dots[index].classList.add('active');
        }
    }

    function nextSlide() {
        currentSlideIndex = (currentSlideIndex + 1) % slides.length;
        showSlide(currentSlideIndex);
    }

    function prevSlide() {
        currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
        showSlide(currentSlideIndex);
    }

    function startSlideshow() {
        slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }

    function stopSlideshow() {
        clearInterval(slideInterval);
    }

    // Initialize slideshow
    if (slides.length > 0) {
        showSlide(0);
        startSlideshow();
        
        // Pause slideshow on hover
        const slideshowContainer = document.querySelector('.slideshow-container');
        if (slideshowContainer) {
            slideshowContainer.addEventListener('mouseenter', stopSlideshow);
            slideshowContainer.addEventListener('mouseleave', startSlideshow);
        }
    }

    // Make functions globally available
    window.changeSlide = function(direction) {
        if (direction === 1) {
            nextSlide();
        } else {
            prevSlide();
        }
        // Restart the interval
        stopSlideshow();
        startSlideshow();
    };

    window.currentSlide = function(index) {
        currentSlideIndex = index - 1;
        showSlide(currentSlideIndex);
        // Restart the interval
        stopSlideshow();
        startSlideshow();
    };

    // Products Section
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const productsGrid = document.getElementById('productsGrid');

    // Search and filter functionality
    function filterProducts() {
        const searchTerm = searchInput.value.toLowerCase();
        const category = categoryFilter.value;
        
        const products = document.querySelectorAll('.product-item');
        
        products.forEach(product => {
            const productName = product.querySelector('h3').textContent.toLowerCase();
            const productCategory = product.dataset.category;
            
            const matchesSearch = productName.includes(searchTerm);
            const matchesCategory = category === 'all' || productCategory === category;
            
            product.style.display = matchesSearch && matchesCategory ? 'block' : 'none';
        });
    }

    if (searchInput && categoryFilter) {
        searchInput.addEventListener('input', filterProducts);
        categoryFilter.addEventListener('change', filterProducts);
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Don't prevent default - let the form submit to Google Forms
            const submitButton = this.querySelector('.submit-button');
            const formResponse = this.querySelector('.form-response');
            
            // Show loading state
            submitButton.disabled = true;
            submitButton.classList.add('loading');
            formResponse.style.display = 'none';
            
            // Show success message
            setTimeout(() => {
                formResponse.textContent = 'Thank you! Your message has been submitted. The form will open in a new tab for confirmation.';
                formResponse.className = 'form-response success';
                formResponse.style.display = 'block';
                
                // Reset form
                this.reset();
                
                // Re-enable submit button and remove loading state
                submitButton.disabled = false;
                submitButton.classList.remove('loading');
            }, 1000);
        });
    }
});