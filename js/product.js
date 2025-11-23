// Sample product data (same as before)
const products = [
    // CHICKEN (original)
    { id: 1, name: "Fried Chicken", price: 399, img: "img/fried.jpg", category: "chicken" },
    { id: 2, name: "Chicken Nuggets", price: 149, img: "img/nuggets.jpg", category: "chicken" },
    { id: 3, name: "Whole Fried Chicken", price: 299, img: "img/Wholechicken.jpg", category: "chicken" },
    { id: 4, name: "Whole Roast Chicken", price: 299, img: "img/wholeroast.jpg", category: "chicken" },
    { id: 13, name: "Chicken Wings", price: 199, img: "img/wings.jpg", category: "chicken" },
    { id: 14, name: "Chicken Tenders", price: 159, img: "img/tenders.jpg", category: "chicken" },
    { id: 15, name: "Spicy Fried Chicken", price: 429, img: "img/spicyfried.jpg", category: "chicken" },
    { id: 16, name: "Garlic Chicken", price: 449, img: "img/garlicchicken.jpg", category: "chicken" },
    { id: 30, name: "Spicy Chicken Wings", price: 199, img: "img/spicywings.jpg", category: "chicken" },
    { id: 31, name: "Garlic Parmesan Chicken", price: 229, img: "img/garlicparmesan.jpg", category: "chicken" },
    { id: 40, name: "Creamy Chicken Pasta", price: 189, img: "img/creamypasta.jpg", category: "chicken" },
    { id: 41, name: "Chicken Sisig", price: 159, img: "img/sisig.jpg", category: "chicken" },
    { id: 42, name: "Korean Fried Chicken", price: 229, img: "img/korean.jpg", category: "chicken" },

    // DRINKS 
    { id: 5, name: "Cola", price: 25, img: "img/cola.jpg", category: "drinks" },
    { id: 6, name: "Orange Juice", price: 35, img: "img/Orange juice.jpg", category: "drinks" },
    { id: 7, name: "Mountain Dew", price: 25, img: "img/Dew.jpg", category: "drinks" },
    { id: 8, name: "Iced Tea", price: 35, img: "img/Iced Tea.jpg", category: "drinks" },
    { id: 17, name: "Lemonade", price: 30, img: "img/lemonade.jpg", category: "drinks" },
    { id: 18, name: "Mineral Water", price: 20, img: "img/water.jpg", category: "drinks" },
    { id: 19, name: "Milk Tea", price: 79, img: "img/milktea.jpg", category: "drinks" },
    { id: 20, name: "Grape Juice", price: 40, img: "img/grapejuice.jpg", category: "drinks" },
    { id: 34, name: "Strawberry Shake", price: 59, img: "img/strawberryshake.jpg", category: "drinks" },
    { id: 35, name: "Mango Smoothie", price: 69, img: "img/mangosmoothie.jpg", category: "drinks" },

    // MEALS 
    { id: 9, name: "Chicken Burger", price: 99, img: "img/burger.jpg", category: "meals" },
    { id: 10, name: "Chicken Salad", price: 199, img: "img/salad.jpg", category: "meals" },
    { id: 11, name: "Chicken Wrap", price: 149, img: "img/wrap.jpg", category: "meals" },
    { id: 12, name: "Chicken Pizza", price: 499, img: "img/pizza.jpg", category: "meals" },
    { id: 21, name: "Chicken Pasta", price: 179, img: "img/pasta.jpg", category: "meals" },
    { id: 22, name: "Chicken Rice Bowl", price: 129, img: "img/ricebowl.jpg", category: "meals" },
    { id: 23, name: "Chicken Tacos", price: 159, img: "img/tacos.jpg", category: "meals" },
    { id: 24, name: "BBQ Chicken Meal", price: 249, img: "img/bbqmeal.jpg", category: "meals" },
    { id: 32, name: "Chicken Fillet Meal", price: 169, img: "img/filletmeal.jpg", category: "meals" },
    { id: 33, name: "Crispy Chicken Sandwich", price: 149, img: "img/crispychicken.jpg", category: "meals" },
    { id: 36, name: "Budget Chicken Rice", price: 59, img: "img/budgetrice.jpg", category: "meals" },
    { id: 37, name: "Chicken Lumpia Meal", price: 79, img: "img/lumpia.jpg", category: "meals" },
    { id: 38, name: "Mini Chicken Burger", price: 69, img: "img/miniburger.jpg", category: "meals" },
    { id: 39, name: "Egg & Chicken Combo", price: 89, img: "img/eggcombo.jpg", category: "meals" }
];

const categoryTitles = {
    chicken: "Our Chicken Selection",
    drinks: "Refreshing Drinks",
    meals: "Delicious Chicken Meals"
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
