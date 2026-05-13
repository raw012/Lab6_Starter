// main.js

// Run the init() function when the page has loaded
window.addEventListener("DOMContentLoaded", init);

// Starts the program, all function calls trace back here
function init() {
	let recipes = getRecipesFromStorage();
	addRecipesToDocument(recipes);
	initFormHandler();
}

function getRecipesFromStorage() {
	return JSON.parse(localStorage.getItem("recipes")) || [];
}

function addRecipesToDocument(recipes) {
	const main = document.querySelector("main");

	recipes.forEach((recipeData) => {
		const card = document.createElement("recipe-card");
		card.data = recipeData;
		main.appendChild(card);
	});
}

function saveRecipesToStorage(recipes) {
	localStorage.setItem("recipes", JSON.stringify(recipes));
}

function initFormHandler() {
	const form = document.querySelector("#new-recipe");

	form.addEventListener("submit", (event) => {
		event.preventDefault();

		const formData = new FormData(form);

		const recipeObject = {};
		for (const [key, value] of formData.entries()) {
			recipeObject[key] = value;
		}

		recipeObject.rating = Number(recipeObject.rating);
		recipeObject.numRatings = Number(recipeObject.numRatings);

		const recipeCard = document.createElement("recipe-card");
		recipeCard.data = recipeObject;

		const main = document.querySelector("main");
		main.appendChild(recipeCard);

		const recipes = getRecipesFromStorage();
		recipes.push(recipeObject);
		saveRecipesToStorage(recipes);

		form.reset();
	});

	const clearButton = document.querySelector(".danger");

	clearButton.addEventListener("click", () => {
		localStorage.clear();

		const main = document.querySelector("main");
		main.innerHTML = "";
	});
}