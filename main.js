console.clear();
console.log("Sistema de ventas iniciado");
console.log("Minisuper Don Raúl");

// Variables y constantes

const negocio = "Minisuper Don Raúl";
const descuentoEfectivo = 0.10;
const descuentoMayorista = 0.12;

let tipoCliente = "";

const categorias = [
  "Gaseosas",
  "Lácteos",
  "Panificados",
  "Fiambres",
  "Enlatados",
  "Fideos",
  "Golosinas",
  "Yerbas",
  "Cigarrillos"
];

const productos = [
  {id:1, nombre:"Coca Cola 2L Retornable", categoria:"Gaseosas", precio:3100, stock:12},
  {id:2, nombre:"Sprite 2L Retornable", categoria:"Gaseosas", precio:3100, stock:8},
  {id:3, nombre:"Leche La Serenisima Entera 1L", categoria:"Lácteos", precio:1850, stock:4},
  {id:4, nombre:"Yogur bebible La Serenisima 900cc", categoria:"Lácteos", precio:3300, stock:10},
  {id:5, nombre:"Tortitas y Semitas  por unidad ", categoria:"Panificados", precio:200, stock:200},
  {id:6, nombre:"Facturas por unidad", categoria:"Panificados", precio:500, stock:150},
  {id:7, nombre:"Jamón Cocido Natural 190 x kg", categoria:"Fiambres", precio:21000, stock:6},
  {id:8, nombre:"Queso Dambo Caayelac x kg", categoria:"Fiambres", precio:15000, stock:4},
  {id:9, nombre:"Atún Natural Caracas ", categoria:"Enlatados", precio:4300, stock:15},
  {id:10, nombre:"Arvejas Marolio", categoria:"Enlatados", precio:1100, stock:14},
  {id:11, nombre:"Spaghetti Matarazzo", categoria:"Fideos", precio:1500, stock:18},
  {id:12, nombre:"Tirabuzón Luccchetti", categoria:"Fideos", precio:1100, stock:6},
  {id:13, nombre:"Chocolate Dos Corazones ", categoria:"Golosinas", precio:2300, stock:13},
  {id:14, nombre:"Alfajor Triple ByN", categoria:"Golosinas", precio:1400, stock:9},
  {id:15, nombre:"Marlboro", categoria:"Cigarrillos", precio:3300, stock:5},
  {id:16, nombre:"Lucky Strike", categoria:"Cigarrillos", precio:2500, stock:4}
];

let carrito = [];  

// Funciones 
function elegirTipoCliente(){
  let r = prompt("¿Sos cliente Mayorista o sos cliente Minorista ?");
  if(r !== null){
    r = r.toLowerCase();
    if(r === "mayorista" || r === "minorista"){
      tipoCliente = r;
    } else {
      tipoCliente = "minorista";
    }
  }
}

function mostrarCategorias(){
  let texto="Categorias:\n\n";

  for(let i=0;i<categorias.length;i++){
    texto += (i+1) + ") " + categorias[i] + "\n";
  }

  alert(texto);
}

function mostrarProductos(){
  let texto="Productos:\n\n";

  for(let i=0;i<productos.length;i++){
    let p = productos[i];
    texto += p.id + ") " 
      + p.nombre + " | "
      + p.categoria + " | $"
      + p.precio + " | Stock:"
      + p.stock + "\n";
  }

  console.table(productos);
  alert(texto);
}

function buscarProducto(id){
  for(let i=0;i<productos.length;i++){
    if(productos[i].id === id){
      return productos[i];
    }
  }
  return null;
}

function listarProductos() {

  let texto = "Productos:\n\n";

  for (let i = 0; i < productos.length; i++) {
    texto += productos[i].id 
      + " - " + productos[i].nombre
      + " - $" + productos[i].precio
      + "\n";
  }

  alert(texto);
}
function agregarAlCarrito(){

  
  listarProductos();
  
  let id = Number(prompt("ID del producto"));
  let cant = Number(prompt("Cantidad"));

  let producto = buscarProducto(id);

  if(producto === null){
    alert("Producto inexistente");
    return;
  }

  if(cant > producto.stock){
    alert("No hay stock suficiente");
    return;
  }

  producto.stock -= cant;

  carrito.push({
    nombre: producto.nombre,
    precio: producto.precio,
    cantidad: cant
  });

  alert("Producto agregado");
}

function verCarrito(){
  if(carrito.length === 0){
    alert("Carrito vacío");
    return;
  }

    let texto = "Carrito de compras:\n\n";
  let subtotal = 0;

  for(let i=0; i<carrito.length; i++){

    let totalProducto = carrito[i].precio * carrito[i].cantidad;

    subtotal += totalProducto;

    texto += carrito[i].nombre
      + " x" + carrito[i].cantidad
      + " = $" + totalProducto
      + "\n";
  }

  texto += "\nSubtotal: $" + subtotal;

  console.table(carrito);
  alert(texto);
}

function pagar(){
  let subtotal = 0;

  for(let i=0;i<carrito.length;i++){
    subtotal += carrito[i].precio * carrito[i].cantidad;
  }

  let descuento = 0;

  if(tipoCliente === "mayorista"){
    descuento = subtotal * descuentoMayorista;
  }

  if(tipoCliente === "minorista"){
    
    let efectivo = confirm("¿Tu forma de pago es en efectivo?");
  
    if(efectivo){
      descuento += subtotal * descuentoEfectivo;
    }
  }
  

  let total = subtotal - descuento;

  console.log("----- Ticket X  -----");
  console.log("Cliente:", tipoCliente);
  console.log("Subtotal:", subtotal);
  console.log("Descuento:", descuento);
  console.log("TOTAL:", total);

  alert("Total a pagar es: $" + total);

  carrito = [];
}

// Menú principal 

function iniciar(){

  elegirTipoCliente();

  let op="";

  while(op !== "0"){

    op = prompt(
      "1-Ver categorías\n"+
      "2-Ver productos\n"+
      "3-Agregar al carrito\n"+
      "4-Ver carrito\n"+
      "5-Pagar\n"+
      "0-Salir"
    );

    if(op==="1"){
      mostrarCategorias();

    } else if(op==="2"){
      mostrarProductos();

    } else if(op==="3"){
      agregarAlCarrito();

    } else if(op==="4"){
      verCarrito();

    } else if(op==="5"){
      pagar();

    } else if(op==="0"){
      alert("Gracias por su compra");

    } else {
      alert("Opción inválida");
    }
  }
}

iniciar();