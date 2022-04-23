const storeRecord = document.querySelector('#storeRecord');
const clearItems = document.getElementById('clearItems');
const feedBack = document.querySelector('alert-feedback')


let cartItems = [];



// Adding Shooping Items To Cart start
storeRecord.addEventListener('submit', addToCart)

function addToCart(event) {
    event.preventDefault();
    const product = document.querySelector('#product').value;
    const qty = document.querySelector('#qty').valueAsNumber;
    const amt = document.querySelector('#amt').valueAsNumber;


    const cart = { product, qty, amt };
    if (product === '' || qty === '' || !amt) {
        // feedBack.classList.add('showItem');
        // feedBack.innerHTML = `<p>value cannot be empty or negative</p>`
        alert('Please enter all field')

        return
    }
    cartItems.push(cart);
    // console.log(cart);
    // console.log(cartItems);
    displayCart();
    if (cartItems.length === 1) {
        document.getElementById('clearItems').disabled = false
    }
    document.querySelector('#qty').value = "";
    document.querySelector('#amt').value = "";
    document.querySelector('#product').value = "";
    // console.log(cartItems);
}

// Adding Shooping Items To Cart Ends


// Displaying Shopping Items On The Cart Sart

function displayCart() {

    let tableItems = '';
    cartItems.forEach((item, idx) => {
        tableItems += `
        <tr>
            <td>${idx + 1}</td>
            <td id="edit">${item.product}</td>
            <td>${item.qty}</td>
            <td>${item.amt}</td>
            <td>${item.qty * item.amt}</td>
<td><a href="#" class="edit-icon mx-2" data-id="">
           <i class="fas fa-edit"></i>
          </a>
          <a href="#" class="delete-icon" data-id="">
           <i class="fas fa-trash"></i>
          </a></td>
        </tr>
        `
        tableDisplay = document.querySelector('#tableDisplay')
        tableDisplay.innerHTML = tableItems;
    });
}

// Displaying Shopping Items On The Cart End

// Clearing Shopping Items On The Cart Sart

clearItems.addEventListener('click', clearProducts)

function clearProducts() {
    cartItems.length = 0;
    displayCart();
    disableClearBtn();
    console.log(clearProducts);
}

function disableClearBtn() {
    if (!cartItems.length) {
        document.getElementById('clearItems').disabled = true
    } else {
        document.getElementById('clearItems').disabled = false
    }
}

function init() {
    displayCart();
    disableClearBtn();
}

init()

// Clearing Shopping Items On The Cart Sart

// Editing Cart Items start



// Editing Cart Items end

// Text Spaning start
let txtRotate = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

txtRotate.prototype.tick = function() {
    let i = this.loopNum % this.toRotate.length;
    let fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    let that = this;
    let delta = 300 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function() {
        that.tick();
    }, delta);
};

window.onload = function() {
    let elements = document.getElementsByClassName('txt-rotate');
    for (let i = 0; i < elements.length; i++) {
        let toRotate = elements[i].getAttribute('data-rotate');
        let period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new txtRotate(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    let css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
    document.body.appendChild(css);
};