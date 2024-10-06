function updateSidebar() {
    const infoContainer = document.getElementById('planet-info');
    infoContainer.innerHTML = ''; // Clear existing info

    for (let planet in planets) {
        const planetInfo = document.createElement('div');
        planetInfo.innerHTML = `
            <strong>${capitalizeFirstLetter(planet)}</strong><br>
            Mean Radius: ${planets[planet].a / 10} km<br>
            Orbital Period: ${(planets[planet].T / 86400).toFixed(2)} days<br><br>
        `;
        infoContainer.appendChild(planetInfo);
    }
}
