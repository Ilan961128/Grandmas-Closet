// Define itemData array to store product details
const itemData = [
    {
        id: 1,
        name: 'VINTAGE LOS ANGELES LAKERS SWEATER',
        price: 150,
        size: 'M',
        gender: 'Unisex',
        description: 'A classic Lakers sweater, perfect for vintage sportswear fans.',
        quantity: 1,
        imgSrc: 'assets/images/sweater/LA_SWEATER.png',
        tags: ['men', 'women', 'unisex', 'sweater']
    },
    {
        id: 2,
        name: 'VINTAGE NIKE WINDBREAKER',
        price: 202,
        size: 'L',
        gender: 'Unisex',
        description: 'A classic Nike windbreaker, perfect for vintage sportswear fans.',
        quantity: 1,
        imgSrc: 'assets/images/sweater/VINTAGE_NIKE_WINDBREAKER.png',
        tags: ['men', 'women', 'unisex', 'sweater']
    },
    {
        id: 3,
        name: 'VINTAGE LOONEY TOONS SWEATER',
        price: 214,
        size: 'XL',
        gender: 'Unisex',
        description: 'A classic Looney Toons sweater, perfect for vintage cartoon fans.',
        quantity: 1,
        imgSrc: 'assets/images/sweater/VINTAGE LOONEY TOONS SWEATER.png',
        tags: ['men', 'women', 'unisex', 'sweater']
    },
    {
        id: 4,
        name: 'VINTAGE NIKE WASHINGTON STATE ZIP SWEATER',
        price: 227,
        size: 'XL',
        gender: 'Unisex',
        description: 'A classic Nike Washington State sweater, perfect for vintage sportswear fans.',
        quantity: 1,
        imgSrc: 'assets/images/sweater/VINTAGE NIKE WASHINGTON STATE  ZIP SWEATER.png',
        tags: ['men', 'women', 'unisex', 'sweater']
    },
    {
        id: 5,
        name: 'VINTAGE NIKE SWEATER',
        price: 180,
        size: 'XL',
        gender: 'Unisex',
        description: 'A classic Nike sweater, perfect for vintage sportswear fans.',
        quantity: 1,
        imgSrc: 'assets/images/sweater/VINTAGE NIKE SWEATER.png',
        tags: ['men', 'women', 'unisex', 'sweater']
    },
    {
        id: 6,
        name: 'VINTAGE NIKE JERSEY',
        price: 150,
        size: 'XXL',
        gender: 'Unisex',
        description: 'A classic Nike jersey, perfect for vintage sportswear fans.',
        quantity: 1,
        imgSrc: 'assets/images/shirts/VINTAGE NIKE JERSEY.png',
        tags: ['men', 'women', 'unisex', 'shirts']
    },
    {
        id: 7,
        name: 'VINTAGE NIKE T-SHIRT',
        price: 120,
        size: 'XXL',
        gender: 'Unisex',
        description: 'A classic Nike t-shirt, perfect for vintage sportswear fans.',
        quantity: 1,
        imgSrc: 'assets/images/shirts/VINTAGE NIKE T-SHIRT.png',
        tags: ['men', 'women', 'unisex', 'shirts']
    },
    {
        id: 8,
        name: 'VINTAGE REEBOK SAN ANTONIO SPURS 2003 T-SHIRT',
        price: 160,
        size: 'L',
        gender: 'Unisex',
        description: 'A classic Reebok San Antonio Spurs 2003 t-shirt, perfect for vintage sportswear fans.',
        quantity: 1,
        imgSrc: 'assets/images/shirts/VINTAGE REEBOK SAN ANTONIO SPURS 2003 T-SHIRT.png',
        tags: ['men', 'women', 'unisex', 'shirts']
    },
    {
        id: 9,
        name: 'VINTAGE NIKE T-SHIRT STRIPES',
        price: 140,
        size: 'S',
        gender: 'Unisex',
        description: 'A classic Nike t-shirt with stripes, perfect for vintage sportswear fans.',
        quantity: 1,
        imgSrc: 'assets/images/shirts/VINTAGE NIKE T-SHIRT STRIPES.png',
        tags: ['men', 'women', 'unisex', 'shirts']
    },
    {
        id: 10,
        name: 'VINTAGE NIKE BASEBALL T-SHIRT',
        price: 100,
        size: 'S',
        gender: 'Unisex',
        description: 'A classic Nike baseball t-shirt, perfect for vintage sportswear fans.',
        quantity: 1,
        imgSrc: 'assets/images/shirts/VINTAGE NIKE BASEBALL T-SHIRT.png',
        tags: ['men', 'women', 'unisex', 'shirts']
    },
    {
        id: 11,
        name: 'VINTAGE STUSSY HAT',
        price: 60,
        size: 'OS',
        gender: 'Unisex',
        description: 'A classic Stussy hat, perfect for vintage streetwear.',
        quantity: 1,
        imgSrc: 'assets/images/hats/VINTAGE STUSSY HAT.png',
        tags: ['men', 'women', 'unisex', 'hats']
    },
    {
        id: 12,
        name: 'VINTAGE CAMO HAT',
        price: 60,
        size: 'OS',
        gender: 'Unisex',
        description: 'A classic camo hat, perfect for vintage streetwear.',
        quantity: 1,
        imgSrc: 'assets/images/hats/VINTAGE CAMO HAT.png',
        tags: ['men', 'women', 'unisex', 'hats']
    },
    {
        id: 13,
        name: 'VINTAGE JOHN DEERE HAT',
        price: 60,
        size: 'OS',
        gender: 'Unisex',
        description: 'A classic Nike baseball t-shirt, perfect for vintage sportswear fans.',
        quantity: 1,
        imgSrc: 'assets/images/hats/VINTAGE JOHN DEERE HAT.png',
        tags: ['men', 'women', 'unisex', 'hats']
    },
    {
        id: 14,
        name: 'VINTAGE TAYLOR MADE GOLF HAT',
        price: 60,
        size: 'OS',
        gender: 'Unisex',
        description: 'A classic Nike baseball t-shirt, perfect for vintage sportswear fans.',
        quantity: 1,
        imgSrc: 'assets/images/hats/VINTAGE TAYLOR MADE GOLF HAT.png',
        tags: ['men', 'women', 'unisex', 'hats']
    },
    {
        id: 15,
        name: 'VINTAGE NIKE HAT',
        price: 60,
        size: 'OS',
        gender: 'Unisex',
        description: 'A classic Nike baseball t-shirt, perfect for vintage sportswear fans.',
        quantity: 1,
        imgSrc: 'assets/images/hats/VINTAGE NIKE HAT.png',
        tags: ['men', 'women', 'unisex', 'hats']
    },
    {
        id: 16,
        name: 'VINTAGE NIKE HAT BLUE',
        price: 60,
        size: 'OS',
        gender: 'Unisex',
        description: 'A classic Nike baseball t-shirt, perfect for vintage sportswear fans.',
        quantity: 1,
        imgSrc: 'assets/images/hats/VINTAGE NIKE HAT BLUE.png',
        tags: ['men', 'women', 'unisex', 'hats']
    },
    {
        id: 17,
        name: 'VINTAGE THE NORTH FACE HAT',
        price: 60,
        size: 'OS',
        gender: 'Unisex',
        description: 'A classic Nike baseball t-shirt, perfect for vintage sportswear fans.',
        quantity: 1,
        imgSrc: 'assets/images/hats/VINTAGE THE NORTH FACE HAT.png',
        tags: ['men', 'women', 'unisex', 'hats']
    },
    {
        id: 18,
        name: 'VINTAGE ADIDAS HAT',
        price: 60,
        size: 'OS',
        gender: 'Unisex',
        description: 'A classic Nike baseball t-shirt, perfect for vintage sportswear fans.',
        quantity: 1,
        imgSrc: 'assets/images/hats/VINTAGE ADIDAS HAT.png',
        tags: ['men', 'women', 'unisex', 'hats']
    },
];




// Initialize the cart by checking for existing data in localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function getFourItemsByCategory(category) {
    console.log(category);
    return itemData.filter(item => item.tags.includes(category)).slice(0, 4);
}


function showItem(item) {
    console.log(item);
    const itemContainer = document.getElementById("item-container");
    itemContainer.innerHTML = ""; // Clear previous content

    const itemDiv = document.createElement('div');

    itemDiv.innerHTML = `
    <div class="item-container">
        <div>
            <img src="${item.imgSrc}" alt="${item.name}" class="item-img">
        </div>
        <div class="item-info">
            <div>
                <span class="item-title">${item.name}</span>
            </div>
            <div class="diverderr">

            </div>
            <div>
                <span class="item-price">${item.price}₪</span>
            </div>
            <div class="item-stats">
                <div>
                    <span style="font-weight: bold;">Size:</span>
                    <span>${item.size}</span>
                </div>
                <div>
                    <span style="font-weight: bold;">Gender: </span>
                    <span>${item.gender}</span>
                </div>
            </div>
            <div>
                <span class="item-desc">${item.description}</span>
            </div>
            <div class="thebutton" onclick="addToCart(${item.id})">
                Add to Cart
            </div>
        </div>
    </div>
    `;

    itemContainer.appendChild(itemDiv);

}

function renderMightLikeItems(category, boxNumber) {
    let mightLikeContainer = document.getElementById("cardbox1");
    if (boxNumber === 1) {
        mightLikeContainer = document.getElementById("cardbox1");
    }
    else if (boxNumber === 2) {
        mightLikeContainer = document.getElementById("cardbox2");
    }
    mightLikeContainer.innerHTML = ""; // Clear previous content

    const items = getFourItemsByCategory(category);
    console.log(items);

    items.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.innerHTML = `
        <div class="card">
                <img src="${item.imgSrc}" alt="${item.name}" class="card-img">
                <div class="card-info">
                    <span class="card-title">${item.name}</span>
                    <span class="card-price">${item.price}₪</span>
                </div>
            </div>
        `
        mightLikeContainer.appendChild(itemDiv);
    }
    );
}

function filterItems(category, gender) {
    const itemsContainer = document.getElementById("items-container");
    itemsContainer.innerHTML = "";

    const filteredItems = itemData.filter(item =>
        item.tags.includes(category) && (item.gender === gender || item.gender === 'Unisex')
    );

    console.log(filteredItems);
    renderItems(filteredItems);
}

function getAllItems() {
    renderItems(itemData);
}

function renderItems(items) {
    const mightLikeContainer = document.getElementById("items-container"); // Ensure this element exists
    mightLikeContainer.innerHTML = ""; // Clear previous content

    // Iterate through items and group them in sets of 4
    for (let i = 0; i < items.length; i += 4) {
        const wrapperDiv = document.createElement('div');
        wrapperDiv.className = "flex";
        const cardboxDiv = document.createElement('div');
        cardboxDiv.className = "cardbox"; // Create a new cardbox for every 4 items

        // Create the cards for this set
        for (let j = i; j < i + 4 && j < items.length; j++) {
            const item = items[j];
            const itemDiv = document.createElement('div');
            itemDiv.innerHTML = `
            <div class="card">
                <img src="${item.imgSrc}" alt="${item.name}" class="card-img">
                <div class="card-info">
                    <span class="card-title">${item.name}</span>
                    <span class="card-price">${item.price}₪</span>
                </div>
            </div>
            `;
            cardboxDiv.appendChild(itemDiv); // Append the card to the cardbox
        }
        wrapperDiv.appendChild(cardboxDiv); // Append the cardbox to the wrapper

        mightLikeContainer.appendChild(wrapperDiv); // Append the cardbox to the main container
    }
}

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
