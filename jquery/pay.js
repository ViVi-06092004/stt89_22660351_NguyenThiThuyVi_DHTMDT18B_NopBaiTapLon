var totalPrice = 0;
var cart = [];

// Thêm các sản phẩm mẫu vào giỏ hàng nếu giỏ hàng đang trống
function addSampleProducts() {
    return [
        {
            name: "Máy Ảnh Canon EOS 6D Mark II",
            price: 22500000,
            quantity: 1,
            image: "../img/Máy Ảnh Canon EOS 6D Mark II.jpg"
        },
        {
            name: "Máy ảnh Canon EOS R8",
            price: 2850000,
            quantity: 2,
            image: "../img/Máy ảnh Canon EOS R8.jpg"
        }
    ];
}

window.onload = function() {
    // Lấy giỏ hàng từ localStorage, nếu không có thì gán là mảng rỗng
    cart = JSON.parse(localStorage.getItem("myCart")) || [];

    // Nếu giỏ hàng trống, thêm sản phẩm mẫu vào giỏ hàng để dễ kiểm tra
    if (cart.length === 0) {
        cart = addSampleProducts();
        localStorage.setItem("Cart", JSON.stringify(cart));
    }
    
    // Kiểm tra giỏ hàng không rỗng
    if (cart.length > 0) {
        cart.forEach((value, key) => {
            if (value != null) {
                // Tạo phần tử mới cho mỗi sản phẩm
                let newItem = document.createElement('div');
                newItem.classList.add('item');
                newItem.innerHTML = `
                    <div class="image">
                        <img src="${value.image}" alt="${value.name}">
                    </div>
                    <div class="name">
                        ${value.name}
                    </div>
                    <div class="quantity">
                        ${value.quantity}
                    </div>
                    <div class="totalPrice">${(value.price * value.quantity).toLocaleString()} VND</div>
                `;

                // Cộng giá của sản phẩm vào tổng giá
                totalPrice += value.price * value.quantity;

                // Thêm sản phẩm vào danh sách hiển thị
                document.querySelector(".listCart").appendChild(newItem);
            }
        });

        // Cập nhật tổng giá trị giỏ hàng
        document.querySelector(".sum").textContent = `${totalPrice.toLocaleString()} VND`;
    } else {
        // Hiển thị thông báo nếu giỏ hàng trống
        document.querySelector(".listCart").innerHTML = "<div class='empty-cart'>Giỏ hàng trống</div>";
        document.querySelector(".sum").textContent = "0 VND";
    }
};

function checkOut() {
    // Kiểm tra nếu giỏ hàng rỗng
    if (cart.length === 0) {
        alert("Không có sản phẩm nào trong giỏ hàng");
    } else {
        // Lưu tổng giá vào localStorage và chuyển hướng tới trang thanh toán
        localStorage.setItem("totalPrice", totalPrice);
        window.location.href = '../html/checkout.html';
    }
}