import {LitElement,html} from 'lit-element';

class MyError extends LitElement{
	render(){
		return html `
			<p class="alert alert-danger">${this.messageError}</p>
		`;
	}
	static get properties(){
		return{
			messageError:{type: String}
		}
	}

	createRenderRoot(){
		return this;
	}
};

customElements.define('my-error', MyError);
