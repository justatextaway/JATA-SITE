document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.getElementById("navLinks");
  const hamburger = document.getElementById("hamburger");
  const navOverlay = document.getElementById("navOverlay");
  const navCloseBtn = document.getElementById("navCloseBtn");
  
  // Dark mode removed

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      const isExpanded = hamburger.getAttribute("aria-expanded") === "true";
      hamburger.setAttribute("aria-expanded", !isExpanded);
      navLinks.classList.toggle("show");
      if (navOverlay) navOverlay.classList.toggle("show");
      document.body.classList.toggle('menu-open', !isExpanded);
    });
    
    // Close button functionality
    if (navCloseBtn) {
      navCloseBtn.addEventListener("click", () => {
        navLinks.classList.remove("show");
        hamburger.setAttribute("aria-expanded", "false");
        if (navOverlay) navOverlay.classList.remove("show");
        document.body.classList.remove('menu-open');
      });
    }

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
 
  // Blog search button support
  const blogSearch = document.getElementById('blogSearch');
  const blogSearchBtn = document.getElementById('blogSearchBtn');
  if (blogSearch && blogSearchBtn) {
    // Debounced input and click
    const debounce = (fn, ms = 200) => {
      let t; return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
    };
    const trigger = () => blogSearch.dispatchEvent(new Event('input'));
    blogSearch.addEventListener('input', debounce(trigger, 200));
    blogSearchBtn.addEventListener('click', (e) => { e.preventDefault(); trigger(); });
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

  // Simple site-wide search (blogs + team) if a generic search box exists
  const siteSearch = document.getElementById('siteSearch');
  const siteSearchBtn = document.getElementById('siteSearchBtn');
  if (siteSearch && siteSearchBtn) {
    siteSearchBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const term = (siteSearch.value || '').toLowerCase().trim();
      // filter blog cards if present
      const bc = document.getElementById('blogsContainer');
      if (bc) {
        Array.from(bc.querySelectorAll('.blog-card')).forEach(card => {
          const title = (card.getAttribute('data-title') || '').toLowerCase();
          card.style.display = !term || title.includes(term) ? '' : 'none';
        });
      }
      // filter team members if present
      const tm = document.querySelectorAll('.team-member');
      if (tm && tm.length) {
        tm.forEach(member => {
          const nameEl = member.querySelector('h3');
          const roleEl = member.querySelector('p');
          const text = ((nameEl && nameEl.textContent) + ' ' + (roleEl && roleEl.textContent)).toLowerCase();
          member.style.display = !term || text.includes(term) ? '' : 'none';
        });
      }
    });
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
  // blogSearch defined earlier
  if (filterButtons.length && blogsContainer) {
    // Render blogs from storage (demo)
    const readBlogs = () => { try { return JSON.parse(localStorage.getItem('jta_blogs') || '[]'); } catch (_) { return []; } };
    const writeBlogs = (list) => { try { localStorage.setItem('jta_blogs', JSON.stringify(list)); } catch (_) {} };
    const ensureSeedBlogs = () => {
      const list = readBlogs();
      if (!list.length) {
        writeBlogs([
          { title: 'Welcome to JATA', category: 'community', excerpt: 'Our mission and roadmap', date: new Date().toISOString() },
          { title: 'Coping with Exam Stress', category: 'mental-health', excerpt: 'Practical tips to stay calm', date: new Date().toISOString() }
        ]);
      }
    };
    ensureSeedBlogs();

    const renderBlogs = () => {
      blogsContainer.innerHTML = '';
      const list = readBlogs();
      if (!list.length) {
        const p = document.createElement('p'); p.className = 'coming-soon'; p.textContent = 'Blogs coming soon.'; blogsContainer.appendChild(p); return;
      }
      list.forEach(item => {
        const card = document.createElement('article');
        card.className = 'blog-card';
        card.setAttribute('data-category', item.category || 'community');
        card.setAttribute('data-title', item.title || '');
        card.innerHTML = `
          <div class="update-header">
            <span class="update-date">${new Date(item.date || Date.now()).toLocaleDateString()}</span>
          </div>
          <div class="blog-meta">
            <span class="blog-category">${item.category || 'community'}</span>
          </div>
          <h3>${item.title || ''}</h3>
          <p class="blog-excerpt">${item.excerpt || ''}</p>
        `;
        blogsContainer.appendChild(card);
      });
    };
    renderBlogs();

    // Admin-only post
    const adminPanel = document.getElementById('adminPostPanel');
    const postBlogForm = document.getElementById('postBlogForm');
    if (adminPanel) adminPanel.style.display = (window.jtaIsAdmin && window.jtaIsAdmin()) ? '' : 'none';
    if (postBlogForm) {
      postBlogForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!(window.jtaIsAdmin && window.jtaIsAdmin())) return;
        const title = document.getElementById('postTitle').value.trim();
        const category = document.getElementById('postCategory').value.trim() || 'community';
        const excerpt = document.getElementById('postExcerpt').value.trim();
        if (!title) return;
        const list = readBlogs();
        list.unshift({ title, category, excerpt, date: new Date().toISOString() });
        writeBlogs(list);
        renderBlogs();
        applyFilters();
        postBlogForm.reset();
      });
    }

    let blogCards = Array.from(blogsContainer.querySelectorAll('.blog-card'));

    const applyFilters = () => {
      const activeBtn = document.querySelector('.filter-btn.active');
      const activeFilter = activeBtn ? activeBtn.getAttribute('data-filter') : 'all';
      const term = (blogSearch && blogSearch.value || '').toLowerCase().trim();
      blogCards = Array.from(blogsContainer.querySelectorAll('.blog-card'));

      // Relevance scoring: title contains > startsWith > category match > excerpt includes
      const scoreCard = (card) => {
        if (!term) return 1;
        const title = (card.getAttribute('data-title') || '').toLowerCase();
        const category = (card.getAttribute('data-category') || '').toLowerCase();
        const excerptEl = card.querySelector('.blog-excerpt');
        const excerpt = excerptEl ? (excerptEl.textContent || '').toLowerCase() : '';
        let score = 0;
        if (title.includes(term)) score += 5;
        if (title.startsWith(term)) score += 3;
        if (category.includes(term)) score += 2;
        if (excerpt.includes(term)) score += 1;
        return score;
      };

      const matchesCategory = (card) => {
        const category = card.getAttribute('data-category');
        return activeFilter === 'all' || category === activeFilter;
      };

      blogCards.forEach(card => {
        const show = matchesCategory(card) && (term === '' || scoreCard(card) > 0);
        card.style.display = show ? '' : 'none';
      });

      // Sort by score when searching
      if (term) {
        const visible = blogCards.filter(c => c.style.display !== 'none');
        visible.sort((a, b) => scoreCard(b) - scoreCard(a));
        visible.forEach(c => blogsContainer.appendChild(c));
      }
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

  // SETTINGS: Theme toggle and auth forms
  // theme toggle removed

  // Simple client-side auth
  const DEFAULT_ADMIN_EMAIL = 'admin';
  const DEFAULT_ADMIN_PASSWORD = 'admin123';

  const authStatus = document.getElementById('authStatus');
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');
  const authedActions = document.getElementById('authedActions');
  const currentUserEmail = document.getElementById('currentUserEmail');
  const logoutBtn = document.getElementById('logoutBtn');
  const tabButtons = document.querySelectorAll('.tab-btn');
  const toggleLoginPw = document.getElementById('toggleLoginPw');
  const toggleSignupPw = document.getElementById('toggleSignupPw');

  const readUsers = () => {
    try { return JSON.parse(localStorage.getItem('jta_users') || '{}'); } catch (_) { return {}; }
  };
  const writeUsers = (obj) => {
    try { localStorage.setItem('jta_users', JSON.stringify(obj)); } catch (_) {}
  };
  const setCurrentUser = (email) => {
    try { localStorage.setItem('jta_current_user', email || ''); } catch (_) {}
  };
  const getCurrentUser = () => {
    try { return localStorage.getItem('jta_current_user'); } catch (_) { return null; }
  };

  // Ensure default admin exists
  const users = readUsers();
  if (!users[DEFAULT_ADMIN_EMAIL]) {
    users[DEFAULT_ADMIN_EMAIL] = { password: DEFAULT_ADMIN_PASSWORD, role: 'admin' };
    writeUsers(users);
  }

  const refreshAuthUI = () => {
    const email = getCurrentUser();
    const isAuthed = !!email;
    if (authStatus) authStatus.textContent = isAuthed ? 'Logged in' : 'Not logged in';
    if (authedActions) authedActions.style.display = isAuthed ? '' : 'none';
    if (currentUserEmail) currentUserEmail.textContent = email || '-';
    if (loginForm) loginForm.style.display = isAuthed ? 'none' : '';
    if (signupForm) signupForm.style.display = isAuthed ? 'none' : 'none'; // keep signup behind tab
    // Admin panel visibility if on blogs page
    const adminPanel = document.getElementById('adminPostPanel');
    if (adminPanel) adminPanel.style.display = (window.jtaIsAdmin && window.jtaIsAdmin()) ? '' : 'none';
  };

  refreshAuthUI();

  if (tabButtons && tabButtons.length) {
    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        tabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const tab = btn.getAttribute('data-tab');
        if (loginForm && signupForm) {
          if (tab === 'login') { loginForm.style.display = ''; signupForm.style.display = 'none'; }
          else { loginForm.style.display = 'none'; signupForm.style.display = ''; }
        }
      });
    });
  }

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = (loginForm.email.value || '').trim().toLowerCase();
      const password = (loginForm.password.value || '').trim();
      if (!email || !password) { if (authStatus) authStatus.textContent = 'Please fill in all fields.'; return; }
      const userMap = readUsers();
      if (userMap[email] && userMap[email].password === password) {
        setCurrentUser(email);
        if (authStatus) authStatus.textContent = 'Login successful';
        refreshAuthUI();
      } else {
        if (authStatus) authStatus.textContent = 'Invalid credentials';
      }
    });
  }

  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = (signupForm.email.value || '').trim().toLowerCase();
      const password = (signupForm.password.value || '').trim();
      if (!email || !password) { if (authStatus) authStatus.textContent = 'Please fill in all fields.'; return; }
      if (password.length < 8) { if (authStatus) authStatus.textContent = 'Password must be at least 8 characters.'; return; }
      const userMap = readUsers();
      if (userMap[email]) {
        if (authStatus) authStatus.textContent = 'User already exists';
        return;
      }
      userMap[email] = { password, role: 'member' };
      writeUsers(userMap);
    if (authStatus) authStatus.textContent = 'Signup successful. You can login now.';
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      setCurrentUser('');
      refreshAuthUI();
    });
  }

  // Toggle password visibility buttons
  const setupPwToggle = (btn, input) => {
    if (!btn || !input) return;
    btn.addEventListener('click', () => {
      const isPwd = input.type === 'password';
      input.type = isPwd ? 'text' : 'password';
      btn.innerHTML = isPwd ? '<i class="fas fa-eye-slash"></i>' : '<i class="fas fa-eye"></i>';
    });
  };
  setupPwToggle(toggleLoginPw, document.getElementById('loginPassword'));
  setupPwToggle(toggleSignupPw, document.getElementById('signupPassword'));

  // Expose small helper for protected areas (if needed later)
  window.jtaIsAdmin = () => {
    const email = getCurrentUser();
    const userMap = readUsers();
    return !!(email && userMap[email] && userMap[email].role === 'admin');
  };

  // Ensure UI reflects admin helper availability
  if (typeof refreshAuthUI === 'function') {
    refreshAuthUI();
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

