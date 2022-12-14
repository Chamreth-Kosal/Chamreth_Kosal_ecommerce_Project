// variables
let isToggle = false;
let products = [
  {
    id: 1,
    product_name: "house",
    price: "$455,000,000",
    Description: "6 X 5",
    image_url: '../../img/house.jpg',
  },
  {
    id: 2,
    product_name: "house",
    price: "$455,000,000",
    Description: "6 X 5",
    image_url: '',
  },
  {
    id: 3,
    product_name: "house",
    price: "$455,000,000",
    Description: "6 X 5",
    image_url: '',
  }
];

function saveProduct() {
  localStorage.setItem('products', JSON.stringify(products));
}

function loadProduct() {
  let getProduct = localStorage.getItem('products');
  let product = JSON.parse(getProduct);
  if (product.length > 0) {
    products = product;
  }
  else {
    localStorage.removeItem('products');
  }
}

// 
function renderProduct() {
  loadProduct()
  product_list = document.querySelector("#product-list");
  product_list.remove();
  product_list = document.createElement("tbody");
  product_list.id = "product-list";
  myTable.appendChild(product_list);
  if (products.length > 0) {
    for (let i = 0; i < products.length; i++) {
      // create table atributes
      let tr = document.createElement('tr');
      tr.dataset.index = i;
      let td1 = document.createElement('td');
      let td2 = document.createElement('td');
      let td3 = document.createElement('td');
      let td4 = document.createElement("td")

      let deleteIcon = document.createElement('i');
      let editIcon = document.createElement('i');
      // add value to elements
      td1.textContent = products[i].product_name;
      td2.textContent = products[i].price;
      td4.textContent = products[i].id

      // add class name
      deleteIcon.className = "fa fa-trash delete text-danger";
      deleteIcon.addEventListener('click', deleteProduct)
      editIcon.className = "fa fa-edit edit text-info";
      editIcon.addEventListener('click', onHandleEdit);
      td3.className = "action"
      // add elements to dom
      td3.appendChild(editIcon);
      td3.appendChild(deleteIcon);
      tr.appendChild(td4)
      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      product_list.appendChild(tr);
    };

  }

}
function onHandleOpenToggle() {
  toggleForm.classList.add('active');
  toggleForm.classList.remove('inactive')
}
function onHandleCloseToggle() {
  toggleForm.classList.add('inactive');
  toggleForm.classList.remove('active');
  document.getElementById('name').value = '';
  document.getElementById('price').value = '';
  document.getElementById('description').value = '';
  document.getElementById('image').value = '';
}

function addNewProduct() {
  // let erros = validationForm(product_name.value, product_price.value, product_desc.value)
  // add value to object
  let item = {};
  item.id = products[products.length - 1].id + 1;
  if (product_name.value.length > 0) {
    item.product_name = product_name.value;
    document.getElementById('name-error').textContent = '';
  } else {
    document.getElementById('name-error').textContent = 'Name is required!';
  }

  if (product_price.value.length > 0) {
    item.price = '$' + product_price.value;
    document.getElementById('price-error').textContent = '';
  } else {
    document.getElementById('price-error').textContent = 'Price is required!';
  }

  if (product_desc.value.length > 0) {
    item.Description = product_desc.value;
    document.getElementById('desc-error').textContent = '';

  } else {
    document.getElementById('desc-error').textContent = 'Description is required!';
  }
  item.image_url = image.value;
  // validation
  if (product_name.value.length > 0 && product_price.value.length > 0 && product_desc.value.length > 0) {
    products.push(item);
    saveProduct();
    renderProduct();
    onHandleCloseToggle();
  }

}

let parentIndex = '';
function onHandleEdit(event) {
  // delete error text
  document.getElementById('name-error').textContent = '';
  document.getElementById('price-error').textContent = '';
  document.getElementById('desc-error').textContent = '';
  // open form
  onHandleOpenToggle();
  // get parent index
  let index = event.target.parentElement.parentElement.dataset.index;
  parentIndex = index;
  // asign selected value
  for (let i = 0; i < products.length; i++) {
    if (i == index) {
      // delete data
      console.log(products[i])
      document.getElementById('name').value = products[i].product_name;
      document.getElementById('price').value = products[i].price.replace('$', '');
      document.getElementById('description').value = products[i].Description;
      document.getElementById('image').value = products[i].image_url;
    }
  }


  // disable edit button
  document.getElementById('confirm-button').style.display = 'none';
  document.getElementById('bt-edit').style.display = 'block';
}
function onHandleAdd() {
  document.getElementById('name-error').textContent = '';
  document.getElementById('price-error').textContent = '';
  document.getElementById('desc-error').textContent = '';
  document.getElementById('bt-edit').style.display = 'none';
  document.getElementById('confirm-button').style.display = 'block';
  onHandleOpenToggle();
}
function editProduct() {
  // validation field
  const index = parentIndex;
  if (product_name.value.length > 0) {
    document.getElementById('name-error').textContent = '';
  } else {
    document.getElementById('name-error').textContent = 'Name is required!';
  }

  if (product_price.value.length > 0) {
    document.getElementById('price-error').textContent = '';
  } else {
    document.getElementById('price-error').textContent = 'Price is required!';
  }

  if (product_desc.value.length > 0) {
    document.getElementById('desc-error').textContent = '';
  } else {
    document.getElementById('desc-error').textContent = 'Description is required!';
  }
  // validation form
  if (product_name.value.length > 0 && product_price.value.length > 0 && product_desc.value.length > 0) {
    for (let i = 0; i < products.length; i++) {
      if (i == index) {
        // delete data
        products[i].product_name = product_name.value;
        products[i].price = '$' + product_price.value;
        products[i].Description = product_desc.value;
        products[i].image_url = image.value;
      }
    }
    saveProduct();
    renderProduct();
    onHandleCloseToggle();
  }

}

function deleteProduct(event) {
  let text = 'Really! You want to delete?';
  if (confirm(text) == true) {
    let index = event.target.parentElement.parentElement.dataset.index;
    for (let i = 0; i < products.length; i++) {
      if (i == index) {
        // delete data
        products.splice(index, 1)
      }
    }
    saveProduct()
    renderProduct()
  }
}
// []
let myTable = document.getElementById('myTable');
let product_list = document.getElementById('product-list');
let toggleForm = document.getElementById('toggle');
let product_name = document.getElementById('name');
let product_price = document.getElementById('price');
let product_desc = document.getElementById('description');
let image = document.getElementById('image');
// actions 
// saveProduct();
loadProduct();
renderProduct();