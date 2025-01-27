// Array of products
const products = [
  { name: 'Iphone  blue', price: 10 , imgSrc: './imgs/img3.png' },
  { name: 'Iphone pink', price: 20, imgSrc: './imgs/imgIphone.png' },
  { name: 'Iphone gray', price: 30, imgSrc: './imgs/imgphone.png' }
];

// DOM selectors
const productGrid = document.querySelector('.products'),
      searchInput = document.getElementById('search-input'),
      priceFilter = document.getElementById('price-filter');

/** Filters and displays products based on search query and price filter. */
function applyFilter(){
  query = searchInput.value.toLowerCase();
  console.log(query);
  const priceValue = priceFilter.value;

  let filteredProducts = products.filter(item=> item.name.toLocaleLowerCase().includes(query))

    if(priceValue === 'under-20'){
    filteredProducts = filteredProducts.filter(item=> item.price<20)
  }else if(priceValue === '20-30'){
    filteredProducts = filteredProducts.filter(item => item.price >= 20 && item.price <= 30)
  }else if(priceValue === 'above-30'){
    filteredProducts = filteredProducts.filter(item=> item.price >30)
  }

  if(filteredProducts.length ===0){
    productGrid.innerHTML = `<h1 style="color:red">There are no products matching the filter</h1>`
  }else{
    renderProducts(filteredProducts)
  }
};

searchInput.addEventListener('input',applyFilter);
priceFilter.addEventListener('change',applyFilter);


/* function to render products on the page */
function renderProducts(filteredProducts){
  productGrid.innerHTML='';
  filteredProducts.forEach((items)=>{
    const productCard = document.createElement('div');
    productCard.classList.add('product');
    productCard.innerHTML = `
      <img src="${items.imgSrc}" alt="${items.name}" />
      <h3>${items.name}</h3>
      <p>price: ${items.price} zl</p>
      <button class='btn add-to-cart' data-product="${items.name}" data-price="${items.price}">add to cart</button>
    `
    productGrid.appendChild(productCard)
  });

  /*Adds product to the cart.*/

  addToCart = productGrid.querySelectorAll('.add-to-cart');
addToCart.forEach((btn)=>{
  btn.addEventListener('click', ()=>{
    const productName = btn.getAttribute('data-product'),
          productPrice = btn.getAttribute('data-price'),
          parentDiv = btn.closest('.product'),
          image = parentDiv.querySelector('img'),
          imgSrc = image.getAttribute('src')
    

    const IsIncart = cart.some(item => item.name === productName);

    if(!IsIncart){
      cart.push({name:productName, price:productPrice,imgSrc, quantity:1});
    update();
    updateIndicator();
    }else{
      alert('This product is already in the cart')
    }
    
  })
});

};

renderProducts(products);

// Cart array
let cart = [];
// DOM selectors
const modal = document.querySelector('.modal'),
      openModal = document.querySelector('.cart-button'),
      closeModal = document.querySelector('.close'),
      
      cartItems = document.querySelector('.cart-items'),
      indicator = document.querySelector('.cart-indicator')

/* Updates the cart item count indicator*/  
function updateIndicator(){
  indicator.textContent = cart.length
}

/* Handles the modal open event.*/
openModal.addEventListener('click' ,()=>{
  modal.classList.add('show')
  calculateTotalPrice();
});

closeModal.addEventListener('click',()=>{
  modal.classList.remove('show')
});

      window.addEventListener('click', (e)=>{
        if(e.target === modal){
          modal.classList.remove('show')
        }
      });


/*Updates the cart items in the modal*/    
function update(){
cartItems.innerHTML = '';
if(cart.length===0){
  const freeKor = document.createElement('div');
  freeKor.classList.add('modal-content')
  freeKor.innerHTML=`<p>Your cart is still empty</p>`
  cartItems.appendChild(freeKor)
}else{
  cart.forEach((items,index)=>{
    const productCard = document.createElement('div');
    productCard.classList.add('modal-product-card');
    productCard.innerHTML = `
    <img src="${items.imgSrc}" alt="Товар 3">
    <h3>${items.name}</h3>
    <p class="price">price: ${items.price} zl</p>
    <button data-index='${index}' class='increase btnn'>+</button>
    <button data-index='${index}' class='decrease btnn'>-</button>
    <p class='quantity'>${items.quantity}</p>
    <button data-index='${index}' class='remove-item'>
      <i class='cart-icon'></i>
    </button>
    `
    cartItems.appendChild(productCard)
  });
}

// DOM selectors
const removeButtons = cartItems.querySelectorAll('.remove-item'),
      incereaseButtons = cartItems.querySelectorAll('.increase'),
      decreaseButtons = cartItems.querySelectorAll('.decrease');

removeButtons.forEach((btn)=>{
  btn.addEventListener('click',()=>{
    const itemIndex = btn.getAttribute('data-index');
      cart.splice(itemIndex,1)
      update();
      updateIndicator();
      calculateTotalPrice();
      
  })
});

incereaseButtons.forEach((btn)=>{
  btn.addEventListener('click',()=>{
    const itemIndex = btn.getAttribute('data-index');
    cart[itemIndex].quantity +=1;
    update();
    calculateTotalPrice()
  })
});

decreaseButtons.forEach((btn)=>{
  btn.addEventListener('click',()=>{
    const itemIndex = btn.getAttribute('data-index');
    if(cart[itemIndex].quantity>1){
      cart[itemIndex].quantity -=1;
      update();
      calculateTotalPrice();
    }else{

      const confirmUser = confirm('are you going to delete this product?');

      if(confirmUser){
        cart.splice(itemIndex,1)
      update();
      updateIndicator();
      calculateTotalPrice();
      
      }else {
        cart[itemIndex].quantity =1;
      }
      
    }
  })
})
};

     

/*Calculates and displays the total price of the cart.*/
const cartTotal = document.getElementById('cart-total');
function calculateTotalPrice(){
  const total = cart.reduce((accumulator, currentValue)=> accumulator + currentValue.price*currentValue.quantity,0 )
  cartTotal.textContent = `total: ${total} zl`
};


 