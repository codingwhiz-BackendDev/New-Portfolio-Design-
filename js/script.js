document.addEventListener("DOMContentLoaded", function() {
    // Preloader
    window.addEventListener("load", function() {
        document.querySelector(".preloader").classList.add("hidden");
    });

    // Sticky Header
    window.addEventListener("scroll", function() {
        const header = document.querySelector(".header");
        if (this.scrollY > 50) {
            header.classList.add("sticky");
        } else {
            header.classList.remove("sticky");
        }
    });

    // Typing Animation
    const typed = new Typed("#typing-text", {
        strings: ["Backend Developer", "Web Developer", "Python Developer", "Django Expert"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    // Navigation - Fix for mobile toggle
    const navToggler = document.querySelector(".nav-toggler");
    const nav = document.querySelector(".nav");

    // Make sure the toggle button is working
    navToggler.addEventListener("click", function() {
        navToggler.classList.toggle("open");
        nav.classList.toggle("open");
        console.log("Nav toggler clicked"); // For debugging
    });

    // Close menu when clicking on nav links
    document.querySelectorAll(".nav a").forEach(link => {
        link.addEventListener("click", function() {
            navToggler.classList.remove("open");
            nav.classList.remove("open");
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute("href");
            if (targetId === "#") return;
            
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 70,
                    behavior: "smooth"
                });
            }
        });
    });

    // Update active nav link on scroll
    window.addEventListener("scroll", function() {
        const sections = document.querySelectorAll("section");
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute("id");
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll(".nav a").forEach(navLink => {
                    navLink.classList.remove("active");
                    if (navLink.getAttribute("href") === "#" + sectionId) {
                        navLink.classList.add("active");
                    }
                });
            }
        });
    });

    // Animate skills progress bars
    function animateSkills() {
        const skillsSection = document.querySelector("#about");
        const progressBars = document.querySelectorAll(".progress-in");
        
        // Set initial width to 0 and store target width in CSS variable
        progressBars.forEach(progressBar => {
            const value = progressBar.getAttribute("data-value");
            progressBar.style.setProperty('--progress-width', value + '%');
            progressBar.style.width = "0%";
        });
        
        // Function to animate progress bars
        function animateProgressBars() {
            progressBars.forEach(progressBar => {
                const value = progressBar.getAttribute("data-value");
                progressBar.style.width = value + "%";
            });
        }
        
        // Use Intersection Observer if available
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateProgressBars();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2 });
            
            observer.observe(skillsSection);
        } else {
            // Fallback for browsers that don't support Intersection Observer
            animateProgressBars();
        }
        
        // Also trigger animation when the section becomes visible through scrolling
        window.addEventListener('scroll', function() {
            const rect = skillsSection.getBoundingClientRect();
            const isVisible = (rect.top <= window.innerHeight && rect.bottom >= 0);
            if (isVisible) {
                animateProgressBars();
            }
        });
    }

    // Call the function to animate skills
    animateSkills();

    // Portfolio Filter
    const filterButtons = document.querySelectorAll(".portfolio-filter button");
    const portfolioItems = document.querySelectorAll(".portfolio-card");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove("active"));
            // Add active class to clicked button
            button.classList.add("active");

            const filterValue = button.getAttribute("data-filter");

            portfolioItems.forEach(item => {
                if (filterValue === "all" || item.getAttribute("data-category") === filterValue) {
                    item.style.display = "block";
                    setTimeout(() => {
                        item.style.opacity = "1";
                        item.style.transform = "scale(1)";
                    }, 100);
                } else {
                    item.style.opacity = "0";
                    item.style.transform = "scale(0.8)";
                    setTimeout(() => {
                        item.style.display = "none";
                    }, 300);
                }
            });
        });
    });

    // Portfolio Details Popup
    const portfolioDetailsButtons = document.querySelectorAll(".portfolio-details");
    portfolioDetailsButtons.forEach(button => {
        button.addEventListener("click", function(e) {
            e.preventDefault();
            const imgSrc = this.getAttribute("href");
            const portfolioOverlay = this.closest(".portfolio-overlay");
            const title = portfolioOverlay.querySelector("h4").textContent;
            const description = portfolioOverlay.querySelector("p").textContent;
            
            // Create modal
            const modal = document.createElement("div");
            modal.classList.add("portfolio-modal");
            modal.innerHTML = `
                <div class="portfolio-modal-content">
                    <span class="close-modal">&times;</span>
                    <h2>${title}</h2>
                    <img src="${imgSrc}" alt="${title}">
                    <p>${description}</p>
                </div>
            `;
            document.body.appendChild(modal);
            
            // Close modal
            const closeModal = modal.querySelector(".close-modal");
            closeModal.addEventListener("click", () => {
                modal.remove();
            });
            
            // Close modal when clicking outside
            modal.addEventListener("click", (e) => {
                if (e.target === modal) {
                    modal.remove();
                }
            });
        });
    });

    // Email sending function
    window.sendMail = function() {
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const subject = document.getElementById("subject").value;
        const message = document.getElementById("message").value;
        
        if (!name || !email || !subject || !message) {
            alert("Please fill all fields");
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address");
            return;
        }
        
        // Here you would typically send the email using a service
        // For demonstration, we'll just show a success message
        alert("Thank you for your message! I will get back to you soon.");
        
        // Clear form
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("subject").value = "";
        document.getElementById("message").value = "";
    };
});

document.addEventListener("DOMContentLoaded", function() {
  // Add reveal classes to elements you want to animate
  const sections = document.querySelectorAll(".section");
  sections.forEach(section => {
    section.classList.add("reveal");
  });
  
  // Add specific animation classes to different elements
  document.querySelectorAll(".service-card").forEach((card, index) => {
    card.classList.add("reveal-scale");
    card.classList.add(`delay-${index % 5 + 1}`);
  });
  
  document.querySelectorAll(".achievement-card").forEach((card, index) => {
    card.classList.add("reveal-scale");
    card.classList.add(`delay-${index % 5 + 1}`);
  });
  
  document.querySelectorAll(".portfolio-card").forEach((card, index) => {
    card.classList.add("reveal");
    card.classList.add(`delay-${index % 5 + 1}`);
  });
  
  document.querySelectorAll(".contact-card").forEach((card, index) => {
    card.classList.add("reveal-scale");
    card.classList.add(`delay-${index % 5 + 1}`);
  });
  
  document.querySelectorAll(".timeline-card").forEach((card, index) => {
    if (index % 2 === 0) {
      card.classList.add("reveal-left");
    } else {
      card.classList.add("reveal-right");
    }
  });
  
  document.querySelectorAll(".skill-item").forEach((item, index) => {
    item.classList.add("reveal");
    item.classList.add(`delay-${index % 5 + 1}`);
  });
  
  // Function to check if element is in viewport
  function checkReveal() {
    const reveals = document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale");
    
    reveals.forEach(reveal => {
      const elementTop = reveal.getBoundingClientRect().top;
      const elementVisible = 150; // Adjust this value to change when the element becomes visible
      
      if (elementTop < window.innerHeight - elementVisible) {
        reveal.classList.add("active");
      } else {
        // Uncomment the line below if you want elements to hide again when scrolled away
        // reveal.classList.remove("active");
      }
    });
  }
  
  // Add scroll event listener
  window.addEventListener("scroll", checkReveal);
  
  // Check on initial load
  checkReveal();
});