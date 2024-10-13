// Constants and global variables
const containerDiv = document.getElementById('products');
const filterButton = document.getElementById("filterButton");
const filterInput = document.getElementById("filterInput");
const selectProducts = document.getElementById('selectProducts');
const pgContainer = document.getElementById('pagination');

let products = [];
let productDivs = [];
let currentPage = 1;


async function fetchAndDisplayProducts() {
  try {
    const response = await fetch('./products.json');

    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    products = data.data;
    if (!Array.isArray(products)) throw new Error('Expected products to be an array');
    displayProducts(products);
    setupPagination();
  } catch (error) {
    console.error('Error:', error);
  }
}

function displayProducts(productsToDisplay) {
  containerDiv.innerHTML = '';
  productDivs = productsToDisplay.map(product => createProductElement(product));
  productDivs.forEach(div => containerDiv.appendChild(div));
}


function createProductElement(product) {
  const productDiv = document.createElement('div');
  productDiv.className = 'flex flex-col';
  
  const figure = document.createElement('figure');
  figure.className = 'mx-auto';
  const img = document.createElement('img');
  img.src = product.image;
  figure.appendChild(img);
  const button = document.createElement('button');
  const productName = document.createElement('span');
  productName.className = 'text-header mx-auto';
  productName.textContent = product.name;
  const productPrice = document.createElement('span');
  productPrice.className = 'text-greeting mx-auto font-medium';
  productPrice.textContent = `$${product.price.toFixed(2)}`;
  button.append(productName, productPrice);
  productDiv.append(figure, button);
  return productDiv;
}

function filterProducts() {
  const filterValue = filterInput.value.toLowerCase();
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(filterValue) ||
    product.price.toString().includes(filterValue)
  );
  displayProducts(filteredProducts);
  setupPagination(filteredProducts);
}


function setupPagination(productsToPage = products) {
  pgContainer.innerHTML = '';
  const productsPerPage = parseInt(selectProducts.value);
  const pageCount = Math.ceil(productsToPage.length / productsPerPage);
  
  for (let i = 1; i <= pageCount; i++) {
    const pgNumber = document.createElement('button');
    pgNumber.className = 'bg-primary px-8 py-4 rounded-md';
    pgNumber.textContent = i;
    pgNumber.addEventListener('click', () => changePage(i, productsToPage));
    pgContainer.appendChild(pgNumber);
  }
  
  if (pageCount > 1) {
    const pgNext = document.createElement('button');
    pgNext.className = 'bg-primary px-8 py-4 rounded-md';
    pgNext.textContent = "Next";
    pgNext.addEventListener('click', () => {
      const nextPage = currentPage < pageCount ? currentPage + 1 : 1;
      changePage(nextPage, productsToPage);
    });
    pgContainer.appendChild(pgNext);
  }
}

function changePage(page, productsToPage = products) {
  const productsPerPage = parseInt(selectProducts.value);
  const start = (page - 1) * productsPerPage;
  const end = start + productsPerPage;
  const pageProducts = productsToPage.slice(start, end);
  displayProducts(pageProducts);
  currentPage = page;
}


if (filterButton && filterInput) {
  filterButton.addEventListener('click', () => {
    filterButton.classList.add('hidden');
    filterInput.classList.remove('hidden');
    filterInput.focus();
  });
}
filterInput.addEventListener('input', filterProducts);
selectProducts.addEventListener('change', () => {
  setupPagination();
  changePage(1);
});


fetchAndDisplayProducts();
