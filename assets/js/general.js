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
        // Otherwise, add a new entry for the item, including imgSrc
        cart.push({ ...item, quantity: 1, imgSrc: item.imgSrc });
    }

    // Save updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
    console.log("Item added to cart:", item);
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
    // Filter out the item to be removed
    cart = cart.filter(item => !(item.id === itemId && item.size === size));
    // Update the localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Re-display the cart items
    displayCart();
}

// Function to display the cart items on the page
function displayCart() {
    const cartItems = getCartItems();
    const cartContainer = document.getElementById("cart-container");
    cartContainer.innerHTML = ""; // Clear previous content

    // Create table structure
    const table = document.createElement('table');
    table.classList.add('w-full', 'border-collapse', 'mt-5'); // Tailwind classes for styling

    // Create table header
    const header = document.createElement('thead');
    header.innerHTML = `
        <tr class="bg-gray-200">
            <th class="py-2 px-4 text-left">Item</th>
            <th class="py-2 px-4 text-left">Size</th>
            <th class="py-2 px-4 text-left">Quantity</th>
            <th class="py-2 px-4 text-left">Price</th>
            <th class="py-2 px-4 text-left">Remove</th>
        </tr>
    `;
    table.appendChild(header);

    // Create table body
    const body = document.createElement('tbody');

    if (cartItems.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = `<td colspan="5" class="text-center py-4">Nothing here! Go shopping!</td>`;
        body.appendChild(row);
    } else {
        cartItems.forEach(item => {
            const row = document.createElement('tr');
            row.classList.add('border-b');

            row.innerHTML = `
                <td class="py-2 px-4">
                    <img src="${item.imgSrc}" alt="${item.name}" class="w-16 h-16 object-cover inline-block mr-2">
                    ${item.name}
                </td>
                <td class="py-2 px-4">${item.size}</td>
                <td class="py-2 px-4">${item.quantity}</td>
                <td class="py-2 px-4">${item.quantity * item.price}₪</td>
                <td class="py-2 px-4">
                    <button onclick="removeFromCart(${item.id}, '${item.size}')" class="text-red-500 hover:text-red-700">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </td>
            `;
            body.appendChild(row);
        });
    }

    table.appendChild(body);
    cartContainer.appendChild(table);
}
