var productos=["ranchero","diabla","asado","rostizado","frito","vapor","entomatado","brasas"];
var precios=[150,200,240,250,150,200,200,180];


var selectProductos=document.getElementById("productos");
var imgProductos=document.getElementById("imgProducto");

var precioProductos=document.getElementById("precioProducto");
var inputCantidad=document.getElementById("inputCantidad");
var agregarCarrito=document.getElementById("agregarCarrito");
var arroz=20;
var refresco=50;
var sal=20;
let pagar=0;
let totalp=0;
var carrito=new Array();
var posProducto=-1;
var cantidadProducto=0;

const cargarProductos =()=>{
    let optionProductos="";
    productos.forEach((producto)=>{
        optionProductos+=`<option value="${producto}">${producto.toUpperCase()}</option>`;
    });
    selectProductos.innerHTML=optionProductos;
    cargarPrecio();
}
selectProductos.onchange=()=>{
    cargarPrecio();
}
const cargarPrecio=()=>{
    imgProductos.src=`${selectProductos.value.toLowerCase()}.jpg`;
    precioProductos.innerHTML=`$ ${precios[selectProductos.selectedIndex]}`;
    posProducto=selectProductos.selectedIndex;
}
inputCantidad.oninput=()=>{
    document.getElementById("vcantidad").innerHTML=inputCantidad.value;
    cantidadProducto=parseInt(inputCantidad.value);
}
agregarCarrito.onclick=()=>{
  cantidadProducto=parseInt(inputCantidad.value);
  posProducto=selectProductos.selectedIndex;
  if (checarItem(posProducto, cantidadProducto)) {
    imprimirTabla();
  } else {
    let item=new Array();
    item.push(posProducto);
    item.push(cantidadProducto);
    carrito.push(item);
    imprimirTabla();
  }
}

const checarItem=(pos,cant)=>{
    let x=false;
    carrito.forEach(item=>{
      if (item[0]== pos) {
        item[1]=item[1]+=cant;
        x=true;
      }
    });
    return x;
  } 

const imprimirTabla=()=>{
    let total=0;
    let divCarrito=document.getElementById("carrito");
    let tablaHTML=`<table class="table w-100 m-auto">
    <tr>
    <td>PRODUCTO</td>
    <td>PRECIO</td>
    <td>CANTIDAD</td>
    <td>IMPORTE</td>
   <td>**</td>
    </tr>
    `;
    let index=0;
    carrito.forEach(item=>{
        tablaHTML+=`
        <tr>
        <td>${productos[item[0]]}</td>
        <td>${precios[item[0]]}.00</td>
        <td>${item[1]}</td>
        <td>${(precios[item[0]]*item[1])}</td>
        <td><button class="btn btn-danger" onclick="eliminarProducto(${index})"> Del</button></td>
        </tr>
        `
        index ++;
        total+=(precios[item[0]]*item[1]);
        totalp=total;
    })
    tablaHTML+=`
    <tr>
    <td></td>
    <td></td>
    <td><h3>TOTAL</h3></td>
    <td><h3>$${total}.00</h3></td>
        <td><button class="btn btn-success" onclick="pagarProducto (${pagar})">Total a pagar</button></td>
    </tr>
    `
    
    divCarrito.innerHTML=tablaHTML;
}
///

const eliminarProducto=(index)=>{
  Swal.fire({
  title: "Estas Seguro de Eliminar este Producto?",
  showDenyButton: true,
  showCancelButton: false,
  confirmButtonText: "SI",
  denyButtonText: `NO`
}).then((result) => {

  if (result.isConfirmed) {
    
    
    Swal.fire("Producto Eliminado!", "", "success");
    carrito.splice(index,1);
    imprimirTabla();
  } else if (result.isDenied) {
    Swal.fire("Producto NO Eliminado", "", "info");
  }
});
}
////
const pagarProducto=()=>{
  
  Swal.fire({
  title: 'Total a Pagar $ '+totalp,
  input: 'text',
  inputPlaceholder: 'Ingrese el total a pagar'+totalp,
  showCancelButton: true,
  confirmButtonText: 'Enviar',
  cancelButtonText: 'Cancelar'
}).then((result) => {
  if (result.isConfirmed) {
    const jj = result.value;
if (jj>= totalp) {
  let cambio=jj-totalp;
  Swal.fire({
        title: "Gracias Por su Compra",
        text: "Su cambio es de :"+cambio,
        icon: "success"
    });
} else {
  Swal.fire({
        title: "Ingrese Una camtidad apta para pagar",
        text: "Intente de nuevo",
        icon: "error"
    });
}
   
  }
});
}
////

const verProductos=()=>{
    let divListaProductos=document.getElementById("listaProductos");
    let tablaHTML=
    `<table class="table w-100 m-auto">
        <tr>
        <td>PRODUCTO</td>
        <td>PRECIO</td>
        <td>DEL</td>
        </tr>
        `;
        let index=0;
        productos.forEach(item=>{
            tablaHTML+=`
            <tr>
            <td>${item}</td>
            <td>$ ${precios[index]}.00</td>
            <td><button class="btn btn-danger" onclick="delProductos(${index})"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
      <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
    </svg></button></td>
            </tr>
            `
            index++;
    })
    divListaProductos.innerHTML=tablaHTML;
  }
  
  
  const addProductos =()=>{
    let nombre = document.getElementById("nombre").value;
    let precio = document.getElementById("precioP").value;
    productos.push(nombre);
    precios.push(precio);
    verProductos();
    cargarProductos();
  
    document.getElementById("nombre").value="";
    document.getElementById("precioP").value="";
  }
  
  
  const eliminarProducto2= (index) =>{
    let divListaProductos = document.getElementById("listaProductos");
    Swal.fire({
    title: "Deseas eliminar este producto?",
    showDenyButton: true,
    showCancelButton: false,
    confirmButtonText: "Si",
    denyButtonText: "No"
  }).then((result) => {
  
    if (result.isConfirmed) {
      Swal.fire("Se elimino el producto exitosamente", "", "success");
      productos.splice(index,1);
      precios.splice(index,1);
      verProductos();
      cargarProductos();
    }
  });
  }
  
  const limpiarTabla=()=>{
    carrito=[];
    document.getElementById("carrito").innerHTML="";
    
  }