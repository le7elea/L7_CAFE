// Menu data
const menuItems = [
    {
        id: 1,
        name: "Capuccino",
        price: 150,
        category: "coffee",
        description: "Cappuccino is a rich, creamy coffee made with espresso, steamed milk, and foam.",
        image: "images/coffee1.jpg"
    },
    {
        id: 2,
        name: "Espresso",
        price:100,
        category: "coffee",
        description: "Espresso is a strong, concentrated coffee with a bold flavor and rich aroma.",
        image: "images/coffee2.jpg"
    },
    {
        id: 3,
        name: "Café de Olla",
        price: 150,
        category: "coffee",
        description: "Café de Olla is a spiced Mexican coffee made with cinnamon and brown sugar.",
        image: "images/coffee3.jpg"
      },
    {
        id: 7,
        name: "Swiss Sandwich on Rye",
        price: 250,
        category: "delis",
        description: "A Swiss Sandwich on Rye is a sandwich with Swiss cheese, and rye bread.",
        image:"images/deli1.jpg"
    },
    {
        id: 8,
        name: "Italian Sub",
        price: 300,
        category: "delis",
        description: "An Italian Sub is a sandwich filled with Italian meats, cheese, and veggies in a sub roll.",
        image:"images/deli2.jpg"
    },
    {
        id: 9,
        name: "Chicken Salad Croissant",
        price: 300,
        category: "delis",
        description: "Fresh vegetables with hummus in a spinach wrap",
        image:"images/deli3.jpg"
    },
    {
        id: 10,
        name: "Tuna Melt",
        price: 250,
        category: "delis",
        description: "Tuna salad with melted cheese on toasted bread.",
        image:"images/deli4.jpg"
    },
    {
        id: 11,
        name: "Quiche Lorraine",
        price: 300,
        category: "delis",
        description: "Quiche Lorraine is a savory pie with eggs, cream, bacon, and cheese in a pastry crust.",
        image:"images/deli5.jpg"
    },
    {
        id: 12,
        name: "Classic Club Sandwich",
        price: 250,
        category: "delis",
        description: "A Classic Club Sandwich is a layered sandwich with chicken, bacon, lettuce, tomato, and mayo.",
        image:"images/menu5.jpg"
    },
    {
        id: 13,
        name: "Chocolate Milkshake",
        price: 100,
        category: "sweetDrinks",
        description: "A Chocolate Milkshake is a cold, creamy drink made with chocolate and ice cream.",
        image: "images/shake2.jpg"
    },
    {
        id: 14,
        name: "Strawberry Smoothie",
        price: 110,
        category: "sweetDrinks",
        description: "Fresh strawberries blended with yogurt and honey.",
        image: "images/shake1.jpg"
    },
    {
        id: 15,
        name: "Mango Shake",
        price: 130,
        category: "sweetDrinks",
        description: "A Mango Shake is a creamy drink made with mangoes, and milk.",
        image: "images/shake3.jpg"
    },
    {
        id: 16,
        name: "Creamy Hokkaido",
        price: 150,
        category: "sweetDrinks",
        description: "Creamy Hokkaido is a rich, smooth milk tea with a sweet, creamy flavor.",
        image: "images/milktea1.jpg"
    },
    {
        id: 17,
        name: "Oreo Bubble Shake",
        price: 160,
        category: "sweetDrinks",
        description: "Oreo Bubble Shake is a creamy milkshake with crushed Oreos and tapioca pearls.",
        image: "images/milktea2.jpg"
    },
    {
        id: 18,
        name: "Choco Bubble Tea",
        price: 150,
        category: "sweetDrinks",
        description: "Choco Bubble Tea is a chocolate-flavored milk tea with tapioca pearls.",
        image: "images/milktea3.jpg"
    },
    {
        id: 19,
        name: "Espresso Roast Beef on Brioche with Coffee Aiol",
        price: 450,
        category: "specialCombo",
        description: "Espresso roast beef on brioche with arugula, onions, and coffee aioli, served with cold brew.",
        image: "images/special.png"
    },
    {
        id: 20,
        name: "Cappuccino Kickstart Club & Quiche Delight",
        price: 490,
        category: "specialCombo",
        description: "Capuccino,Classic Club Sandwich, Quiche Lorraine,Fries.",
        image: "images/special2.png"
    },
    {
        id: 21,
        name: "Oreo Bliss Shake & Savory Deli Duo",
        price: 500,
        category: "specialCombo",
        description: "Delicious treats for a perfect balance of flavors.",
        image: "images/special3.png"
    }
];

// Global variables
let cart = [];
let currentCategory = "all";

// DOM Elements
const menuContainer = document.getElementById("menu-container");
const categoryButtons = document.querySelectorAll(".category-btn");
const cartIcon = document.getElementById("cart-icon");
const cartCount = document.getElementById("cart-count");
const cartModal = document.getElementById("cart-modal");
const checkoutModal = document.getElementById("checkout-modal");
const confirmationModal = document.getElementById("confirmation-modal");
const closeButtons = document.querySelectorAll(".close-btn");
const cartItemsContainer = document.getElementById("cart-items");
const cartSubtotal = document.getElementById("cart-subtotal");
const cartTax = document.getElementById("cart-tax");
const cartTotal = document.getElementById("cart-total");
const emptyCartBtn = document.getElementById("empty-cart");
const checkoutBtn = document.getElementById("checkout-btn");
const checkoutItemsContainer = document.getElementById("checkout-items");
const checkoutTotal = document.getElementById("checkout-total");
const orderTypeRadios = document.querySelectorAll('input[name="orderType"]');
const deliveryFields = document.getElementById("delivery-fields");
const checkoutForm = document.getElementById("checkout-form");
const confirmationItems = document.getElementById("confirmation-items");
const customerInfo = document.getElementById("customer-info");
const confirmationTotal = document.getElementById("confirmation-total");
const backToMenuBtn = document.getElementById("back-to-menu-btn");

// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
    // Load cart from localStorage
    loadCart();
    
    // Update cart count display
    updateCartCount();
    
    // Display menu items if on menu page
    if (menuContainer) {
        displayMenuItems();
    }
    
    setupEventListeners();
    
    // Initialize enhanced cart visuals
    initEnhancedCartSystem();
});

// Load cart from localStorage
function loadCart() {
    const savedCart = localStorage.getItem('deliciousEatsCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('deliciousEatsCart', JSON.stringify(cart));
}

// Display menu items based on category
function displayMenuItems() {
    if (!menuContainer) return; // Skip if not on menu page
    
    menuContainer.innerHTML = "";
    
    const itemsToDisplay = currentCategory === "all" 
        ? menuItems 
        : menuItems.filter(item => item.category === currentCategory);
    
    if (itemsToDisplay.length === 0) {
        menuContainer.innerHTML = "<p class='no-items'>No items found in this category.</p>";
        return;
    }
    
    itemsToDisplay.forEach(item => {
        const menuItemElement = createMenuItemElement(item);
        menuContainer.appendChild(menuItemElement);
    });
}

// Create a menu item element
function createMenuItemElement(item) {
    const menuItem = document.createElement("div");
    menuItem.classList.add("menu-item");
    menuItem.dataset.id = item.id;
    
    menuItem.innerHTML = `
        <div class="menu-item-image">
            <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="menu-item-info">
            <div class="menu-item-header">
                <h3 class="menu-item-title">${item.name}</h3>
                <span class="menu-item-price">₱${item.price.toFixed(2)}</span>
            </div>
            <p class="menu-item-description">${item.description}</p>
            <button class="add-to-cart-btn" data-id="${item.id}">Add to Order</button>
        </div>
    `;
    
    return menuItem;
}

// Set up event listeners
function setupEventListeners() {
    // Category filter buttons
    if (categoryButtons) {
        categoryButtons.forEach(button => {
            button.addEventListener("click", () => {
                // Update active class
                categoryButtons.forEach(btn => btn.classList.remove("active"));
                button.classList.add("active");
                
                // Update current category and display items
                currentCategory = button.dataset.category;
                displayMenuItems();
            });
        });
    }
    
    // Cart icon (present on all pages)
    if (cartIcon) {
        cartIcon.addEventListener("click", () => {
            updateCartDisplay();
            openModal(cartModal);
        });
    }
    
    // Close buttons
    if (closeButtons) {
        closeButtons.forEach(button => {
            button.addEventListener("click", () => {
                const modal = button.closest(".modal");
                closeModal(modal);
            });
        });
    }
    
    // Click outside modal to close
    window.addEventListener("click", (event) => {
        if (event.target.classList.contains("modal")) {
            closeModal(event.target);
        }
    });
    
    // Empty cart button
    if (emptyCartBtn) {
        emptyCartBtn.addEventListener("click", () => {
            emptyCart();
        });
    }
    
    // Checkout button
    if (checkoutBtn) {
        checkoutBtn.addEventListener("click", () => {
            if (cart.length === 0) {
                alert("Your cart is empty. Please add items before checking out.");
                return;
            }
            
            updateCheckoutDisplay();
            closeModal(cartModal);
            openModal(checkoutModal);
        });
    }
    
    // Order type radio buttons
    if (orderTypeRadios && orderTypeRadios.length > 0) {
        orderTypeRadios.forEach(radio => {
            radio.addEventListener("change", () => {
                const isDelivery = document.getElementById("delivery").checked;
                if (deliveryFields) {
                    deliveryFields.style.display = isDelivery ? "block" : "none";
                }
            });
        });
    }
    
    // Checkout form submission
    if (checkoutForm) {
        checkoutForm.addEventListener("submit", (event) => {
            event.preventDefault();
            processOrder();
        });
    }
    
    // Back to menu button
    if (backToMenuBtn) {
        backToMenuBtn.addEventListener("click", () => {
            closeModal(confirmationModal);
            resetOrder();
        });
    }
    
    // Cart item quantity and remove buttons (using event delegation)
    if (cartItemsContainer) {
        cartItemsContainer.addEventListener("click", (event) => {
            if (event.target.classList.contains("quantity-btn")) {
                const itemId = parseInt(event.target.closest(".cart-item").dataset.id);
                const cartItem = cart.find(item => item.id === itemId);
                
                if (event.target.classList.contains("decrease-btn") && cartItem.quantity > 1) {
                    updateCartItemQuantity(itemId, cartItem.quantity - 1);
                } else if (event.target.classList.contains("increase-btn")) {
                    updateCartItemQuantity(itemId, cartItem.quantity + 1);
                }
            } else if (event.target.classList.contains("cart-item-remove")) {
                const itemId = parseInt(event.target.closest(".cart-item").dataset.id);
                removeFromCart(itemId);
            }
        });
    }
}



// Update cart item quantity
function updateCartItemQuantity(itemId, newQuantity) {
    const cartItem = cart.find(item => item.id === itemId);
    if (!cartItem) return;
    
    cartItem.quantity = newQuantity;
    saveCart();
    updateCartDisplay();
}

// Remove item from cart
function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    saveCart();
    updateCartDisplay();
    updateCartCount();
}

// Empty cart
function emptyCart() {
    cart = [];
    saveCart();
    updateCartDisplay();
    updateCartCount();
}

// Update cart count display - ENHANCED VERSION BELOW
// function updateCartCount() {
//     if (!cartCount) return;
//     
//     const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
//     cartCount.textContent = totalItems;
// }

// Calculate cart totals
function calculateCartTotals() {
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const taxRate = 0.08; // 8% tax
    const tax = subtotal * taxRate;
    const total = subtotal + tax;
    
    return { subtotal, tax, total };
}

// Update cart display
function updateCartDisplay() {
    if (!cartItemsContainer) return;
    
    cartItemsContainer.innerHTML = "";
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p class='empty-cart-message'>Your cart is empty.</p>";
        if (cartSubtotal) cartSubtotal.textContent = "₱0.00";
        if (cartTax) cartTax.textContent = "₱0.00";
        if (cartTotal) cartTotal.textContent = "₱0.00";
        return;
    }
    
    cart.forEach(item => {
        const cartItemElement = document.createElement("div");
        cartItemElement.classList.add("cart-item");
        cartItemElement.dataset.id = item.id;
        
        cartItemElement.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <span class="cart-item-price">₱${item.price.toFixed(2)}</span>
                </div>
            </div>
            <div class="cart-item-actions">
                <div class="cart-item-quantity">
                    <button class="quantity-btn decrease-btn">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn increase-btn">+</button>
                </div>
                <span class="cart-item-remove">Remove</span>
            </div>
        `;
        
        cartItemsContainer.appendChild(cartItemElement);
    });
    
    // Update totals
    const { subtotal, tax, total } = calculateCartTotals();
    if (cartSubtotal) cartSubtotal.textContent = `₱${subtotal.toFixed(2)}`;
    if (cartTax) cartTax.textContent = `₱${tax.toFixed(2)}`;
    if (cartTotal) cartTotal.textContent = `₱${total.toFixed(2)}`;
}

// Update checkout display
function updateCheckoutDisplay() {
    if (!checkoutItemsContainer) return;
    
    checkoutItemsContainer.innerHTML = "";
    
    cart.forEach(item => {
        const checkoutItem = document.createElement("div");
        checkoutItem.classList.add("cart-item");
        
        checkoutItem.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-details">
                    <h4>${item.name} x ${item.quantity}</h4>
                    <span class="cart-item-price">₱${(item.price * item.quantity).toFixed(2)}</span>
                </div>
            </div>
        `;
        
        checkoutItemsContainer.appendChild(checkoutItem);
    });
    
    // Update total
    const { total } = calculateCartTotals();
    if (checkoutTotal) checkoutTotal.textContent = `₱${total.toFixed(2)}`;
}



// Display order confirmation
function displayConfirmation(orderData) {
    if (!confirmationItems || !customerInfo) return;
    
    // Display order items
    confirmationItems.innerHTML = "";
    
    cart.forEach(item => {
        const confirmItem = document.createElement("div");
        confirmItem.classList.add("cart-item");
        
        confirmItem.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-details">
                    <h4>${item.name} x ${item.quantity}</h4>
                    <span class="cart-item-price">₱${(item.price * item.quantity).toFixed(2)}</span>
                </div>
            </div>
        `;
        
        confirmationItems.appendChild(confirmItem);
    });
    
    // Display customer info
    customerInfo.innerHTML = `
        <p><strong>Name:</strong> ${orderData.name}</p>
        <p><strong>Phone:</strong> ${orderData.phone}</p>
        <p><strong>Email:</strong> ${orderData.email}</p>
        <p><strong>Order Type:</strong> ${orderData.orderType}</p>
    `;
    
    // Add address if delivery
    if (orderData.orderType === "delivery") {
        customerInfo.innerHTML += `
            <p><strong>Address:</strong> ${orderData.address}, ${orderData.city}, ${orderData.zipcode}</p>
        `;
    }
    
    // Add notes if provided
    if (orderData.notes) {
        customerInfo.innerHTML += `
            <p><strong>Special Instructions:</strong> ${orderData.notes}</p>
        `;
    }
    
    // Update total
    const { total } = calculateCartTotals();
    if (confirmationTotal) confirmationTotal.textContent = `₱${total.toFixed(2)}`;
}

// Reset order
function resetOrder() {
    cart = [];
    saveCart();
    updateCartCount();
    if (checkoutForm) checkoutForm.reset();
}

// Open modal
function openModal(modal) {
    if (!modal) return;
    modal.style.display = "block";
    document.body.style.overflow = "hidden"; // Prevent scrolling
}

// Close modal
function closeModal(modal) {
    if (!modal) return;
    modal.style.display = "none";
    document.body.style.overflow = "auto"; // Enable scrolling
}

// Show notification - BASIC VERSION
function showNotification(message) {
    const notification = document.createElement("div");
    notification.classList.add("notification");
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Fade in
    setTimeout(() => {
        notification.classList.add("show");
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove("show");
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add notification styles - BASIC STYLES
const style = document.createElement("style");
style.textContent = `
    .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #4CAF50;
        color: white;
        padding: 12px 20px;
        border-radius: 4px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        opacity: 0;
        transform: translateY(10px);
        transition: opacity 0.3s, transform 0.3s;
        z-index: 1000;
    }
    
    .notification.show {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

//========================
// ENHANCED CART VISIBILITY
//========================

// 1. Improve the notification system with better styling and animation
function showEnhancedNotification(message, itemImage) {
    const notification = document.createElement("div");
    notification.classList.add("enhanced-notification");
    
    // Create notification content with item image
    notification.innerHTML = `
        <div class="notification-image">
            <img src="${itemImage}" alt="Product image">
        </div>
        <div class="notification-content">
            <p>${message}</p>
        </div>
        <div class="notification-progress"></div>
    `;
    
    document.body.appendChild(notification);
    
    // Fade in
    setTimeout(() => {
        notification.classList.add("show");
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove("show");
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, 3000);
}

// 2. Add visual feedback to the "Add to Cart" button
function addButtonAnimation(button) {
    // Add a quick animation to the button
    button.classList.add("button-clicked");
    
    // Remove the animation class after the animation completes
    setTimeout(() => {
        button.classList.remove("button-clicked");
    }, 300);
}

// 3. Enhanced Add to Cart function
function addToCart(itemId, buttonElement) {
    const item = menuItems.find(item => item.id === itemId);
    if (!item) return;
    
    const existingItem = cart.find(cartItem => cartItem.id === itemId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
            quantity: 1
        });
    }
    
    // Save cart to localStorage for persistence across pages
    saveCart();
    
    // Add button animation if button element is provided
    if (buttonElement) {
        addButtonAnimation(buttonElement);
    }
    
    // Update cart count and make it pulse
    updateCartCount(true);
    
    // Show enhanced notification
    showEnhancedNotification(`${item.name} added to order!`, item.image);
}

// 4. Enhanced Update cart count with optional pulse animation
function updateCartCount(animate = false) {
    if (!cartCount) return;
    
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    if (animate && totalItems > 0 && cartIcon) {
        // Add pulse animation to cart icon
        cartIcon.classList.add("cart-pulse");
        
        // Remove the animation class after animation completes
        setTimeout(() => {
            cartIcon.classList.remove("cart-pulse");
        }, 700);
    }
}

// 5. Update the event listener setup for Add to Cart buttons
function updateAddToCartEventListeners() {
    // Use event delegation for Add to cart buttons with enhanced feedback
    if (menuContainer) {
        // Remove any existing click handlers to avoid duplicates
        menuContainer.removeEventListener("click", handleAddToCartClick);
        
        // Add the new event listener
        menuContainer.addEventListener("click", handleAddToCartClick);
    }
}

// Handler function for add to cart clicks
function handleAddToCartClick(event) {
    if (event.target.classList.contains("add-to-cart-btn")) {
        const itemId = parseInt(event.target.dataset.id);
        addToCart(itemId, event.target);
    }
}

// 6. Add the necessary CSS styles for enhanced visuals
const enhancedStyles = document.createElement("style");
enhancedStyles.textContent = `
    /* Enhanced notification styles */
    .enhanced-notification {
        position: fixed;
        bottom: 30px;
        right: 30px;
        background-color: white;
        color: #333;
        padding: 15px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        display: flex;
        align-items: center;
        max-width: 320px;
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.4s, transform 0.4s;
        z-index: 1000;
        border-left: 4px solid #4CAF50;
        overflow: hidden;
    }
    
    .enhanced-notification.show {
        opacity: 1;
        transform: translateY(0);
    }
    
    .notification-image {
        width: 50px;
        height: 50px;
        overflow: hidden;
        border-radius: 4px;
        margin-right: 15px;
        flex-shrink: 0;
    }
    
    .notification-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    
    .notification-content {
        flex-grow: 1;
    }
    
    .notification-content p {
        margin: 0;
        font-weight: 500;
    }
    
    .notification-progress {
        position: absolute;
        bottom: 0;
        left: 0;
        height: 3px;
        width: 100%;
        background-color: #4CAF50;
        animation: progress-bar 3s linear forwards;
    }
    
    @keyframes progress-bar {
        0% { width: 100%; }
        100% { width: 0%; }
    }
    
    /* Add to cart button animation */
    .add-to-cart-btn {
        position: relative;
        overflow: hidden;
        transition: transform 0.2s, background-color 0.2s;
    }
    
    .button-clicked {
        animation: button-ripple 0.3s ease-out;
    }
    
    @keyframes button-ripple {
        0% {
            box-shadow: 0 0 0 0 rgba(76, 175, 80, 0.5);
            transform: scale(1);
        }
        70% {
            box-shadow: 0 0 0 10px rgba(76, 175, 80, 0);
            transform: scale(0.95);
        }
        100% {
            box-shadow: 0 0 0 0 rgba(76, 175, 80, 0);
            transform: scale(1);
        }
    }
    
    /* Cart icon pulse animation */
    .cart-pulse {
        animation: cart-pulse-animation 0.7s ease-out;
    }
    
    @keyframes cart-pulse-animation {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.2);
        }
        100% {
            transform: scale(1);
        }
    }
    
    /* Make cart count more visible */
    #cart-icon {
        position: relative;
    }
    
    #cart-count {
        position: absolute;
        top: -8px;
        right: -8px;
        background-color: #ff5722;
        color: white;
        font-size: 12px;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
    }
`;
document.head.appendChild(enhancedStyles);

// 7. Function to initialize the enhanced cart system
function initEnhancedCartSystem() {
    // Update event listeners
    updateAddToCartEventListeners();
    
    // Style the cart icon and count if they exist
    if (cartIcon && cartCount) {
        // Set position relative on cart icon if not already set
        if (getComputedStyle(cartIcon).position === 'static') {
            cartIcon.style.position = 'relative';
        }
        
        // Add classes for better styling
        cartCount.classList.add('cart-count-badge');
    }
    
    console.log("Enhanced cart system initialized!");
}




document.addEventListener('DOMContentLoaded', function() {
    // Get the checkout form and modal elements
    const checkoutForm = document.getElementById('checkout-form');
    const checkoutModal = document.getElementById('checkout-modal');
    const confirmationModal = document.getElementById('confirmation-modal'); // Add reference to confirmation modal
    const closeBtn = document.querySelector('.close-btn');
    const deliveryRadio = document.getElementById('delivery');
    const pickupRadio = document.getElementById('pickup');
    const deliveryFields = document.getElementById('delivery-fields');
    
    // Close modal when clicking the close button
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            checkoutModal.style.display = 'none';
        });
    }
    
    // Show/hide delivery fields based on order type selection
    if (deliveryRadio && pickupRadio && deliveryFields) {
        deliveryRadio.addEventListener('change', function() {
            deliveryFields.style.display = 'block';
            // Make delivery fields required
            document.getElementById('address').required = true;
            document.getElementById('city').required = true;
            document.getElementById('zipcode').required = true;
        });
        
        pickupRadio.addEventListener('change', function() {
            deliveryFields.style.display = 'none';
            // Make delivery fields not required for pickup
            document.getElementById('address').required = false;
            document.getElementById('city').required = false;
            document.getElementById('zipcode').required = false;
        });
    }
    
    // Form submission validation
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Get form fields
            const name = document.getElementById('name');
            const phone = document.getElementById('phone');
            const email = document.getElementById('email');
            const address = document.getElementById('address');
            const city = document.getElementById('city');
            const zipcode = document.getElementById('zipcode');
            
            // Reset previous error messages
            clearErrorMessages();
            
            // Validate name (required)
            if (!name.value.trim()) {
                showError(name, 'Please enter your full name');
                return;
            }
            
            // Validate phone (must start with 09 and be 11 digits)
            const phoneRegex = /^09\d{9}$/;
            if (!phoneRegex.test(phone.value)) {
                showError(phone, 'Phone number must start with 09 and be 11 digits long');
                return;
            }
            
            // Validate email (must end with @gmail.com)
            const emailRegex = /^[^\s@]+@gmail\.com$/;
            if (!emailRegex.test(email.value)) {
                showError(email, 'Please enter a valid Gmail address ending with @gmail.com');
                return;
            }
            
            // Validate delivery fields if delivery is selected
            if (deliveryRadio.checked) {
                if (!address.value.trim()) {
                    showError(address, 'Please enter your delivery address');
                    return;
                }
                
                if (!city.value.trim()) {
                    showError(city, 'Please enter your city');
                    return;
                }
                
                if (!zipcode.value.trim()) {
                    showError(zipcode, 'Please enter your zip code');
                    return;
                }
            }
            
            // If all validations pass, process the order
            processOrder();
            
            // Log success (can be removed in production)
            console.log('Form submitted successfully!');
        });
    }
    
    // Function to display error messages
    function showError(inputElement, message) {
        // Remove any existing error message
        const existingError = inputElement.parentElement.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Create and append error message
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.style.color = 'red';
        errorElement.style.fontSize = '12px';
        errorElement.style.marginTop = '5px';
        errorElement.textContent = message;
        
        // Add error class to input
        inputElement.classList.add('error-input');
        inputElement.style.borderColor = 'red';
        
        // Insert error message after the input
        inputElement.parentElement.appendChild(errorElement);
        
        // Scroll to the error
        inputElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    // Function to clear all error messages
    function clearErrorMessages() {
        // Remove all error messages
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(function(errorMessage) {
            errorMessage.remove();
        });
        
        // Remove error styling from inputs
        const errorInputs = document.querySelectorAll('.error-input');
        errorInputs.forEach(function(input) {
            input.classList.remove('error-input');
            input.style.borderColor = '';
        });
    }
    
    // Function to open modal
    function openModal(modal) {
        if (modal) {
            modal.style.display = 'block';
        }
    }
    
    // Function to close modal
    function closeModal(modal) {
        if (modal) {
            modal.style.display = 'none';
        }
    }
    
    // Process order function
    function processOrder() {
        // Gather form data
        const formData = new FormData(checkoutForm);
        const orderData = Object.fromEntries(formData.entries());
        
        // Display confirmation
        displayConfirmation(orderData);
        
        // Close checkout modal and open confirmation
        closeModal(checkoutModal);
        openModal(confirmationModal);
    }
    
    
});