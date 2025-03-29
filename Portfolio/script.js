document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
  });

  // Smooth Scroll
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

  // Navbar Scroll Effect
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
          navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
      } else {
          navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
      }
  });

  // Dark Mode Toggle
  const darkModeToggle = document.createElement('div');
  darkModeToggle.className = 'dark-mode-toggle';
  darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  document.body.appendChild(darkModeToggle);

  darkModeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      darkModeToggle.innerHTML = document.body.classList.contains('dark-mode') ? 
          '<i class="fas fa-sun"></i>' : 
          '<i class="fas fa-moon"></i>';
      
      // Update section backgrounds
      document.querySelectorAll('.profile-section, .skills').forEach(section => {
          section.classList.toggle('dark-mode');
      });
  });

  // Scroll Animations
  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0)';
          }
      });
  }, { threshold: 0.1 });

  document.querySelectorAll('.project-card, .skill-card').forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      observer.observe(el);
  });
  // contact form
document.querySelector('.contact-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const status = form.querySelector('.form-status');
  const submitBtn = form.querySelector('button[type="submit"]');

  try {
      submitBtn.disabled = true;
      status.textContent = 'Sending message...';
      
      const response = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: {
              'Accept': 'application/json'
          }
      });

      if (response.ok) {
          status.textContent = 'Message sent successfully!';
          form.reset();
          setTimeout(() => status.textContent = '', 3000);
      } else {
          const data = await response.json();
          if (data.errors) {
              status.textContent = data.errors.map(error => error.message).join(', ');
          } else {
              status.textContent = 'Oops! There was a problem submitting your form';
          }
      }
  } catch (error) {
      status.textContent = 'Oops! There was a problem submitting your form';
  } finally {
      submitBtn.disabled = false;
      setTimeout(() => status.textContent = '', 5000);
  }
});
});