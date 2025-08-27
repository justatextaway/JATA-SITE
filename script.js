document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.getElementById("navLinks");
  const hamburger = document.getElementById("hamburger");
  const navOverlay = document.getElementById("navOverlay");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      const isExpanded = hamburger.getAttribute("aria-expanded") === "true";
      hamburger.setAttribute("aria-expanded", !isExpanded);
      navLinks.classList.toggle("show");
      if (navOverlay) navOverlay.classList.toggle("show");
      document.body.classList.toggle('menu-open', !isExpanded);
    });

    document.querySelectorAll(".nav-links a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("show");
        hamburger.setAttribute("aria-expanded", "false");
        if (navOverlay) navOverlay.classList.remove("show");
        document.body.classList.remove('menu-open');
      });
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && navLinks.classList.contains("show")) {
        navLinks.classList.remove("show");
        hamburger.setAttribute("aria-expanded", "false");
        if (navOverlay) navOverlay.classList.remove("show");
        document.body.classList.remove('menu-open');
      }
    });
    if (navOverlay) {
      navOverlay.addEventListener('click', () => {
        navLinks.classList.remove('show');
        hamburger.setAttribute('aria-expanded', 'false');
        navOverlay.classList.remove('show');
        document.body.classList.remove('menu-open');
      });
    }
  }
 
  const diffCards = document.querySelectorAll(".diff-card");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  diffCards.forEach(card => observer.observe(card));

  const steps = document.querySelectorAll(".step");

  const stepObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
        stepObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  steps.forEach(step => stepObserver.observe(step));

  const ctaSection = document.querySelector(".cta-join");

  const ctaObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
        ctaObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  if (ctaSection) ctaObserver.observe(ctaSection);

  const teamMembers = document.querySelectorAll(".team-member");
  if (teamMembers.length > 0) {
    const teamObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
          teamObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    teamMembers.forEach(member => teamObserver.observe(member));
  }

  const cards = document.querySelectorAll('.update-card, .blog-card');
  if (cards.length > 0) {
    const cardObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate'); 
          observer.unobserve(entry.target);      
        }
      });
    }, { threshold: 0.2 });

    cards.forEach(card => cardObserver.observe(card));
  }

  const filterButtons = document.querySelectorAll('.filter-btn');
  const blogsContainer = document.getElementById('blogsContainer');
  const blogSearch = document.getElementById('blogSearch');
  if (filterButtons.length && blogsContainer) {
    const blogCards = Array.from(blogsContainer.querySelectorAll('.blog-card'));

    const applyFilters = () => {
      const activeBtn = document.querySelector('.filter-btn.active');
      const activeFilter = activeBtn ? activeBtn.getAttribute('data-filter') : 'all';
      const term = (blogSearch && blogSearch.value || '').toLowerCase().trim();

      blogCards.forEach(card => {
        const category = card.getAttribute('data-category');
        const title = (card.getAttribute('data-title') || '').toLowerCase();
        const matchesCategory = activeFilter === 'all' || category === activeFilter;
        const matchesSearch = term === '' || title.includes(term);
        const show = matchesCategory && matchesSearch;
        card.style.display = show ? '' : 'none';
      });
    };

    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        applyFilters();
      });
    });

    if (blogSearch) {
      blogSearch.addEventListener('input', applyFilters);
    }
  }

  const form = document.getElementById('feedbackForm');
  const status = document.getElementById('feedbackStatus');
  
  if (form && status) {
    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      // Update status and disable form during submission
      status.textContent = "Sending...";
      status.setAttribute('role', 'status');
      status.setAttribute('aria-live', 'polite');
      
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.disabled = true;

      const data = {
        name: form.name.value.trim(),
        message: form.message.value.trim()
      };

      try {
        const response = await fetch('/api/feedback', {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        });
        
        if (response.ok) {
          const result = await response.json();
          status.textContent = "Thank you! Your feedback was sent successfully.";
          status.className = 'success-message';
          form.reset();
        } else {
          const error = await response.json();
          status.textContent = error.error || "Failed to send. Please try again.";
          status.className = 'error-message';
        }
      } catch (err) {
        console.error('Feedback submission error:', err);
        status.textContent = "Network error. Please check your connection and try again.";
        status.className = 'error-message';
      } finally {
        // Re-enable form
        if (submitBtn) submitBtn.disabled = false;
      }
    });
  }
});

