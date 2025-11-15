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

        // Form submission handling with AJAX
        // Find form by action attribute (works even without ID)
        const contactForm = document.querySelector('form[action*="formspree"]');
        if (contactForm) {
            // Create message div if it doesn't exist
            let formMessage = document.getElementById('formMessage');
            if (!formMessage) {
                formMessage = document.createElement('div');
                formMessage.id = 'formMessage';
                formMessage.style.display = 'none';
                formMessage.style.marginTop = '15px';
                formMessage.style.padding = '10px';
                formMessage.style.borderRadius = '4px';
                contactForm.appendChild(formMessage);
            }
            
            contactForm.addEventListener('submit', async function(e) {
                e.preventDefault();
                
                const submitBtn = this.querySelector('.submit-btn');
                const formData = new FormData(this);
                
                // Show loading state
                if (submitBtn) {
                    submitBtn.textContent = 'Sending...';
                    submitBtn.disabled = true;
                }
                
                if (formMessage) {
                    formMessage.style.display = 'none';
                }
                
                try {
                    const response = await fetch(this.action, {
                        method: 'POST',
                        body: formData,
                        headers: {
                            'Accept': 'application/json'
                        }
                    });
                    
                    if (response.ok) {
                        // Success
                        if (formMessage) {
                            formMessage.style.display = 'block';
                            formMessage.style.backgroundColor = '#d4edda';
                            formMessage.style.color = '#155724';
                            formMessage.style.border = '1px solid #c3e6cb';
                            formMessage.textContent = '✓ Message sent successfully! We\'ll get back to you soon.';
                        }
                        this.reset();
                        
                        // Scroll to message
                        if (formMessage) {
                            formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                        }
                    } else {
                        // Error
                        let errorMsg = 'Please try again later.';
                        try {
                            const data = await response.json();
                            errorMsg = data.error || errorMsg;
                        } catch (e) {
                            // If JSON parse fails, use default message
                        }
                        
                        if (formMessage) {
                            formMessage.style.display = 'block';
                            formMessage.style.backgroundColor = '#f8d7da';
                            formMessage.style.color = '#721c24';
                            formMessage.style.border = '1px solid #f5c6cb';
                            formMessage.textContent = '✗ Error: ' + errorMsg;
                        }
                    }
                } catch (error) {
                    // Network error
                    console.error('Form submission error:', error);
                    if (formMessage) {
                        formMessage.style.display = 'block';
                        formMessage.style.backgroundColor = '#f8d7da';
                        formMessage.style.color = '#721c24';
                        formMessage.style.border = '1px solid #f5c6cb';
                        formMessage.textContent = '✗ Network error. Please check your connection and try again.';
                    }
                } finally {
                    // Reset button
                    if (submitBtn) {
                        submitBtn.textContent = 'Send';
                        submitBtn.disabled = false;
                    }
                }
            });
        }