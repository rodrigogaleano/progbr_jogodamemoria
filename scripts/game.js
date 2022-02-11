let game = {

    // ========== VARIÁVEIS ==========
    lockMode: false, //
    firstCard: null, // Armazena a primeira carta virada
    secondCard: null, // Armazena a segunda carta virada
    cards: null, //Inicia as cartas com null

    techs: [ //Vetor com as tecnologias de todas as cartas
        'bootstrap',
        'css',
        'electron',
        'firebase',
        'html',
        'javascript',
        'jquery',
        'mongo',
        'node',
        'react'
    ],

    // ========== SETAR A CARTA ==========    
    setCard: function (id) {

        let card = this.cards.filter(card => card.id === id)[0];

        if (card.flipped || this.lockMode) { //Se a carta ja etá virada ou o lockmode está ativo retorna falso
            return false;
        }

        if (!this.firstCard) { //Se a variavel primeira carta ainda está vazia, seta a carta da vez como a primeira
            this.firstCard = card;
            this.firstCard.flipped = true;
            return true;
        } else { //Seta a carta como segunda
            this.secondCard = card;
            this.secondCard.flipped = true;
            this.lockMode = true; //Define o lockmode pra true
            return true;
        }

    },

    // ========== VERICA SE DEU MATCH ==========
    checkMatch: function () {
        if (!this.firstCard || !this.secondCard) { //Se alguma das cartas ainda é nula retorna false
            return false;
        }
        return this.firstCard.icon === this.secondCard.icon; //Se forem iguais retorna true
    },

    // ========== LIMPAR VARIAVEL DAS CARTAS ==========
    clearCards: function () {
        this.firstCard = null; //Limpa a variavel da primeira carta
        this.secondCard = null; //Limpa a variável da segunda carta
        this.lockMode = false; //Define o lockmode pra falso
    },

    // ========== DESVIRAR AS CARTAS ==========
    unflipCards() {
        this.firstCard.flipped = false; //Define a carta como não flipada
        this.secondCard.flipped = false; //Define a carta como não flipada
        this.clearCards(); //Chama a função de limpar as variaveis first e second card
    },

    // ========== VERIFICA SE O JOGO ACABOU ==========
    checkGameOver() {
        return this.cards.filter(card => !card.flipped).length == 0; //Caso não haja mais cartas que não foram viradas retorna true
    },

    // ========== CRIAR CARTA ==========
    createCardsFromTechs: function () {

        this.cards = []; //Atribui um vetor vazil a variavel cards que anteriormente era null

        //For para criar carta para todas tecnologias
        this.techs.forEach((tech) => {
            this.cards.push(this.createPairFromTech(tech)); //Chama a função de criar par
        })
        this.cards = this.cards.flatMap(pair => pair); //Mapeia os pares

        this.shuffleCards(); //Chama função de embaralhar cartas
        return this.cards;
    },

    // ========== CRIAR PAR PARA A CARTA ==========
    createPairFromTech: function (tech) {

        return [{
            id: this.createIdWithTech(tech), //Chama a função de criar um ID randômico
            icon: tech, //Define a tecnologia da vez como icon
            flipped: false, //Inicia a var que controla se a carta está virada ou não, inicia em false
        }, {
            id: this.createIdWithTech(tech),
            icon: tech,
            flipped: false,
        }]

    },

    // ========== CRIA ID RANDÔMICO A CARTA ==========
    createIdWithTech: function (tech) {
        return tech + parseInt(Math.random() * 1000);
    },

    // ========== EMBARALHA AS CARTAS ==========
    shuffleCards: function () {
        let currentIndex = this.cards.length; //Define o index como o tamanho do array
        let randomIndex = 0; //Armazena um index randomico

        while (currentIndex !== 0) {

            randomIndex = Math.floor(Math.random() * currentIndex); //Gera um numero aleatorio
            currentIndex--; //Decrementa o index atual

            [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]];  //TROCA AS VARIAVEIS
        }
    }

}