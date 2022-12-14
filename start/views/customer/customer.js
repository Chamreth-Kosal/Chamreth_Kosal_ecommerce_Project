


let products = []
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

let Mydiv=document.querySelector(".card-container")
function randomProduct() {

  let getProduct = localStorage.getItem('products');
  let product = JSON.parse(getProduct);
  console.log(product)
  for (let i in product) {
    products = product[i]
    console.log(i)
    // creat div classname card
    let div = document.createElement("div");
    div.className = "card-cus"
   Mydiv.appendChild(div)
   
    // create img 
    let img = document.createElement("img");
    img.className="imge"
    img.src=products.image_url
    img.style.width ="20rem"
    div.appendChild(img)
   

    // create p
    let divpara=document.createElement("div");
    divpara.className="para"

    let para=document.createElement("p");
    para.textContent = products.productname
    let para1=document.createElement("p");
    para1.textContent = products.price
    divpara.appendChild(para)
    divpara.appendChild(para1)
    div.appendChild(divpara)
    
    // create div class btn
    let btn=document.createElement("div");
    btn.className="button"
    let button=document.createElement("button");
    button.textContent="Detail"
    button.dataset.index=i
    button.addEventListener("click",detail);
    let a = document.createElement("a");
    a.href = "../detail.html";
    a.appendChild(button);
    btn.appendChild(a);
    btn.appendChild(button);
    div.appendChild(btn);

    Mydiv.appendChild(div);
  }
}
randomProduct()
loadProduct()




// =================/Detail/=========================


let getProduct = localStorage.getItem('products');
let product = JSON.parse(getProduct);


function detail(event){
  // hide(body)
  let i = event.target.dataset.index;
  let customer=document.querySelector(".customer");
  customer.style.display="none";

let text=document.querySelector(".detail")
//create div class card
let div=document.createElement("div");
div.className="card-detail";
text.appendChild(div)
//create div class name card-title
let div1=document.createElement("div");
div1.className="card-title";
div.appendChild(div1)
//create class imgae
let image=document.createElement("img");
image.src=product[i].image_url;
image.style.width="30rem"
div1.appendChild(image)
//create div class card-body
let div2=document.createElement("div");
div2.className="card-body";
div.appendChild(div2)
//create div class card-item
let div3=document.createElement("div");
div3.className="card-item";
div2.appendChild(div3)

//create 3 para
let para=document.createElement("p");
para.textContent="New! KC - Extension Development is Open for Sales Now!";
div3.appendChild(para)
let para1=document.createElement("p");
para1.textContent=product[i].product_name;
div3.appendChild(para1)
let span=document.createElement("span");
span.textContent="20% off";
div3.appendChild(span)
let para2=document.createElement("p");
para2.textContent=product[i].price;
div3.appendChild(para2)

//Create div footer
let myDiv=document.createElement("div");
myDiv.className="card-footer";
div.appendChild(myDiv);
//create btn
let btn=document.createElement("button");
btn.textContent="Back"
btn.addEventListener("click", Back);
myDiv.appendChild(btn);

}

detail();

function show(element){
element.style.display="block";
}
function hide(element){
  element.style.display="none";
}
function Back(){

  let customer=document.querySelector(".customer");
  customer.style.display="block";
}
