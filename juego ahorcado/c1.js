const words = [
            { word: "FALACIA", hint: "Argumento que parece válido pero no lo es" },
            { word: "SILOGISMO", hint: "Razonamiento con dos premisas y una conclusión" },
            { word: "SOFISMA", hint: "Argumento falso con apariencia de verdad" },
            { word: "PREMISA", hint: "Base para un razonamiento" },
            { word: "DEDUCCION", hint: "De lo general a lo particular" },
            { word: "INDUCCION", hint: "De lo particular a lo general" },
            { word: "ANALOGIA", hint: "Razonamiento por comparación" },
            { word: "PARADOJA", hint: "Afirmación aparentemente contradictoria" },
            { word: "EVIDENCIA", hint: "Prueba que demuestra algo" }
        ];

        const hangmanStages = [
            `
              +---+
              |   |
                  |
                  |
                  |
                  |
            =========`,
            `
              +---+
              |   |
              O   |
                  |
                  |
                  |
            =========`,
            `
              +---+
              |   |
              O   |
              |   |
                  |
                  |
            =========`,
            `
              +---+
              |   |
              O   |
             /|   |
                  |
                  |
            =========`,
            `
              +---+
              |   |
              O   |
             /|\\  |
                  |
                  |
            =========`,
            `
              +---+
              |   |
              O   |
             /|\\  |
             /    |
                  |
            =========`,
            `
              +---+
              |   |
              O   |
             /|\\  |
             / \\  |
                  |
            =========`
        ];

        let shuffledWords = [];
        let currentWordIndex = 0;
        let selectedWord = "";
        let selectedHint = "";
        let guessedLetters = [];
        let wrongGuesses = 0;
        let gameOver = false;
        let timer;
        let timeLeft = 60;

        const elements = {
            wordDisplay: document.getElementById('word-display'),
            hint: document.querySelector('.hint'),
            hangman: document.getElementById('hangman-art'),
            message: document.getElementById('message'),
            keyboard: document.getElementById('keyboard'),
            timer: document.querySelector('.timer'),
            newGameBtn: document.getElementById('new-game-btn'),
            nextBtn: document.getElementById('next-btn'),
            restartBtn: document.getElementById('restart-btn')
        };

        function shuffleArray(array) {
            return array.sort(() => Math.random() - 0.5);
        }

        function initGame(newShuffle = false) {
            if (newShuffle || shuffledWords.length === 0) {
                shuffledWords = shuffleArray([...words]);
                currentWordIndex = 0;
            }

            if (currentWordIndex >= shuffledWords.length) {
                elements.restartBtn.style.display = 'inline-block';
                elements.nextBtn.style.display = 'none';
                return;
            }

            const { word, hint } = shuffledWords[currentWordIndex];
            selectedWord = word;
            selectedHint = hint;
            
            guessedLetters = [];
            wrongGuesses = 0;
            gameOver = false;
            timeLeft = 60;
            
            elements.hint.innerHTML = 💡 Pista: ${selectedHint};
            elements.message.textContent = '';
            elements.message.className = 'message';
            elements.keyboard.innerHTML = '';
            elements.nextBtn.style.display = 'none';
            elements.restartBtn.style.display = 'none';
            
            createKeyboard();
            updateDisplay();
            startTimer();
        }

        function createKeyboard() {
            'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(letter => {
                const button = document.createElement('button');
                button.className = 'key';
                button.textContent = letter;
                button.addEventListener('click', () => handleGuess(letter));
                elements.keyboard.appendChild(button);
            });
        }

        function handleGuess(letter) {
            if (gameOver || guessedLetters.includes(letter)) return;
            
            guessedLetters.push(letter);
            const button = [...elements.keyboard.children].find(b => b.textContent === letter);
            
            if (selectedWord.includes(letter)) {
                button.classList.add('correct');
                updateDisplay();
                checkWin();
            } else {
                button.classList.add('incorrect');
                wrongGuesses++;
                elements.hangman.textContent = hangmanStages[wrongGuesses];
                checkLose();
            }
            
            button.disabled = true;
        }

        function updateDisplay() {
            elements.wordDisplay.textContent = selectedWord
                .split('')
                .map(l => guessedLetters.includes(l) ? l : '_')
                .join(' ');
        }

        function checkWin() {
            if ([...selectedWord].every(l => guessedLetters.includes(l))) {
                gameOver = true;
                clearInterval(timer);
                elements.message.textContent = '🎉 ¡Victoria!';
                elements.message.classList.add('win');
                showNextButton();
            }
        }

        function checkLose() {
            if (wrongGuesses >= hangmanStages.length - 1) {
                gameOver = true;
                clearInterval(timer);
                elements.message.textContent = 😵 ¡Perdiste! La palabra era: ${selectedWord};
                elements.message.classList.add('lose');
                showNextButton();
            }
        }

        function showNextButton() {
            elements.nextBtn.style.display = 'inline-block';
            elements.restartBtn.style.display = 
                currentWordIndex + 1 >= shuffledWords.length ? 'inline-block' : 'none';
        }

        function startTimer() {
            updateTimer();
            timer = setInterval(() => {
                timeLeft = Math.max(0, timeLeft - 1);
                updateTimer();
                
                if (timeLeft <= 0 && !gameOver) {
                    clearInterval(timer);
                    elements.message.textContent = ⌛ ¡Tiempo! La palabra era: ${selectedWord};
                    elements.message.classList.add('lose');
                    gameOver = true;
                    showNextButton();
                }
            }, 1000);
        }

        function updateTimer() {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            elements.timer.textContent = ⏳ Tiempo: ${minutes}:${seconds.toString().padStart(2, '0')};
        }

        elements.nextBtn.addEventListener('click', () => {
            currentWordIndex++;
            initGame();
        });

        elements.restartBtn.addEventListener('click', () => {
            initGame(true);
        });

        elements.newGameBtn.addEventListener('click', () => {
            initGame(true);
        });

        document.addEventListener('keydown', (e) => {
            if (/^[a-z]$/i.test(e.key)) {
                const letter = e.key.toUpperCase();
                const button = [...elements.keyboard.children].find(b => b.textContent === letter);
                if (button && !button.disabled) button.click();
            }
        });

        window.addEventListener('load', () => initGame(true));