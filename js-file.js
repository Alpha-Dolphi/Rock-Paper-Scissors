const choices = document.querySelectorAll('.rect');
    const playerScore = document.querySelector('#player');
    const computerScore = document.querySelector('#computer');
    const finale = document.querySelector('#finale');
    const restart = document.createElement('div');
    const displayedPlayerChoice = document.querySelector('#player-choice');
    const displayedComputerChoice = document.querySelector('#computer-choice');
    restart.textContent = `Play again`;
    restart.classList.add('button', 'refresh');
        

    let plScore = 0;
    let cpScore = 0;


    function refreshPage() {
        window.location.reload(true);
    }


    function generateComputerChoice() {
        let ch = Math.random() * 3;
        if(ch <= 1) {
            return 'rock';
        }
        else if(ch <= 2) {
            return 'paper';
        }
        else {
            return 'scissors';
        }
    }

    function findWinner(computerChoice, playerChoice) {
        if (computerChoice === playerChoice.id) {
            return 'draw';
        }
        if ((computerChoice === 'rock' && playerChoice.id === 'scissors') || (computerChoice === 'scissors' && playerChoice.id === 'paper') || (computerChoice === 'paper' && playerChoice.id === 'rock')) {
            return 'computer';
        }
        else {
            return 'player';
        }
    }

    function updateScore(outcome) {
        if (outcome === 'draw') {
            return;
        }
        if (outcome === 'player') {
            playerScore.textContent = ++plScore;
        }
        else {
            computerScore.textContent = ++cpScore;
        }
    }

    function createParagWithText(text) {
        const p = document.createElement('p');
        p.textContent = text;
        return p;
    }

    function endTheGame() {
        if (plScore >= 5 && cpScore < 5) {
            finale.appendChild(createParagWithText('YOU WIN!'));
        } else if (plScore <= 5 && cpScore >= 5) {
            finale.appendChild(createParagWithText('YOU LOOSE!'));
        }
        finale.appendChild(restart);
    }

    function ShowChoice(choice) {
        let classesToAdd;
        if (choice == 'rock') {
            classesToAdd = [ 'fas', 'fa-fist-raised' ];
            
        }
        else if (choice == 'paper') {
            classesToAdd = [ 'fas', 'fa-hand-paper' ];
        }
        else if (choice == 'scissors') {            
            classesToAdd = [ 'fas', 'fa-hand-scissors' ];
        }
        return classesToAdd;
    }
    function playing(playerChoice) {
        let computerChoice = generateComputerChoice();
        displayedPlayerChoice.className = '';
        displayedPlayerChoice.classList.add(...ShowChoice(playerChoice.id));
        displayedComputerChoice.className = '';
        displayedComputerChoice.classList.add(...ShowChoice(computerChoice));
        let outcome = findWinner(computerChoice, playerChoice);            
        updateScore(outcome);            
        if (plScore === 5 || cpScore === 5) {
            endTheGame();
        }
    }

    choices.forEach((playerChoice) => {
        playerChoice.addEventListener('click', () => {         
            if (plScore >= 5 || cpScore >= 5) {
                return;
            }
            playing(playerChoice);
        });
    });

    restart.addEventListener('click', refreshPage);