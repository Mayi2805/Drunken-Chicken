// ============================
// Load orders from localStorage
// ============================
let orders = JSON.parse(localStorage.getItem('orders')) || [];
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// ============================
// Update orders count in nav
// ============================
function updateOrderCount() {
    const orderCount = document.getElementById('order-count');
    if (orderCount) orderCount.textContent = orders.length;
}

// ============================
// Render orders on page
// ============================
function renderOrders() {
    const ordersList = document.getElementById('orders-list');
    const ordersTotalEl = document.getElementById('orders-total');

    if (!ordersList || !ordersTotalEl) return;

    if (orders.length === 0) {
        ordersList.innerHTML = "<li>No orders yet.</li>";
        ordersTotalEl.textContent = "₱0.00";
        return;
    }

    ordersList.innerHTML = orders.map((item, index) => `
        <li>
            <div class="order-info">
                <span class="order-name">${item.name}</span>
                <span class="order-price">₱${item.price.toFixed(2)}</span>
            </div>
            <button onclick="removeOrder(${index})" class="btn-remove">Remove</button>
        </li>
    `).join('');

    const total = orders.reduce((sum, item) => sum + item.price, 0);
    ordersTotalEl.textContent = `₱${total.toFixed(2)}`;
}

// ============================
// Remove single order
// ============================
function removeOrder(index) {
    const removed = orders.splice(index, 1)[0];
    localStorage.setItem('orders', JSON.stringify(orders));
    renderOrders();
    updateOrderCount();
    showNotification(`${removed.name} removed!`, 'error');
}

// ============================
// Clear all orders
// ============================
const clearOrdersBtn = document.getElementById('clear-orders-btn');
if (clearOrdersBtn) {
    clearOrdersBtn.onclick = () => {
        if (orders.length === 0) return showNotification("No orders to clear!", "error");
        if (confirm("Are you sure you want to clear all orders?")) {
            orders = [];
            localStorage.setItem('orders', JSON.stringify(orders));
            renderOrders();
            updateOrderCount();
            showNotification("All orders cleared!", "error");
        }
    };
}

// ============================
// Notification function
// ============================
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.textContent = message;
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
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => document.body.removeChild(notification), 300);
    }, 2000);
}

// ============================
// Checkout button
// ============================
const checkoutBtn = document.getElementById('checkout-btn');
if (checkoutBtn) {
    checkoutBtn.onclick = () => {
        if (cart.length === 0) return showNotification("Your cart is empty!", "error");

        orders = orders.concat(cart);
        localStorage.setItem('orders', JSON.stringify(orders));

        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();

        showNotification("Checkout successful! Your orders have been saved.", "success");
        updateOrderCount();
        renderOrders();
    };
}

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // (your product rendering code continues here...)
});

// ============================
// Initialize
// ============================
updateOrderCount();
renderOrders();
