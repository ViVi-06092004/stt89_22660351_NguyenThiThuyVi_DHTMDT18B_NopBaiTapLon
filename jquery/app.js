// Khai báo biến toàn cục
let listProductHTML = document.querySelector('.listProduct');
let listCartHTML = document.querySelector('.listCart');
let iconCart = document.querySelector('.icon-cart');
let iconCartSpan = document.querySelector('.icon-cart span');
let body = document.querySelector('body');
let closeCart = document.querySelector('.close');

// Danh sách sản phẩm
let products = [
    {
        id: 1,
        name: "Máy Ảnh Canon EOS 6D Mark II",
        price: 22500000,
        image: "../img/Máy Ảnh Canon EOS 6D Mark II.jpg"
    },
    {
        id: 2,
        name: "Máy ảnh Canon EOS R8",
        price: 2850000,
        image: "../img/Máy ảnh Canon EOS R8.jpg"
    }
];

// Khởi tạo giỏ hàng từ localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Hàm khởi tạo ứng dụng
function initApp() {
    renderProductList();
    renderCart();
    updateCartCount();
}

// Hiển thị danh sách sản phẩm
function renderProductList() {
  listProductHTML.innerHTML = ''; // Clear previous content
  products.forEach((product) => {
      const productHTML = `
          <div class="product">
              <img src="${product.image}" alt="${product.name}">
              <h3>${product.name}</h3>
              <p>Price: $${product.price}</p>
              <button class="add-to-cart" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}">Thêm vào giỏ hàng</button>
          </div>
      `;
      listProductHTML.innerHTML += productHTML;
  });

  // Gắn sự kiện cho nút "Add to Cart" sau khi render
  const buttons = document.querySelectorAll(".add-to-cart");
  buttons.forEach(button => {
      button.addEventListener("click", (e) => {
          const product = {
              id: e.target.dataset.id,
              name: e.target.dataset.name,
              price: parseFloat(e.target.dataset.price)
          };
          addToCart(product);
      });
  });
}

// Hàm thêm sản phẩm vào giỏ hàng
function addToCart(product) {
  const existingProduct = cart.find(item => item.id === product.id);
  if (existingProduct) {
      // Nếu sản phẩm đã có trong giỏ, tăng số lượng lên 1
      existingProduct.quantity += 1;
  } else {
      // Nếu sản phẩm chưa có trong giỏ, thêm mới vào giỏ
      cart.push({ ...product, quantity: 1 });
  }
  // Cập nhật giỏ hàng trong localStorage
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Sản phẩm đã được thêm vào giỏ hàng!");
  renderCart();  // Cập nhật lại giỏ hàng
  updateCartCount();  // Cập nhật lại số lượng trong biểu tượng giỏ hàng
}

// Hiển thị giỏ hàng
function renderCart() {
    listCartHTML.innerHTML = '';
    cart.forEach((item) => {
        const cartItemHTML = `
            <div class="cart-item">
                <span>${item.name}</span>
                <span>Quantity: ${item.quantity}</span>
                <span>Price: $${item.price}</span>
                <button class="remove-from-cart" data-id="${item.id}">Xóa</button>
            </div>
        `;
        listCartHTML.innerHTML += cartItemHTML;
    });

    // Gắn sự kiện cho nút "Xóa"
    document.querySelectorAll('.remove-from-cart').forEach(button => {
        button.addEventListener('click', () => {
            removeFromCart(button.dataset.id);
        });
    });
}

// Hàm xóa sản phẩm khỏi giỏ hàng
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
    updateCartCount();
    alert("Sản phẩm đã được xóa khỏi giỏ hàng!");
}

// Cập nhật số lượng sản phẩm trong biểu tượng giỏ hàng
function updateCartCount() {
    iconCartSpan.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

// Mở/Đóng giỏ hàng
iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
});
closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
});

// Tính tổng giá trị giỏ hàng
function updateTotalPrice() {
    let totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    localStorage.setItem("totalPrice", totalPrice);
    return totalPrice;
}

// Xử lý thanh toán
let datHang = document.getElementById("btnDatHang");
let tienMat = document.getElementById("httt-1");
let chuyenKhoan = document.getElementById("httt-2");
let input = document.querySelectorAll(".avc");

datHang.addEventListener("click", () => {
    // Kiểm tra thông tin khách hàng
    for (let i = 0; i < input.length; i++) {
        if (input[i].value.trim() === "") {
            alert("Vui lòng nhập đầy đủ thông tin!");
            return; // Dừng nếu có thông tin thiếu
        }
    }

    // Kiểm tra phương thức thanh toán
    if (!tienMat.checked && !chuyenKhoan.checked) {
        alert("Vui lòng lựa chọn hình thức thanh toán!");
        return;
    }

    let totalPrice = updateTotalPrice();
    
    // Xử lý thanh toán tiền mặt
    if (tienMat.checked && !chuyenKhoan.checked) {
        alert("Thanh toán thành công!");
        localStorage.removeItem("cart"); // Xóa giỏ hàng khỏi localStorage
        localStorage.removeItem("totalPrice"); // Xóa tổng giá khỏi localStorage
        window.location.href = "../index.html"; // Chuyển về trang chủ
    }

    // Xử lý thanh toán qua chuyển khoản
    else if (!tienMat.checked && chuyenKhoan.checked) {
        alert("Vui lòng thanh toán qua QR CODE để hoàn tất đặt hàng!");
      // Ngân hàng và tài khoản cho chuyển khoản
       let myBank = {
       BANK_ID: "MB",
       ACCOUNT_NO: "0334850635"
       };
        // Tạo URL cho mã QR
        let qrcode = 
            'https://img.vietqr.io/image/' + myBank.BANK_ID + '-'+ myBank.ACCOUNT_NO + 
            '-compact2.png?amount=' + totalPrice + '000' + '&addInfo=thanh toan cho Juliana Studio';

        // Mở mã QR trong tab mới
        let win = window.open(qrcode, "_blank");
        win.focus();

        // Sau khi chuyển khoản thành công
        localStorage.removeItem("cart"); // Xóa giỏ hàng khỏi localStorage
        localStorage.removeItem("totalPrice"); // Xóa tổng giá khỏi localStorage
        window.location.href = "../index.html"; // Chuyển về trang chủ
    }
});

// Gọi hàm khởi tạo ứng dụng
initApp();
