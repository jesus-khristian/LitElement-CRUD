import {LitElement, html} from 'lit-element';
import moment from 'moment';

class AdminConsultas extends LitElement{
	static get properties(){
		return{
			list:{type: Array}
		}
	};

	constructor(){
		super();	
	}

	render(){
		return html `
			<hr>
			${this.list.map(item => html `	
				<div class="card border-info mb-3">
 				 <div class="card-body text-info">
				 <p class="text-right">${item.hoy}</p>
 				  <h5 class="card-title"> ${item.nombre}</h5>
 				  <h6 class="card-subtitle mb-2 text-muted">Edad : ${item.edad}</h6>
				  <h6 class="card-subtitle mb-2 text-muted">Presión arterial : ${item.presion}</h6>
				  <p class="card-text">Sintomas : ${item.sintomas}</p>
				  <h6 class="card-subtitle text-right">Proxima Cita : ${item.fecha}</h6>
				 </div>
				</div>
			`)}
			
		`;
	};

	createRenderRoot(){
		return this;
	}
	
	/*attributeChangedCallback(name, oldValue, newValue) {
        	super.attributeChangedCallback();
        	console.log(`attChanged(${name}, ${oldValue}, ${newValue})`); 
		console.log(this.hola)
    	}*/
}

customElements.define('historial-consultas', AdminConsultas)
