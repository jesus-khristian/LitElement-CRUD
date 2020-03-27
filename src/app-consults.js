import {LitElement,html, css} from 'lit-element';
import moment from 'moment';
import  './components/my-form.js';
import './components/admin-consults.js';
import '../public/css/bootstrap.min.css';
import paper from '../public/img/medi.png'

class AppConsult extends LitElement{
	static get properties(){
		return{
			consultas:{type: Array}	,
			consultaInicio:{type: Array}	
		}
	};

	render(){
		return html `
		<img src='${paper}' class="vw-100 vh-100 position-absolute p-0 " style="margin:-17px;"  alt="image" />
			<div class="container position-relative">
				<div class="row ">
				<h1 class="pt-4">Consulta Médica <a class="btn btn-dark " href="https://github.com/jesus-khristian/LitElement-CRUD" target="__blanck" rel="noopener">Mirar codigo</a></h1>
				</div> 
				<div class="row">
					<div class="col-md-6 pt-4 ">
      						<my-form @agregar-Consulta=${this.guardarConsulta} ></my-form>
    				</div>
					<div class="col-md-6 pt-4">
						
						${ this.consultas.length>0 ? html`<h4>Consultas de hoy  ${moment().format('l')} </h4>` : html `<h4>No tienes consultas</h4>`}
						<admin-consults @eliminar-consulta="${this.eliminarConsulta}" list="${JSON.stringify(this.consultas)}"></admin-consults>
					</div>
  				</div>
			</div>		
		`;		
	};

	constructor(){
		super();
		this.checkLocalStorage();
		this.consultas=this.consultaInicio;
	}

	guardarConsulta(e){
		//this.consultas.push(e.detail)
		this.setAttribute('consultas', JSON.stringify([...this.consultas, e.detail]));
		this.guardaLocalStorage();
		//console.log(this.consultas);
	}

	eliminarConsulta(e){
		let id=e.detail
		const nuevasConsultas = this.consultas.filter(consul => id != consul._id)
		this.setAttribute('consultas', JSON.stringify(nuevasConsultas));
		this.guardaLocalStorage();
	}

	checkLocalStorage(){
		this.consultaInicio=JSON.parse(localStorage.getItem('consultas'))
		if(!this.consultaInicio){
			this.consultaInicio=[]
		}
	}

	guardaLocalStorage(){
		if(this.consultaInicio){
			localStorage.setItem('consultas', JSON.stringify(this.consultas))
		}else{
			localStorage.setItem('consultas', JSON.stringify([]))
		}
	}

	createRenderRoot(){
		return this;
	};

}

customElements.define('app-consulta', AppConsult)
