// Array to store cart items
let cartItems = [];

// Function to add item to cart
function addToCart(item) {
    cartItems.push(item);
    updateCartDisplay();
}

// Function to update cart display
function updateCartDisplay() {
    const listCart = document.querySelector(".listCart");
    listCart.innerHTML = ""; // Clear current cart items
    cartItems.forEach((item, index) => {
        const cartItem = document.createElement("div");
        cartItem.innerHTML = `
            <p>${item.name} - ${item.price}đ</p>
            <button onclick="removeFromCart(${index})">Xóa</button>
        `;
        listCart.appendChild(cartItem);
    });

    // Update cart item count
    document.querySelector(".icon-cart span").textContent = cartItems.length;
}

// Function to remove item from cart
function removeFromCart(index) {
    cartItems.splice(index, 1); // Remove item at index
    updateCartDisplay();
}

// Add event listeners to "Add to cart" buttons
document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", (event) => {
        const id = event.target.getAttribute("data-id");
        const name = event.target.getAttribute("data-name");
        const price = event.target.getAttribute("data-price");

        const item = { id, name, price };
        addToCart(item);
    });
});

// Show and hide cart
document.querySelector(".cartTab").style.display = "none";
document.querySelector(".icon-cart").addEventListener("click", () => {
    document.querySelector(".cartTab").style.display = "block";
});
document.querySelector(".close").addEventListener("click", () => {
    document.querySelector(".cartTab").style.display = "none";
});

// Checkout function
function pay() {
    if (cartItems.length > 0) {
        alert("Cảm ơn bạn đã mua sắm! Đơn hàng của bạn đang được xử lý.");
        cartItems = []; // Clear cart after checkout
        updateCartDisplay();
    } else {
        alert("Giỏ hàng của bạn trống.");
    }
}
