/* ===============================================
   1st Global Air Duct Cleaning - Main JavaScript
   =============================================== */

(function() {
  'use strict';

  // ---------- Mobile Menu Toggle ----------
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const navList = document.getElementById('navList');

  if (mobileMenuToggle && navList) {
    mobileMenuToggle.addEventListener('click', function() {
      mobileMenuToggle.classList.toggle('active');
      navList.classList.toggle('active');
      const isOpen = navList.classList.contains('active');
      mobileMenuToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking a link
    const navLinks = navList.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        mobileMenuToggle.classList.remove('active');
        navList.classList.remove('active');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!mobileMenuToggle.contains(e.target) && !navList.contains(e.target)) {
        mobileMenuToggle.classList.remove('active');
        navList.classList.remove('active');
      }
    });
  }

  // ---------- FAQ Accordion ----------
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', function() {
        const isActive = item.classList.contains('active');

        // Close all other FAQ items (accordion behavior)
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            const otherQuestion = otherItem.querySelector('.faq-question');
            if (otherQuestion) otherQuestion.setAttribute('aria-expanded', 'false');
          }
        });

        // Toggle current item
        item.classList.toggle('active');
        question.setAttribute('aria-expanded', !isActive);
      });
    }
  });

  // ---------- Smooth Scroll for anchor links ----------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#' || href.length <= 1) return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ---------- Form Validation & Submission ----------
  const forms = document.querySelectorAll('form');

  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();

      // Basic validation
      const requiredFields = form.querySelectorAll('[required]');
      let isValid = true;

      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          field.style.borderColor = 'var(--color-error)';
          isValid = false;
        } else {
          field.style.borderColor = '';
        }

        // Phone validation
        if (field.type === 'tel' && field.value) {
          const phoneClean = field.value.replace(/\D/g, '');
          if (phoneClean.length < 10) {
            field.style.borderColor = 'var(--color-error)';
            isValid = false;
          }
        }

        // Email validation
        if (field.type === 'email' && field.value) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(field.value)) {
            field.style.borderColor = 'var(--color-error)';
            isValid = false;
          }
        }
      });

      if (!isValid) {
        showFormMessage(form, 'Please fill in all required fields correctly.', 'error');
        return;
      }

      // Show success message (in production, this would submit to a server)
      showFormMessage(form, '✓ Thank you! We\'ll respond within 30 minutes during business hours.', 'success');

      // Reset form after a delay
      setTimeout(() => {
        form.reset();
      }, 3000);
    });

    // Clear error styling on input
    form.querySelectorAll('input, select, textarea').forEach(field => {
      field.addEventListener('input', function() {
        this.style.borderColor = '';
      });
    });
  });

  // ---------- Form Message Helper ----------
  function showFormMessage(form, message, type) {
    let messageEl = form.querySelector('.form-message');

    if (!messageEl) {
      messageEl = document.createElement('div');
      messageEl.className = 'form-message';
      messageEl.style.cssText = `
        padding: 12px 16px;
        border-radius: 8px;
        margin-top: 16px;
        font-weight: 500;
        text-align: center;
        font-size: 0.95rem;
      `;
      form.appendChild(messageEl);
    }

    messageEl.textContent = message;
    if (type === 'success') {
      messageEl.style.backgroundColor = 'rgba(16, 185, 129, 0.1)';
      messageEl.style.color = 'var(--color-accent-dark)';
      messageEl.style.border = '1px solid var(--color-accent)';
    } else {
      messageEl.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
      messageEl.style.color = 'var(--color-error)';
      messageEl.style.border = '1px solid var(--color-error)';
    }

    // Auto-hide after 5 seconds
    setTimeout(() => {
      if (messageEl) messageEl.remove();
    }, 5000);
  }

  // ---------- Phone number auto-formatting ----------
  const phoneInputs = document.querySelectorAll('input[type="tel"]');
  phoneInputs.forEach(input => {
    input.addEventListener('input', function(e) {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length > 10) value = value.substring(0, 10);

      if (value.length >= 6) {
        value = `(${value.substring(0,3)}) ${value.substring(3,6)}-${value.substring(6)}`;
      } else if (value.length >= 3) {
        value = `(${value.substring(0,3)}) ${value.substring(3)}`;
      }

      e.target.value = value;
    });
  });

  // ---------- Sticky header shrink on scroll ----------
  const header = document.querySelector('.header');
  let lastScroll = 0;

  if (header) {
    window.addEventListener('scroll', function() {
      const currentScroll = window.pageYOffset;

      if (currentScroll > 100) {
        header.style.boxShadow = 'var(--shadow-md)';
      } else {
        header.style.boxShadow = 'var(--shadow-sm)';
      }

      lastScroll = currentScroll;
    }, { passive: true });
  }

})();
