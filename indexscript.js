'use strict';



/**
 * PRELOAD
 * 
 * loading will be end after document is loaded
 */

const preloader = document.querySelector("[data-preaload]");

window.addEventListener("load", function () {
  preloader.classList.add("loaded");
  document.body.classList.add("loaded");
});



/**
 * add event listener on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}



/**
 * NAVBAR
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNavbar);



/**
 * HEADER & BACK TOP BTN
 */

const header = document.querySelector("[data-header]");

let lastScrollPos = 0;

const hideHeader = function () {
  const isScrollBottom = lastScrollPos < window.scrollY;
  if (isScrollBottom) {
    header.classList.add("hide");
  } else {
    header.classList.remove("hide");
  }

  lastScrollPos = window.scrollY;
}

window.addEventListener("scroll", function () {
  if (window.scrollY >= 50) {
    header.classList.add("active");
    hideHeader();
  } else {
    header.classList.remove("active");
  }
});



/**
 * HERO SLIDER
 */

const heroSlider = document.querySelector("[data-hero-slider]");
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn]");

let currentSlidePos = 0;
let lastActiveSliderItem = heroSliderItems[0];

const updateSliderPos = function () {
  lastActiveSliderItem.classList.remove("active");
  heroSliderItems[currentSlidePos].classList.add("active");
  lastActiveSliderItem = heroSliderItems[currentSlidePos];
}

const slideNext = function () {
  if (currentSlidePos >= heroSliderItems.length - 1) {
    currentSlidePos = 0;
  } else {
    currentSlidePos++;
  }

  updateSliderPos();
}

heroSliderNextBtn.addEventListener("click", slideNext);

const slidePrev = function () {
  if (currentSlidePos <= 0) {
    currentSlidePos = heroSliderItems.length - 1;
  } else {
    currentSlidePos--;
  }

  updateSliderPos();
}

heroSliderPrevBtn.addEventListener("click", slidePrev);

/**
 * auto slide
 */

let autoSlideInterval;

const autoSlide = function () {
  autoSlideInterval = setInterval(function () {
    slideNext();
  }, 7000);
}

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseover", function () {
  clearInterval(autoSlideInterval);
});

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseout", autoSlide);

window.addEventListener("load", autoSlide);



/**
 * PARALLAX EFFECT
 */

const parallaxItems = document.querySelectorAll("[data-parallax-item]");

let x, y;

window.addEventListener("mousemove", function (event) {

  x = (event.clientX / window.innerWidth * 10) - 5;
  y = (event.clientY / window.innerHeight * 10) - 5;

  // reverse the number eg. 20 -> -20, -5 -> 5
  x = x - (x * 2);
  y = y - (y * 2);

  for (let i = 0, len = parallaxItems.length; i < len; i++) {
    x = x * Number(parallaxItems[i].dataset.parallaxSpeed);
    y = y * Number(parallaxItems[i].dataset.parallaxSpeed);
    parallaxItems[i].style.transform = `translate3d(${x}px, ${y}px, 0px)`;
  }

});


 // Simple carousel functionality
    const carousel = document.querySelector('.carousel');
    const dots = document.querySelectorAll('.carousel-dot');
    let currentSlide = 0;
    
    function showSlide(index) {
      carousel.style.transform = `translateX(-${index * 100}%)`;
      
      // Update active dot
      dots.forEach(dot => dot.classList.remove('active'));
      dots[index].classList.add('active');
      
      currentSlide = index;
    }
    
    // Add click event listeners to dots
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        showSlide(index);
      });
    });
    
    // Auto-rotate carousel
    setInterval(() => {
      let nextSlide = (currentSlide + 1) % dots.length;
      showSlide(nextSlide);
    }, 5000);


    

// Contact Form Validation and Dynamic Content
document.addEventListener('DOMContentLoaded', function() {
  // Get the form element
  const contactForm = document.querySelector('.contact-form form');
  
  // Add event listener for form submission
  contactForm.addEventListener('submit', function(event) {
    // Prevent default form submission
    event.preventDefault();
    
    // Get form input values
    const nameInput = contactForm.querySelector('input[name="name"]');
    const phoneInput = contactForm.querySelector('input[name="phone"]');
    const emailInput = contactForm.querySelector('input[name="email"]');
    
    // Reset error messages
    clearErrors();
    
    // Validate inputs
    let isValid = true;
    
    // Validate name (required)
    if (!nameInput.value.trim()) {
      displayError(nameInput, 'Name is required');
      isValid = false;
    }
    
    // Validate phone (required and must start with 09 and be exactly 11 digits)
    if (!phoneInput.value.trim()) {
      displayError(phoneInput, 'Phone number is required');
      isValid = false;
    } else if (!validatePhone(phoneInput.value)) {
      // Get specific error for phone validation
      const phoneError = getPhoneValidationError(phoneInput.value);
      displayError(phoneInput, phoneError);
      isValid = false;
    }
    
    // Function to get specific phone validation error message
    function getPhoneValidationError(phone) {
      const cleanedPhone = phone.replace(/\s+|-|\(|\)/g, '');
      
      if (!/^09\d{9}$/.test(cleanedPhone)) {
        return 'Phone number must start with 09 and be 11 digits';
      }
      
      if (/(\d)\1{4,}/.test(cleanedPhone)) {
        return 'Phone number cannot have more than 4 repeating digits';
      }
      
      const uniqueDigits = new Set(cleanedPhone.split(''));
      if (uniqueDigits.size <= 2) {
        return 'Phone number cannot consist of only 1-2 different digits';
      }
      
      let sequential = true;
      for (let i = 2; i < cleanedPhone.length; i++) {
        if (parseInt(cleanedPhone[i]) !== parseInt(cleanedPhone[i-1]) + 1) {
          sequential = false;
          break;
        }
      }
      if (sequential) {
        return 'Phone number cannot be sequential digits';
      }
      
      return 'Invalid phone number format';
    }
    
    // Validate email (required and must be valid)
    if (!emailInput.value.trim()) {
      displayError(emailInput, 'Email is required');
      isValid = false;
    } else if (!validateEmail(emailInput.value)) {
      displayError(emailInput, 'Email must end with @gmail.com');
      isValid = false;
    }
    
    // If form is valid, show success message
    if (isValid) {
      // Hide the form
      contactForm.style.opacity = '0.5';
      contactForm.style.pointerEvents = 'none';
      
      // Create and display success message
      showSuccessMessage();
      
      // Reset form after 5 seconds and allow new submissions
      setTimeout(function() {
        contactForm.reset();
        contactForm.style.opacity = '1';
        contactForm.style.pointerEvents = 'auto';
        removeSuccessMessage();
      }, 5000);
    }
  });
  
  // Function to validate email (must end with @gmail.com)
  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@gmail\.com$/;
    return emailRegex.test(email);
  }
  
  // Function to validate phone number (must start with 09 and be exactly 11 digits)
  function validatePhone(phone) {
    // Remove any spaces or special characters first
    const cleanedPhone = phone.replace(/\s+|-|\(|\)/g, '');
    
    // Check if phone starts with 09 and has exactly 11 digits
    const phoneRegex = /^09\d{9}$/;
    
    // Basic validation passed
    if (!phoneRegex.test(cleanedPhone)) {
      return false;
    }
    
    // Additional validation - no repeating digits more than 4 times in a row
    if (/(\d)\1{4,}/.test(cleanedPhone)) {
      return false;
    }
    
    // Additional validation - not all the same digit
    const allDigits = cleanedPhone.split('');
    const uniqueDigits = new Set(allDigits);
    if (uniqueDigits.size <= 2) {
      return false;
    }
    
    // Additional validation - not sequential digits like 1234567890
    let sequential = true;
    for (let i = 2; i < cleanedPhone.length; i++) {
      if (parseInt(cleanedPhone[i]) !== parseInt(cleanedPhone[i-1]) + 1) {
        sequential = false;
        break;
      }
    }
    if (sequential) {
      return false;
    }
    
    return true;
  }
  
  // Function to display error message
  function displayError(inputElement, message) {
    // Create error element
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.color = 'red';
    errorElement.style.fontSize = '12px';
    errorElement.style.marginTop = '4px';
    
    // Insert error message after the input element
    inputElement.parentNode.insertBefore(errorElement, inputElement.nextSibling);
    
    // Highlight the input field
    inputElement.style.border = '1px solid red';
    
    // Add focus event to remove error when user starts typing again
    inputElement.addEventListener('focus', function() {
      this.style.border = '';
      if (this.nextSibling && this.nextSibling.className === 'error-message') {
        this.parentNode.removeChild(this.nextSibling);
      }
    }, { once: true });
  }
  
  // Function to clear all error messages
  function clearErrors() {
    const errorMessages = contactForm.querySelectorAll('.error-message');
    errorMessages.forEach(function(error) {
      error.parentNode.removeChild(error);
    });
    
    const inputs = contactForm.querySelectorAll('input');
    inputs.forEach(function(input) {
      input.style.border = '';
    });
  }
  
  // Function to show success message
  function showSuccessMessage() {
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
      <div style="
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: rgba(12, 12, 12, 0.9);
        padding: 20px;
        border-radius: 5px;
        text-align: center;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        z-index: 100;
      ">
        <h3 style="color: #4CAF50; margin-bottom: 10px;">Message Sent!</h3>
        <p>Thank you for contacting us. We'll get back to you soon!</p>
        <p style="margin-top: 10px;">A restaurant representative will contact you shortly via your provided contact information.</p>
        <p style="margin-top: 10px; font-size: 14px;">We look forward to serving you!</p>
      </div>
    `;
    
    // Add the success message to the form container
    const formContainer = contactForm.closest('.form');
    formContainer.style.position = 'relative';
    formContainer.appendChild(successMessage);
  }
  
  // Function to remove success message
  function removeSuccessMessage() {
    const successMessage = document.querySelector('.success-message');
    if (successMessage) {
      successMessage.parentNode.removeChild(successMessage);
    }
  }
  
  // Add input validation for real-time feedback
  const inputs = contactForm.querySelectorAll('input');
  inputs.forEach(function(input) {
    input.addEventListener('blur', function() {
      // Remove existing error for this input
      if (this.nextSibling && this.nextSibling.className === 'error-message') {
        this.parentNode.removeChild(this.nextSibling);
        this.style.border = '';
      }
      
      // Validate current input
      if (this.name === 'name' && !this.value.trim()) {
        displayError(this, 'Name is required');
      } else if (this.name === 'phone') {
        if (!this.value.trim()) {
          displayError(this, 'Phone number is required');
        } else if (!validatePhone(this.value)) {
          displayError(this, 'Phone number must start with 09 and be 11 digits');
        }
      } else if (this.name === 'email') {
        if (!this.value.trim()) {
          displayError(this, 'Email is required');
        } else if (!validateEmail(this.value)) {
          displayError(this, 'Email must end with @gmail.com');
        }
      }
    });
  });
});


 // Reservation Form Validation and Dynamic Content
    document.addEventListener('DOMContentLoaded', function() {
      // Get the reservation form element
      const reservationForm = document.querySelector('.reservation-form .input-form');
      
      // Add event listener for form submission
      reservationForm.addEventListener('submit', function(event) {
        // Prevent default form submission
        event.preventDefault();
        
        // Get form input values
        const nameInput = reservationForm.querySelector('input[name="name"]');
        const phoneInput = reservationForm.querySelector('input[name="phone"]');
        const personSelect = reservationForm.querySelector('select[name="person"]');
        const dateInput = reservationForm.querySelector('input[name="reservation-date"]');
        const timeSelect = reservationForm.querySelector('select[name="time"]');
        const messageTextarea = reservationForm.querySelector('textarea[name="message"]');
        
        // Reset error messages
        clearErrors();
        
        // Validate inputs
        let isValid = true;
        
        // Validate name (required)
        if (!nameInput.value.trim()) {
          displayError(nameInput, 'Name is required');
          isValid = false;
        }
        
        // Validate phone (required and must start with 09 and be exactly 11 digits)
        if (!phoneInput.value.trim()) {
          displayError(phoneInput, 'Phone number is required');
          isValid = false;
        } else if (!validatePhone(phoneInput.value)) {
          // Get specific error for phone validation
          const phoneError = getPhoneValidationError(phoneInput.value);
          displayError(phoneInput, phoneError);
          isValid = false;
        }
        
        // Validate date (required)
        if (!dateInput.value) {
          displayError(dateInput, 'Please select a date');
          isValid = false;
        } else if (!validateFutureDate(dateInput.value)) {
          displayError(dateInput, 'Please select a future date');
          isValid = false;
        }
        
        // If form is valid, show success message
        if (isValid) {
          // Hide the form
          reservationForm.style.opacity = '0.5';
          reservationForm.style.pointerEvents = 'none';
          
          // Create and display success message
          showSuccessMessage();
          
          // Reset form after 5 seconds and allow new submissions
          setTimeout(function() {
            reservationForm.reset();
            reservationForm.style.opacity = '1';
            reservationForm.style.pointerEvents = 'auto';
            removeSuccessMessage();
          }, 5000);
        }
      });
      
      // Function to get specific phone validation error message
      function getPhoneValidationError(phone) {
        const cleanedPhone = phone.replace(/\s+|-|\(|\)/g, '');
        
        if (!/^09\d{9}$/.test(cleanedPhone)) {
          return 'Phone number must start with 09 and be 11 digits';
        }
        
        if (/(\d)\1{4,}/.test(cleanedPhone)) {
          return 'Phone number cannot have more than 4 repeating digits';
        }
        
        const uniqueDigits = new Set(cleanedPhone.split(''));
        if (uniqueDigits.size <= 2) {
          return 'Phone number cannot consist of only 1-2 different digits';
        }
        
        let sequential = true;
        for (let i = 2; i < cleanedPhone.length; i++) {
          if (parseInt(cleanedPhone[i]) !== parseInt(cleanedPhone[i-1]) + 1) {
            sequential = false;
            break;
          }
        }
        if (sequential) {
          return 'Phone number cannot be sequential digits';
        }
        
        return 'Invalid phone number format';
      }
      
      // Function to validate phone number (must start with 09 and be exactly 11 digits)
      function validatePhone(phone) {
        // Remove any spaces or special characters first
        const cleanedPhone = phone.replace(/\s+|-|\(|\)/g, '');
        
        // Check if phone starts with 09 and has exactly 11 digits
        const phoneRegex = /^09\d{9}$/;
        
        // Basic validation passed
        if (!phoneRegex.test(cleanedPhone)) {
          return false;
        }
        
        // Additional validation - no repeating digits more than 4 times in a row
        if (/(\d)\1{4,}/.test(cleanedPhone)) {
          return false;
        }
        
        // Additional validation - not all the same digit
        const allDigits = cleanedPhone.split('');
        const uniqueDigits = new Set(allDigits);
        if (uniqueDigits.size <= 2) {
          return false;
        }
        
        // Additional validation - not sequential digits like 1234567890
        let sequential = true;
        for (let i = 2; i < cleanedPhone.length; i++) {
          if (parseInt(cleanedPhone[i]) !== parseInt(cleanedPhone[i-1]) + 1) {
            sequential = false;
            break;
          }
        }
        if (sequential) {
          return false;
        }
        
        return true;
      }
      
      // Function to validate if date is in the future
      function validateFutureDate(dateString) {
        const selectedDate = new Date(dateString);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        return selectedDate >= today;
      }
      
      // Function to display error message
      function displayError(inputElement, message) {
        // Create error element
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        errorElement.style.color = 'red';
        errorElement.style.fontSize = '12px';
        errorElement.style.marginTop = '4px';
        
        // Handle different input types for proper error placement
        if (inputElement.closest('.icon-wrapper')) {
          // For inputs inside icon wrappers
          const wrapper = inputElement.closest('.icon-wrapper');
          wrapper.appendChild(errorElement);
        } else {
          // For regular inputs
          inputElement.parentNode.insertBefore(errorElement, inputElement.nextSibling);
        }
        
        // Highlight the input field
        inputElement.style.border = '1px solid red';
        
        // Add focus event to remove error when user starts typing again
        inputElement.addEventListener('focus', function() {
          this.style.border = '';
          
          // Find and remove the error message
          if (this.closest('.icon-wrapper')) {
            const errorMsg = this.closest('.icon-wrapper').querySelector('.error-message');
            if (errorMsg) {
              errorMsg.parentNode.removeChild(errorMsg);
            }
          } else if (this.nextSibling && this.nextSibling.className === 'error-message') {
            this.parentNode.removeChild(this.nextSibling);
          }
        }, { once: true });
      }
      
      // Function to clear all error messages
      function clearErrors() {
        const errorMessages = reservationForm.querySelectorAll('.error-message');
        errorMessages.forEach(function(error) {
          error.parentNode.removeChild(error);
        });
        
        const inputs = reservationForm.querySelectorAll('input, select, textarea');
        inputs.forEach(function(input) {
          input.style.border = '';
        });
      }
      
      // Function to show success message
      function showSuccessMessage() {
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
          <div style="
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: rgba(12, 12, 12, 0.9);
            padding: 20px;
            border-radius: 5px;
            text-align: center;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            z-index: 100;
            color: #fff;
            width: 80%;
            max-width: 400px;
          ">
            <h3 style="color: #4CAF50; margin-bottom: 10px;">Reservation Received!</h3>
            <p>Thank you for your reservation request.</p>
            <p style="margin-top: 10px;">A restaurant representative will contact you shortly via your provided contact information to confirm your booking.</p>
            <p style="margin-top: 10px; font-size: 14px;">We look forward to serving you!</p>
          </div>
        `;
        
        // Add the success message to the form container
        const formContainer = reservationForm.closest('.reservation-form');
        formContainer.style.position = 'relative';
        formContainer.appendChild(successMessage);
      }
      
      // Function to remove success message
      function removeSuccessMessage() {
        const successMessage = document.querySelector('.success-message');
        if (successMessage) {
          successMessage.parentNode.removeChild(successMessage);
        }
      }
      
      // Add input validation for real-time feedback
      const inputs = reservationForm.querySelectorAll('input, select, textarea');
      inputs.forEach(function(input) {
        input.addEventListener('blur', function() {
          // Remove existing error for this input
          if (this.closest('.icon-wrapper')) {
            const errorMsg = this.closest('.icon-wrapper').querySelector('.error-message');
            if (errorMsg) {
              errorMsg.parentNode.removeChild(errorMsg);
            }
            this.style.border = '';
          } else if (this.nextSibling && this.nextSibling.className === 'error-message') {
            this.parentNode.removeChild(this.nextSibling);
            this.style.border = '';
          }
          
          // Validate current input
          if (this.name === 'name' && !this.value.trim()) {
            displayError(this, 'Name is required');
          } else if (this.name === 'phone') {
            if (!this.value.trim()) {
              displayError(this, 'Phone number is required');
            } else if (!validatePhone(this.value)) {
              const phoneError = getPhoneValidationError(this.value);
              displayError(this, phoneError);
            }
          } else if (this.name === 'reservation-date') {
            if (!this.value) {
              displayError(this, 'Please select a date');
            } else if (!validateFutureDate(this.value)) {
              displayError(this, 'Please select a future date');
            }
          }
        });
      });
    });

    
// Validates that email addresses end with @gmail.com

document.addEventListener('DOMContentLoaded', function() {
    // Add a small amount of CSS to ensure parent elements can properly position the bubbles
    const style = document.createElement('style');
    style.textContent = `
        .input-wrapper {
            position: relative;
        }
        input[type="email"] {
            transition: border-color 0.3s ease;
        }
    `;
    document.head.appendChild(style);
    
    // Set up form validation for the newsletter form in the footer
    const newsletterForm = document.querySelector('.footer-brand form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const emailInput = newsletterForm.querySelector('#myEmail');
            const email = emailInput.value.trim();
            
            // Remove any existing error messages
            removeErrorMessages(newsletterForm);
            
            // Reset input border
            emailInput.style.borderColor = '';
            
            // Validate email (must end with @gmail.com)
            if (!email) {
                displayError(emailInput, 'Please enter your email');
            } else if (!validateEmail(email)) {
                displayError(emailInput, 'Please enter a valid email ending with @gmail.com');
            } else {
                // Email is valid, show success message
                showSuccessMessage(newsletterForm, emailInput);
            }
        });
    }
    
    // Also look for any other forms with email inputs
    const allForms = document.querySelectorAll('form');
    
    allForms.forEach(form => {
        // Skip the newsletter form as we've already handled it
        if (form !== newsletterForm) {
            form.addEventListener('submit', function(event) {
                const emailInputs = form.querySelectorAll('#myEmail');
                
                if (emailInputs.length > 0) {
                    let isValid = true;
                    
                    // Remove any existing error messages
                    removeErrorMessages(form);
                    
                    // Validate all email inputs in the form
                    emailInputs.forEach(input => {
                        // Reset input border
                        input.style.borderColor = '';
                        
                        const email = input.value.trim();
                        if (!email) {
                            displayError(input, 'Please enter your email');
                            isValid = false;
                        } else if (!validateEmail(email)) {
                            displayError(input, 'Please enter a valid email ending with @gmail.com');
                            isValid = false;
                        }
                    });
                    
                    if (!isValid) {
                        event.preventDefault();
                    }
                }
            });
        }
    });
});

// Function to validate email format
function validateEmail(email) {
    // Email must end with @gmail.com
    return email.toLowerCase().endsWith('@gmail.com');
}

// Function to display error messages as bubbles
function displayError(input, message) {
    // Highlight the input with an error
    input.style.borderColor = '#ff3860';
    
    // Create error bubble element
    const errorBubble = document.createElement('div');
    errorBubble.className = 'error-message';
    errorBubble.style.position = 'absolute';
    errorBubble.style.backgroundColor = '#ff3860';
    errorBubble.style.color = 'white';
    errorBubble.style.padding = '8px 12px';
    errorBubble.style.borderRadius = '6px';
    errorBubble.style.fontSize = '0.85rem';
    errorBubble.style.zIndex = '100';
    errorBubble.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
    errorBubble.style.maxWidth = '250px';
    errorBubble.style.wordWrap = 'break-word';
    errorBubble.textContent = message;
    
    // Create arrow for the bubble
    const arrow = document.createElement('div');
    arrow.style.position = 'absolute';
    arrow.style.top = '-6px';
    arrow.style.left = '10px';
    arrow.style.width = '0';
    arrow.style.height = '0';
    arrow.style.borderLeft = '6px solid transparent';
    arrow.style.borderRight = '6px solid transparent';
    arrow.style.borderBottom = '6px solid #ff3860';
    errorBubble.appendChild(arrow);
    
    // Make sure the input's parent has position relative for proper positioning
    const inputParent = input.parentNode;
    const originalPosition = window.getComputedStyle(inputParent).position;
    if (originalPosition === 'static') {
        inputParent.style.position = 'relative';
    }
    
    // Position the bubble below the input field
    const inputRect = input.getBoundingClientRect();
    errorBubble.style.top = (input.offsetHeight + 10) + 'px';
    errorBubble.style.left = '0';
    
    // Insert error bubble after the input
    input.parentNode.insertBefore(errorBubble, input.nextSibling);
    
    // Animate the bubble appearing
    errorBubble.style.opacity = '0';
    errorBubble.style.transform = 'translateY(-10px)';
    errorBubble.style.transition = 'all 0.3s ease';
    
    // Trigger animation
    setTimeout(() => {
        errorBubble.style.opacity = '1';
        errorBubble.style.transform = 'translateY(0)';
    }, 10);
    
    // Make the bubble disappear on input focus
    input.addEventListener('focus', function() {
        errorBubble.style.opacity = '0';
        errorBubble.style.transform = 'translateY(-10px)';
        
        // Remove the bubble after animation completes
        setTimeout(() => {
            if (errorBubble.parentNode) {
                errorBubble.parentNode.removeChild(errorBubble);
            }
            // Reset input border
            input.style.borderColor = '';
        }, 300);
    }, { once: true });
}

// Function to remove all error messages from a form
function removeErrorMessages(form) {
    const existingErrors = form.querySelectorAll('.error-message');
    existingErrors.forEach(error => error.remove());
}

// Function to show success message for the newsletter form
function showSuccessMessage(form, emailInput) {
    // Get relevant elements
    const formWrapper = form.querySelector('.input-wrapper');
    const subscribeBtn = form.querySelector('.btn');
    
    // Hide form elements
    if (formWrapper) formWrapper.style.display = 'none';
    if (subscribeBtn) subscribeBtn.style.display = 'none';
    
    // Create and display success message
    const successMsg = document.createElement('div');
    successMsg.className = 'form-success-message';
    successMsg.style.backgroundColor = '#48c774';
    successMsg.style.color = 'white';
    successMsg.style.padding = '10px';
    successMsg.style.borderRadius = '5px';
    successMsg.style.marginTop = '10px';
    successMsg.textContent = 'Thank you for subscribing! Your 25% discount code will be sent to your email.';
    
    form.appendChild(successMsg);
    
    // Reset and restore form after 5 seconds
    setTimeout(() => {
        form.reset();
        if (formWrapper) formWrapper.style.display = '';
        if (subscribeBtn) subscribeBtn.style.display = '';
        form.removeChild(successMsg);
    }, 5000);
}