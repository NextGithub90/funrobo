// ===== GLOBAL VARIABLES =====
let navbar = null;
let heroSection = null;
let contactForm = null;
let whatsappBtn = null;
let gallerySwiper = null;

// ===== DOM CONTENT LOADED =====
document.addEventListener("DOMContentLoaded", function () {
  // Initialize variables
  navbar = document.getElementById("mainNav");
  heroSection = document.getElementById("home");
  contactForm = document.getElementById("contactForm");
  whatsappBtn = document.getElementById("whatsappBtn");

  // Initialize all functions
  initAOS();
  initSwiper();
  initNavbar();
  initSmoothScrolling();
  initContactForm();
  initWhatsApp();
  initCounterAnimation();
  initLazyLoading();
  initScrollToTop();

  console.log("Excellence Tutoring Center - Website Loaded Successfully!");
});

// ===== AOS ANIMATION INITIALIZATION =====
function initAOS() {
  AOS.init({
    duration: 1000,
    easing: "ease-in-out",
    once: true,
    mirror: false,
    offset: 100,
    delay: 0,
    anchorPlacement: "top-bottom",
  });
}

// ===== SWIPER GALLERY INITIALIZATION =====
function initSwiper() {
  gallerySwiper = new Swiper(".gallery-swiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    loopFillGroupWithBlank: false,
    centeredSlides: false,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    pagination: {
      el: ".gallery-swiper .swiper-pagination",
      clickable: true,
      dynamicBullets: true,
      dynamicMainBullets: 3,
    },
    navigation: {
      nextEl: ".gallery-swiper .swiper-button-next",
      prevEl: ".gallery-swiper .swiper-button-prev",
      disabledClass: "swiper-button-disabled",
    },
    breakpoints: {
      640: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
    effect: "slide",
    speed: 600,
    grabCursor: true,
    touchRatio: 1,
    touchAngle: 45,
    simulateTouch: true,
    allowTouchMove: true,
    resistance: true,
    resistanceRatio: 0.85,
    watchSlidesProgress: true,
    watchSlidesVisibility: true,
    observer: true,
    observeParents: true,
    updateOnWindowResize: true,
    on: {
      init: function () {
        console.log("Swiper initialized with", this.slides.length, "slides");
      },
      slideChange: function () {
        console.log("Slide changed to:", this.activeIndex);
      },
    },
  });
}

// ===== NAVBAR FUNCTIONALITY =====
function initNavbar() {
  if (!navbar) return;

  // Navbar scroll effect
  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Mobile menu close on link click
  const navLinks = document.querySelectorAll(".nav-link");
  const navbarToggler = document.querySelector(".navbar-toggler");
  const navbarCollapse = document.querySelector(".navbar-collapse");

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navbarCollapse.classList.contains("show")) {
        navbarToggler.click();
      }
    });
  });
}

// ===== SMOOTH SCROLLING =====
function initSmoothScrolling() {
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        const offsetTop = target.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });
}

// ===== CONTACT FORM HANDLING =====
function initContactForm() {
  if (!contactForm) return;

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form data
    const formData = {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      program: document.getElementById("program").value,
      message: document.getElementById("message").value,
    };

    // Validate form
    if (validateForm(formData)) {
      // Show loading state
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = "Mengirim...";
      submitBtn.disabled = true;

      // Create WhatsApp message with form data
      let whatsappMessage = "Halo! Saya tertarik dengan program Fun Robo.\n\n";
      whatsappMessage += "=== DATA PENDAFTARAN ===\n";
      whatsappMessage += `Nama: ${formData.firstName} ${formData.lastName}\n`;
      whatsappMessage += `Email: ${formData.email}\n`;
      whatsappMessage += `No. Telepon: ${formData.phone}\n`;
      
      if (formData.program) {
        const programNames = {
          "creative-building": "Creative Building (4-6 tahun)",
          "mechanical-building": "Mechanical Building (7-8 tahun)",
          "basic-robotics": "Basic Robotics (8-9 tahun)",
          "robotics": "Robotics (10-12 tahun)",
          "advanced-robotics": "Advanced Robotics (13-15 tahun)",
          "fun-coding": "Fun Coding (16-18 tahun)"
        };
        whatsappMessage += `Program yang Diminati: ${programNames[formData.program] || formData.program}\n`;
      }
      
      if (formData.message.trim()) {
        whatsappMessage += `\nPesan:\n${formData.message}\n`;
      }
      
      whatsappMessage += "\nMohon informasi lebih lanjut mengenai program dan proses pendaftaran. Terima kasih!";

      // WhatsApp number
      const phoneNumber = "+6285103553888";
      const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;

      // Redirect to WhatsApp
      setTimeout(() => {
        window.open(whatsappURL, "_blank");
        showNotification("Terima kasih! Anda akan diarahkan ke WhatsApp.", "success");
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 1000);
    }
  });
}

// ===== FORM VALIDATION =====
function validateForm(data) {
  const errors = [];

  // Required field validation
  if (!data.firstName.trim()) errors.push("First name is required");
  if (!data.lastName.trim()) errors.push("Last name is required");
  if (!data.email.trim()) errors.push("Email is required");
  if (!data.phone.trim()) errors.push("Phone is required");
  if (!data.program) errors.push("Please select a program");

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (data.email && !emailRegex.test(data.email)) {
    errors.push("Please enter a valid email address");
  }

  // Phone validation - Allow Indonesian phone numbers
  const phoneRegex = /^[\+]?[0-9][\d]{7,15}$/;
  if (data.phone && !phoneRegex.test(data.phone.replace(/[\s\-\(\)]/g, ""))) {
    errors.push("Please enter a valid phone number");
  }

  if (errors.length > 0) {
    showNotification(errors.join("<br>"), "error");
    return false;
  }

  return true;
}

// ===== WHATSAPP INTEGRATION =====
function initWhatsApp() {
  if (!whatsappBtn) return;

  whatsappBtn.addEventListener("click", function (e) {
    e.preventDefault();

    // Get form data if available
    const firstName = document.getElementById("firstName")?.value || "";
    const lastName = document.getElementById("lastName")?.value || "";
    const email = document.getElementById("email")?.value || "";
    const phone = document.getElementById("phone")?.value || "";
    const program = document.getElementById("program")?.value || "";
    const message = document.getElementById("message")?.value || "";

    // Create WhatsApp message
    let whatsappMessage = "Halo! Saya tertarik dengan program Fun Robo.";

    if (firstName || lastName || email || phone || program) {
      whatsappMessage += "\n\n=== DATA SAYA ===\n";
      
      if (firstName || lastName) {
        whatsappMessage += `Nama: ${firstName} ${lastName}`.trim() + "\n";
      }
      
      if (email) {
        whatsappMessage += `Email: ${email}\n`;
      }
      
      if (phone) {
        whatsappMessage += `No. Telepon: ${phone}\n`;
      }
      
      if (program) {
        const programNames = {
          "creative-building": "Creative Building (4-6 tahun)",
          "mechanical-building": "Mechanical Building (7-8 tahun)",
          "basic-robotics": "Basic Robotics (8-9 tahun)",
          "robotics": "Robotics (10-12 tahun)",
          "advanced-robotics": "Advanced Robotics (13-15 tahun)",
          "fun-coding": "Fun Coding (16-18 tahun)"
        };
        whatsappMessage += `Program yang Diminati: ${programNames[program] || program}\n`;
      }
    }

    if (message) {
      whatsappMessage += `\nPesan:\n${message}\n`;
    }

    whatsappMessage += "\nMohon informasi lebih lanjut mengenai program dan proses pendaftaran. Terima kasih!";

    // WhatsApp number
    const phoneNumber = "+6285103553888";
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    // Open WhatsApp
    window.open(whatsappURL, "_blank");
  });
}

// ===== COUNTER ANIMATION =====
function initCounterAnimation() {
  const counters = document.querySelectorAll(".stat-number");
  const observerOptions = {
    threshold: 0.5,
    rootMargin: "0px 0px -100px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  counters.forEach((counter) => {
    observer.observe(counter);
  });
}

function animateCounter(element) {
  const originalText = element.textContent;

  // Skip animation for range formats (e.g., "4-18") or non-numeric text (e.g., "LEGO")
  if (originalText.includes("-") || !/^\d+[+%]?$/.test(originalText.trim())) {
    return;
  }

  const numbersOnly = originalText.replace(/[^\d]/g, "");

  // Skip animation if no numbers found
  if (!numbersOnly || numbersOnly === "") {
    return;
  }

  const target = parseInt(numbersOnly);

  // Skip animation if target is NaN or 0
  if (isNaN(target) || target === 0) {
    return;
  }

  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }

    // Format number with suffix
    let displayValue = Math.floor(current);
    if (originalText.includes("+")) {
      displayValue += "+";
    }
    if (originalText.includes("%")) {
      displayValue += "%";
    }

    element.textContent = displayValue;
  }, 16);
}

// ===== LAZY LOADING =====
function initLazyLoading() {
  const images = document.querySelectorAll("img[data-src]");

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("loading");
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => {
    img.classList.add("loading");
    imageObserver.observe(img);
  });
}

// ===== SCROLL TO TOP =====
function initScrollToTop() {
  // Get existing scroll to top button and WhatsApp button
  const scrollBtn = document.getElementById("scrollToTop");
  const whatsappBtn = document.querySelector(".whatsapp-float");

  if (!scrollBtn || !whatsappBtn) {
    console.warn("Scroll to top button or WhatsApp button not found");
    return;
  }

  // Show/hide both buttons on scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollBtn.classList.add("show");
      whatsappBtn.classList.add("show");
    } else {
      scrollBtn.classList.remove("show");
      whatsappBtn.classList.remove("show");
    }
  });

  // Scroll to top functionality
  scrollBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = "info") {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll(".notification");
  existingNotifications.forEach((notification) => notification.remove());

  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;

  // Notification styles
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        max-width: 400px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;

  // Add to DOM
  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Close functionality
  const closeBtn = notification.querySelector(".notification-close");
  closeBtn.addEventListener("click", () => {
    notification.style.transform = "translateX(100%)";
    setTimeout(() => notification.remove(), 300);
  });

  // Auto close after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.transform = "translateX(100%)";
      setTimeout(() => notification.remove(), 300);
    }
  }, 5000);
}

function getNotificationIcon(type) {
  switch (type) {
    case "success":
      return "fa-check-circle";
    case "error":
      return "fa-exclamation-circle";
    case "warning":
      return "fa-exclamation-triangle";
    default:
      return "fa-info-circle";
  }
}

function getNotificationColor(type) {
  switch (type) {
    case "success":
      return "#28a745";
    case "error":
      return "#dc3545";
    case "warning":
      return "#ffc107";
    default:
      return "#17a2b8";
  }
}

// ===== UTILITY FUNCTIONS =====

// Debounce function for performance optimization
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

// Throttle function for scroll events
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
}

// Format phone number
function formatPhoneNumber(phoneNumber) {
  const cleaned = phoneNumber.replace(/\D/g, "");
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return "(" + match[1] + ") " + match[2] + "-" + match[3];
  }
  return phoneNumber;
}

// ===== PERFORMANCE MONITORING =====
window.addEventListener("load", function () {
  // Log performance metrics
  if ("performance" in window) {
    const perfData = performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log(`Page Load Time: ${pageLoadTime}ms`);
  }
});

// ===== ERROR HANDLING =====
window.addEventListener("error", function (e) {
  console.error("JavaScript Error:", e.error);
  // You can send error reports to your analytics service here
});

// ===== ACCESSIBILITY ENHANCEMENTS =====
document.addEventListener("keydown", function (e) {
  // ESC key to close modals/notifications
  if (e.key === "Escape") {
    const notifications = document.querySelectorAll(".notification");
    notifications.forEach((notification) => {
      notification.style.transform = "translateX(100%)";
      setTimeout(() => notification.remove(), 300);
    });
  }
});

// ===== EXPORT FOR TESTING =====
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    validateForm,
    formatPhoneNumber,
    debounce,
    throttle,
    isInViewport,
  };
}
