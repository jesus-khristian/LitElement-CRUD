import {LitElement, css, html} from 'lit-element';
import moment from 'moment';
import './my-error.js';

class MyFormulario extends LitElement{

	static get properties(){
		return{
			consulta:{type: Object},
			error:{type: Boolean},
			messageError:{type: String}
		}
	}

	constructor(){
		super();
		this.consulta={
			nombre:'',
			edad: '',
			presion:'',
			fecha: '',
			sintomas:'',
			hoy:moment().format('LLLL')
		};
		this.error=false;
	}
	
	changeForm(e){
		/*this.consulta={
			...this.consulta,
			[e.target.name]: e.target.value
		}*/
		this.setAttribute('consulta', JSON.stringify(Object.assign({}, this.consulta, {[e.target.name]: e.target.value})));
		//console.log(this.consulta)
	};
	
	guardarConsulta(e){
		e.preventDefault();
		const{nombre, edad, presion ,fecha ,sintomas}=this.consulta
		if(this.validString(nombre) || this.validEdad(edad) || this.validPresion(presion) || this.validFecha(fecha) || this.validString(sintomas)){
			//this.setAttribute('error', true);
			this.error=true;
			console.log('Error', this.error)
			return;
		}
		this.error=false;
		console.log(this.error);
		this.dispatchEvent(new CustomEvent('agregar-Consulta',{
			detail:this.consulta,
                	bubbles:true,
                	composed:true
	        }));
		this.consulta={
			nombre:'',
			edad:'',
			presion:'',
			fecha:'',
			sintomas:'',
			hoy:moment().format('LLLL')
		}

	};

	validEdad(edad){
		const ed = parseInt(edad);
		if(ed<=0 || ed>120 || isNaN(ed)){
			this.messageError='Edad no valida !!!'
			return true;
		}
		return false;
	};

	validPresion(presion){
		//console.log(presion)
		//const expreg = new RegExp('/^\d{1,3}\/\d{1,3}$/');
		//console.log(expreg.test(presion));
                if(/^\d{1,3}\/\d{1,3}$/.test(presion)){
                        //this.messageError='Verifique el campo Presión !!!'
                        return false;
                }
		this.messageError='Verifique el campo Presión'
                return true;
        };


	validFecha(fecha){
		if(!moment(fecha).isValid()){
			this.messageError='Llene el campo Fecha !!! '
			return true;
		}
		return false;
	};

	validString(campo){
		if(campo.trim()===''){
			this.messageError='Llene todos los campos !!!' 
			return true;
		}
		return false;
	};

	createRenderRoot(){
		return this;
	};

	render(){
		const {nombre,edad,presion,fecha,sintomas} = this.consulta;
                return html `
                        <div class="card border-info mb-3">
                                <div class="card-header">
                                        <h2>Agregar Consulta</h2>
                                </div>
                        <div class="card-body text-info">
                        ${this.error ? html`<my-error messageError="${this.messageError}"></my-error>` : null}
                        <form @submit="${this.guardarConsulta}">
                                <div class="form-group">
                                        <label>Nombre del Paciente</label>
                                        <input
                                                type="text"
                                                class="form-control"
                                                name="nombre"
                                                @change="${this.changeForm}"
                                                placeholder="Nombre completo"
                                                .value="${nombre}"
                                        />
                                </div>
				<div class="row">
                                <div class="form-group col">
                                        <label>Edad</label>
                                        <input
                                                type="number"
                                                class="form-control"
                                                name="edad"
                                                @change="${this.changeForm}"
                                                placeholder="Ingrese la edad"
						.value="${edad}"
                                        />
                                </div>
				<div class="form-group col">
                                        <label>Presión arterial</label>
                                        <input
                                                type="text"
                                                class="form-control"
                                                name="presion"
                                                @change="${this.changeForm}"
                                                placeholder="ej. 120/80"
                                                .value="${presion}"
                                        />
                                </div>
				</div>
                                <div class="form-group">
                                        <label>Proxima cita</label>
                                        <input
                                                type="date"
                                                class="form-control"
                                                name="fecha"
                                                @change="${this.changeForm}"
						.value="${fecha}"
                                        />
                                </div>
                                <div class="form-group">
                                        <label>sintomas</label>
                                        <textarea
                                                type="text"
                                                class="form-control"
                                                name="sintomas"
                                                @change="${this.changeForm}"
                                                placeholder="Sintomas del paciente"
						.value="${sintomas}"
                                        ></textarea>
                                </div>
                                <button type="submit" class="btn btn-primary btn-lg btn-block">Agregar</button>

                        </form>
                        </div>
                </div>
                `;
        };

};


customElements.define('my-form', MyFormulario);
