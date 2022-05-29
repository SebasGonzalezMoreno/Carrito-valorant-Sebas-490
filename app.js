const containerCards = document.getElementById('container-cards');
const selectProducts = document.getElementById('select-products');
const btnCreate = document.getElementById('btn-create');
const tableCarts = document.getElementById('table-carts');
const tBody = document.getElementById('tBody');

let imgSelected = " ";
let idProduct = 0;
const cart = [];

const modal = document.querySelector('.modal');
const closeModal = document.getElementById('close-modal');
const newProduct = document.getElementById('new-product');
const newPrice = document.getElementById('new-price');
const newImage = document.getElementById('new-image');
const btnNewProduct = document.getElementById('btn-new-create');
const filterXPrice = document.getElementById('filterXPrice');

    
window.addEventListener('load', listSelect);
selectProducts.addEventListener('change', renderCards);
btnCreate.addEventListener('click', showModal);
btnNewProduct.addEventListener('click', createNewProduct);
newImage.addEventListener('change',importImg);
closeModal.addEventListener('click',()=> modal.style.display = 'none');
filterXPrice.addEventListener('change', filterPoducts);

function filterPoducts(event) {
  const responseFilter = event.target.value === 'Menores a 2'
  ? fruits.filter( fruit => fruit.price < 60)
  : event.target.value === 'Entre 2 y 4'
  ? fruits.filter( fruit => fruit.price >= 60 && fruit.price <= 80)
  : event.target.value === 'Mayores a 4'
  ? fruits.filter( fruit => fruit.price > 100)
  : null;

  containerCards.innerHTML = '';
  responseFilter.map( fruit => createCards(fruit));
}

function importImg(event) {
  const currentImg = event.target.files[0];
  const objectURL = URL.createObjectURL(currentImg);
  imgSelected = objectURL;   
}

function createNewProduct() {
  idProduct++;
  const titleProduct = newProduct.value;
  const priceProduct = newPrice.value;
  const id = idProduct;

  const newFruit = {id:id,product: titleProduct,price: priceProduct,image: imgSelected};

  fruits.push(newFruit);
  listSelect();
  modal.style.display = 'none';
}

function showModal() {
  modal.style.display = 'flex';  
}

function renderCards() {
  fruits.map( fruit => { fruit.product === selectProducts.value ? createCards(fruit) : null } );
}

function listSelect() {
  selectProducts.innerHTML = '';  
  const anyOption = document.createElement('option');
  selectProducts.appendChild(anyOption);
  anyOption.textContent = 'Selecciona tu skin';
  fruits.map( fruit => {
    const option = document.createElement('option');
    option.value = fruit.product;
    option.textContent = fruit.product;
    selectProducts.appendChild(option);
  });
}

function createCards(fruit) {
  const { product, image, id, price } = fruit;

  const card = document.createElement('div');
  card.classList.add('card-product');

  const imgCard = document.createElement('img');
  imgCard.setAttribute('src',image);
  imgCard.setAttribute('alt',`${id}-${product}`);
  imgCard.classList.add('img-product');

  const nameCard = document.createElement('p');
  nameCard.textContent = product;
  nameCard.classList.add('name-product');

  const priceCard = document.createElement('p');
  priceCard.classList.add('price-product');
  priceCard.textContent = price;

  const btnAdd = document.createElement('button');
  btnAdd.setAttribute('id',id);
  btnAdd.classList.add('btn-add');
  btnAdd.textContent = "Add to Cart";
  btnAdd.addEventListener('click', addToCart);





  card.appendChild(imgCard);
  card.appendChild(nameCard);
  card.appendChild(priceCard);
  card.appendChild(btnAdd);


  containerCards.appendChild(card);
}

function addToCart(event) {

  // 1. identificar  el producto
  const idCurrentProduct = event.target.id;  

  // 2. Trae el producto
  const productSelected = fruits.find( fruit => fruit.id === idCurrentProduct);
  console.log(productSelected);    

  // 3. Agregar al carrito
    if(cart.length === 0) {
      cart.push(productSelected);      
    }
    else {
      const isExist = cart.find( product => product.id === productSelected.id );
      if(isExist === undefined) {
        cart.push(productSelected);
      } else {
        isExist.quantity++;
      }
    }
    tBody.innerHTML = '';
    cart.map( element => {      
      renderCart(element);
    })    
}

function renderCart(product) {  
  
  const tr = document.createElement('tr');
    tr.classList.add('tr-products');
    
    tr.innerHTML = `
    <td>${product.product}</td>
    <td>${product.price}</td>
    <td><button class="decQuantity" id="decQuantity">-</button></td>        
    <td>${product.quantity}</td>
    <td><button class="addQuantity" id="addQuantity">+</button></td>
      <td>${(product.quantity * product.price).toFixed(2)}</td>  
      `
      tBody.appendChild(tr);      

  const btnAdd = document.querySelector('.addQuantity');
    btnAdd.addEventListener('click', (event)=> {
    const productName = event.target.parentElement.parentElement.children[0].textContent;
    cart.map( element => {
      if (element.product === productName) {
        element.quantity++;          
      }
    });
  })
}    
    