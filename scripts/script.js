// ========== CONSTANTES ==========
const FRONT = "card_front" // Armazena uma classe que será dada ao elemento
const BACK = "card_back" // Armazena uma classe que será dada ao elemento
const CARD = "card" // Armazena uma classe que será dada ao elemento
const ICON = "icon" // Armazena uma classe que será dada ao elemento

// ========== INICIA O JOGO ==========
startGame();

function startGame() {
    initializeCards(game.createCardsFromTechs()); //Chama a função de iniciar cartas
}

// ========== INICIA AS CARTAS ==========
function initializeCards() {

    let gameBoard = document.getElementById("gameBoard"); //Get do elemento
    gameBoard.innerHTML = ''; //Define o tabuleiro como vazio

    //Cria uma DIV para cada carta que compõe o tabuleiro
    game.cards.forEach(card => {
        let cardElement = document.createElement('div'); //Cria div
        cardElement.id = card.id; //Cria um ID
        cardElement.classList.add(CARD); //Adiciona a class 'card'
        cardElement.dataset.icon = card.icon; //Define o dataset

        createCardContent(card, cardElement); //Chama a função de criar o conteúdo da carta

        cardElement.addEventListener('click', flipCard) //Event Listener para chamar a função de girar a carta
        gameBoard.appendChild(cardElement); //Insere a carta no baralho
    })
}

// ========== CRIAR O CONTEÚDO DA CARTA ==========
function createCardContent(card, cardElement) {
    createCardFace(FRONT, card, cardElement); //Cria a face frontal
    createCardFace(BACK, card, cardElement); //Cria a face traseira
}

// ========== CRIAR A FACE DA CARTA ==========
function createCardFace(face, card, element) {

    let cardElementFace = document.createElement('div'); //Cria uma div para a carta
    cardElementFace.classList.add(face); //Adiciona a classe 'face'

    //Parte frontal da carta
    if (face === FRONT) {
        let iconElement = document.createElement('img'); //Cria uma tag img no HTML
        iconElement.classList.add(ICON); //Adiciona a classe icon
        iconElement.src = "./images/" + card.icon + ".png"; //Passa a imagem referente a carta
        cardElementFace.appendChild(iconElement); //Insere o ícone no elemento

    } else { //Parte traseira da carta
        cardElementFace.innerHTML = "&lt/&gt"; //Insere no elemtno o texto na parte traseira da carta
    }

    element.appendChild(cardElementFace); //Exibe a carta na tela
}

// ========== GIRAR A CARTA ==========
function flipCard() {

    if (game.setCard(this.id)) { //Se a carta for setada

        this.classList.add("flip"); //Adiciona a classe flip
        if (game.secondCard) { //Se ja foram viradas duas cartas

            if (game.checkMatch()) { //Verifica se as cartas são iguais

                game.clearCards(); //Limpa os campos firstCard e secondCard
                if (game.checkGameOver()) { //Verifica se o jogo acabou

                    setTimeout(() => { //Timer para exibir o overlay de gameover
                        let gameOverLayer = document.getElementById("gameOver"); //Pega o elemento
                        gameOverLayer.style.display = 'flex'; //Muda o display de none para flex para exibir o overlay de gameover
                    }, 800);

                }
            } else { // Se as cartas não forem iguais

                setTimeout(() => {
                    let firstCardView = document.getElementById(game.firstCard.id);
                    let secondCardView = document.getElementById(game.secondCard.id);

                    firstCardView.classList.remove('flip'); //Remove a class flip
                    secondCardView.classList.remove('flip'); //Remove a class flip
                    game.unflipCards(); //Chama a função de virar as cartas de volta
                }, 1000); //Timer de 1 segundo antes de executar este bloco

            };
        }
    }

}

function restart() {
    game.clearCards();
    startGame();
    let gameOverLayer = document.getElementById("gameOver");
    gameOverLayer.style.display = 'none';
}