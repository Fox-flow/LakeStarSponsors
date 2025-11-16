/*

Tooplate 2141 Minimal White

https://www.tooplate.com/view/2141-minimal-white

*/

// JavaScript Document

        // Mobile menu toggle
        const menuToggle = document.getElementById('menuToggle');
        const navLinks = document.getElementById('navLinks');

        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when link is clicked
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });

        // Navbar scroll effect and active menu highlighting
        const sections = document.querySelectorAll('section');
        const navItems = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', function() {
            const navbar = document.getElementById('navbar');
            
            // Navbar style on scroll
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            // Active menu highlighting
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollY >= (sectionTop - 100)) {
                    current = section.getAttribute('id');
                }
            });

            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href').slice(1) === current) {
                    item.classList.add('active');
                }
            });
        });

        // Trigger scroll event on load to set initial active state
        window.dispatchEvent(new Event('scroll'));

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
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

        // Fade in animation on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });

        // Check for success parameter in URL
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('success') === 'true') {
            const formMessage = document.getElementById('formMessage');
            if (formMessage) {
                formMessage.style.display = 'block';
                formMessage.style.backgroundColor = '#d4edda';
                formMessage.style.color = '#155724';
                formMessage.style.border = '1px solid #c3e6cb';
                formMessage.textContent = '✓ Message sent successfully! We\'ll get back to you soon.';
                
                // Clean URL
                window.history.replaceState({}, document.title, window.location.pathname + window.location.hash);
            }
        }
        
        // Form submission handling - let it submit normally to Formspree
        // Formspree will handle the submission and redirect back
        const contactForm = document.querySelector('form[action*="formspree"]');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                const submitBtn = this.querySelector('.submit-btn');
                if (submitBtn) {
                    submitBtn.textContent = 'Sending...';
                    submitBtn.disabled = true;
                }
                // Let form submit naturally - Formspree will redirect
            });
        }
        
        // BRUTE FORCE FIX: Apply consistent padding to ALL containers and fix stats grid
        function forceFixAllSections() {
            if (window.innerWidth <= 768) {
                // Apply 20px padding to ALL containers for consistency
                const allContainers = document.querySelectorAll('.container');
                allContainers.forEach(container => {
                    container.style.paddingLeft = '20px';
                    container.style.paddingRight = '20px';
                });
                
                // Fix stats grid specifically
                const statsGrid = document.querySelector('.stats-grid');
                const statsContainer = statsGrid?.closest('.container');
                if (statsGrid && statsContainer) {
                    // Get container's available width (accounting for padding)
                    const containerRect = statsContainer.getBoundingClientRect();
                    const containerPadding = parseFloat(window.getComputedStyle(statsContainer).paddingLeft) || 0;
                    const availableWidth = containerRect.width - (containerPadding * 2);
                    
                    // Add extra safety margin to ensure no visual bleeding
                    const safetyMargin = 2;
                    const gridWidth = availableWidth - safetyMargin;
                    
                    // Set grid to fit within container with safety margin
                    // Force inline style with !important via setProperty
                    statsGrid.style.setProperty('width', gridWidth + 'px', 'important');
                    statsGrid.style.setProperty('max-width', gridWidth + 'px', 'important');
                    
                    // Calculate item width accounting for 1px gap
                    const itemWidth = Math.floor((gridWidth - 1) / 2);
                    
                    // Force each item to be exactly half minus gap
                    const statItems = document.querySelectorAll('.stat-item');
                    statItems.forEach(item => {
                        item.style.width = itemWidth + 'px';
                        item.style.maxWidth = itemWidth + 'px';
                        item.style.minWidth = '0';
                        item.style.boxSizing = 'border-box';
                        item.style.flexShrink = '0';
                    });
                }
                
                // Fix values grid the same way
                const valuesGrid = document.querySelector('.values-grid');
                const valuesContainer = valuesGrid?.closest('.container') || valuesGrid?.closest('.values-section');
                if (valuesGrid && valuesContainer) {
                    // Get container's available width (accounting for padding)
                    const containerRect = valuesContainer.getBoundingClientRect();
                    const containerPadding = parseFloat(window.getComputedStyle(valuesContainer).paddingLeft) || 0;
                    const availableWidth = containerRect.width - (containerPadding * 2);
                    
                    // Add extra safety margin to ensure no visual bleeding
                    const safetyMargin = 2;
                    const gridWidth = availableWidth - safetyMargin;
                    
                    // Set grid to fit within container with safety margin and align left
                    valuesGrid.style.setProperty('width', gridWidth + 'px', 'important');
                    valuesGrid.style.setProperty('max-width', gridWidth + 'px', 'important');
                    valuesGrid.style.setProperty('margin', '0', 'important');
                    
                    // Calculate item width - 2 columns, no gap (gap: 0)
                    const itemWidth = Math.floor(gridWidth / 2);
                    
                    // Force each item to be exactly half
                    const valueCards = document.querySelectorAll('.value-card');
                    valueCards.forEach(card => {
                        card.style.width = itemWidth + 'px';
                        card.style.maxWidth = itemWidth + 'px';
                        card.style.minWidth = '0';
                        card.style.boxSizing = 'border-box';
                        card.style.flexShrink = '0';
                    });
                }
            }
        }
        
        // Run immediately and on resize
        forceFixAllSections();
        window.addEventListener('resize', forceFixAllSections);
        document.addEventListener('DOMContentLoaded', forceFixAllSections);
        setTimeout(forceFixAllSections, 100);
        setTimeout(forceFixAllSections, 500);
        setTimeout(forceFixAllSections, 1000);
        
        