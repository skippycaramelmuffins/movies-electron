function movieSearch() {
    var movieTitle = document.getElementById("movieTitle").value;

    fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=4b75f613&s=${encodeURIComponent(movieTitle)}`)
        .then((response) => response.json())
        .then((data) => {
            const tableBody = document.getElementById("tableBody");
            tableBody.innerHTML = '';

            if (data.Search && data.Search.length > 0) {
                const movies = data.Search;

                // Fetch complete movie details for each movie
                const fetchPromises = movies.map((movie) => {
                    return fetch(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=4b75f613`)
                        .then((response) => response.json())
                        .then((movieDetails) => movieDetails);
                });

                // Wait for all movie details to be fetched
                Promise.all(fetchPromises)
                    .then((moviesWithDetails) => {
                        // Sort the movies by year (newer to older)
                        const sortedMovies = moviesWithDetails.sort((a, b) => b.Year - a.Year);

                        // Display the related movies in the table
                        sortedMovies.forEach((movie) => {
                            const row = document.createElement('tr');

                            const posterCell = document.createElement('td');
                            const posterImg = document.createElement('img');
                            posterImg.src = movie.Poster;
                            posterImg.alt = `${movie.Title} Poster`;
                            posterImg.classList.add('poster-image'); // Add the class for styling
                            posterCell.appendChild(posterImg);
                            row.appendChild(posterCell);

                            const idCell = document.createElement('td');
                            idCell.textContent = movie.imdbID;
                            row.appendChild(idCell);

                            const titleCell = document.createElement('td');
                            titleCell.textContent = movie.Title;
                            row.appendChild(titleCell);

                            const yearCell = document.createElement('td');
                            yearCell.textContent = movie.Year;
                            row.appendChild(yearCell);

                            tableBody.appendChild(row);
                        });

                        // Call the function to display movie recommendations
                        displayMovieRecommendations(sortedMovies);
                    });
            } else {
                const row = document.createElement('tr');
                const noResultsCell = document.createElement('td');
                noResultsCell.setAttribute('colspan', '4');
                noResultsCell.textContent = 'No results found';
                row.appendChild(noResultsCell);
                tableBody.appendChild(row);
            }
        })
        .catch((error) => {
            console.error(error);
        });
}
