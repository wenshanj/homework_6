/* --------------- Init --------------- */
function init(){
    cookies();
    displayItem();
    cartReady();
    emptyCartDisplay();
}

function CinnamonRoll(name, glaze, quantity, price) {
    this.name = name;
    this.glaze = glaze;
    this.quantity = quantity;
    this.price = price;
}


/* --------------- Select Glaze --------------- */
var noGlaze = document.getElementById("none");
var vanilla = document.getElementById("vanilla");
var sugar = document.getElementById("sugar");
var chocolate = document.getElementById("chocolate");


function selectGlazeNone() {
    var notSelected = [vanilla, sugar, chocolate];
    noGlaze.style.border = "2px #B7875D solid";
    noGlaze.style.zIndex = 2;
    noGlaze.style.color = "#B7875D";
    for (var i = 0; i < notSelected.length; i++) {
        notSelected[i].style.border = "2px #000000 solid";
        notSelected[i].style.zIndex = 0;
        notSelected[i].style.color = "#000000";
    }
}

function selectGlazeVanilla() {
    var notSelected = [noGlaze, sugar, chocolate];
    vanilla.style.border = "2px #B7875D solid";
    vanilla.style.zIndex = 2;
    vanilla.style.color = "#B7875D";
    for (var i = 0; i < notSelected.length; i++) {
        notSelected[i].style.border = "2px #000000 solid";
        notSelected[i].style.zIndex = 0;
        notSelected[i].style.color = "#000000";
    }
}

function selectGlazeSugar() {
    var notSelected = [vanilla, noGlaze, chocolate];
    sugar.style.border = "2px #B7875D solid";
    sugar.style.zIndex = 2;
    sugar.style.color = "#B7875D";
    for (var i = 0; i < notSelected.length; i++) {
        notSelected[i].style.border = "2px #000000 solid";
        notSelected[i].style.zIndex = 0;
        notSelected[i].style.color = "#000000";
    }
}

function selectGlazeChocolate() {
    var notSelected = [vanilla, sugar, noGlaze];
    chocolate.style.border = "2px #B7875D solid";
    chocolate.style.zIndex = 2;
    chocolate.style.color = "#B7875D";
    for (var i = 0; i < notSelected.length; i++) {
        notSelected[i].style.border = "2px #000000 solid";
        notSelected[i].style.zIndex = 0;
        notSelected[i].style.color = "#000000";
    }
}
if (noGlaze) noGlaze.addEventListener('click', selectGlazeNone);
if (vanilla) vanilla.addEventListener('click', selectGlazeVanilla);
if (sugar) sugar.addEventListener('click', selectGlazeSugar);
if (chocolate) chocolate.addEventListener('click', selectGlazeChocolate);
/* --------------- End of Select Glaze --------------- */

/* --------------- Track Selected Option --------------- */
var selectQuantity = document.getElementById("quantity-selection");
var selectGlaze = document.getElementById("glaze-selection");
var quantitySelected = false, glazeSelected = false;
var total = "", temp = "Add to cart - $", btnMsg = "";
var itemSelected = new CinnamonRoll();

function logQuantity() {
    switch (this.value) {
        case '0':
            btnMsg = "customize to add to cart";
            break;
        case '1':
            quantitySelected = true;
            total = "6";
            btnMsg = temp.concat(total);
            itemSelected.quantity = "1";
            itemSelected.price = total;
            break;
        case '3':
            quantitySelected = true;
            total = "17";
            btnMsg = temp.concat(total);
            itemSelected.quantity = "3";
            itemSelected.price = total;
            break;
        case '6':
            quantitySelected = true;
            total = "32";
            btnMsg = temp.concat(total);
            itemSelected.quantity = "6";
            itemSelected.price = total;
            break;
        case '12':
            quantitySelected = true;
            total = "58";
            btnMsg = temp.concat(total);
            itemSelected.quantity = "12";
            itemSelected.price = total;
            break;
    }
    if (quantitySelected && glazeSelected) updateButton();
}

function logGlaze() {
    glazeSelected = true;
    var glazeSave = event.target.innerText;
    glazeSave = glazeSave.toLowerCase();
    itemSelected.glaze = glazeSave;
    if (quantitySelected && glazeSelected) updateButton();
}

function updateButton() {
    document.getElementById("add-to-cart").innerHTML = btnMsg;
}

if (selectQuantity) selectQuantity.addEventListener('change', logQuantity);
if (selectGlaze) selectGlaze.addEventListener('click', logGlaze);
/* --------------- End of Track Selected Option --------------- */

/* --------------- Update Shopping Cart --------------- */

function cookies() {
    if (typeof(Storage) !== "undefined") {
        if (localStorage.clickcount) {
            document.getElementById("nav-count").innerText = localStorage.clickcount;
            if (document.getElementById("cart-count")) {
            document.getElementById("cart-count").innerText = localStorage.clickcount;
            }
        }
        else {
            localStorage.clickcount = 0;
            if (document.getElementById("cart-count")) {
            document.getElementById("cart-count").innerText = localStorage.clickcount;
            }
            emptyCartDisplay();
        }
    }
}

var addToCartBtn = document.getElementById("add-to-cart");

function updateCartQuantity() {
    if (quantitySelected && glazeSelected) {
        if (typeof(Storage) !== "undefined") {
            if (localStorage.clickcount) {
                localStorage.clickcount = Number(localStorage.clickcount)+1;
            }
            else {
            localStorage.clickcount = 1;
            }
        document.getElementById("nav-count").innerText = localStorage.clickcount;
        }
        var itemTitle = event.target.parentElement.childNodes[1].innerText;
        itemTitle = itemTitle.toUpperCase();
        itemSelected.name = itemTitle;
        if (localStorage["itemInCart"]) {
            itemInCart = JSON.parse(localStorage.getItem("itemInCart"));
            itemInCart.push(itemSelected);
            localStorage["itemInCart"] = JSON.stringify(itemInCart);
        }
        else {
            var itemInCart = [];
            localStorage["itemInCart"] = JSON.stringify(itemInCart);
        }
    }
}

// indication that item has been added to the cart
$('button#add-to-cart').click(function(){
    if (quantitySelected && glazeSelected) {
        $('#notification').show("slow");
        $('#notification').delay(1500).fadeOut();
    }});

if (addToCartBtn) addToCartBtn.addEventListener('click', updateCartQuantity);
/* --------------- End of Update Shopping Cart --------------- */

/* --------------- Delete An Item --------------- */
function cartReady() {
    var removeCartItemButtons = document.getElementsByClassName('shopping-cart-remove');
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i];
        button.addEventListener('click', removeCartItem);
    }
    var minusQuantityButtons = document.getElementsByClassName('minus-quantity');
    for (var i = 0; i < minusQuantityButtons.length; i++) {
        var button = minusQuantityButtons[i];
        button.addEventListener('click', decreaseQuantity);
    }
    var plusQuantityButtons = document.getElementsByClassName('plus-quantity');
    for (var i = 0; i < plusQuantityButtons.length; i++) {
        var button = plusQuantityButtons[i];
        button.addEventListener('click', increaseQuantity);
    }
    var cartGlaze = document.getElementsByTagName("select");
    for (var i = 0; i < cartGlaze.length; i++) {
        var button = cartGlaze[i];
        button.addEventListener('change', changeCartGlaze);
    }
    document.getElementById("cart-count").innerText = localStorage.clickcount;
    calculateSubtotal();
}

function removeCartItem(event) {
    var buttonClicked = event.target;
    for (var i=1; i<document.getElementsByTagName("tr").length; i++) {
        if (document.getElementsByTagName("tr")[i] == buttonClicked.parentElement.parentElement) {
            itemInCart = JSON.parse(localStorage.getItem("itemInCart"));
            itemInCart.splice(i-1, 1);
            localStorage["itemInCart"] = JSON.stringify(itemInCart);
        }
    }
    buttonClicked.parentElement.parentElement.remove();
    if (Number(localStorage.clickcount) > 0) {
        localStorage.clickcount = Number(localStorage.clickcount)-1;
    }
    document.getElementById("nav-count").innerText = localStorage.clickcount;
    document.getElementById("cart-count").innerText = localStorage.clickcount;
    calculateSubtotal();
    emptyCartDisplay();
}

function emptyCartDisplay() {
    if (localStorage.clickcount == 0) {
        var header = document.getElementById("table-header");
        var emptyBag = document.getElementById("empty-bag");
        header.style.display = "none";
        emptyBag.style.display = "block"; 
    }
}
/* --------------- End of Delete An Item --------------- */

/* --------------- Modify Quantity --------------- */
function decreaseQuantity() {
    var buttonClicked = event.target;
    var curr = buttonClicked.nextSibling.innerText;
    var price = "";
    switch (curr) {
        case '1':
            buttonClicked.nextSibling.innerText = "1";
            buttonClicked.parentElement.parentElement.nextSibling.innerText = "$6";
            price = "6";
            break;
        case '3':
            buttonClicked.nextSibling.innerText = "1";
            buttonClicked.parentElement.parentElement.nextSibling.innerText = "$6";
            price = "6";
            break;
        case '6':
            buttonClicked.nextSibling.innerText = "3";
            buttonClicked.parentElement.parentElement.nextSibling.innerText = "$17";
            price = "17";
            break;
        case '12':
            buttonClicked.nextSibling.innerText = "6";
            buttonClicked.parentElement.parentElement.nextSibling.innerText = "$32";
            price = "32";
            break;
    }
    for (var i=1; i<document.getElementsByTagName("tr").length; i++) {
        if (document.getElementsByTagName("tr")[i] == buttonClicked.parentElement.parentElement.parentElement) {
            itemInCart = JSON.parse(localStorage.getItem("itemInCart"));
            itemInCart[i-1]["quantity"] = buttonClicked.nextSibling.innerText;
            itemInCart[i-1]["price"] = price;
            localStorage["itemInCart"] = JSON.stringify(itemInCart);
        }
    }
    calculateSubtotal();
}

function increaseQuantity() {
    var buttonClicked = event.target;
    var curr = buttonClicked.previousSibling.innerText;
    var price = "";
    switch (curr) {
        case '1':
            buttonClicked.previousSibling.innerText = "3";
            buttonClicked.parentElement.parentElement.nextSibling.innerText = "$17";
            price = "17";
            break;
        case '3':
            buttonClicked.previousSibling.innerText = "6";
            buttonClicked.parentElement.parentElement.nextSibling.innerText = "$32";
            price = "32";
            break;
        case '6':
            buttonClicked.previousSibling.innerText = "12";
            buttonClicked.parentElement.parentElement.nextSibling.innerText = "$58";
            price = "58";
            break;
        case '12':
            buttonClicked.previousSibling.innerText = "12";
            buttonClicked.parentElement.parentElement.nextSibling.innerText = "$58";
            price = "58";
            break;
    }
    for (var i=1; i<document.getElementsByTagName("tr").length; i++) {
        if (document.getElementsByTagName("tr")[i] == buttonClicked.parentElement.parentElement.parentElement) {
            itemInCart = JSON.parse(localStorage.getItem("itemInCart"));
            itemInCart[i-1]["quantity"] = buttonClicked.previousSibling.innerText;
            itemInCart[i-1]["price"] = price;
            localStorage["itemInCart"] = JSON.stringify(itemInCart);
        }
    }
    calculateSubtotal();
}
/* --------------- End of Modify Quantity --------------- */

/* --------------- Modify Glaze --------------- */
function changeCartGlaze() {
    for (var i=1; i<document.getElementsByTagName("tr").length; i++) {
        if (document.getElementsByTagName("tr")[i] == this.parentElement.parentElement) {
            itemInCart = JSON.parse(localStorage.getItem("itemInCart"));
            itemInCart[i-1]["glaze"] = this.value;
            localStorage["itemInCart"] = JSON.stringify(itemInCart);
        }
    }
}
/* --------------- End of Modify Glaze --------------- */

/* --------------- Calculate Subtotal --------------- */
function calculateSubtotal() {
    var total = 0;
    if (localStorage["itemInCart"]) {
        itemInCart = JSON.parse(localStorage.getItem("itemInCart"))
        for (var i=0; i<itemInCart.length; i++) {
            total += Number(itemInCart[i]["price"]);
        }
    }
    document.getElementById("subtotal").innerText = "$" + String(total);
}

/* --------------- Display Items --------------- */
function displayItem() {
    itemInCart = JSON.parse(localStorage.getItem("itemInCart"));
    for (var i = 0; i < itemInCart.length; i++) {
        newRow = document.createElement("tr");

        var picCell = document.createElement("td");
        picCell.setAttribute("class", "cart-img");
        var image = new Image();
        image.src = "asset/img/Sweet-potato-cinnamon-rolls-veganricha-9420-2-1.jpg";
        picCell.appendChild(image);

        var descCell = document.createElement("td");
        descCell.setAttribute("class", "item-detail");
        var itemName = document.createElement("h3");
        itemName.textContent = itemInCart[i]["name"];
        descCell.appendChild(itemName);
        var labelTitle = document.createElement("label");
        labelTitle.setAttribute("class", "flavor-picked");
        labelTitle.textContent = "Glaze: ";
        descCell.appendChild(labelTitle);
        var glazeSelected = document.createElement("select");
        glazeSelected.setAttribute("name", "flavor-picked");
        glazeSelected.setAttribute("id", "flavor-picked");
        var glazeNone = document.createElement("option");
        glazeNone.setAttribute("value", "none");
        glazeNone.textContent = "none";
        if (itemInCart[i]["glaze"] == "none") glazeNone.selected = true;
        glazeSelected.appendChild(glazeNone);
        var glazeVM = document.createElement("option");
        glazeVM.setAttribute("value", "vanilla-milk");
        glazeVM.textContent = "vanilla-milk";
        if (itemInCart[i]["glaze"] == "vanilla-milk") glazeVM.selected = true;
        glazeSelected.appendChild(glazeVM);
        var glazeSM = document.createElement("option");
        glazeSM.setAttribute("value", "sugar-milk");
        glazeSM.textContent = "sugar-milk";
        if (itemInCart[i]["glaze"] == "sugar-milk") glazeSM.selected = true;
        glazeSelected.appendChild(glazeSM);
        var glazeDC = document.createElement("option");
        glazeDC.setAttribute("value", "double-chocolate");
        glazeDC.textContent = "double-chocolate";
        if (itemInCart[i]["glaze"] == "double-chocolate") glazeDC.selected = true;
        glazeSelected.appendChild(glazeDC);
        descCell.appendChild(glazeSelected);

        var quantCell = document.createElement("td");
        quantCell.setAttribute("class", "quantity-detail");
        var container = document.createElement("p");
        var minus = document.createElement("i");
        minus.setAttribute("class", "fas fa-minus minus-quantity");
        container.appendChild(minus);
        var quantity = document.createElement("span");
        quantity.setAttribute("class", "quantity");
        quantity.textContent = itemInCart[i]["quantity"];
        container.appendChild(quantity);
        var plus = document.createElement("i");
        plus.setAttribute("class", "fas fa-plus plus-quantity");
        container.appendChild(plus);
        quantCell.appendChild(container);

        var priceCell = document.createElement("td");
        priceCell.setAttribute("class", "price-detail");
        var itemPrice = document.createElement("p");
        itemPrice.setAttribute("class", "item-price");
        itemPrice.textContent = "$" + itemInCart[i]["price"];
        priceCell.appendChild(itemPrice);

        var removeCell = document.createElement("td");
        removeCell.setAttribute("class", "remove");
        var remove = document.createElement("i");
        remove.setAttribute("class", "fas fa-times shopping-cart-remove");
        removeCell.appendChild(remove);

        newRow.appendChild(picCell);
        newRow.appendChild(descCell);
        newRow.appendChild(quantCell);
        newRow.appendChild(priceCell);
        newRow.appendChild(removeCell);
        document.getElementById("view-cart").appendChild(newRow);
    }
}
/* --------------- End of Display Items --------------- */
