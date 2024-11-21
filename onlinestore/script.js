document.addEventListener("DOMContentLoaded", () => {
  // Contact form handling
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      // Simple validation
      if (!name || !email || !message) {
        alert("All fields are required.");
        return;
      }

      if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return;
      }

      // Mock API submission for contact form
      const formData = {
        name: name,
        email: email,
        message: message,
      };

      fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => {
          if (response.ok) {
            alert("Message sent successfully!");
            contactForm.reset();
          } else {
            alert("Failed to send message. Please try again later.");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("An error occurred. Please try again later.");
        });
    });

    function validateEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
  }

  // Product modal handling
  const products = {
    "High-Performance Laptop": {
      image: "images/laptop1.jpg",
      description: "Ideal for gaming, content creation, and design professionals.",
      price: "50 000 ksh",
    },
    "Business Laptop": {
      image: "images/laptop2.jpg",
      description: "Lightweight, efficient, and secure for professionals.",
      price: "40 000 ksh",
    },
    "Portable Laptop": {
      image: "images/laptop3.jpg",
      description: "Ultra-thin and lightweight, perfect for travel.",
      price: "45 000 ksh",
    },
    "Students Laptop": {
      image: "images/laptop4.jpg",
      description: "Affordable and reliable for students.",
      price: "50 000 ksh",
    },
    "Gaming Laptop": {
      image: "images/laptop5.jpg",
      description: "Equipped with high-end graphics for serious gamers.",
      price: "70 000 ksh",
    },
    "Ultrabook Laptop": {
      image: "images/laptop6.jpg",
      description: "Sleek design with powerful performance.",
      price: "80 000 ksh",
    },
  };

  const modal = document.getElementById("productModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalImage = document.getElementById("modalImage");
  const modalDescription = document.getElementById("modalDescription");
  const modalPrice = document.getElementById("modalPrice");
  const closeModal = document.querySelector(".close");
  const buyNowButton = document.querySelector(".buy-now-btn");

  function openModal(productName) {
    const product = products[productName];
    if (product) {
      modalTitle.textContent = productName;
      modalImage.src = product.image;
      modalDescription.textContent = product.description;
      modalPrice.textContent = product.price;
      modal.style.display = "flex";

      // Buy Now button functionality
      buyNowButton.onclick = () => {
        alert(`You have selected ${productName} for purchase!`);
        modal.style.display = "none"; // Close modal after purchase
      };
    }
  }

  document.querySelectorAll(".product-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const productName = btn.parentElement.querySelector("h3").textContent;
      openModal(productName);
    });
  });

  // Close modal
  if (closeModal) {
    closeModal.addEventListener("click", () => {
      modal.style.display = "none";
    });
  }

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  // Trap focus within modal
  modal.addEventListener("keydown", (event) => {
    const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.key === "Tab") {
      if (event.shiftKey && document.activeElement === firstElement) {
        lastElement.focus();
        event.preventDefault();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        firstElement.focus();
        event.preventDefault();
      }
    }

    if (event.key === "Escape") {
      modal.style.display = "none";
    }
  });

  // Carousel/slideshow handling
  const slides = document.querySelectorAll(".slide");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.style.transform = `translateX(${100 * (i - index)}%)`; // This controls the sliding effect
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  }

  if (nextBtn && prevBtn && slides.length > 0) {
    nextBtn.addEventListener("click", nextSlide);
    prevBtn.addEventListener("click", prevSlide);
    setInterval(nextSlide, 5000); // Auto-slide every 5 seconds
    showSlide(currentSlide); // Initial display
  }

  // Hamburger menu toggle for mobile navigation
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("open");
      hamburger.classList.toggle("active");
    });
  }
});
