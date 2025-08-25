document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.getElementById("navLinks");
  const hamburger = document.getElementById("hamburger");

  // Toggle nav on hamburger click with accessibility
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      const isExpanded = hamburger.getAttribute("aria-expanded") === "true";
      hamburger.setAttribute("aria-expanded", !isExpanded);
      navLinks.classList.toggle("show");
    });

    // Close nav on link click
    document.querySelectorAll(".nav-links a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("show");
        hamburger.setAttribute("aria-expanded", "false");
      });
    });

    // Close nav on escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && navLinks.classList.contains("show")) {
        navLinks.classList.remove("show");
        hamburger.setAttribute("aria-expanded", "false");
      }
    });
  }
 
  // Animate difference cards on scroll
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

  // Animate how-we-work steps on scroll
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

  // Animate CTA section
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
});

  // Animate team members on scroll
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

  // Animate update and blog cards on scroll
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

  // Handle feedback form submission
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

