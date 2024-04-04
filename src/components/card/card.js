import { DivComponent } from "../../common/div-component";
import "./card.css";

export class Card extends DivComponent {
	constructor(appState, cardState) {
		super();
		this.appState = appState;
		this.cardState = cardState;
	}

	#deleteFromFavorites() {
		this.appState.favorites = this.appState.favorites.filter((item) => item.key !== this.cardState.key);
	}

	#addToFavorites() {
		this.appState.favorites.push(this.cardState);
	}

	render() {
		this.el.classList.add("card");
		const existInFavorites = this.appState.favorites.find((item) => item.key === this.cardState.key);
		this.el.innerHTML = `
			<div class="card__image">
				<img src="https://covers.openlibrary.org/b/olid/${this.cardState.cover_edition_key}-M.jpg" alt="${this.cardState.title}" />
			</div>
			<div class="card__info">
				<div class="card__tag">${this.cardState.subject ? this.cardState.subject[0] : "Неизвестно"}</div>
				<div class="card__title">${this.cardState.title}</div>
				<div class="card__author">${this.cardState.author_name ? this.cardState.author_name[0] : "Неизвестно"}</div>
				<div class="card__footer">
					<button class="button__add" ${existInFavorites ? "button__active" : ""}>
						${existInFavorites
				? '<img src="./static/favorites-black.svg" alt="Favorites logo" />'
				: '<img src="./static/favorites-white.svg" alt="Favorites logo" />'
			}
					</button>
				</div>
			</div>
		`
		if (existInFavorites) {
			this.el
				.querySelector("button")
				.addEventListener("click", this.#deleteFromFavorites.bind(this));
		} else {
			this.el
				.querySelector("button")
				.addEventListener("click", this.#addToFavorites.bind(this));
		}

		return this.el;
	}
}