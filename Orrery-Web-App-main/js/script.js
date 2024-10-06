var content = document.getElementsByClassName('content')[0];
var width = content.offsetWidth;
var height = content.offsetHeight;
var verticalKaificent = 0.2;
deltaMerc = 0;
deltaVenus = 0;
deltaEarth = 0;
deltaMars = 0;
deltaJupiter = 0;
deltaSaturn = 0;
deltaUranus = 0;
deltaNeptune = 0;
deltaMoon = 0;
n = 50;

// Keplerian parameters (a: semi-major axis in million km, e: eccentricity, i: inclination in degrees)
const keplerianParams = {
    mercury: { a: 57.91, e: 0.2056, i: 7.0, Ω: 48.3, ω: 29.1 },
    venus: { a: 108.2, e: 0.0068, i: 3.4, Ω: 76.7, ω: 54.9 },
    earth: { a: 149.6, e: 0.0167, i: 0.0, Ω: 0.0, ω: 102.9 },
    mars: { a: 227.9, e: 0.0934, i: 1.9, Ω: 49.6, ω: 286.5 },
    jupiter: { a: 778.5, e: 0.0489, i: 1.3, Ω: 100.5, ω: 273.6 },
    saturn: { a: 1433.5, e: 0.0565, i: 2.5, Ω: 113.7, ω: 339.6 },
    uranus: { a: 2872.5, e: 0.0464, i: 0.8, Ω: 74.0, ω: 96.6 },
    neptune: { a: 4495.1, e: 0.0090, i: 1.8, Ω: 131.8, ω: 272.8 },
};

// Call functions
spacePosition();
drawCircles();
scaleHandler();
$(window).scrollTop($(window).height());
$(window).scrollLeft($(window).width() / 2);

var timerId;
var $mercuryContainer = $('.mercury_container').eq(0);
var mercuryX = width / 2 - $mercuryContainer.offsetWidth / 2;
var mercuryY = height / 2 - $mercuryContainer.offsetHeight / 2;
var mercury = $('.shadow_mercury').eq(0);
createLabel($mercuryContainer, 'Mercury');

var $venusContainer = $('.venus_container').eq(0);
var venusX = width / 2 - $venusContainer.offsetWidth / 2;
var venusY = height / 2 - $venusContainer.offsetHeight / 2;
var venus = $('.shadow_venus').eq(0);
createLabel($venusContainer, 'Venus');

var $earthMoonContainer = $('.earth_moon_container').eq(0);
var earthX = width / 2 - $earthMoonContainer.offsetWidth / 2;
var earthY = height / 2 - $earthMoonContainer.offsetHeight / 2;
var earth = $('.shadow_earth').eq(0);
createLabel($earthMoonContainer, 'Earth');

var $marsContainer = $('.mars_container').eq(0);
var marsX = width / 2 - $marsContainer.offsetWidth / 2;
var marsY = height / 2 - $marsContainer.offsetHeight / 2;
var mars = $('.shadow_mars').eq(0);
createLabel($marsContainer, 'Mars');

var $jupiterContainer = $('.jupiter_container').eq(0);
var jupiterX = width / 2 - $jupiterContainer.offsetWidth / 2;
var jupiterY = height / 2 - $jupiterContainer.offsetHeight / 2;
var jupiter = $('.shadow_jupiter').eq(0);
createLabel($jupiterContainer, 'Jupiter');

var $saturnRingContainer = $('.saturn_ring_container').eq(0);
var saturnX = width / 2 - $saturnRingContainer.offsetWidth / 2;
var saturnY = height / 2 - $saturnRingContainer.offsetHeight / 2;
var saturn = $('.shadow_saturn').eq(0);
createLabel($saturnRingContainer, 'Saturn');

var $uranusContainer = $('.uranus_container').eq(0);
var uranusX = width / 2 - $uranusContainer.offsetWidth / 2;
var uranusY = height / 2 - $uranusContainer.offsetHeight / 2;
var uranus = $('.shadow_uranus').eq(0);
createLabel($uranusContainer, 'Uranus');

var $neptuneContainer = $('.neptune_container').eq(0);
var neptuneX = width / 2 - $neptuneContainer.offsetWidth / 2;
var neptuneY = height / 2 - $neptuneContainer.offsetHeight / 2;
var neptune = $('.shadow_neptune').eq(0);
createLabel($neptuneContainer, 'Neptune');

function createLabel(container, planetName) {
    var label = document.createElement('div');
    label.innerText = planetName;
    label.className = 'planet-label';
    container.appendChild(label);
}

function spacePosition() {
    var sun = document.getElementsByClassName('sun')[0];
    sun.style.top = (height / 2 - sun.offsetHeight / 2) + 'px';
    sun.style.left = (width / 2 - sun.offsetWidth / 2) + 'px';

    // Positioning each planet container based on Keplerian parameters
    positionPlanet($mercuryContainer, keplerianParams.mercury, mercuryX, mercuryY, 'mercury');
    positionPlanet($venusContainer, keplerianParams.venus, venusX, venusY, 'venus');
    positionPlanet($earthMoonContainer, keplerianParams.earth, earthX, earthY, 'earth');
    positionPlanet($marsContainer, keplerianParams.mars, marsX, marsY, 'mars');
    positionPlanet($jupiterContainer, keplerianParams.jupiter, jupiterX, jupiterY, 'jupiter');
    positionPlanet($saturnRingContainer, keplerianParams.saturn, saturnX, saturnY, 'saturn');
    positionPlanet($uranusContainer, keplerianParams.uranus, uranusX, uranusY, 'uranus');
    positionPlanet($neptuneContainer, keplerianParams.neptune, neptuneX, neptuneY, 'neptune');
}

function positionPlanet(container, params, x, y, planetName) {
    const R = params.a / 10; // Scale down the semi-major axis
    container.style.top = (y - container.offsetHeight / 2) + 'px';
    container.style.left = (x + R - container.offsetWidth / 2) + 'px';
}

var start = document.getElementById('start');
start.onclick = function () {
    timerId = setInterval(move, 20);
};

var stop = document.getElementById('stop');
stop.onclick = function () {
    clearInterval(timerId);
};

// Adjusting speed factor to slow down the orbiting speed of planets
var speedFactor = 50; // Increase this value to reduce the speed of the planets

function move() {
    deltaMerc = movePlanet("mercury", deltaMerc, $mercuryContainer, 47.87);
    deltaVenus = movePlanet("venus", deltaVenus, $venusContainer, 35.02);
    deltaEarth = movePlanet("earth", deltaEarth, $earthMoonContainer, 29.78);
    deltaMoon = moveMoon(deltaMoon, $moon);
    deltaMars = movePlanet("mars", deltaMars, $marsContainer, 24.077);
    deltaJupiter = movePlanet("jupiter", deltaJupiter, $jupiterContainer, 13.07);
    deltaSaturn = movePlanet("saturn", deltaSaturn, $saturnRingContainer, 9.69);
    deltaUranus = movePlanet("uranus", deltaUranus, $uranusContainer, 6.81);
    deltaNeptune = movePlanet("neptune", deltaNeptune, $neptuneContainer, 5.43);
}

function movePlanet(planetName, delta, $container, orbitalSpeed) {
    var alpha = Math.PI * delta / 180;
    var R = keplerianParams[planetName].a / 10; // Scale down for visual representation
    $container.css('top', (height / 2 + R * Math.sin(alpha) * verticalKaificent - $container.height() / 2) + 'px');
    $container.css('left', (width / 2 + R * Math.cos(alpha) - $container.width() / 2) + 'px');
    $container.css('transform', 'rotate(' + delta + 'deg)');
    $container.css('z-index', delta < 180 ? 12 : 8);

    // Adjusting speed for a slower orbit
    delta += (360 / (orbitalSpeed / n)) / speedFactor; 
    if (delta > 360) { delta -= 360; }

    return delta;
}

function moveMoon() {
    var alpha = Math.PI * deltaMoon / 180;
    var Rmoon = 28; // Distance from the Earth to the Moon
    $moon.css('top', (earthMoonY + Rmoon * Math.sin(alpha) * verticalKaificent - $moon.height() / 2) + 'px');
    $moon.css('left', (earthMoonX + Rmoon * Math.cos(alpha) - $moon.width() / 2) + 'px');

    deltaMoon += (360 / (27.3 / n)); // Moon's orbital period
    if (deltaMoon > 360) { deltaMoon -= 360; }

    return deltaMoon;
}

function moveMoon() {
    var alpha = Math.PI * deltaMoon / 180;
    $moon.css('top', (height / 2 + (earthMoonKeplerianParams.a / 10) * Math.sin(alpha) * verticalKaificent - $moon.height() / 2) + 'px');
    $moon.css('left', (width / 2 + (earthMoonKeplerianParams.a / 10) * Math.cos(alpha) - $moon.width() / 2) + 'px');
    deltaMoon += (360 / (27.3 / n)); // Moon's orbital period
    if (deltaMoon > 360) { deltaMoon -= 360; }
}

function scaleHandler() {
    // Add your scaling logic here if needed
}

function drawCircles() {
    // Add your circle drawing logic here if needed
}
