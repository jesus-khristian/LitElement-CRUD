import { LitElement, html } from "lit-element";
import moment from "moment";

class AdminConsults extends LitElement {
  static get properties() {
    return {
      list: { type: Array }
    };
  }

  constructor() {
    super();
  }

  render() {
    return html`
      <hr />
      ${this.list.map(
        item => html`
          <div class="card border-dark  mb-3">
            <div class="card-body text-primary">
              <p class="text-right">${item.hoy}</p>
              <h5 class="card-title">${item.nombre}</h5>
              <h6 class="card-subtitle mb-2 text-muted">Edad : ${item.edad}</h6>
              <h6 class="card-subtitle mb-2 text-muted">
                Presión arterial : ${item.presion}
              </h6>
              <p class="card-text">Sintomas : ${item.sintomas}</p>
              <p class="card-text">Receta : ${item.receta}</p>
              <h6 class="card-subtitle text-right">
                Proxima Cita : ${item.fecha}
              </h6>
              <button
                class="btn btn-danger"
                @click="${() => this.deleteConsulta(item._id)}"
              >
                Borrar
              </button>
            </div>
          </div>
        `
      )}
    `;
  }

  deleteConsulta(id) {
    this.dispatchEvent(
      new CustomEvent("eliminar-consulta", {
        detail: id,
        bubbles: true,
        composed: true
      })
    );
  }

  createRenderRoot() {
    return this;
  }
}

customElements.define("admin-consults", AdminConsults);
