// Sample product data (same as before)
const products = [
     { id: 13, name: "Spicy Chicken Wings", price: 199, img: "img/spicywings.jpg", category: "featured" },
    { id: 14, name: "Garlic Parmesan Chicken", price: 229, img: "img/garlicparmesan.jpg", category: "featured" },
    { id: 15, name: "Chicken Fillet Meal", price: 169, img: "img/filletmeal.jpg", category: "featured" },
    { id: 16, name: "Crispy Chicken Sandwich", price: 149, img: "img/crispychicken.jpg", category: "featured" },
     { id: 17, name: "Strawberry Shake", price: 59, img: "img/strawberryshake.jpg", category: "new" },
    { id: 18, name: "Mango Smoothie", price: 69, img: "img/mangosmoothie.jpg", category: "new" },
    { id: 17, name: "Honey Glazed Chicken", price: 249, img: "img/honeyglazed.jpg", category: "new" },
    { id: 18, name: "Creamy Chicken Pasta", price: 189, img: "img/creamypasta.jpg", category: "new" },
    { id: 19, name: "Chicken Sisig", price: 159, img: "img/sisig.jpg", category: "new" },
    { id: 20, name: "Korean Fried Chicken", price: 229, img: "img/korean.jpg", category: "new" },
    { id: 21, name: "Budget Chicken Rice", price: 59, img: "img/budgetrice.jpg", category: "tipid" },
    { id: 22, name: "Chicken Lumpia Meal", price: 79, img: "img/lumpia.jpg", category: "tipid" },
    { id: 23, name: "Mini Chicken Burger", price: 69, img: "img/miniburger.jpg", category: "tipid" },
    { id: 24, name: "Egg & Chicken Combo", price: 89, img: "img/eggcombo.jpg", category: "tipid" }
]

const categoryTitles = {
    featured: "Featured Products",
    new: "New Products",
    tipid: "Tipid Meals"
};

// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update cart icon and persist cart
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) cartCount.textContent = cart.length;
}

// Add to cart
function addToCart(id) {
    const product = products.find(p => p.id === id);
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showNotification(`${product.name} added to cart!`, 'success');
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.textContent = message;

    // Style
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.left = '50%';
    notification.style.transform = 'translateX(-50%)'; // center horizontally
    notification.style.padding = '12px 25px';
    notification.style.borderRadius = '8px';
    notification.style.color = 'white';
    notification.style.fontWeight = 'bold';
    notification.style.fontSize = '1rem';
    notification.style.zIndex = '10000';
    notification.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
    notification.style.opacity = '0';
    notification.style.transition = 'opacity 0.3s, transform 0.3s';

    // Background color
    notification.style.backgroundColor = type === 'success' ? '#DC143C' : '#B22222';

    document.body.appendChild(notification);

    // Fade in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(-50%) translateY(0)';
    }, 10);

    // Remove after 2 seconds with fade out
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(-50%) translateY(-10px)';
        setTimeout(() => document.body.removeChild(notification), 300);
    }, 2000);
}


// Render products on main page
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('product-container');

    // Group products by category
    const categories = {};
    products.forEach(p => {
        if (!categories[p.category]) categories[p.category] = [];
        categories[p.category].push(p);
    });

    // Display categories
    Object.keys(categories).forEach(category => {
        const title = document.createElement('h2');
        title.className = 'category-title';
        title.textContent = categoryTitles[category];
        container.appendChild(title);

        const grid = document.createElement('div');
        grid.className = 'product-grid';

        categories[category].forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <img src="${product.img}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p class="price">Php ${product.price.toFixed(2)}</p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            `;
            grid.appendChild(card);
        });

        container.appendChild(grid);
    });

    // Initialize cart icon
    updateCartCount();
});

// Filter products by search input
const searchBar = document.getElementById('search-bar');
if (searchBar) {
    searchBar.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();

        // Select all category sections
        const categories = document.querySelectorAll('.product-grid');
        categories.forEach(grid => {
            let visibleProducts = 0;

            // Check each product in this category
            const cards = grid.querySelectorAll('.product-card');
            cards.forEach(card => {
                const name = card.querySelector('h3').textContent.toLowerCase();
                if (name.includes(searchTerm)) {
                    card.style.display = 'block';
                    visibleProducts++;
                } else {
                    card.style.display = 'none';
                }
            });

            // Hide category title if no products are visible
            const categoryTitle = grid.previousElementSibling; // assumes <h2> is just before grid
            if (visibleProducts === 0) {
                categoryTitle.style.display = 'none';
            } else {
                categoryTitle.style.display = 'block';
            }
        });
    });
}
