// ============= Count total price and total sum ============ //

const addProduct = document.querySelectorAll('.product-box__btn');
const ProductQuantity = document.querySelectorAll('.qty__item');
const quantityInBasket = document.getElementById('quantityInBasket');
const basketPrise = document.getElementById('basketPrise');
let cartArray = [
    {
        productInCart: 0,
        cartSum: 0,
        productId: 0
    }
]

function setQuantity() {
    for (let k = 0; k < ProductQuantity.length; k++) {
        ProductQuantity[k].addEventListener('change', function () {
            let number = ProductQuantity[k].value;
            let productQua = localStorage.setItem('quantity', number);
        })
    }
}

function addProductToCart() {
    for (let i = 0; i < addProduct.length; i++) {
        addProduct[i].addEventListener('click', function () {
            let btn = addProduct[i].getAttribute('id');
            let productItem = localStorage.setItem('product', btn);
            let productsInCart = localStorage.getItem('quantity');
            let productPrise = addProduct[i].getAttribute('data-price');
            let sum = productPrise * productsInCart;

            let arrOfQuantity = [];
            let arrOfTotalSum = [];
            cartArray.push({
                productInCart: productsInCart,
                cartSum: sum,
                productId: btn
            })
            for (let i = 0; i < cartArray.length; i++) {
                let totalQuant = 0;
                let totalSum = cartArray[i].cartSum;
                let c = cartArray[i].productId;
                totalQuant = cartArray[i].productInCart;

                arrOfQuantity.push(+totalQuant)
                arrOfTotalSum.push(+totalSum)

            }

            const reducer = (accumulator, currentValue) => accumulator + currentValue;
            let totalQua = arrOfQuantity.reduce(reducer);
            let totalSum = arrOfTotalSum.reduce(reducer);
            localStorage.setItem('totalSum', totalSum);
            localStorage.setItem('totalQue', totalQua);
            let getQuantity = localStorage.getItem('totalQue');
            let getPrice = localStorage.getItem('totalSum');
            quantityInBasket.innerText = getQuantity;
            basketPrise.innerText = getPrice;
        })
    }


}

addProductToCart()
setQuantity()

// ============= End Count total price and total sum ============ //

// ============= Filter of category of food ============ //

const productsParentWrapper = document.querySelector('.products-box');
const selectCategoryBtn = document.getElementById('food-filter');
const selectPriceBtn = document.getElementById('price-filter');
const productBoxItem = productsParentWrapper.querySelectorAll('.product-box__item');


const category = [
    [], //завтраки//
    [], //первые блюда//
    [], //гарниры//
    []  //все//
]


for (let i = 0; i < productBoxItem.length; i++) {
    switch (productBoxItem[i].getAttribute('data-category')) {
        case '0':
            category[0].push(productBoxItem[i]);
            break;
        case '1':
            category[1].push(productBoxItem[i]);
            break;
        case '2':
            category[2].push(productBoxItem[i]);
            break;
        default:
            category[3].push(productBoxItem[i]);
            break;
    }

}

selectCategoryBtn.addEventListener('change', function () {

    switch (selectCategoryBtn.value) {
        case '1': {
            for (let i = 0; i < productBoxItem.length; i++) {
                if (productBoxItem[i].dataset.category == '0') {
                    productBoxItem[i].style.display = 'block'
                } else {
                    productBoxItem[i].style.display = 'none'
                }
            }
        }
            break;
        case '2': {
            for (let i = 0; i < productBoxItem.length; i++) {
                if (productBoxItem[i].dataset.category == '1') {
                    productBoxItem[i].style.display = 'block'
                } else {
                    productBoxItem[i].style.display = 'none'
                }
            }
        }
            break;
        case '3': {
            for (let i = 0; i < productBoxItem.length; i++) {
                if (productBoxItem[i].dataset.category == '2') {
                    productBoxItem[i].style.display = 'block'
                } else {
                    productBoxItem[i].style.display = 'none'
                }
            }
        }
            break;
        default:
            for (let i = 0; i < productBoxItem.length; i++) {
                productBoxItem[i].style.display = 'block'
            }
    }
})
// ============= End Filter of category of food ============ //

// ============= Filter of price ============ //


selectPriceBtn.addEventListener('change',function () {
    let priceValue = selectPriceBtn.value;
    for (let i = 0;i<productBoxItem.length;i++){
        if (productBoxItem[i].dataset.price*1 <= priceValue){
            productBoxItem[i].style.display= 'block'
        }else if(priceValue=='0'){
            productBoxItem[i].style.display= 'block'
        }
        else {
            productBoxItem[i].style.display= 'none'

        }
        }
        // productPrice.style.display='none'
})

// ============= End Filter of price ============ //


// =========== Get order action ================ //

let getOrderBtn = document.getElementById('get-order');
let orderForm = document.getElementById('modal-form');
let orderFormUserName = orderForm.querySelector('#user-name');
let orderFormUserEmail = orderForm.querySelector('#user-email');
let confirmOrderBtn = orderForm.querySelector('#send-btn');

getOrderBtn.addEventListener('click',function () {
    orderForm.setAttribute('class','modal-form-show');


})

confirmOrderBtn.addEventListener('click',function () {
    let trimmsg = orderFormUserName.value.trim();
    let triemail = orderFormUserEmail.value.trim();
    if (triemail == '' || trimmsg == ''){
        alert('поле не должно быть пустым или заполеным пробелами')
    }
    else {
        alert('Спасибо за покупку!')
        quantityInBasket.innerText=0;
        basketPrise.innerText = 0;
        orderForm.setAttribute('class','modal-form');
        orderFormUserName.value  = ''
        orderFormUserEmail.value  = ''
        console.log(orderFormUserEmail.value)

    }
})
// =========== End Get order action ================ //
