
//similar a cuando se llama: script src=
import {Component} from '@angular/core';

//este decorador es una funcion, los parametros del decorador siempre es un Json
//en app.component se encuentra el "app-root" q lo encontrabamos en index.html, ahora lo hemos cambiado por "app-servidor"
//angular buscara el componente y lo q esta dentro de la etiqueta app-servidor sera reemplazado por el texto ingresado en template
//hay q modificar el app.module para q cargue servidor-component xq antes llamaba al app.component (bootstrap: [AppComponent])
//tambien hay modificar las "declarations"
@Component({
  selector: 'app-servidor',
  templateUrl: './servidor.component.html',
  styleUrls: ['./servidor.component.css']
  /*
  styles: [
    `h1 {color: red}`
  ]
  template: '<h1>Servidor Principal</h1>'*/
})
//en selector tambien podemos colocarle una class para q lo busque en el html (no funciona como #):  selector: '.app-servidor'
//o entre corchetes   selector: '[app-servidor]' -> dentro del html <div app-servidor></div> es decir, como atributo

//export lo pone a disposicion de otros modulos o componentes
//de lo contrario seria privada
export class Servidor {
  
}
