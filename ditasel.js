// =======================
// SLIDER PRINCIPAL
// =======================

const slides = document.querySelectorAll(".slide");
let current = 0;

function showSlide(index){
    slides.forEach(s => s.classList.remove("active"));
    slides[index].classList.add("active");
}

function nextSlide(){
    current++;
    if(current >= slides.length) current = 0;
    showSlide(current);
}

function prevSlide(){
    current--;
    if(current < 0) current = slides.length - 1;
    showSlide(current);
}

setInterval(nextSlide, 5000);


// =======================
// CLIENTES (CORREGIDO)
// =======================

let clienteSlides = [];
let clienteCurrent = 0;

function initClientes(){
    clienteSlides = document.querySelectorAll(".cliente-slide");

    if (clienteSlides.length > 0) {
        showClienteSlide(0);
    }
}

function showClienteSlide(i){
    clienteSlides.forEach(s => s.classList.remove("active"));
    if(clienteSlides[i]) {
        clienteSlides[i].classList.add("active");
    }
}

function nextClienteSlide(){
    if(clienteSlides.length === 0) return;

    clienteCurrent++;
    if(clienteCurrent >= clienteSlides.length) clienteCurrent = 0;
    showClienteSlide(clienteCurrent);
}

function prevClienteSlide(){
    if(clienteSlides.length === 0) return;

    clienteCurrent--;
    if(clienteCurrent < 0) clienteCurrent = clienteSlides.length - 1;
    showClienteSlide(clienteCurrent);
}

setInterval(() => {
    if(clienteSlides.length > 0){
        nextClienteSlide();
    }
}, 5000);


// =======================
// CARRITO
// =======================

let cart = [];
let total = 0;

function toggleCart(){
    document.getElementById("cartPanel").classList.toggle("active");
}

function addToCart(product, price){

    cart.push({ product, price });

    total += price;
    updateCart();
}

function removeFromCart(index){

    total -= cart[index].price;
    cart.splice(index, 1);

    updateCart();
}

function updateCart(){

    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = "";

    cart.forEach((item, index)=>{

        cartItems.innerHTML += `
        <div class="cart-item">
            <h4>${item.product}</h4>
            <p>$${item.price}</p>

            <button class="remove-btn" onclick="removeFromCart(${index})">
                ✕
            </button>
        </div>
        `;
    });

    document.getElementById("total").innerText = `Total: $${total}`;
    document.getElementById("cart-count").innerText = cart.length;
}


// =======================
// PRODUCTOS
// =======================

const products = [
    {name:"Caja de alfajores x16", price:25000, img:"productos/producto1.png"},
    {name:"Postre de Alfajores", price:10000, img:"productos/producto2.png"},
    {name:"Caja Personalizada", price:28000, img:"productos/producto3.jpeg"},
    {name:"Caja Especial de corazones", price:35000, img:"productos/producto4.jpeg"},
    {name:"Galletas chips de Chocolate", price:15000, img:"productos/producto5.PNG"}
];

let productIndex = 0;
const perPage = 3;

function renderProducts(){

    const grid = document.getElementById("productos-grid");
    if(!grid) return;

    grid.innerHTML = "";

    const visible = products.slice(productIndex, productIndex + perPage);

    visible.forEach(p=>{
        grid.innerHTML += `
        <div class="producto">
            <img src="${p.img}">
            <h3>${p.name}</h3>
            <p>Delicioso alfajor artesanal</p>
            <span>$${p.price}</span>

            <button class="add-cart"
            onclick="addToCart('${p.name}',${p.price})">
                Agregar al carrito
            </button>
        </div>
        `;
    });
}

function nextProducts(){
    productIndex += perPage;
    if(productIndex >= products.length){
        productIndex = 0;
    }
    renderProducts();
}

function prevProducts(){
    productIndex -= perPage;
    if(productIndex < 0){
        productIndex = Math.max(0, products.length - perPage);
    }
    renderProducts();
}


// =======================
// VIDEOS
// =======================

const videos = document.querySelectorAll(".video-slide");
let videoIndex = 0;

function showVideo(index){

    videos.forEach(v=>{
        v.classList.remove("active");
        v.pause();
        v.currentTime = 0;
    });

    const currentVideo = videos[index];
    if(currentVideo){
        currentVideo.classList.add("active");
        currentVideo.play().catch(()=>{});
    }
}

function nextVideo(){
    videoIndex++;
    if(videoIndex >= videos.length){
        videoIndex = 0;
    }
    showVideo(videoIndex);
}

function prevVideo(){
    videoIndex--;
    if(videoIndex < 0){
        videoIndex = videos.length - 1;
    }
    showVideo(videoIndex);
}

window.addEventListener("load", ()=>{
    showVideo(videoIndex);
});

document.addEventListener("DOMContentLoaded", ()=>{

    const btnNext = document.querySelector(".video-next");
    const btnPrev = document.querySelector(".video-prev");

    if(btnNext) btnNext.addEventListener("click", nextVideo);
    if(btnPrev) btnPrev.addEventListener("click", prevVideo);

    // 🔥 IMPORTANTE: inicializar clientes aquí
    initClientes();
});


// =======================
// MÚSICA DE FONDO
// =======================

const bgMusic = document.getElementById("bg-music");
const musicBtn = document.getElementById("musicBtn");

let musicPlaying = false;

if(musicBtn){

    musicBtn.addEventListener("click", ()=>{

        if(!bgMusic) return;

        if(musicPlaying){
            bgMusic.pause();
            musicPlaying = false;
            musicBtn.innerHTML = `<i class="fa-solid fa-music"></i>`;
        } 
        else {
            bgMusic.play().catch(()=>{});
            musicPlaying = true;
            musicBtn.innerHTML = `<i class="fa-solid fa-volume-high"></i>`;
        }
    });
}


// inicializar productos al final (seguro)
renderProducts();
setInterval(nextProducts, 5000);

function cerrarPopup(){
    document.getElementById("popupAviso").style.display = "none";
}