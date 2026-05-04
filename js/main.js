/* ===============================================
   1st Global Air Duct Cleaning - Main JavaScript
   =============================================== */

(function() {
  'use strict';

  const REVIEW_DATA = [
    {
      author: 'Sarah M.',
      location: 'Chesterfield, MO',
      platform: 'Google',
      time: '2 weeks ago',
      text: 'Outstanding work from start to finish. The technicians showed up on time, walked me through the entire process, and the difference in our home\'s air quality is unbelievable. We have two dogs and someone in the family with asthma, and the change was immediate.'
    },
    {
      author: 'Mike R.',
      location: 'St. Louis, MO',
      platform: 'Google',
      text: 'Honest pricing, great communication, and they actually showed me before-and-after photos of the ducts. Worth every penny. Will be using them annually for dryer vent cleaning.'
    },
    {
      author: 'Jennifer L.',
      location: 'Chesterfield, MO',
      platform: 'Yelp',
      text: 'We just moved into our home in Chesterfield and you wouldn\'t believe the dust they pulled out of the ducts. Professional, friendly, and respectful of our home. Highly recommend.'
    },
    {
      author: 'David K.',
      location: 'Kirkwood, MO',
      platform: 'BBB',
      text: 'After years of putting it off, I finally got our ducts cleaned. The team at 1st Global was thorough, courteous, and the price matched the estimate exactly. No surprises. Will recommend to neighbors.'
    },
    {
      author: 'Amanda T.',
      location: "O'Fallon, MO",
      platform: 'Google',
      text: 'Called them about a dryer that was taking forever to dry clothes. They came out the same day, found a serious lint blockage in the vent line, and cleaned it out completely. Dryer works like new and they probably saved us from a fire.'
    },
    {
      author: 'Robert H.',
      location: 'Webster Groves, MO',
      platform: 'HomeAdvisor',
      text: 'Mor and his crew are the real deal. Family-owned, fair pricing, and they treat your home like it\'s their own. We\'ve used them three times now across two houses. They\'ve earned a customer for life.'
    },
    {
      author: 'Linda P.',
      location: 'Ladue, MO',
      platform: 'Google',
      text: 'I have terrible spring allergies and was sneezing every time the AC kicked on. After they cleaned the ducts, the difference in two days was like night and day. Highly recommend for anyone with allergies.'
    },
    {
      author: 'Chris W.',
      location: 'Edwardsville, IL',
      platform: 'Thumbtack',
      text: 'Got quotes from three companies. 1st Global was not the cheapest and not the most expensive but they were the only ones who actually inspected the ducts before quoting. That told me everything I needed to know. Great work.'
    },
    {
      author: 'Karen S.',
      location: 'Florissant, MO',
      platform: 'Google',
      text: 'Fast scheduling, polite team, clean job. They wore booties indoors, protected the floors, and left zero mess. The before-and-after photos were eye-opening. I had no idea our ducts were that bad.'
    },
    {
      author: 'Tom B.',
      location: 'University City, MO',
      platform: 'Yelp',
      text: 'Bought a 1950s home in University City. Decades of dust, fur, and who knows what else came out of those ducts. Felt like a new house when they were done. Already booked them for the dryer vent.'
    },
    {
      author: 'Patricia D.',
      location: 'Belleville, IL',
      platform: 'BBB',
      text: 'Great experience from the first phone call to the final walkthrough. Mor answered all my questions, the techs explained everything, and the price was fair. I\'ll be referring them to my whole family.'
    },
    {
      author: 'Elaine M.',
      location: 'Clayton, MO Office Manager',
      platform: 'Google',
      text: 'Hired them for our small office building. Worked around our hours, finished in one day, and our staff noticed the air felt fresher within a week. We\'ll have them back annually.'
    }
  ];

  const REVIEW_AVATAR_COLORS = ['#4285F4', '#EA4335', '#FBBC04', '#34A853', '#0A4D8C', '#10B981', '#7C3AED', '#D97706'];

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

  // ---------- Reviews Widget ----------
  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function getReviewInitials(name) {
    return name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  }

  function getAvatarColor(name) {
    const hash = name.split('').reduce((total, char) => total + char.charCodeAt(0), 0);
    return REVIEW_AVATAR_COLORS[hash % REVIEW_AVATAR_COLORS.length];
  }

  function getReviewPages(totalPages, currentPage) {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    const pages = [1];
    const start = Math.max(2, currentPage);
    const end = Math.min(totalPages - 1, currentPage + 2);

    if (start > 2) {
      pages.push('ellipsis-start');
    }

    for (let page = start; page <= end; page += 1) {
      pages.push(page);
    }

    if (end < totalPages - 1) {
      pages.push('ellipsis-end');
    }

    pages.push(totalPages);
    return pages;
  }

  function createReviewCard(review) {
    const timeMarkup = review.time ? `<span class="review-widget-time">${escapeHtml(review.time)}</span>` : '';
    return `
      <article class="review-widget-card" aria-label="Review by ${escapeHtml(review.author)}">
        <div class="review-widget-card-header">
          <div class="review-widget-avatar" style="background:${getAvatarColor(review.author)};">${escapeHtml(getReviewInitials(review.author))}</div>
          <div class="review-widget-author">
            <strong>${escapeHtml(review.author)}</strong>
            <span>${escapeHtml(review.location)}</span>
          </div>
          <span class="review-widget-platform">${escapeHtml(review.platform)}</span>
        </div>
        <div class="review-widget-meta">
          <span class="review-widget-stars" aria-hidden="true">★★★★★</span>
          ${timeMarkup}
        </div>
        <p class="review-widget-text">${escapeHtml(review.text)}</p>
      </article>
    `;
  }

  function initReviewsWidget(widget) {
    const filterAttr = widget.getAttribute('data-review-filter') || 'all';
    const filters = filterAttr
      .split(',')
      .map(value => value.trim().toLowerCase())
      .filter(Boolean);

    const reviews = filters.includes('all') || filters.length === 0
      ? REVIEW_DATA
      : REVIEW_DATA.filter(review => filters.includes(review.platform.toLowerCase()));

    const track = widget.querySelector('[data-reviews-track]');
    const status = widget.querySelector('[data-reviews-status]');
    const pagination = widget.querySelector('[data-reviews-pagination]');
    const prevButton = widget.querySelector('[data-reviews-prev]');
    const nextButton = widget.querySelector('[data-reviews-next]');

    if (!track || !status || !pagination || !prevButton || !nextButton || reviews.length === 0) {
      return;
    }

    let currentPage = 1;
    const totalPages = reviews.length;

    function renderPagination() {
      pagination.innerHTML = getReviewPages(totalPages, currentPage).map(page => {
        if (typeof page !== 'number') {
          return '<span class="reviews-widget-ellipsis" aria-hidden="true">...</span>';
        }

        const isActive = page === currentPage;
        return `<button type="button" class="reviews-widget-page${isActive ? ' is-active' : ''}" data-review-page="${page}" aria-label="Go to review ${page}"${isActive ? ' aria-current="page"' : ''}>${page}</button>`;
      }).join('');
    }

    function render() {
      const review = reviews[currentPage - 1];
      track.innerHTML = createReviewCard(review);
      status.textContent = `Review ${currentPage} of ${totalPages}`;
      prevButton.disabled = currentPage === 1;
      nextButton.disabled = currentPage === totalPages;
      renderPagination();
    }

    prevButton.addEventListener('click', function() {
      if (currentPage > 1) {
        currentPage -= 1;
        render();
      }
    });

    nextButton.addEventListener('click', function() {
      if (currentPage < totalPages) {
        currentPage += 1;
        render();
      }
    });

    pagination.addEventListener('click', function(event) {
      const pageButton = event.target.closest('[data-review-page]');
      if (!pageButton) {
        return;
      }

      currentPage = Number(pageButton.getAttribute('data-review-page'));
      render();
    });

    render();
  }

  document.querySelectorAll('[data-reviews-widget]').forEach(initReviewsWidget);

  // ---------- Form Validation & Submission ----------
  // Forms with action set to a real endpoint (e.g., FormSubmit) will submit normally
  // when validation passes. Forms with action="#" or empty get the legacy fake-success
  // behavior so the dev preview still shows feedback.
  const forms = document.querySelectorAll('form');

  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
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
        e.preventDefault();
        showFormMessage(form, 'Please fill in all required fields correctly.', 'error');
        return;
      }

      // If the form has a real action URL, let it submit naturally to the server.
      const action = form.getAttribute('action');
      const hasRealAction = action && action !== '#' && action.trim() !== '';

      if (hasRealAction) {
        // Disable submit button to prevent double-submit while the request is in flight.
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = 'Sending...';
        }
        return; // allow native submission
      }

      // Fallback (no real action set): show fake success and reset
      e.preventDefault();
      showFormMessage(form, '✓ Thank you! We\'ll respond within 30 minutes during business hours.', 'success');
      setTimeout(() => { form.reset(); }, 3000);
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

  // ---------- Video Play Button ----------
  const playOverlays = document.querySelectorAll('.play-overlay');
  playOverlays.forEach(overlay => {
    overlay.addEventListener('click', function() {
      const video = this.parentElement.querySelector('video');
      if (video) {
        video.play();
        video.setAttribute('controls', '');
        this.classList.add('hidden');
      }
    });
  });

  // ---------- Before/After Image Sliders ----------
  function initBeforeAfterSlider(slider) {
    let isDragging = false;

    function setPos(clientX) {
      const rect = slider.getBoundingClientRect();
      let percentage = ((clientX - rect.left) / rect.width) * 100;
      percentage = Math.max(0, Math.min(100, percentage));
      slider.style.setProperty('--pos', percentage + '%');
      slider.setAttribute('aria-valuenow', Math.round(percentage));
    }

    function getX(e) {
      if (e.touches && e.touches.length > 0) return e.touches[0].clientX;
      if (e.changedTouches && e.changedTouches.length > 0) return e.changedTouches[0].clientX;
      return e.clientX;
    }

    function onStart(e) {
      isDragging = true;
      slider.classList.add('is-dragging');
      setPos(getX(e));
      if (e.cancelable) e.preventDefault();
    }

    function onMove(e) {
      if (!isDragging) return;
      setPos(getX(e));
      if (e.cancelable) e.preventDefault();
    }

    function onEnd() {
      isDragging = false;
      slider.classList.remove('is-dragging');
    }

    // Mouse events on slider
    slider.addEventListener('mousedown', onStart);

    // Touch events on slider
    slider.addEventListener('touchstart', onStart, { passive: false });

    // Move/End on window so dragging continues even outside slider
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onEnd);
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('touchend', onEnd);
    window.addEventListener('touchcancel', onEnd);

    // Initial position
    slider.style.setProperty('--pos', '50%');

    // Accessibility
    slider.setAttribute('tabindex', '0');
    slider.setAttribute('role', 'slider');
    slider.setAttribute('aria-label', 'Drag to compare before and after images');
    slider.setAttribute('aria-valuemin', '0');
    slider.setAttribute('aria-valuemax', '100');
    slider.setAttribute('aria-valuenow', '50');

    slider.addEventListener('keydown', function(e) {
      const currentPos = parseFloat(slider.style.getPropertyValue('--pos')) || 50;
      let newPos = currentPos;
      if (e.key === 'ArrowLeft') newPos = Math.max(0, currentPos - 5);
      if (e.key === 'ArrowRight') newPos = Math.min(100, currentPos + 5);
      if (e.key === 'Home') newPos = 0;
      if (e.key === 'End') newPos = 100;
      if (newPos !== currentPos) {
        slider.style.setProperty('--pos', newPos + '%');
        slider.setAttribute('aria-valuenow', Math.round(newPos));
        e.preventDefault();
      }
    });
  }

  // Initialize all sliders on the page
  document.querySelectorAll('.ba-slider').forEach(initBeforeAfterSlider);

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
