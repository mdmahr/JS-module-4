document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    // Get the value from the input field
    const query = document.getElementById('query').value;

    // Send a request to the TVMaze API
    fetch(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`)
        .then(response => response.json())
        .then(data => {
            // Print the search result to the console
            console.log(data);
        })
        .catch(error => console.error('Error:', error));
});

