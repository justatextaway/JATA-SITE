document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.getElementById("navLinks");
  const hamburger = document.getElementById("hamburger");

  // 🍔 Toggle nav on hamburger click
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });
 
  // ❌ Close nav on link click
  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("show");
    });
  });
 
  // 🧩 Animate difference cards on scroll
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

  // 🔄 Animate how-we-work steps on scroll
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

  // 🎯 Animate CTA section
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



const teamMembers = document.querySelectorAll(".team-member");

const teamObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate");
      teamObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

teamMembers.forEach(member => teamObserver.observe(member));

document.addEventListener("DOMContentLoaded", () => {
  // Select all update and blog cards
  const cards = document.querySelectorAll('.update-card, .blog-card');

  // Create an Intersection Observer for fade-in effect
  const cardObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate'); // Add class to start CSS transition
        observer.unobserve(entry.target);      // Stop observing once visible
      }
    });
  }, {
    threshold: 0.2  // Trigger when 20% of the card is visible
  });

  // Observe each card
  cards.forEach(card => cardObserver.observe(card));
});


document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById('feedbackForm');
  const status = document.getElementById('feedbackStatus');

  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    status.textContent = "Sending...";

    const data = {
      name: form.name.value,
      message: form.message.value
    };

    try {
      const response = await fetch('/api/feedback', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      if (response.ok) {
        status.textContent = "Thank you! Your feedback was sent for review.";
        form.reset();
      } else {
        status.textContent = "Failed to send. Please try again.";
      }
    } catch (err) {
      status.textContent = "Failed to send. Please try again.";
    }
  });
});

