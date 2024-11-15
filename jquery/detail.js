// Danh sách thông tin sản phẩm
const products = {
    "canon-eos-r8": {
        name: "Máy Ảnh Canon EOS R8",
        price: "30,500,000 VND",
        image: "../img/Canon-EOS-R8.jpg",
        features: [
            "Độ phân giải: 24.2 MP",
            "ISO: 100-40000",
            "Hệ thống lấy nét kép Dual Pixel CMOS AF II"
        ]
    },
    "canon-powershot-sx70": {
        name: "Máy Ảnh Canon Powershot SX70 HS",
        price: "12,000,000 VND",
        image: "../img/Canon-Powershot-SX70-HS.jpg",
        features: [
            "Zoom quang học 65x",
            "Độ phân giải: 20.3 MP",
            "Quay video 4K Ultra HD"
        ]
    },
    "sony-alpha-a7m3": {
        name: "Máy ảnh Sony Alpha A7M3",
        price: "40,000,000 VND",
        image: "../img/Sony-Alpha-A7M3.jpg",
        features: [
            "Độ phân giải: 24.2 MP",
            "Quay video 4K",
            "Hệ thống lấy nét 693 điểm"
        ]
    },
    // Add more products here
};

// Lấy ID sản phẩm từ URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

// Hiển thị thông tin sản phẩm
if (products[productId]) {
    const product = products[productId];
    document.getElementById("productName").innerText = product.name;
    document.getElementById("productPrice").innerText = product.price;
    document.getElementById("productImage").src = product.image;
    
    // Hiển thị các tính năng
    const featuresList = document.getElementById("productFeatures");
    featuresList.innerHTML = ""; // Xóa nội dung cũ
    product.features.forEach(feature => {
        const li = document.createElement("li");
        li.innerText = feature;
        featuresList.appendChild(li);
    });
} else {
    document.getElementById("productName").innerText = "Product Not Found";
    document.getElementById("productPrice").innerText = "";
}
