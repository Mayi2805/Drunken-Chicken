// ============================
// CART AND ORDERS MANAGEMENT
// ============================

// Load cart and orders from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let orders = JSON.parse(localStorage.getItem('orders')) || [];

// ============================
// UPDATE CART DISPLAY
// ============================
function updateCartDisplay() {
    // Update cart icon count
    const cartCount = document.getElementById('cart-count');
    if (cartCount) cartCount.textContent = cart.length;

    // Update cart page list
    const cartItems = document.getElementById('cart-items');
    const totalEl = document.getElementById('cart-total');
    if (cartItems && totalEl) {
        if (cart.length === 0) {
            cartItems.innerHTML = "<li>Your cart is empty.</li>";
            totalEl.textContent = "₱0.00";
            return;
        }

        cartItems.innerHTML = cart.map((item, index) => `
            <li>
                <span>${item.name}</span>
                <span>₱${item.price.toFixed(2)}</span>
                <button onclick="removeFromCart(${index})">Remove</button>
            </li>
        `).join('');

        const total = cart.reduce((sum, item) => sum + item.price, 0);
        totalEl.textContent = `₱${total.toFixed(2)}`;
    }
}

// ============================
// ADD ITEM TO CART
// ============================
function addToCart(product) {
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
    showNotification(`${product.name} added to cart!`, 'success');
    animateCartIcon();
}

// ============================
// REMOVE ITEM FROM CART
// ============================
function removeFromCart(index) {
    const removed = cart.splice(index, 1)[0];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
    showNotification(`${removed.name} removed from cart!`, 'error');
}

// ============================
// CHECKOUT FUNCTION
// ============================
function checkout() {
    if (cart.length === 0) {
        showNotification("Your cart is empty!", "error");
        return;
    }

    // Add current cart items to orders
    orders = orders.concat(cart);
    localStorage.setItem('orders', JSON.stringify(orders));

    // Clear cart
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();

    showNotification("Order placed successfully!", "success");

    // Redirect to orders page
    window.location.href = "orders.html";
}

// Bind checkout button
const checkoutBtn = document.getElementById('checkout-btn');
if (checkoutBtn) checkoutBtn.onclick = checkout;

// ============================
// NOTIFICATIONS
// ============================
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.textContent = message;

    // Styling
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.left = '50%';
    notification.style.transform = 'translateX(-50%)';
    notification.style.padding = '12px 25px';
    notification.style.borderRadius = '8px';
    notification.style.color = 'white';
    notification.style.fontWeight = 'bold';
    notification.style.fontSize = '1rem';
    notification.style.zIndex = '10000';
    notification.style.backgroundColor = type === 'success' ? '#DC143C' : '#B22222';
    notification.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
    notification.style.opacity = '1';
    document.body.appendChild(notification);

    // Remove after 2 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => document.body.removeChild(notification), 300);
    }, 2000);
}

// ============================
// CART ICON BOUNCE
// ============================
function animateCartIcon() {
    const cartIcon = document.getElementById('cart-icon');
    if (cartIcon) {
        cartIcon.classList.add('bounce');
        setTimeout(() => cartIcon.classList.remove('bounce'), 500);
    }
}

// ============================
// INITIALIZE
// ============================
updateCartDisplay();
