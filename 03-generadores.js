//similares a las funciones
//los generadores se mueven de paso en paso

function* generador() {
	console.log('generador ejecutado')
	yield 'pausa 1'
	console.log('luego de la pausa 1')
	yield 'pasua 2'
	console.log('luego de la pausa 2')
}

const generate = generador()
generate.next()
generate.next()
generate.next()
//da la impresion que el codigo sincrono sea asincrono
