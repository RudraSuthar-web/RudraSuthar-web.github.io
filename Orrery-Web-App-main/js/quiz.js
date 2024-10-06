const allQuestions = [
    {
        id: 1,
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        answer: 1
    },
    {
        id: 2,
        question: "What is the largest planet in our solar system?",
        options: ["Earth", "Mars", "Jupiter", "Neptune"],
        answer: 2
    },
    {
        id: 3,
        question: "What is a black hole?",
        options: ["A giant star", "A point in space with gravity so strong that nothing can escape", "A type of nebula", "A planet"],
        answer: 1
    },
    {
        id: 4,
        question: "Which star is at the center of our solar system?",
        options: ["Sirius", "Proxima Centauri", "Sun", "Alpha Centauri"],
        answer: 2
    },
    {
        id: 5,
        question: "What is the Milky Way?",
        options: ["A type of star", "A galaxy", "A planet", "A black hole"],
        answer: 1
    },
    {
        id: 6,
        question: "How many planets are in our solar system?",
        options: ["8", "9", "7", "6"],
        answer: 0
    },
    {
        id: 7,
        question: "Which planet is known for its rings?",
        options: ["Jupiter", "Mars", "Saturn", "Neptune"],
        answer: 2
    },
    {
        id: 8,
        question: "What are the main components of stars?",
        options: ["Hydrogen and helium", "Oxygen and nitrogen", "Iron and nickel", "Carbon and sulfur"],
        answer: 0
    },
    {
        id: 9,
        question: "Which planet is known for having the most moons?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        answer: 3
    },
    {
        id: 10,
        question: "What do we call a group of galaxies?",
        options: ["A cluster", "A solar system", "A nebula", "A constellation"],
        answer: 0
    },
    {
        id: 11,
        question: "Which planet is known as the Earth's twin?",
        options: ["Venus", "Mars", "Mercury", "Jupiter"],
        answer: 0
    },
    {
        id: 12,
        question: "What is the speed of light?",
        options: ["300,000 km/s", "150,000 km/s", "1,000,000 km/s", "700,000 km/s"],
        answer: 0
    },
    {
        id: 13,
        question: "What is the name of our galaxy?",
        options: ["Andromeda", "Milky Way", "Sombrero", "Whirlpool"],
        answer: 1
    },
    {
        id: 14,
        question: "How many moons does Mars have?",
        options: ["1", "2", "3", "4"],
        answer: 1
    },
    {
        id: 15,
        question: "Which planet has the most rings?",
        options: ["Saturn", "Jupiter", "Uranus", "Neptune"],
        answer: 0
    },
    {
        id: 16,
        question: "What are shooting stars?",
        options: ["Stars that explode", "Meteoroids burning up in Earth's atmosphere", "Planets colliding", "Comets"],
        answer: 1
    },
    {
        id: 17,
        question: "Which spacecraft was the first to land on the moon?",
        options: ["Apollo 11", "Voyager 1", "Mars Rover", "Challenger"],
        answer: 0
    },
    {
        id: 18,
        question: "What is the largest volcano in the solar system?",
        options: ["Mauna Kea", "Mount Everest", "Olympus Mons", "Kilimanjaro"],
        answer: 2
    },
    {
        id: 19,
        question: "Which planet is known for its Great Red Spot?",
        options: ["Mars", "Jupiter", "Saturn", "Venus"],
        answer: 1
    },
    {
        id: 20,
        question: "What is the main component of the Sun?",
        options: ["Oxygen", "Hydrogen", "Helium", "Carbon"],
        answer: 1
    },
];

let questions = [];
let currentQuestionIndex = 0;
let score = 0; // Score variable

function getRandomQuestions(num) {
    const shuffled = allQuestions.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function getRandomQuestions(num) {
    const shuffled = allQuestions.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
}

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    document.getElementById('question').textContent = currentQuestion.question;
    const optionsList = document.getElementById('options');
    optionsList.innerHTML = '';

    currentQuestion.options.forEach((option, index) => {
        const li = document.createElement('li');
        li.innerHTML = `<button class="option btn btn-secondary" data-index="${index}">${option}</button>`;
        optionsList.appendChild(li);
    });

    document.getElementById('result').textContent = '';
    document.getElementById('next-button').style.display = 'none';
}

function checkAnswer(selectedIndex) {
    const currentQuestion = questions[currentQuestionIndex];
    const resultElement = document.getElementById('result');

    if (selectedIndex === currentQuestion.answer) {
        resultElement.textContent = 'Correct!';
        resultElement.style.color = 'green';
        score++; // Increment score on correct answer
    } else {
        resultElement.textContent = 'Incorrect. The correct answer was: ' + currentQuestion.options[currentQuestion.answer];
        resultElement.style.color = 'red';
    }

    document.getElementById('next-button').style.display = 'block';
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('start-button').addEventListener('click', () => {
        questions = getRandomQuestions(5); // Get new questions when starting the quiz
        currentQuestionIndex = 0; // Reset the question index
        score = 0; // Reset score
        loadQuestion();
        document.getElementById('start-button').style.display = 'none'; // Hide start button
        document.getElementById('next-button').style.display = 'none'; // Hide next button
        document.getElementById('result').textContent = ''; // Clear any previous result
    });

    document.getElementById('options').addEventListener('click', (event) => {
        if (event.target.classList.contains('option')) {
            const selectedIndex = parseInt(event.target.getAttribute('data-index'));
            checkAnswer(selectedIndex);
        }
    });

    document.getElementById('next-button').addEventListener('click', () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            // Display completion message and score
            document.getElementById('quiz-container').innerHTML = `
                <h4>Quiz Completed!</h4>
                <p>Your score: ${score} out of ${questions.length}</p>
                <button onclick="location.reload()" class="btn btn-primary">Restart Quiz</button>
            `;
        }
    });
});