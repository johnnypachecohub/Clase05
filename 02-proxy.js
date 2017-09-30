const usuario = {
	nombre: 'Johnny',
	edad: 34
}

usuario.nombre = usuario.nombre.toUpperCase()  //pero tendria que hacerlo cada vez que seteamos el nombre

//prox monitorea a una variable
//target hace referencia a la variable usuario, la propiedad es nombre o edad
const usuarioProxy = new Proxy(usuario, {
	/*get(target, propiedad) {
		return target[propiedad].toLowerCase()
	},*/

	set(target, propiedad, valor) {
		target[propiedad] = valor.toUpperCase()
	}
})

usuarioProxy.nombre = 'Cinthia'   //primero llama al Proxy y setea las propiedades
console.log(usuarioProxy.nombre)


//PROXY generalmente solo usado para Validaciones
