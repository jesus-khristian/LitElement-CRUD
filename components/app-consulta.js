import {LitElement,html} from 'lit-element';
import moment from 'moment'
import  './my-formulario.js'
import './admin-consultas.js'

class AppConsulta extends LitElement{
	static get properties(){
		return{
			consultas:{type: Array}		
		}
	};

	render(){
		return html `
			<div class="container">
				<h1 class="pt-4">Consulta Médica</h1>
				<div class="row">
					<div class="col pt-4">
      						<my-form @agregar-Consulta=${this.guardarConsulta} ></my-form>
    					</div>
    					<div class="col pt-4">
					${ this.consultas.length>0 ? html`<h3>Consultas de ${moment().format('l')} </h3>` : html `<h3>No tienes consultas</h3>`}
					<historial-consultas hola="mensaje desde html" list="${JSON.stringify(this.consultas)}"></historial-consultas>
  				</div>
			</div>		
		`;		
	};

	constructor(){
		super();
		this.consultas=[];
	}

	guardarConsulta(e){
		//this.consultas.push(e.detail)
		this.setAttribute('consultas', JSON.stringify([...this.consultas, e.detail]));
		//console.log(this.consultas);
	}


	createRenderRoot(){
		return this;
	};

}

customElements.define('app-consulta', AppConsulta)
