// Menu data for each category
    const menuData = {
      coffee: [
        { name: "Capuccino", price: "₱150", description: "Cappuccino is a rich, creamy coffee made with espresso, steamed milk, and foam.", image: "images/coffee1.jpg" },
        { name: "Espresso", price: "₱100", description: "Espresso is a strong, concentrated coffee with a bold flavor and rich aroma.", image: "images/coffee2.jpg" },
        { name: "Café de Olla", price: "₱150", description: "Café de Olla is a spiced Mexican coffee made with cinnamon and brown sugar.", image: "images/coffee3.jpg" },
        { name: "Cold Brew Coffee", price: "₱180", description: "Cold brew coffee is coffee brewed slowly with cold water for a smooth, less acidic taste.", image: "images/colfcoffee1.jpg" },
        { name: "Iced Latte", price: "₱160", description: "An Iced Latte is a coffee drink made with espresso, chilled milk, and ice.", image: "images/coldcoffee2.jpg" },
        { name: "Iced Mocha", price: "₱180", description: "An Iced Mocha is a chilled coffee drink made with espresso, chocolate, milk, and ice.", image: "images/coldcoffee3.jpg" }
      ],
      delis: [
        { name: "Swiss Sandwich on Rye", price: "₱250", description: "A Swiss Sandwich on Rye is a sandwich with Swiss cheese, and rye bread.", image: "images/deli1.jpg" },
        { name: "Italian Sub", price: "₱300", description: "An Italian Sub is a sandwich filled with Italian meats, cheese, and veggies in a sub roll.", image: "images/deli2.jpg" },
        { name: "Chicken Salad Croissant", price: "₱300", description: "Fresh vegetables with hummus in a spinach wrap", image: "images/deli3.jpg" },
        { name: "Tuna Melt", price: "₱250", description: "Tuna salad with melted cheese on toasted bread", image: "images/deli4.jpg" },
        { name: "Quiche Lorraine", price: "₱300", description: "Quiche Lorraine is a savory pie with eggs, cream, bacon, and cheese in a pastry crust.", image: "images/deli5.jpg" },
        { name: "Classic Club Sandwich", price: "₱250", description: "A Classic Club Sandwich is a layered sandwich with chicken, bacon, lettuce, tomato, and mayo.", image: "images/menu5.jpg" }
      ],
      sweetDrinks: [
        { name: "Chocolate Milkshake", price: "₱100", description: "A Chocolate Milkshake is a cold, creamy drink made with chocolate and ice cream.", image: "images/shake2.jpg" },
        { name: "Strawberry Smoothie", price: "₱110", description: "Fresh strawberries blended with yogurt and honey.", image: "images/shake1.jpg" },
        { name: "Mango Shake", price: "₱130", description: "A Mango Shake is a creamy drink made with mangoes, and milk.", image: "images/shake3.jpg" },
        { name: "Creamy Hokkaido", price: "₱150", description: "Creamy Hokkaido is a rich, smooth milk tea with a sweet, creamy flavor.", image: "images/milktea1.jpg" },
        { name: "Oreo Bubble Shake", price: "₱160", description: "Oreo Bubble Shake is a creamy milkshake with crushed Oreos and tapioca pearls.", image: "images/milktea2.jpg" },
        { name: "Choco Bubble Tea", price: "₱150", description: "Choco Bubble Tea is a chocolate-flavored milk tea with tapioca pearls.", image: "images/milktea3.jpg" }
      ],
      specialCombo: [
        { name: "Espresso Roast Beef on Brioche with Coffee Aiol", price: "₱450", description: "Espresso roast beef on brioche with arugula, onions, and coffee aioli, served with cold brew.", image: "images/special.png" },
        { name: "Cappuccino Kickstart Club & Quiche Delight", price: "₱490", description: "Capuccino,Classic Club Sandwich, Quiche Lorraine,Fries", image: "images/special2.png" },
        { name: "Oreo Bliss Shake & Savory Deli Duo", price: "₱500", description: "Delicious treats for a perfect balance of flavors.", image: "images/special3.png" },
        ],
      all: [] // This will be populated with all items
    };

    // Populate the "all" category
    menuData.all = [
      ...menuData.coffee,
      ...menuData.delis,
      ...menuData.sweetDrinks,
      ...menuData.specialCombo
    ];

    document.addEventListener('DOMContentLoaded', function() {
      // Function to get URL parameters
      function getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        const results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
      }
      
      // Get category from URL parameter
      const categoryParam = getUrlParameter('category');
      
      // Check if a valid category was passed
      const validCategories = ['all', 'coffee', 'delis', 'sweetDrinks','specialCombo'];
      const selectedCategory = validCategories.includes(categoryParam) ? categoryParam : 'all';
      
      // Get all category buttons
      const categoryButtons = document.querySelectorAll('.category-btn');
      
      // Set the active button based on the selected category
      categoryButtons.forEach(button => {
        if (button.getAttribute('data-category') === selectedCategory) {
          button.classList.add('active');
        }
        
        // Add click event listeners to each category button
        button.addEventListener('click', function() {
          // Remove active class from all buttons
          categoryButtons.forEach(btn => btn.classList.remove('active'));
          
          // Add active class to clicked button
          this.classList.add('active');
          
          // Get the category data attribute
          const category = this.getAttribute('data-category');
          
          // Update URL parameter without refreshing the page
          const url = new URL(window.location.href);
          url.searchParams.set('category', category);
          window.history.pushState({}, '', url);
          
          // Display menu items for the selected category
          displayMenuItems(category);
        });
      });
      
      // Initially display menu items based on the URL parameter
      displayMenuItems(selectedCategory);
    });

    // Function to display menu items based on the selected category
    function displayMenuItems(category) {
      // Get the menu items container
      const menuItemsContainer = document.getElementById('menu-items-container');
      
      // Clear existing menu items
      menuItemsContainer.innerHTML = '';
      
      // Create a grid to display menu items
      const menuGrid = document.createElement('div');
      menuGrid.className = 'menu-grid';
      
      // Add each menu item to the grid
      menuData[category].forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.className = 'menu-item';
        
        menuItem.innerHTML = `
          <div class="menu-item-image">
            <img src="${item.image}" alt="${item.name}">
          </div>
          <div class="menu-item-content">
            <div class="menu-item-header">
              <h3 class="menu-item-title">${item.name}</h3>
              <span class="menu-item-price">${item.price}</span>
            </div>
            <p class="menu-item-description">${item.description}</p>
          </div>
        `;
        
        menuGrid.appendChild(menuItem);
      });
      
      menuItemsContainer.appendChild(menuGrid);
    }



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