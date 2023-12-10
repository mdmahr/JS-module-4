document.getElementById('addressForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const address = document.getElementById('addressInput').value;
    findCoordinates(address);
});

function findCoordinates(address) {

    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                const coords = data[0];
                getRoute([coords.lat, coords.lon], [60.2239, 24.7583]); // Replace with the school's coordinates
            } else {
                alert('Address not found.');
            }
        }).catch(error => console.error('Error:', error));
}

function getRoute(startCoords, schoolCoords) {

    const map = L.map('map').setView(startCoords, 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    L.marker(startCoords).addTo(map)
        .bindPopup('Starting Point')
        .openPopup();

    L.marker(schoolCoords).addTo(map)
        .bindPopup('Karaportti 2')
        .openPopup();

    document.getElementById('routeTimes').textContent = 'Start Time: 8:00 AM, End Time: 9:00 AM';
}

const map = L.map('map').setView([60.2239, 24.7583], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
}).addTo(map);
