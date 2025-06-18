// Portfolio Website JavaScript
// DOM Content Loaded Event
document.addEventListener("DOMContentLoaded", function () {
  // Initialize all functionality
  initializeLoading();
  initializeScrollProgress();
  initializeNavigation();
  initializeScrollReveal();
  initializeContactForm();
  initializeScrollToTop();
  initializeParallaxEffects();
});

// Loading Screen
function initializeLoading() {
  const loading = document.getElementById("loading");

  // Hide loading screen after page loads
  window.addEventListener("load", function () {
    setTimeout(() => {
      loading.style.opacity = "0";
      setTimeout(() => {
        loading.style.display = "none";
      }, 500);
    }, 1000);
  });
}

// Scroll Progress Bar
function initializeScrollProgress() {
  const scrollProgress = document.getElementById("scrollProgress");

  window.addEventListener("scroll", function () {
    const windowHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.width = scrolled + "%";
  });
}

// Navigation Functionality
function initializeNavigation() {
  const navbar = document.getElementById("navbar");
  const navLinks = document.querySelectorAll(".nav-links a");

  // Navbar scroll effect
  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      navbar.style.background = "rgba(10, 10, 15, 0.95)";
      navbar.style.backdropFilter = "blur(20px)";
    } else {
      navbar.style.background = "rgba(10, 10, 15, 0.9)";
      navbar.style.backdropFilter = "blur(20px)";
    }
  });

  // Smooth scrolling for navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });

  // Active navigation link highlighting
  window.addEventListener("scroll", function () {
    const sections = document.querySelectorAll("section");
    const scrollPos = window.scrollY + 100;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  });
}

// Scroll Reveal Animation
function initializeScrollReveal() {
  const revealElements = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });

  // Animate skill tags on scroll
  const skillTags = document.querySelectorAll(".skill-tag");
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const tags = entry.target.querySelectorAll(".skill-tag");
        tags.forEach((tag, index) => {
          setTimeout(() => {
            tag.style.transform = "scale(1)";
            tag.style.opacity = "1";
          }, index * 100);
        });
      }
    });
  });

  document.querySelectorAll(".skill-card").forEach((card) => {
    skillObserver.observe(card);
  });
}

// Contact Form Handling
function initializeContactForm() {
  const contactForm = document.getElementById("contactForm");
  const emailLink = document.getElementById("email-link");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(contactForm);
      const name = formData.get("name");
      const email = formData.get("email");
      const subject = formData.get("subject");
      const message = formData.get("message");

      // Create mailto link with form data
      const mailtoLink = `mailto:sayedibrahim4u@gmail.com?subject=${encodeURIComponent(
        subject || "Contact from Portfolio"
      )}&body=${encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
      )}`;

      // Open email client
      window.location.href = mailtoLink;

      // Show success message
      showNotification(
        "Thank you! Your email client should now open with your message.",
        "success"
      );

      // Reset form
      contactForm.reset();
    });
  }

  // Direct email link click tracking
  if (emailLink) {
    emailLink.addEventListener("click", function () {
      showNotification("Opening email client...", "info");
    });
  }
}

// Notification System
function showNotification(message, type = "info") {
  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${
              type === "success"
                ? "fa-check-circle"
                : type === "error"
                ? "fa-times-circle"
                : "fa-info-circle"
            }"></i>
            <span>${message}</span>
        </div>
    `;

  // Add styles
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${
          type === "success"
            ? "#10b981"
            : type === "error"
            ? "#ef4444"
            : "#6366f1"
        };
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;

  // Add to page
  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Remove after delay
  setTimeout(() => {
    notification.style.transform = "translateX(400px)";
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 5000);
}

// Scroll to Top Functionality
function initializeScrollToTop() {
  // Create scroll to top button
  const scrollTopBtn = document.createElement("button");
  scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  scrollTopBtn.className = "scroll-top-btn";
  scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        z-index: 1000;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
    `;

  document.body.appendChild(scrollTopBtn);

  // Show/hide based on scroll position
  window.addEventListener("scroll", function () {
    if (window.scrollY > 500) {
      scrollTopBtn.style.opacity = "1";
      scrollTopBtn.style.visibility = "visible";
    } else {
      scrollTopBtn.style.opacity = "0";
      scrollTopBtn.style.visibility = "hidden";
    }
  });

  // Scroll to top functionality
  scrollTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Hover effects
  scrollTopBtn.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-3px) scale(1.1)";
    this.style.boxShadow = "0 6px 20px rgba(99, 102, 241, 0.5)";
  });

  scrollTopBtn.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
    this.style.boxShadow = "0 4px 15px rgba(99, 102, 241, 0.3)";
  });
}

// Parallax Effects
function initializeParallaxEffects() {
  const floatingElements = document.querySelectorAll(".floating-element");

  window.addEventListener("scroll", function () {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;

    floatingElements.forEach((element, index) => {
      const speed = (index + 1) * 0.3;
      element.style.transform = `translateY(${rate * speed}px) rotate(${
        scrolled * 0.05
      }deg)`;
    });
  });
}

// Text Typing Animation
function initializeTypingAnimation() {
  const typingElements = document.querySelectorAll("[data-typing]");

  typingElements.forEach((element) => {
    const text = element.textContent;
    element.textContent = "";
    element.style.borderRight = "2px solid #6366f1";

    let i = 0;
    const typeInterval = setInterval(() => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(typeInterval);
        // Remove cursor after typing is complete
        setTimeout(() => {
          element.style.borderRight = "none";
        }, 1000);
      }
    }, 100);
  });
}

// Project Card Tilt Effect
function initializeProjectTilt() {
  const projectCards = document.querySelectorAll(".project-card");

  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) rotateX(5deg)";
      this.style.transformStyle = "preserve-3d";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) rotateX(0deg)";
    });

    card.addEventListener("mousemove", function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;

      this.style.transform = `translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
  });
}

// Cursor Trail Effect
function initializeCursorTrail() {
  const cursor = document.createElement("div");
  cursor.className = "cursor-trail";
  cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, rgba(99, 102, 241, 0.8) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
    `;

  document.body.appendChild(cursor);

  document.addEventListener("mousemove", function (e) {
    cursor.style.left = e.clientX - 10 + "px";
    cursor.style.top = e.clientY - 10 + "px";
  });

  // Hide cursor trail on mobile
  if (window.innerWidth <= 768) {
    cursor.style.display = "none";
  }
}

// Form Field Animations
function initializeFormAnimations() {
  const formGroups = document.querySelectorAll(".form-group");

  formGroups.forEach((group) => {
    const input = group.querySelector("input, textarea, select");
    const label = group.querySelector("label");

    if (input && label) {
      input.addEventListener("focus", function () {
        label.style.color = "#6366f1";
        label.style.transform = "translateY(-5px)";
      });

      input.addEventListener("blur", function () {
        if (!this.value) {
          label.style.color = "#ffffff";
          label.style.transform = "translateY(0)";
        }
      });
    }
  });
}

// Initialize additional features when DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  // Add a small delay to ensure all elements are rendered
  setTimeout(() => {
    initializeTypingAnimation();
    initializeProjectTilt();
    initializeCursorTrail();
    initializeFormAnimations();
  }, 500);
});

// Smooth scroll polyfill for older browsers
if (!window.CSS || !CSS.supports("scroll-behavior", "smooth")) {
  const script = document.createElement("script");
  script.src =
    "https://cdnjs.cloudflare.com/ajax/libs/smoothscroll/1.4.10/SmoothScroll.min.js";
  document.head.appendChild(script);
}

// Performance optimization
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Optimize scroll events
const optimizedScrollHandler = debounce(function () {
  // Scroll-based animations can be added here
}, 10);

window.addEventListener("scroll", optimizedScrollHandler);

// Error handling
window.addEventListener("error", function (e) {
  console.warn("Portfolio JS Error:", e.error);
});

// Console welcome message
console.log(
  `
%c👋 Welcome to Sayed Ibrahim's Portfolio!
%cThanks for exploring the code. 
Feel free to reach out if you have any questions!
Email: sayedibrahim4u@gmail.com
`,
  "color: #6366f1; font-size: 16px; font-weight: bold;",
  "color: #8b5cf6; font-size: 14px;"
);
