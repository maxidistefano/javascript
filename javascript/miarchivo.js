const Clickbutton = document.querySelectorAll('.button')
const tbody = document.querySelector('.tbody')
let carrito = []
if(localStorage.getItem("carrito")){
    carrito=JSON.parse(localStorage.getItem("carrito"));
}
renderCarrito()

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
    })

}

//Funcion para Hacer funcionar el TOTAL del CARRITO
function carritoTotal(){
    let total = 0;
    const itemCantTotal = document.querySelector('itemCantTotal')
    console.log(itemCantTotal)
    carrito.forEach((item) =>{
        const precio = Number (item.precio.replace("$", ''))
        total = total + precio*item.cantidad
    })
    itemCantTotal.innerHTML = `Total $${total}`

}


//leer datos de archivo JSON usando API FETCH
function cargarStock(){
        fetch('stock.json')
        .then(response => response.json())//indico formato en el que se desea obtener la informacion
        .then(productos =>{
            productos.forEach(producto => {
                const row = document.createElement ('tr');
                row.innerHTML += `
                <td>${producto.nombre}</td>
                <td>${producto.img}</td>
                <td>${producto.precio}</td>

                `;
                tabla.appendChild(row);
            });
        })
}

cargarStock();