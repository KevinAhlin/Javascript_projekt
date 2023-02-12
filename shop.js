"use strict";

// HTML-ELEMENT
const productSectionEl = document.getElementById("products");
const topPageBtnEl = document.getElementById("topBtn");


// FUNKTIONER
function renderProducts() {

    fetch("https://fakestoreapi.com/products")
        .then(res => res.json())
        .then(data => productList(data));
}

function productList(productsData) {

    let productArray = productsData;

    for (let product of productArray) {

        // Debug
        // console.log(JSON.stringify(product));
        // console.log(product.title);
        // console.log(product.category);
        // console.log(product.description);

        productSectionEl.innerHTML += `
        <article>
            <h2> ${product.title} </h2>
            <h4> 
                Category: ${product.category}
                <br>
                Product ID: ${product.id}
            </h4>
            <img src='${product.image}' alt='picture of product' class='image' width='125'>
            <p>
                ${product.description}
                <br><br>
                Price: $${product.price}
                <br><br>
                Rating: ${JSON.stringify(product.rating)}
            </p>
            <button onclick="AddToCart('${product.id}', '${product.title}',
             '${product.price}', '${product.image}')">Add to cart</button>
            <hr>
        </article>
        `
    }

}
renderProducts();

// En array för valda produkter
let cart = JSON.parse(localStorage.getItem("CART")) || [];

function AddToCart(itemId, itemTitle, itemPrice, itemImage) {
    // Debug
    // console.log(itemId);
    // console.log(itemTitle);
    // console.log(itemPrice);

    let productObject = {
        id: itemId,
        title: itemTitle,
        price: itemPrice,
        image: itemImage,
    }
    console.log(productObject);

    // Lägg till valda produkten i köplistan
    cart.push(productObject);
    console.log("Längden av listan: " + cart.length);
    console.log(cart);

    // Spara array i localStorage, tar endast emot strängar
    localStorage.setItem("CART", JSON.stringify(cart));

    alert("Product added to cart");
}

// När användaren scrollar ner 20px eller mer från toppen av sidan visas knappen
window.onscroll = function() {scrollFunction()};

function scrollFunction() {

    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        topPageBtnEl.style.display = "block";
    } else {
        topPageBtnEl.style.display = "none";
    }
}

// När användaren klickar på knappen tar dom till toppen av sidan
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
