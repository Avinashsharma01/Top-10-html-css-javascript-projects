// Array of symbols used in the game
const symbols = [
    "\u2660", // Spade
    "\u2663", // Club
    "\u2665", // Heart
    "\u2666", // Diamond
    "A",
    "B",
    "C",
    "D",
];

// Duplicate the symbols array to create pairs
let AllSymbols = [...symbols, ...symbols];
let flippedCards = [];
let matchedPairs = 0;

// Function to shuffle the cards array
//  Fisher-Yates shuffle algorithm (also known as the Knuth shuffle).
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Function to create a card element
function createCard(symbol) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.symbol = symbol;
    card.addEventListener("click", handleCardClick);
    return card;
}


// Function to handle card click events
function handleCardClick(event) {
    const card = event.target;
    // Ignore clicks if the card is already flipped or matched, or if two cards are already flipped
    if (
        card.classList.contains("flipped") ||
        card.classList.contains("matched") ||
        flippedCards.length === 2
    ) {
        return;
    }

    // Flip the card and add it to the flippedCards array
    card.classList.add("flipped");
    card.textContent = card.dataset.symbol;
    flippedCards.push(card);

    // Check for a match if two cards are flipped
    if (flippedCards.length === 2) {
        checkForMatch();
    }
}

// Function to check if the flipped cards match
function checkForMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.symbol === card2.dataset.symbol) {
        // If the cards match, mark them as matched
        card1.classList.add("matched");
        card2.classList.add("matched");
        matchedPairs++;

        // Check if all pairs are matched
        if (matchedPairs === symbols.length) {
            setTimeout(() => alert("You Win!"), 300);
        }

    } else {
        // If the cards do not match, flip them back after a short delay
        setTimeout(() => {
            card1.classList.remove("flipped");
            card2.classList.remove("flipped");
            card1.textContent = "";
            card2.textContent = "";
        }, 1000);
    }

    // Reset the flippedCards array
    flippedCards = [];
}

// Function to initialize the game
function initializeGame() {
    const gameContainer = document.getElementById("game-container");
    gameContainer.innerHTML = "";
    shuffle(AllSymbols);

    // Create and append card elements to the game container
    AllSymbols.forEach((symbol) => {
        const card = createCard(symbol);
        gameContainer.appendChild(card);
    });
}

// Start the game
initializeGame();