import { DivComponent } from "../../common/div-component";
import "./search.css";

export class Search extends DivComponent {
	constructor(state) {
		super();
		this.state = state;
	}

	search() {
		const value = this.el.querySelector(".search__input").value;
		this.state.searchQuery = value;
	}

	render() {
		this.el.classList.add("search");
		this.el.innerHTML = `
			<div class="search__wrapper">
				<input class="search__input" type="text" placeholder="Найти книгу или автора..."
				value='${this.state.searchQuery ? this.state.searchQuery : ""}'  />
			<img src="./static/search.svg" alt = "Search logo" />
			</div >
			<button aria-label="Search">
				<img src="./static/search-white.svg" alt="Search logo" />
			</button>
		`;
		this.el.querySelector(".search__input").addEventListener("keydown", (event) => {
			if (event.code === "Enter") this.search();
		});
		this.el.querySelector("button").addEventListener("click", this.search.bind(this));
		return this.el;
	}
}