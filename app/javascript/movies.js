const omdbapiUrl = "http://www.omdbapi.com/";
const apiKey = "adf1f2d7";

const searchMovies = (event) => {
  event.preventDefault();
  const title = document.getElementById("movie-name").value;
  const resultsContainer = document.getElementById("movie-results");

  fetch(`${omdbapiUrl}?s=${title}&apikey=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      // Supprime les résultats précédents
      resultsContainer.innerHTML = "";

      // Affiche les résultats dans la liste déroulante
      data.Search.forEach((movie) => {
        const option = document.createElement("option");
        option.value = movie.Title;
        option.dataset.posterUrl = movie.Poster;
        resultsContainer.appendChild(option);
      });
    });
}

// Ajoutez un écouteur d'événements pour le champ de sélection
document.getElementById("movie-results").addEventListener("change", (event) => {
  const selectedOption = event.target.selectedOptions[0];
  const titleInput = document.getElementById("movie-name");
  const posterUrlInput = document.getElementById("movie_poster_url");

  // Remplit les champs avec les données du film sélectionné
  titleInput.value = selectedOption.value;
  posterUrlInput.value = selectedOption.dataset.posterUrl;
});

const form = document.getElementById("new_movie");
form.addEventListener("submit", searchMovies);
