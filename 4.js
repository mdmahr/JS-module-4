document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    const query = document.getElementById('query').value;
    const resultsContainer = document.getElementById('results');

    // Clear previous results
    resultsContainer.innerHTML = '';

    fetch(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`)
        .then(response => response.json())
        .then(data => {
            data.forEach(item => {
                const tvShow = item.show;

                // Creating the article element
                const article = document.createElement('article');

                // Adding the name in an h2 element
                const name = document.createElement('h2');
                name.textContent = tvShow.name;
                article.appendChild(name);

                // Adding the URL in an a element
                if (tvShow.url) {
                    const link = document.createElement('a');
                    link.href = tvShow.url;
                    link.textContent = 'Details';
                    link.target = '_blank';
                    article.appendChild(link);
                }

                // Adding the image
                const image = document.createElement('img');
                image.src = tvShow.image?.medium || 'https://via.placeholder.com/210x295?text=Not%20Found';
                image.alt = tvShow.name;
                article.appendChild(image);

                // Adding the summary in a div element
                const summary = document.createElement('div');
                summary.innerHTML = tvShow.summary || 'No summary available.';
                article.appendChild(summary);

                // Appending the article to the results container
                resultsContainer.appendChild(article);
            });
        })
        .catch(error => console.error('Error:', error));
});
