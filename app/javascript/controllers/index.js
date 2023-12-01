// Import and register all your controllers from the importmap under controllers/*

import { application } from "controllers/application"

// Eager load all controllers defined in the import map under controllers/**/*_controller
import { eagerLoadControllersFrom } from "@hotwired/stimulus-loading"
eagerLoadControllersFrom("controllers", application)

// Lazy load controllers as they appear in the DOM (remember not to preload controllers in import map!)
// import { lazyLoadControllersFrom } from "@hotwired/stimulus-loading"
// lazyLoadControllersFrom("controllers", application)








const omdbapiUrl = "http://www.omdbapi.com/";
const apiKey = "adf1f2d7";

// Here is 2 other API key if the one above doesn't work anymore:
// - 48727053
// - 8691812a

// Your turn to code!

const searchMovies = (event) => {
  event.preventDefault();
  const title = document.getElementById("movie-name").value;
  fetch(`${omdbapiUrl}?s=${title}&apikey=${apiKey}`)
    .then(response => response.json())
    .then(data => appendMoviesToDom(data.Search))
}

const appendMoviesToDom = (movies) => {
  console.log(movies)
  const moviesContainer = document.getElementById("movie-cards");
  moviesContainer.innerHTML = ""; // Clear the previous results if any
  movies.forEach((movie) => {
    cardHTML = createMovieCard(movie);
    moviesContainer.insertAdjacentHTML('beforeend', cardHTML);
  });
}

const createMovieCard = (movie) => {
  return `
    <div class="col-lg-3 col-md-4 col-sm-6 col-12">
      <div class="card mb-2">
        <img src="${movie.Poster}" class="card-img-top" alt="${movie.Title}">
        <div class="card-body">
          <span class="badge bg-primary mb-2">${movie.Year}</span>
          <h5 class="card-title">${movie.Title}</h5>
        </div>
      </div>
    </div>
  `
}

const form = document.getElementById("search-movies");
form.addEventListener("submit", searchMovies)
