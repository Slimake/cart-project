// cart
(function() {
    const cartbtn = document.querySelectorAll(".store-item-icon");
    const storeItemPrice = document.querySelectorAll("#store-item-price");
    const cartInfo = document.querySelector(".cart-info");
    const cartTotal = document.getElementById("cart-total");
    const cart = document.querySelector(".cart");
    const cartItems = document.querySelector(".cart-items");
    const cartItemPrice = document.getElementsByClassName("cart-item-price");
    const itemTotal = document.querySelector(".item-total");
    const itemCount = document.getElementById("item-count");
    let priceArr = [];

    // Toggle cart display
    cartInfo.addEventListener("click", () => {
        cart.classList.toggle("show-cart");
    });
    
    // store Item Icon
    cartbtn.forEach(btn => {
        btn.addEventListener("click", function() {
            let itemPrice = Number(this.parentNode.nextElementSibling.firstElementChild.lastElementChild.firstElementChild.textContent);
            let imgSrc = this.previousElementSibling.src;
            let count = itemCount.textContent;
            let total;
            
            alert("Item has been added to cart");

            // insert new cart item
            cartItems.insertAdjacentHTML("beforeend", `<div class="cart-item d-flex justify-content-between text-capitalize my-3">
                <img src="${imgSrc}" class="img-fluid rounded-circle" id="item-img" alt="">
                <div class="item-text">
                    <p id="cart-item-title" class="font-weight-bold mb-0">Cart Item</p>
                    <p class="cart-item-price mb-0">$${itemPrice.toFixed(2)}</p>
                </div>
                <a href="#" id='cart-item-remove' class="cart-item-remove">
                    <i class="fas fa-trash"></i>
                </a>
            </div>`);
            
            // total items in the cart
            for (price of cartItemPrice) {
                priceArr.push( parseFloat(price.textContent.slice(1)) );
            }

            total = priceArr.reduce((acc, currentValue) => acc + currentValue);
            cartTotal.textContent = total.toFixed(2);
            itemTotal.textContent = total.toFixed(2);
            itemCount.textContent = priceArr.length;
            priceArr = [];
        });
    });
    
})();


// Filter button
(function() {
    const buttons = document.querySelectorAll(".filter-btn");
    const storeItems = document.querySelectorAll(".store-item")

    buttons.forEach((button) => {
        button.addEventListener("click", (e) => {

            // prevent link from going to top of the page after click
            e.preventDefault();
            const buttonFilter = e.target.textContent.toLowerCase().trim();

            // button filter
            storeItems.forEach((item) => {
                if (buttonFilter === "all") {
                    item.style.display = "block";
                } else {
                    if ( item.classList.contains(buttonFilter) ) {
                        item.style.display = "block";
                    } else {
                        item.style.display = "none";
                    }
                }
            });
        });
    });
})();

// Filter search
(function() {
    const search = document.querySelector("#search-item");
    const storeItems = document.querySelectorAll(".store-item");

    search.addEventListener("input", (e) => {
        const searchFilter = e.target.value.toLowerCase().trim();
        
        // search field filter
        storeItems.forEach((item) => {
            if ( item.textContent.includes(searchFilter) ) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        });
    });
})();

// Modal
(function() {
    const storeImages = document.querySelectorAll(".store-img");
    const overlay = document.querySelector(".overlay")
    const hideOverlay = document.querySelector(".hide-overlay");
    const overlayImage = document.querySelector(".overlay-img")
    const body = document.querySelector("body");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");
    const imageArr = [];
    let count;
    
    // show overlay with image
    storeImages.forEach((image, index) => {
        imageArr.push(image.src);
        
        image.addEventListener("click", (e) => {
            count = index;
            overlay.classList.add("show-overlay");
            overlayImage.src = e.target.src;
            body.style.overflowY = "hidden";
        });
    });

    // remove overlay with image
    hideOverlay.addEventListener("click", () => {
        overlay.classList.remove("show-overlay");
        body.style.overflowY = "visible";
    });
    
    // prev button
    prevBtn.addEventListener("click", () => {
        count--;
        if (count < 0) {
            count = imageArr.length - 1;
        }
        overlayImage.src = imageArr[count];
    });
    
    // next button
    nextBtn.addEventListener("click", () => {
        count++;
        if (count >= imageArr.length) {
            count = 0;
        }
        overlayImage.src = imageArr[count];
    });
})();