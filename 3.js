document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const query = document.getElementById('query').value;
    const resultsContainer = document.getElementById('results');


    resultsContainer.innerHTML = '';

    fetch(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`)
        .then(response => response.json())
        .then(data => {
            data.forEach(item => {
                const tvShow = item.show;

                const article = document.createElement('article');

                const name = document.createElement('h2');
                name.textContent = tvShow.name;
                article.appendChild(name);

                if (tvShow.url) {
                    const link = document.createElement('a');
                    link.href = tvShow.url;
                    link.textContent = 'Details';
                    link.target = '_blank';
                    article.appendChild(link);
                }

                if (tvShow.image?.medium) {
                    const image = document.createElement('img');
                    image.src = tvShow.image.medium;
                    image.alt = tvShow.name;
                    article.appendChild(image);
                }

                const summary = document.createElement('div');
                summary.innerHTML = tvShow.summary || 'No summary available.';
                article.appendChild(summary);

                resultsContainer.appendChild(article);
            });
        })
        .catch(error => console.error('Error:', error));
});
