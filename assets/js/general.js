function signout() {
    fetch('http://localhost:5500/signout', {
        method: 'GET',
    })
        .then(response => {
            if (response.ok) {
                window.location.href = 'index.html';
            } else {
                console.error('Sign out failed:', response.statusText);
            }
        })
        .catch(error => {
            console.error('Sign out failed:', error);
        });
}

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let itemsToShow = 8;

function getFourItemsByCategory(category) {
    return itemData.filter(item => item.tags.includes(category)).slice(0, 4);
}


function showItem(item) {
    const itemContainer = document.getElementById("item-container");
    itemContainer.innerHTML = "";

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
                    <span class="capitalize">${item.gender}</span>
                </div>
            </div>
            <div>
                <span class="item-desc">${item.description}</span>
            </div>
            <div class="thebutton" onclick="addToCart('${item._id}')">
                Add to Cart
            </div>
        </div>
    </div>
    `;

    itemContainer.appendChild(itemDiv);

}

function getCartTotal() {
    const cartItems = getCartItems();
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return total;
}

function renderMightLikeItems(category, boxNumber) {
    let mightLikeContainer = document.getElementById("cardbox1");
    if (boxNumber === 1) {
        mightLikeContainer = document.getElementById("cardbox1");
    }
    else if (boxNumber === 2) {
        mightLikeContainer = document.getElementById("cardbox2");
    }
    mightLikeContainer.innerHTML = "";

    const items = getFourItemsByCategory(category);

    items.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.innerHTML = `
        <div class="card hover:scale-110 transition" onClick="location.href='item.html?id=${item._id}'">
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

    fetch('http://localhost:5500/getItems', { method: 'GET' })
        .then(response => response.json())
        .then(data => {
            const items = data.items;
            const filteredItems = items.filter(item =>
                item.tags.includes(category) && (item.gender === gender || item.gender === 'unisex'));
        })
        .catch(error => {
            console.error("Error:", error);
        });
    // const filteredItems = itemData.filter(item =>
    //     item.tags.includes(category) && (item.gender === gender || item.gender === 'Unisex')
    // );
}

let currentData;

function loadMoreItems() {
    itemsToShow += 2
    renderItems(currentData);
}


function getAllItems(itemData, control_panel = false) {
    renderItems(itemData, control_panel);
}

function howManyItemsInCart() {
    const cartItems = getCartItems();
    return cartItems.length;
}

function renderItems(items, control_panel) {
    const loadMoreContainer = document.getElementById("loadmore");
    const mightLikeContainer = document.getElementById("items-container");
    if (!control_panel) {
        mightLikeContainer.innerHTML = "";
    }

    for (let i = 0; i < Math.min(items.length, itemsToShow); i += 4) {
        const wrapperDiv = document.createElement('div');
        wrapperDiv.className = "flex";
        const cardboxDiv = document.createElement('div');
        cardboxDiv.className = "cardbox"; // Create a new cardbox for every 4 items

        for (let j = i; j < i + 4 && j < items.length; j++) {
            const item = items[j];
            const itemDiv = document.createElement('div');
            itemDiv.innerHTML = `
            <div class="card hover:scale-110 transition" onClick="location.href='item.html?id=${item._id}'">
                <img src="${item.imgSrc}" alt="${item.name}" class="card-img">
                <div class="card-info">
                    <span class="card-title">${item.name}</span>
                    <span class="card-price">${item.price}₪</span>
                </div>
            </div>
            `;
            cardboxDiv.appendChild(itemDiv);
        }
        wrapperDiv.appendChild(cardboxDiv);

        if (!control_panel) {
            mightLikeContainer.appendChild(wrapperDiv);

            if (items.length > itemsToShow) {
                loadMoreContainer.style.display = "block";
            } else {
                loadMoreContainer.style.display = "none";
            }
        }



        currentData = items;
    }
}

// Function to get an item by ID
function getItemById(id) {
    fetch('http://localhost:5500/getItemById/' + id, { method: 'GET' })
        .then(response => response.json())
        .then(data => {
            return data.item;
        })
        .catch(error => {
            console.error("Error:", error);
        });
}
function getItemBAndShowItem(id) {
    fetch('http://localhost:5500/getItemById/' + id, { method: 'GET' })
        .then(response => response.json())
        .then(data => {
            showItem(data.item);
        })
        .catch(error => {
            console.error("Error:", error);
        });
}

// Function to display item details on the page
function displayItem() {
    const params = new URLSearchParams(window.location.search);
    const itemId = params.get('id');
    getItemBAndShowItem(itemId);
}


// Function to add item to cart based on item ID
function addToCart(itemId) {
    fetch('http://localhost:5500/checkSession')
        .then(response => response.json())
        .then(data => {
            if (data.message === "Unauthorized") {
                window.location.href = "signin.html";
            }
            else {
                fetch('http://localhost:5500/getItemById/' + itemId, { method: 'GET' })
                    .then(response => response.json())
                    .then(data => {
                        item = data.item;
                        cart = JSON.parse(localStorage.getItem("cart")) || [];
                        const existingItem = cart.find(cartItem => cartItem._id === item._id && cartItem.size === item.size);

                        if (existingItem) {
                            existingItem.quantity += 1;
                        } else {
                            cart.push({ ...item, quantity: 1, imgSrc: item.imgSrc });
                        }

                        localStorage.setItem("cart", JSON.stringify(cart));
                        let currentCartNum = document.getElementById("cartNum").innerText;
                        currentCartNum = currentCartNum.replace("(", "").replace(")", "");
                        currentCartNum = parseInt(currentCartNum);
                        currentCartNum += 1;
                        document.getElementById("cartNum").innerText = "(" + currentCartNum + ")";
                    })
                    .catch(error => {
                        console.error("Error:", error);
                    });
            }
        })
        .catch(error => {
            console.error("Error:", error);
        });

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
    cart = cart.filter(item => !(item._id === itemId && item.size === size));
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

function displayOrderCart(orderId) {
    fetch('http://localhost:5500/getOrderById/' + orderId, { method: 'GET' })
        .then(response => response.json())
        .then(data => {
            const cartItems = data.order.items;
            document.getElementById("empty-cart-message").style.display = "none";
            const cartContainer = document.getElementById("cart-container");
            cartContainer.innerHTML = "";

            const table = document.createElement('table');
            table.id = "cart-table";
            table.classList.add('w-full', 'border-collapse', 'mt-5');

            const header = document.createElement('thead');
            header.innerHTML = `
                <tr class="bg-gray-200">
                    <th class="py-2 px-4 text-left">Item</th>
                    <th class="py-2 px-4 text-left">Size</th>
                    <th class="py-2 px-4 text-left">Quantity</th>
                </tr>
            `;
            table.appendChild(header);

            const body = document.createElement('tbody');
            let totalAmount = 0;

            cartItems.forEach(item => {
                const row = document.createElement('tr');
                row.classList.add('border-b');

                const itemTotal = item.quantity * item.item.price;
                totalAmount += itemTotal;

                row.innerHTML = `
                        <td class="py-2 px-4">
                            <img src="${item.item.imgSrc}" alt="${item.item.name}" class="w-16 h-16 object-cover inline-block mr-2">
                            <a href="/item.html?id=${item.item._id}">${item.item.name}</a>
                        </td>
                        <td class="py-2 px-4">${item.item.size}</td>
                        <td class="py-2 px-4"><input type="text" id="quantity-${item.item._id}" value="${item.quantity}" class="form-control border-2 border-[#131313] w-[40px]" /></td>
                    `;
                body.appendChild(row);
            });

            table.appendChild(body);
            cartContainer.appendChild(table);
        })
        .catch(error => {
            console.error("Error:", error);
        });
}
function displayMyOrderCart(orderId) {
    fetch('http://localhost:5500/getOrderById/' + orderId, { method: 'GET' })
        .then(response => response.json())
        .then(data => {
            const cartItems = data.order.items;
            document.getElementById("empty-cart-message").style.display = "none";
            const cartContainer = document.getElementById("cart-container");
            cartContainer.innerHTML = "";

            const table = document.createElement('table');
            table.id = "cart-table";
            table.classList.add('w-full', 'border-collapse', 'mt-5');

            const header = document.createElement('thead');
            header.innerHTML = `
                <tr class="bg-gray-200">
                    <th class="py-2 px-4 text-left">Item</th>
                    <th class="py-2 px-4 text-left">Size</th>
                    <th class="py-2 px-4 text-left">Gender</th>
                    <th class="py-2 px-4 text-left">Quantity</th>
                    <th class="py-2 px-4 text-left">Price</th>
                </tr>
            `;
            table.appendChild(header);

            const body = document.createElement('tbody');

            console.log(cartItems);

            cartItems.forEach(item => {
                const row = document.createElement('tr');
                row.classList.add('border-b');

                row.innerHTML = `
                        <td class="py-2 px-4">
                            <img src="${item.item.imgSrc}" alt="${item.item.name}" class="w-16 h-16 object-cover inline-block mr-2">
                            <a href="/item.html?id=${item.item._id}">${item.item.name}</a>
                        </td>
                        <td class="py-2 px-4">${item.item.size}</td>
                        <td class="py-2 px-4">${item.item.gender}</td>
                        <td class="py-2 px-4">${item.quantity}</td>
                        <td class="py-2 px-4">${item.item.price}</td>
                    `;
                body.appendChild(row);
            });

            table.appendChild(body);
            cartContainer.appendChild(table);
            return cartItems;
        })
        .catch(error => {
            console.error("Error:", error);
        });

}

function updateAmountOrder(itemId, operation) {
    cart = JSON.parse(localStorage.getItem("cart")) || [];

    const itemIndex = cart.findIndex(item => item._id === itemId);
    if (itemIndex !== -1) {
        const item = cart[itemIndex];

        if (operation === '+') {
            item.quantity += 1;
        } else if (operation === '-' && item.quantity > 1) {
            item.quantity -= 1;
        } else if (operation === '-' && item.quantity === 1) {
            removeFromCart(item._id, item.size);
            return;
        }

        localStorage.setItem("cart", JSON.stringify(cart));

        displayCart();
    }
}

function displayCart() {

    const cartItems = getCartItems();
    if (cartItems.length === 0) {
        document.getElementById("empty-cart-message").innerHTML = "Nothing here! Go shopping!";
        document.getElementById("checkOutButton").style.display = "none";
        document.getElementById("totalAmount").style.display = "none";
        document.getElementById("cart-table").style.display = "none";
        document.getElementById("empty-cart-message").style.display = "block";

        // document.getElementById("checkOutButton").style.display = "hidden";
        // document.getElementById("totalAmount").style.display = "hidden";
        // const row = document.createElement('tr');
        // row.innerHTML = `<td colspan="5" class="text-center py-4">Nothing here! Go shopping!</td>`;
        // cartContainer.appendChild(row);

        return;
    }
    document.getElementById("empty-cart-message").style.display = "none";
    const cartContainer = document.getElementById("cart-container");
    cartContainer.innerHTML = "";

    const table = document.createElement('table');
    table.id = "cart-table";
    table.classList.add('w-full', 'border-collapse', 'mt-5');

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

    const body = document.createElement('tbody');
    let totalAmount = 0;

    cartItems.forEach(item => {
        const row = document.createElement('tr');
        row.classList.add('border-b');

        const itemTotal = item.quantity * item.price;
        totalAmount += itemTotal;

        row.innerHTML = `
                <td class="py-2 px-4">
                    <img src="${item.imgSrc}" alt="${item.name}" class="w-16 h-16 object-cover inline-block mr-2">
                    <a href="/item.html?id=${item._id}">${item.name}</a>
                </td>
                <td class="py-2 px-4">${item.size}</td>
                <td class="py-2 px-4"><span onclick=updateAmount('${item._id}','-')> - </span><span id="quantity">${item.quantity}</span><span onclick=updateAmount('${item._id}','+')> + </span></td>
                <td class="py-2 px-4">${itemTotal}₪</td>
                <td class="py-2 px-4">
                    <button onclick="removeFromCart('${item._id}', '${item.size}')" class="text-red-500 hover:text-red-700">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </td>
            `;
        body.appendChild(row);
    });


    table.appendChild(body);
    cartContainer.appendChild(table);

    document.getElementById("total").innerText = totalAmount;
}

function updateAmount(itemId, operation) {
    cart = JSON.parse(localStorage.getItem("cart")) || [];

    const itemIndex = cart.findIndex(item => item._id === itemId);
    if (itemIndex !== -1) {
        const item = cart[itemIndex];

        if (operation === '+') {
            item.quantity += 1;
        } else if (operation === '-' && item.quantity > 1) {
            item.quantity -= 1;
        } else if (operation === '-' && item.quantity === 1) {
            removeFromCart(item._id, item.size);
            return;
        }

        localStorage.setItem("cart", JSON.stringify(cart));

        displayCart();
    }
}

function validateCart() {
    const cartItems = getCartItems();
    if (cartItems.length === 0) {
        alert("Your cart is empty!");
        return false;
    }

    for (let i = 0; i < cartItems.length; i++) {
        if (cartItems[i].quantity < 1) {
            alert("Quantity must be at least 1!");
            return false;
        }
    }
    checkCartItems(cartItems);
}



async function checkCartItems(cartItems) {

    const fetchPromises = cartItems.map(item =>
        fetch('http://localhost:5500/getItemById/' + item._id, { method: 'GET' })
            .then(response => response.json())
            .then(data => {
                if (item.quantity > data.item.quantity) {
                    alert("Not enough stock for " + data.item.name + "!");
                    throw new Error("Not enough stock for " + data.item.name);
                }
                return data.item.price * item.quantity;
            })
            .catch(error => {
                console.error("Error:", error);
                throw error;
            })
    );

    try {
        const prices = await Promise.all(fetchPromises);
        totalSum = prices.reduce((sum, price) => sum + price, 0);

        var totalDOMamountSTR = document.getElementById("total").innerText;
        var totalDOMamount = parseInt(totalDOMamountSTR);

        if (totalSum !== totalDOMamount) {
            alert("The total amount has changed. Your cart has been restarted.");
            clearCart();
            displayCart();
            return false;
        }


        window.location.href = "checkout.html";



    } catch (error) {
        console.error("Error in processing cart items:", error);
    }
}

