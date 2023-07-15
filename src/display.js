// Get the imdbID from the query parameter
const urlParams = new URLSearchParams(window.location.search);
const imdbID = urlParams.get('imdbID');

// Declare variables for movie details
let movieTitle;
let movieGenre;
let movieYear;
let movieDirector;
let movieActors;
let moviePlot;
let movieRating;

// Function to fetch movie details by imdbID
async function fetchMovieDetails(imdbID) {
  const url = `https://www.omdbapi.com/?apikey=fa362c73&i=${encodeURIComponent(imdbID)}&plot=full`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
}

// Function to display movie details in the UI
function displayMovieDetails(movie) {
  const moviePosterContainer = document.getElementById('moviePoster');
  const movieDetailsContainer = document.getElementById('movieDetails');

  if (movie) {
    moviePosterContainer.innerHTML = `
      <img src="${movie.Poster}" alt="${movie.Title} Poster" width="400">
    `;

    movieDetailsContainer.innerHTML = `
      <h2>${movie.Title} (${movie.Year})</h2>
      <p><strong>Genre:</strong> ${movie.Genre}</p>
      <p><strong>Release Year:</strong> ${movie.Year}</p>
      <p><strong>IMDb ID:</strong> ${movie.imdbID}</p>
      <p><strong>Director:</strong> ${movie.Director}</p>
      <p><strong>Cast:</strong> ${movie.Actors}</p>
      <p><strong>Plot:</strong> ${movie.Plot}</p>
      <p><strong>IMDb Rating:</strong> ${movie.imdbRating}</p>
    `;

    // Update the movie details variables
    movieTitle = movie.Title;
    movieGenre = movie.Genre;
    movieYear = movie.Year;
    movieDirector = movie.Director;
    movieActors = movie.Actors;
    moviePlot = movie.Plot;
    movieRating = movie.imdbRating;
  } else {
    movieDetailsContainer.innerHTML = '<p>Movie details not found.</p>';
  }
}

// Fetch and display movie details
fetchMovieDetails(imdbID)
  .then((movie) => {
    displayMovieDetails(movie);
  })
  .catch((error) => {
    console.error('Error:', error);
    displayMovieDetails(null);
  });
