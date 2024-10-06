// Sample planet information
const planetData = {
    Sun: `
        --> Radius: 435,000 miles (700,000 kilometers) 
        --->Age: 4.5 billion years (yellow dwarf star)
    `,
    Mercury: `
        Description: Mercury is the closest planet to the Sun.
        Diameter: 3,032 miles (4,880 kilometers)
    `,
    Venus: `
        Description: Venus is the second planet from the Sun.
        Diameter: 7,521 miles (12,104 kilometers)
    `,
   
    Mars: `
        Description: Mars is known as the Red Planet.
        Diameter: 4,212 miles (6,779 kilometers)
    `,
    Jupiter: `
        Description: Jupiter is the largest planet in our solar system.
        Diameter: 86,881 miles (139,822 kilometers)
    `,
    Saturn: `
        Description: Saturn is famous for its rings.
        Diameter: 72,366 miles (116,464 kilometers)
    `,
    Uranus: `
        Description: Uranus rotates on its side and has a blue color due to methane.
        Diameter: 31,518 miles (50,724 kilometers)
    `,
    Neptune: `
        Description: Neptune is the farthest planet from the Sun.
        Diameter: 30,598 miles (49,244 kilometers)
    `
};

console.log(planetData);

// Show the sliding panel with planet information
function showPanel(planetName) {
    document.getElementById('planet-name').textContent = planetName;
    document.getElementById('planet-info').textContent = planetData[planetName] || "Information not available.";
    document.getElementById('slide-panel').style.right = '0'; // Slide in
}

// Close the sliding panel
document.getElementById('close-panel').addEventListener('click', () => {
    document.getElementById('slide-panel').style.right = '-400px'; // Slide out
});

// Add click event to each planet
document.querySelectorAll('.planet').forEach(planet => {
    planet.addEventListener('click', () => {
        const planetName = planet.getAttribute('data-name');
        showPanel(planetName);
    });
});
