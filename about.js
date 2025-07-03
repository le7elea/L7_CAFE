// Fade-in Animation
        document.addEventListener('DOMContentLoaded', function() {
            // Initial check for elements in viewport
            const fadeElements = document.querySelectorAll('.fade-in');
            checkFade(fadeElements);
            
            // Check on scroll
            window.addEventListener('scroll', function() {
                checkFade(fadeElements);
            });
            
            // Function to check if elements are in viewport
            function checkFade(elements) {
                elements.forEach(element => {
                    const elementTop = element.getBoundingClientRect().top;
                    const elementVisible = 150;
                    
                    if (elementTop < window.innerHeight - elementVisible) {
                        element.classList.add('active');
                    }
                });
            }
            
            // Testimonial Slider (simplified version)
            let currentTestimonial = 0;
            const testimonials = [
                {
                    text: "Every visit to L7 CAFE is a moment to savor. From the first sip to the last bite, you can taste the care in every ingredient — and the warmth of the team makes every visit feel like coming home.",
                    author: "Diane Jala",
                    role: "Food Writer"
                },
                {
                    text: "From the moment you walk in, you can tell this place is special. The seasonal menu always surprises and delights, and I love knowing exactly where my food comes from.",
                    author: "Thea Toledo",
                    role: "Regular Guest"
                },
                {
                    text: "L7 CAFE represents the best of modern café culture — where sustainability, local sourcing, and genuine hospitality come together in every cup, bite, and smile.",
                    author: "DJ Omosura",
                    role: "Culinary Blogger"
                }
            ];
            
            setInterval(() => {
                currentTestimonial = (currentTestimonial + 1) % testimonials.length;
                const testimonialEl = document.querySelector('.testimonial');
                testimonialEl.style.opacity = 0;
                
                setTimeout(() => {
                    document.querySelector('.testimonial-text').textContent = testimonials[currentTestimonial].text;
                    document.querySelector('.testimonial-author').textContent = testimonials[currentTestimonial].author;
                    document.querySelector('.testimonial-role').textContent = testimonials[currentTestimonial].role;
                    testimonialEl.style.opacity = 1;
                }, 500);
            }, 5000);
        });

    
// Email validation script for L7 Cafe website
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