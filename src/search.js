function movieSearch() {
  var movieTitle = document.getElementById("movieTitle").value;

  fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=4b75f613&s=${encodeURIComponent(movieTitle)}`)
    .then((response) => response.json())
    .then((data) => {
      const tableBody = document.getElementById("tableBody");
      tableBody.innerHTML = '';

      if (data.Search && data.Search.length > 0) {
        const movies = data.Search;

        movies.forEach((movie) => {
          const row = document.createElement('tr');

          // Create and append cells for movie data
          const posterCell = document.createElement('td');
          const posterImg = document.createElement('img');
          posterImg.src = movie.Poster;
          posterImg.alt = `${movie.Title} Poster`;
          posterImg.classList.add('poster-image');
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

          const actionCell = document.createElement('td');
          const detailsButton = document.createElement('button');
          detailsButton.textContent = 'Details';
          detailsButton.addEventListener('click', () => {
            viewDetails(movie.imdbID);
          });
          actionCell.appendChild(detailsButton);
          row.appendChild(actionCell);

          tableBody.appendChild(row);
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

    function viewDetails(imdbID) {
      // Perform the necessary action to display movie details or redirect to display.html passing the imdbID as a query parameter
      window.location.href = `display.html?imdbID=${imdbID}`;
      console.log(`View details for movie with ID: ${imdbID}`);
}
}