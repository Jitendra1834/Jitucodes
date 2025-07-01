document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS with your user ID
    emailjs.init('YOUR_EMAILJS_USER_ID'); // Replace with your actual EmailJS user ID

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navList = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-link');
    
    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        navList.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            navList.classList.remove('active');
        });
    });
    
    // Navigation scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('nav');
        navbar.classList.toggle('scrolled', window.scrollY > 50);
        
        // Back to top button
        const backToTop = document.getElementById('back-to-top');
        backToTop.classList.toggle('active', window.scrollY > 300);
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });
    
    // Active nav link on scroll
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Typing Effect
    const typingText = document.querySelector('.typing-text');
    const words = ['Web Developer', 'Frontend Engineer', 'UI/UX Enthusiast', 'Problem Solver'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isEnd = false;

    function type() {
        const currentWord = words[wordIndex];
        const currentChar = currentWord.substring(0, charIndex);
        typingText.textContent = currentChar;

        if (!isDeleting && charIndex < currentWord.length) {
            // Typing
            charIndex++;
            setTimeout(type, 100);
        } else if (isDeleting && charIndex > 0) {
            // Deleting
            charIndex--;
            setTimeout(type, 50);
        } else {
            // Change word
            isDeleting = !isDeleting;
            if (!isDeleting) {
                wordIndex = (wordIndex + 1) % words.length;
            }
            setTimeout(type, 1000);
        }
    }

    // Start typing effect
    setTimeout(type, 1000);

    // Animate stats counter
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateStats() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const increment = target / 100;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                stat.textContent = Math.floor(current);
                
                if (current >= target) {
                    stat.textContent = target;
                    clearInterval(timer);
                }
            }, 10);
        });
    }
    
    // Skills tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabBtns.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Show corresponding content
            const tabId = btn.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Certifications slider
    const certSlider = document.querySelector('.certifications-content');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    const slideCount = document.querySelectorAll('.certification-card').length;
    
    function updateSlider() {
        const slideWidth = document.querySelector('.certification-card').offsetWidth + 30;
        certSlider.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
        
        // Disable buttons at ends
        prevBtn.disabled = currentSlide === 0;
        nextBtn.disabled = currentSlide >= slideCount - 3;
    }
    
    nextBtn.addEventListener('click', () => {
        if (currentSlide < slideCount - 3) {
            currentSlide++;
            updateSlider();
        }
    });
    
    prevBtn.addEventListener('click', () => {
        if (currentSlide > 0) {
            currentSlide--;
            updateSlider();
        }
    });
    
    // Projects filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Filter projects
            const filter = btn.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.classList.remove('hide');
                    card.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    card.classList.add('hide');
                }
            });
        });
    });
    
    // Current year in footer
    const yearElement = document.getElementById('year');
    yearElement.textContent = new Date().getFullYear();
    
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('form-message');
    const btnText = document.querySelector('.btn-text');
    const btnLoading = document.querySelector('.btn-loading');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline-block';
        
        // Get form values
        const name = this.querySelector('#name').value;
        const email = this.querySelector('#email').value;
        const subject = this.querySelector('#subject').value;
        const message = this.querySelector('#message').value;
        
        // Send email using EmailJS
        emailjs.send('YOUR_EMAILJS_SERVICE_ID', 'YOUR_EMAILJS_TEMPLATE_ID', {
            from_name: name,
            from_email: email,
            subject: subject,
            message: message,
            to_email: 'jitendrabehera0302@gmail.com'
        })
        .then(() => {
            // Show success message
            formMessage.textContent = 'Thank you for your message! I will get back to you soon.';
            formMessage.classList.remove('error');
            formMessage.classList.add('success');
            
            // Reset form
            contactForm.reset();
        }, (error) => {
            // Show error message
            formMessage.textContent = 'There was an error sending your message. Please try again later.';
            formMessage.classList.remove('success');
            formMessage.classList.add('error');
            console.error('EmailJS Error:', error);
        })
        .finally(() => {
            // Hide loading state
            btnText.style.display = 'inline-block';
            btnLoading.style.display = 'none';
            
            // Show message
            formMessage.style.display = 'block';
            
            // Hide message after 5 seconds
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        });
    });
    
    // Intersection Observers for animations
    const animateOnScroll = (element, animationClass) => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(animationClass);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        if (element.length) {
            element.forEach(el => observer.observe(el));
        } else {
            observer.observe(element);
        }
    };
    
    // Animate elements when they come into view
    animateOnScroll(document.querySelectorAll('.skill-item'), 'animate');
    animateOnScroll(document.querySelectorAll('.certification-card'), 'animate');
    animateOnScroll(document.querySelectorAll('.project-card'), 'animate');
    animateOnScroll(document.querySelector('.about-stats'), 'animate');
    
    // Initialize skills animation
    const skillBars = document.querySelectorAll('.progress');
    
    function animateSkills() {
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
    }
    
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    skillsObserver.observe(document.getElementById('skills'));
});