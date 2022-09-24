const Clickbutton = document.querySelectorAll('.button')
const tbody = document.querySelector('.tbody')
let carrito = []



Clickbutton.forEach(btn => {
    btn.addEventListener("click", addToCarritoItem)
})

function addToCarritoItem(e){
    const button = e.target
    const item= button.closest('.card')
    const itemTitle = item.querySelector('.card-title').textContent;
    const itemPrice = item.querySelector('.precio').textContent;
    const itemImg = item.querySelector ('.card-img-top').src;
    

    const newItem = {
        title: itemTitle,
        precio: itemPrice,
        img: itemImg,
        cantidad: 1
    }
    addItemCarrito(newItem);
}

function addItemCarrito(newItem){
    //sweet alert de agregado al carrito
    swal.fire(
        "Producto: "+newItem.title,
        "Agregado al carrito",
        "success"
    )


//Agregar un mismo producto varias veces, que suba la cantidad y no muestre varias veces el mismo producto por separado



for(let i = 0; i < carrito.length; i++){
    const inputElemnto =tbody.getElementsByClassName('input__elemento')
    if(carrito[i].title.trim() === newItem.title.trim()){
        carrito[i].cantidad ++;
        const inputValue = inputElemnto[i]
        inputValue.value++;
        
        return null;
 
}
}
carrito.push(newItem)
renderCarrito()
carritoTotal()
}


function renderCarrito(){
    tbody.innerHTML = ''
    carrito.map (item => {
        const tr = document.createElement ('tr')
        tr.classList.add('itemCarrito')
        const Content = `
        <th scope="row">1</th>
                <td class="table__productos">
                    <img src=${item.img} alt="">
                    <h6 class="title">${item.title}</h6>
                </td>
                <td class="table__precio"><p>${item.precio}</p></td>
                <td class="table__cantidad">
                <input type="number" min="1" value=${item.cantidad} class="input__elemento">
                <button class="delete btn btn-danger">x</button>
                </td>
        `

        tr.innerHTML = Content;
        tbody.append(tr)
        localStorage.setItem("carrito", JSON.stringify(carrito));

        tr.querySelector(".delete").addEventListener ('click', removeItemCarrito)
        tr.querySelector(".input__elemento").addEventListener ('change', sumaCantidad)
    })
    carritoTotal()
}

//Funcion para Hacer funcionar el TOTAL del CARRITO
function carritoTotal(){
    let total = 0;
    const itemCantTotal = document.querySelector('.itemCantTotal')
    console.log(itemCantTotal)
    carrito.forEach((item) =>{
        const precio = Number (item.precio.replace("$", ''))
        total = total + precio*item.cantidad
    })
    itemCantTotal.innerHTML = `Total $${total}`
    addLocalStorage()

}






//Funcion para eliminar producto de carrito
function removeItemCarrito (e){
    //creo la constante en donde al hacer click se borrara el producto
    const buttonDelete = e.target
    //creo el componente padre del boton y le asigno el button delete
    const tr = buttonDelete.closest(".itemCarrito")
    const title = tr.querySelector('.title').textContent
    for( i=0; i < carrito.length; i++){
        if(carrito[i].title.trim() === title.trim() ){
            //se usa el .splice para eliminar y se indica el elemento que quiero eliminar y la cantidad(i, 1)
            carrito.splice(i, 1)
        }
    }
    tr.remove()
    carritoTotal()
}

//funcion para sumar cantidad en producto
function sumaCantidad(e){
const sumaInput = e.target
const tr = sumaInput.closest(".itemCarrito")
const title = tr.querySelector('.title').textContent
carrito.forEach(item=> {
    if (item.title.trim() === title){
        sumaInput.value < 1 ? (sumaInput.value = 1): sumaInput.value;
        item.cantidad = sumaInput.value;
        carritoTotal()
    }
}) 
console.log(carrito)
}


//funcion boton comprar

const finalizarCompra = document.getElementById('comprar')
finalizarCompra.addEventListener('click', ()=>{
    Swal.fire(
        'Listo!',
        'Su pedido esta en fase de preparación!',
        'success'
      )
    carrito = []
    renderCarrito()
})

//localstorage y json
function addLocalStorage(){
    localStorage.setItem('carrito', JSON.stringify(carrito))
}

window.onload = function(){
    const storage = JSON.parse(localStorage.getItem('carrito'));
    if(storage){
        carrito = storage;
        renderCarrito()
    }
}