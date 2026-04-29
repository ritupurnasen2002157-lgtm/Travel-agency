// Travel Agency Website - Interactive JS
document.addEventListener('DOMContentLoaded', function() {
  
  // ========== MOBILE NAV TOGGLE ==========
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
    
    // Close mobile menu on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }
  
  // ========== HERO SLIDER (Homepage only) ==========
  const slides = document.querySelectorAll('.slide');
  let currentSlide = 0;
  
  if (slides.length > 0) {
    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
      });
    }
    
    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }
    
    // Start the slider
    showSlide(0);
    setInterval(nextSlide, 5000);
  }
  
  // ========== DESTINATION FILTER ==========
  const filterBtns = document.querySelectorAll('.filter-btn');
  const destCards = document.querySelectorAll('.destination-card');
  
  if (filterBtns.length > 0 && destCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const filter = e.target.getAttribute('data-filter');
        
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        
        // Filter cards
        destCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            card.style.display = 'block';
            setTimeout(() => {
              card.classList.add('fade-in');
            }, 10);
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }
  
  // ========== PACKAGE SORTING ==========
  const sortButtons = document.querySelectorAll('.sort-btn');
  const packagesGrid = document.getElementById('packages-grid');
  
  if (sortButtons.length > 0 && packagesGrid) {
    sortButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const sortType = e.target.getAttribute('data-sort');
        const packages = Array.from(packagesGrid.children);
        
        packages.sort((a, b) => {
          const priceA = parseInt(a.getAttribute('data-price'));
          const priceB = parseInt(b.getAttribute('data-price'));
          const durationA = parseInt(a.getAttribute('data-duration'));
          const durationB = parseInt(b.getAttribute('data-duration'));
          
          if (sortType === 'price-asc') {
            return priceA - priceB;
          } else if (sortType === 'price-desc') {
            return priceB - priceA;
          } else if (sortType === 'duration') {
            return durationA - durationB;
          }
          return 0;
        });
        
        // Clear and re-append sorted packages
        packagesGrid.innerHTML = '';
        packages.forEach(pkg => packagesGrid.appendChild(pkg));
        
        // Update active button style
        sortButtons.forEach(b => b.style.opacity = '0.7');
        e.target.style.opacity = '1';
      });
    });
  }
  
  // ========== CONTACT FORM VALIDATION ==========
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const phone = document.getElementById('phone');
      const message = document.getElementById('message');
      
      const nameValue = name.value.trim();
      const emailValue = email.value.trim();
      const phoneValue = phone.value.trim();
      const messageValue = message.value.trim();
      
      let isValid = true;
      
      // Clear previous errors
      document.querySelectorAll('.error').forEach(el => el.remove());
      const existingSuccess = document.querySelector('.success');
      if (existingSuccess) existingSuccess.remove();
      
      // Name validation
      if (!nameValue) {
        showError(name, 'Name is required');
        isValid = false;
      }
      
      // Email validation
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!emailValue) {
        showError(email, 'Email is required');
        isValid = false;
      } else if (!emailRegex.test(emailValue)) {
        showError(email, 'Please enter a valid email address');
        isValid = false;
      }
      
      // Phone validation for Indian numbers
      const phoneRegex = /^[6-9][0-9]{9}$/;
      const cleanedPhone = phoneValue.replace(/\s/g, '');
      if (!phoneValue) {
        showError(phone, 'Phone number is required');
        isValid = false;
      } else if (!phoneRegex.test(cleanedPhone)) {
        showError(phone, 'Please enter a valid 10-digit Indian mobile number (starts with 6-9)');
        isValid = false;
      }
      
      // Message validation
      if (!messageValue) {
        showError(message, 'Message is required');
        isValid = false;
      } else if (messageValue.length < 10) {
        showError(message, 'Message must be at least 10 characters');
        isValid = false;
      }
      
      // If valid, show success message
      if (isValid) {
        const successDiv = document.createElement('div');
        successDiv.className = 'success';
        successDiv.innerHTML = '✓ Thank you! Your message has been sent successfully. We\'ll get back to you soon.';
        contactForm.parentNode.insertBefore(successDiv, contactForm);
        contactForm.reset();
        
        // Remove success message after 5 seconds
        setTimeout(() => {
          successDiv.remove();
        }, 5000);
      }
    });
  }
  
  function showError(input, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error';
    errorDiv.style.color = '#EF4444';
    errorDiv.style.fontSize = '0.9rem';
    errorDiv.style.marginTop = '0.5rem';
    errorDiv.textContent = message;
    input.parentNode.appendChild(errorDiv);
    
    input.style.borderColor = '#EF4444';
    input.addEventListener('input', function() {
      this.style.borderColor = '#ddd';
      const error = this.parentNode.querySelector('.error');
      if (error) error.remove();
    }, { once: true });
  }
  
  // ========== SMOOTH SCROLLING ==========
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const navHeight = document.querySelector('nav') ? document.querySelector('nav').offsetHeight : 70;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // ========== FADE IN ON SCROLL ==========
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe cards and quotes
  document.querySelectorAll('.card, .quote, .stat-item').forEach(el => {
    observer.observe(el);
  });
  
  // ========== NEWSLETTER SUBSCRIPTION ==========
  const newsletterBtn = document.querySelector('.newsletter-form button');
  const newsletterInput = document.querySelector('.newsletter-form input');
  
  if (newsletterBtn && newsletterInput) {
    newsletterBtn.addEventListener('click', () => {
      const email = newsletterInput.value.trim();
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      
      if (!email) {
        alert('Please enter your email address');
      } else if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
      } else {
        alert('Thank you for subscribing! You\'ll receive our best deals soon.');
        newsletterInput.value = '';
      }
    });
    
    // Allow Enter key
    newsletterInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        newsletterBtn.click();
      }
    });
  }
  
  // ========== ACTIVE NAVIGATION LINK ==========
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage) {
      link.classList.add('active');
    } else if (currentPage === 'index.html' && linkPage === 'index.html') {
      link.classList.add('active');
    }
  });
});