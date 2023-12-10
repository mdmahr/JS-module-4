document.getElementById('jokeForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    const query = document.getElementById('query').value;
    const resultsContainer = document.getElementById('jokeResults');

    // Clear previous results
    resultsContainer.innerHTML = '';

    fetch(`https://api.chucknorris.io/jokes/search?query=${encodeURIComponent(query)}`)
        .then(response => response.json())
        .then(data => {
            // Iterate through each joke in the results
            data.result.forEach(joke => {
                // Create an article element for each joke
                const jokeElement = document.createElement('article');
                jokeElement.innerHTML = `<p>${joke.value}</p>`;

                // Append the joke article to the results container
                resultsContainer.appendChild(jokeElement);
            });
        })
        .catch(error => console.error('Error:', error));
});
