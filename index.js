function inicializarApp()
{
	crearTitulo();
	crearMenu();
}


class Usuario{
	constructor(nombre, pwd)
	{
		this.nombre=nombre;
		this.pwd=pwd;

	}
}

function crearUsuario()
{
	
	const btn = document.getElementById("btnSweet");
	btn.addEventListener("click", ()=>{

		Swal.fire({
			title:'Desea registrarse?',
			icon:'question',
			confirmButtonText:'Si.',
			cancelButtonText:'No.',
			showCancelButton:true,
		}).then((result)=>{
			if(result.isConfirmed)
			{
				let nombre = prompt("Ingrese su usuario");
				let pwd = prompt("Ingrese su contraseña");
				const usuario = new Usuario(nombre, pwd);
				localStorage.setItem("NOMBREUSUARIO", nombre);
			
				const loginAs = document.createElement("h1");
				const textoLogin = document.createTextNode("Logueado como: " + nombre);
				const elemtoPadre = document.querySelector('.nav')
				elemtoPadre.appendChild(loginAs);
				loginAs.appendChild(textoLogin);

				btnSweet.setAttribute("style", "display:none")

				let opciones = ["Agregar Producto ☆", "Buscar Producto ☆", "Modificar Producto ☆", "Eliminar Producto ☆"]

	opciones.forEach((opcion)=>{

	const boton = document.createElement("button");

	if(opcion === "Agregar Producto")
	{
		boton.addEventListener("click", ()=>{
			agregarProducto();
			console.log(productos);
			listarProductos();
		})
	}
	else if(opcion === "Buscar Producto")
	{
		boton.addEventListener("click", ()=>{
			buscarProducto();
		})
	}
	else if(opcion === "Modificar Producto")
	{
		boton.addEventListener("click", ()=>{
			modificarProducto();
			console.log(productos);
			listarProductos();
		})
	}
	else if(opcion === "Eliminar Producto")
	{
		boton.addEventListener("click", ()=>{
			eliminarProducto();
			console.log(productos);
			listarProductos();
		})
	}

	boton.innerHTML=opcion;
	document.body.appendChild(boton);
});

				Toastify({
				text:"Regitrado con exito!",
				duration:3000,
				}).showToast();

				return usuario;
			}
			
		})
	})
	
}

		crearUsuario();


class Producto{
	constructor(id,nombre,precio)
	{
		this.id=id;
		this.nombre=nombre;
		this.precio=precio;
	}
}

const producto1 = new Producto(1, "Fernet", "$500");
const producto2 = new Producto(2, "Jaggermeister", "$850");
const producto3 = new Producto(3, "Gin","$450");
const producto4 = new Producto(4, "Birra","$250");
const producto5 = new Producto(5, "Vodka","$1500");

let productos = [];

if(localStorage.getItem("productos"))
{
	productos = JSON.parse(localStorage.getItem("productos"));
}
else
{
	productos = [producto1,producto2,producto3,producto4,producto5];
}

console.log("INICIAL:", productos);

function crearTitulo()
{
	const titulo = document.createElement("h2");
	titulo.innerHTML="PRODUCTOS";
	document.body.appendChild(titulo);
}

let pedidos = [];

class Pedido{
	constructor(nro,nombre,bebida,precio)
	{
		this.nro=nro;
		this.nombre=nombre;
		this.bebida=bebida;
		this.precio=precio;
	}
}

function hacerPedido(){
	let nro=1;
	if(pedidos.lenght>0)
	{
		nro=pedidos[pedidos.lenght-1].nro+1;
	}

let bebida = prompt("Que desea tomar?");
let nombre = prompt("Ingrese su nombre: ")

let encontrado = productos.find((producto)=>producto.nombre===bebida); 

if (encontrado){
					Swal.fire({
						title:'Producto añadido al carrito!',
						icon:'success',
						confirmButtonText:'Seguir comprando.',
					})
					Toastify({
							text:"Agregado al carrito",
							duration:3000,
						}).showToast();
				}
				else
				{
					alert("Producto no encontrado");
				}

	if (bebida === "Fernet"){
		result = 500;
	}
	
	else if (bebida === "Jaggermeister"){
		result = 850;
	}
	else if (bebida === "Gin"){
		result = 450;
	}
	else if (bebida === "Birra"){
		result = 250;
	}
	else if (bebida === "Vodka"){
		result = 1500;
	}

let precio = result

let pedido = new Pedido(nro, bebida, nombre, precio);

pedidos.push(pedido);
console.log(pedidos);

console.log("PEDIDO TOMADO");
localStorage.setItem("pedidos", JSON.stringify (pedidos));
}

function crearMenu()
{
	let opciones = ["Lista de Productos", "Hacer Pedido"]

	opciones.forEach((opcion)=>{

	const boton = document.createElement("button");

	if(opcion === "Lista de Productos")
	{
		boton.addEventListener("click", ()=>{
			listarProductos();
		})
	}
	else if(opcion === "Hacer Pedido")
	{
		boton.addEventListener("click", ()=>{
			Swal.fire({
			title:'Desea hacer un pedido?',
			icon:'question',
			confirmButtonText:'Si.',
			cancelButtonText:'No.',
			showCancelButton:true,
		}).then((result)=>{
			if(result.isConfirmed)
			{
				hacerPedido()
			}

		})

 	})
}

	boton.innerHTML=opcion;
	document.body.appendChild(boton);
});

}

function listarProductos()
{
	let miLista = document.querySelector("#listaProductos");
	if(!miLista)
		{
			miLista = document.createElement("ul");
			miLista.setAttribute("id","listaProductos");
		}
		miLista.innerHTML="";

		productos.forEach((producto)=>{
			const nodoLi= document.createElement("li");
			nodoLi.innerHTML=`${producto.nombre} ${producto.precio}`;
			miLista.appendChild(nodoLi);
			
		});
		document.body.appendChild(miLista);
}

function agregarProducto()
{

	let id=1;
	if(productos.lenght>0)
	{
		id=productos[productos.lenght-1].id+1;
	}

let nombre=prompt("Que producto desea añadir?");
let valor=prompt("Ingrese valor:")
let precio = "$" + valor
let producto = new Producto(id, nombre, precio);

productos.push(producto);
console.log("ALMACENADO");
localStorage.setItem("productos", JSON.stringify (productos));

}

function buscarProducto()
{
	let nombre = prompt("Ingresa el nombre del producto:");

	let buscados = productos.filter((producto)=>producto.nombre.indexOf(nombre.toLocaleLowerCase)!==-1);

	console.log("BUSCAR PRODUCTOS", buscados);
}

function modificarProducto()
{
	let id = Number(prompt("Ingrese el ID del producto a modificar"));

	let existe = productos.some((producto)=>producto.id===id);

	if(existe)
	{
		let encontrado = productos.find((producto)=>producto.id===id); 
		let nuevoNombre = prompt("Ingrese el nuevo nombre:");
		let nuevoPrecio = prompt("Ingrese el nuevo precio:");

		encontrado.nombre = nuevoNombre;
		encontrado.precio = nuevoPrecio;

		console.log("MODIFICACION");
		console.log(productos);
	}
	else
	{
		alert("Producto no encontrado");
	}
}

function eliminarProducto()
{
	let id = Number(prompt("Ingrese el ID del producto a eliminar:"));

	let encontrado = productos.find((producto)=>producto.id===id);

	console.log("PRODUCTO A BORRAR", encontrado);

	if(!encontrado)
	{
		alert("Producto no Encontrado.");
	}
	else{
		let index = productos.indexOf(encontrado);
		console.log("Indice Encontrado");

		productos.splice(index,1);

		console.log("Producto Eliminado.");

		console.log(productos);

		alert("Producto Eliminado.");
	}

}

inicializarApp();