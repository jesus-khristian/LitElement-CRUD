import { LitElement, html } from "lit-element";
import moment from "moment";

import "./my-error.js";

class MyForm extends LitElement {
  static get properties() {
    return {
      consulta: { type: Object },
      error: { type: Boolean },
      messageError: { type: String }
    };
  }

  constructor() {
    super();
    this.consulta = {
      _id:"",
      nombre: "",
      edad: "",
      presion: "",
      sintomas: "",
      receta:"",
      fecha: "",
      hoy: moment().format("LLLL")
    };
    this.error = false;
  }

  changeForm(e) {
    /*this.consulta={
			...this.consulta,
			[e.target.name]: e.target.value
		}*/
    this.setAttribute(
      "consulta",
      JSON.stringify(
        Object.assign({}, this.consulta, { [e.target.name]: e.target.value })
      )
    );
  }

  guardarConsulta(e) {
    e.preventDefault();
    const { nombre, edad, presion, sintomas, receta, fecha } = this.consulta;
    if (
      this.validString(nombre) ||
      this.validEdad(edad) ||
	    this.validPresion(presion) ||
      this.validString(sintomas) ||
      this.validString(receta) ||
      this.validFecha(fecha) 
    ) {
      this.error = true;
      return;
    }
    this.error = false;
    this.consulta._id= this.generarId();
    this.enviaConsultaApadre();
    this.consulta = {
      _id:"",
      nombre: "",
      edad: "",
      presion: "",
      sintomas: "",
      receta:"",
      fecha: "",
      hoy: moment().format("LLLL")
    };
  }

  enviaConsultaApadre(){
	return this.dispatchEvent(
		new CustomEvent("agregar-Consulta", {
		  detail: this.consulta,
		  bubbles: true,
		  composed: true
		})
	  );
  }

   generarId() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }

  validEdad(edad) {
    const ed = parseInt(edad);
    if (ed <= 0 || ed > 120 || isNaN(ed)) {
      this.messageError = "Edad no valida !!!";
      return true;
    }
    return false;
  }

  validPresion(presion) {
    if (/^\d{1,3}\/\d{1,3}$/.test(presion)) {
      return false;
    }
    this.messageError = "Verifique el campo Presión";
    return true;
  }

  validFecha(fecha) {
    if (!moment(fecha).isValid()) {
      this.messageError = "Llene el campo Fecha !!! ";
      return true;
    }
    return false;
  }

  validString(campo) {
    if (campo.trim() === "") {
      this.messageError = "Llene todos los campos !!!";
      return true;
    }
    return false;
  }

  createRenderRoot() {
    return this;
  }

  render() {
    const { nombre, edad, presion, fecha, sintomas, receta } = this.consulta;
    return html`
      <div class="card   mb-3">
        <div class="card-header ">
          <h4>Agregar Consulta</h4>
        </div>
        <div class="card-body text-primary">
          ${this.error
            ? html`
                <my-error messageError="${this.messageError}"></my-error>
              `
            : null}
          <form @submit="${this.guardarConsulta}">
            <div class="form-group">
              <label>Nombre del Paciente</label>
              <input
                type="text"
                class="form-control "
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
              <label>Síntomas</label>
              <textarea
                type="text"
                class="form-control"
                name="sintomas"
                @change="${this.changeForm}"
                placeholder="Síntomas del paciente"
                .value="${sintomas}"
              ></textarea>
            </div>
            <div class="form-group">
              <label>Receta</label>
              <textarea
                type="text"
                class="form-control"
                name="receta"
                @change="${this.changeForm}"
                placeholder="Receta del paciente"
                .value="${receta}"
              ></textarea>
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
            <button type="submit" class="btn btn-primary btn-lg btn-block">
              Agregar
            </button>
          </form>
        </div>
      </div>
    `;
  }
}

customElements.define("my-form", MyForm);
