(function(d, f){
	d.addEventListener('DOMContentLoaded', () => {
		// Initialize Firebase
		var config = {
            apiKey: "AIzaSyB9fbFw-9hZRVFgBsA9CViWZqcAkd3jXtk",
            authDomain: "inventarios-99217.firebaseapp.com",
            databaseURL: "https://inventarios-99217.firebaseio.com",
            projectId: "inventarios-99217",
            storageBucket: "inventarios-99217.appspot.com",
            messagingSenderId: "1054048093965"
        };
		f.initializeApp(config);
		
		const refProductos = f.database().ref("/productos")

		const inputCorreo = d.querySelector('#txtCorreo')
		const inputClave = d.querySelector('#txtClave')
		const inputProducto = d.querySelector('#txtProducto')
		const botonLogin = d.querySelector('#btnLogin')
		const botonRegistro = d.querySelector('#btnRegistro')
		const botonDesloguear = d.querySelector('#btnDesloguear')
		const botonIngresar = d.querySelector('#btnIngresar')
		const zonaRegistroLogin = d.querySelector('#zonaRegistroLogin')
		const zonaProductos = d.querySelector('#zonaProductos')
		const tbody = d.querySelector('tbody')

		let idSeleccionado

		botonRegistro.addEventListener('click', function(e) {
			e.preventDefault()

			const correo = inputCorreo.value
			const clave = inputClave.value
			console.log(correo)
			console.log(clave)
			f.auth().createUserWithEmailAndPassword(correo, clave)
			.then(() => {
				console.log('usuario registrado')
			})
			.catch(error => {
				console.log(error)
			})
		})

		botonLogin.addEventListener('click', function(e) {
			e.preventDefault()

			const correo = inputCorreo.value
			const clave = inputClave.value

			f.auth().signInWithEmailAndPassword(correo, clave)
			.then(() => {
				console.log('logueado')
			})
			.catch(error => {
				console.log(error)
			})
		})

		botonDesloguear.addEventListener('click', e => {
			e.preventDefault()

			f.auth().signOut()
		})

		botonIngresar.addEventListener('click', e => {
			e.preventDefault()
			//todo lo q se registre en firebase debe ser en formato JSON
			//el push permite registrar varias filas, si se coloca directamente "set" solo 1 fila
			const nombre = inputProducto.value

			if (idSeleccionado) {
				refProductos
					.child(idSeleccionado)
					.update({nombre: nombre})
					.then(() => {
						idSeleccionado = undefined
						inputProducto.value = ''
					})

			} else {
				refProductos
					.push()
					.set({nombre: nombre})
					.then(() => {
						inputProducto.value = ''
					})
			}
		})

		f.auth().onAuthStateChanged((usuario) => {
			if (usuario) {
				zonaRegistroLogin.style.display = "none"
				zonaProductos.style.display = "block"
			}
			else {
				zonaRegistroLogin.style.display = "block"
				zonaProductos.style.display = "none"
			}
		})

		//childAdded (cuando se ha agregado), childChanged (cuando se ha modificado), childRemoved
		//value busca a todas las acciones, las anteriores son mas especificas
		refProductos.on('value', productos => {
			const lista = productos.val()
			let filas = ''

			for (let identificador in lista) {
				let item = lista[identificador];
				
				filas += `
					<tr>
						<td>${identificador}</td>
						<td>${item.nombre}</td>
						<td>
							<a href='#' class='btn btn-success btnModificar' data-id='${identificador}' data-registro='${JSON.stringify(item)}'>Modificar</a>
							<a href='#' class='btn btn-danger btnEliminar' data-id='${identificador}'>Eliminar</a>
						</td>
					</tr>
				`
			}
			tbody.innerHTML = filas

			const botonesEliminar = d.querySelectorAll('.btnEliminar')
			botonesEliminar.forEach(boton => {
				boton.addEventListener('click', function(e) {
					e.preventDefault()

					if(confirm('¿Desea eliminar el registro actual?')) {
						const id = this.getAttribute('data-id')
						refProductos.child(id).remove()
					}
				})
			});
			
			const botonesModificar = d.querySelectorAll('.btnModificar')
			botonesModificar.forEach(boton => {
				boton.addEventListener('click', function(e) {
					e.preventDefault()

					const registroSeleccionado = JSON.parse(this.dataset.registro)

					idSeleccionado = this.dataset.id

					inputProducto.value = registroSeleccionado.nombre
				})
			});
		})
	})
})(document, firebase)