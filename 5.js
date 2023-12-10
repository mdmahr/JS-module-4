fetch('https://api.chucknorris.io/jokes/random')
    .then(response => response.json())
    .then(data => {
        console.log(data.value); // Printing the joke to the console
    })
    .catch(error => console.error('Error:', error));
