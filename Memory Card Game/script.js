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


let AllSymbols = [...symbols, ...symbols];
let flippedCards = [];
let matchedPairs = 0;


// Function to shuffle the cards array using the Fisher-Yates algorithm
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
    card.addEventListener("click", handleClickCard); // Fixed the event handler name to match usage
    return card;
}


// Function to handle card click events
function handleClickCard(event) {
    const card = event.target;


    // Prevent flipping if the card is already flipped, matched, or two cards are already flipped
    if (
        card.classList.contains("flipped") ||
        card.classList.contains("matched") ||
        flippedCards.length === 2
    ) {
        return;
    }


    card.classList.add("flipped");
    card.textContent = card.dataset.symbol; // Fixed typo: "textcontent" to "textContent"
    flippedCards.push(card);


    if (flippedCards.length === 2) {
        checkForMatch();
    }
}


// Function to check if the flipped cards match
function checkForMatch() {
    const [card1, card2] = flippedCards;


    if (card1.dataset.symbol === card2.dataset.symbol) {
        card1.classList.add("matched");
        card2.classList.add("matched");
        matchedPairs++;


        if (matchedPairs === symbols.length) {
            setTimeout(() => alert("You Win!"), 400); // Capitalized "You Win!" for consistency
        }
    } else {
        // Flip the cards back after a short delay if they don't match
        setTimeout(() => {
            card1.classList.remove("flipped");
            card2.classList.remove("flipped");
            card1.textContent = ""; // Fixed typo: "textcontent" to "textContent"
            card2.textContent = ""; // Fixed typo: "textcontent" to "textContent"
        }, 1000);
    }


    flippedCards = [];
}


// Function to initialize the game
function initializeGame() {
    const gameContainer = document.getElementById("game-container");
    gameContainer.innerHTML = "";
    shuffle(AllSymbols); // Ensure the cards are shuffled


    AllSymbols.forEach((symbol) => {
        const card = createCard(symbol);
        gameContainer.appendChild(card);
    });
}


// Start the game
initializeGame();


