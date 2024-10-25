// Initialize the cart by checking for existing data in localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Function to add item to cart based on item ID
function addToCart(itemId) {
    // Find the item in itemData based on the ID
    const item = itemData.find(product => product.id === itemId);

    if (!item) {
        console.error("Item not found!");
        return;
    }

    // Check if the item is already in the cart (based on id and size)
    const existingItem = cart.find(cartItem => cartItem.id === item.id && cartItem.size === item.size);

    if (existingItem) {
        // If the item exists, increment the quantity
        existingItem.quantity += 1;
    } else {
        // Otherwise, add a new entry for the item
        cart.push({ ...item, quantity: 1 });
    }

    // Save updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    console.log("Item added to cart:", item);
    alert(`${item.name} (Size: ${item.size}) added to your cart!`);
}

// Function to retrieve cart items from localStorage
function getCartItems() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

// Function to clear the cart
function clearCart() {
    cart = [];
    localStorage.removeItem("cart");
}

// Function to remove a specific item from the cart
function removeFromCart(itemId, size) {
    cart = cart.filter(item => !(item.id === itemId && item.size === size));
    localStorage.setItem("cart", JSON.stringify(cart));
}


function displayCart() {
    const cartItems = getCartItems();
    const cartContainer = document.getElementById("cart-container");
    cartContainer.innerHTML = ""; // Clear previous content

    cartItems.forEach(item => {
        cartContainer.innerHTML += `
            <div class="cart-item">
                <span>${item.name} (Size: ${item.size}) - ${item.quantity} x ${item.price}₪</span>
                <button onclick="removeFromCart(${item.id}, '${item.size}')">Remove</button>
            </div>`;
    });
}



