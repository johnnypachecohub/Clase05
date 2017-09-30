const promesa01 = new Promise((resolve, reject) => {
	setTimeout(() => {
		console.log('promesa 1')
		resolve()
	}, 4000)
})

const promesa02 = new Promise((resolve, reject) => {
	setTimeout(() => {
		console.log('promesa 2')
		resolve()
	}, 3000)
})

console.log(new Date())

//recibe un arreglo
//se ejecutan en paralelo
Promise.all([promesa01, promesa02])
	.then(() => {
		console.log('todas las promesas cumplidas')
		console.log(new Date())
	})
	