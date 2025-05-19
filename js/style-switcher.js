/*==================== Style Switcher ====================*/
document.addEventListener("DOMContentLoaded", function() {
    const styleSwitcherToggle = document.querySelector(".style-switcher-toggle");
    const styleSwitcher = document.querySelector(".style-switcher");
    const alternateStyles = document.querySelectorAll(".alternate-style");
    const dayNight = document.querySelector(".day-night");
    const colorButtons = document.querySelectorAll(".colors span");

    // Hide style switcher on scroll
    window.addEventListener("scroll", () => {
        if (styleSwitcher.classList.contains("open")) {
            styleSwitcher.classList.remove("open");
        }
    });

    // Toggle style switcher
    styleSwitcherToggle.addEventListener("click", () => {
        styleSwitcher.classList.toggle("open");
    });

    // Set active style
    function setActiveStyle(color) {
        alternateStyles.forEach((style) => {
            if (color === style.getAttribute("title")) {
                style.removeAttribute("disabled");
            } else {
                style.setAttribute("disabled", "true");
            }
        });
        
        // Update active color button
        colorButtons.forEach(button => {
            button.classList.remove("active");
            if (button.classList.contains("color-" + color.split("-")[1])) {
                button.classList.add("active");
            }
        });
        
        // Save the selected color to localStorage
        localStorage.setItem("color", color);
    }

    // Add click event to color buttons
    colorButtons.forEach(button => {
        button.addEventListener("click", () => {
            const colorClass = button.classList[0];
            const colorNumber = colorClass.split("-")[1];
            setActiveStyle("color-" + colorNumber);
        });
    });

    // Set default theme to blue (color-1)
    function setDefaultTheme() {
        // Set blue theme (color-1) as default
        setActiveStyle("color-4");
        colorButtons[0].classList.add("active");
        
        // Set dark mode as default
        document.body.classList.add("dark");
        dayNight.querySelector("i").classList.add("fa-sun");
        dayNight.querySelector("i").classList.remove("fa-moon");
        localStorage.setItem("theme", "dark");
    }

    // Check if a color is saved in localStorage
    const savedColor = localStorage.getItem("color");
    const savedTheme = localStorage.getItem("theme");
    
    if (savedColor && savedTheme) {
        // Use saved preferences if they exist
        setActiveStyle(savedColor);
        
        if (savedTheme === "dark") {
            document.body.classList.add("dark");
            dayNight.querySelector("i").classList.add("fa-sun");
            dayNight.querySelector("i").classList.remove("fa-moon");
        } else {
            document.body.classList.remove("dark");
            dayNight.querySelector("i").classList.remove("fa-sun");
            dayNight.querySelector("i").classList.add("fa-moon");
        }
    } else {
        // Set defaults if no saved preferences
        setDefaultTheme();
    }

    // Toggle dark mode
    dayNight.addEventListener("click", () => {
        dayNight.querySelector("i").classList.toggle("fa-sun");
        dayNight.querySelector("i").classList.toggle("fa-moon");
        document.body.classList.toggle("dark");
        
        // Save dark mode preference to localStorage
        if (document.body.classList.contains("dark")) {
            localStorage.setItem("theme", "dark");
        } else {
            localStorage.setItem("theme", "light");
        }
    });

    // Force default theme on first load
    window.addEventListener("load", () => {
        if (!localStorage.getItem("theme") && !localStorage.getItem("color")) {
            setDefaultTheme();
        }
    });
});