(function(){
    'use strict';

    const startGame = document.getElementById('startgame'); 
    const players = document.getElementsByClassName('player');
    const gameInfo = document.getElementsByClassName('gameInfo');
    const score = document.getElementsByClassName('score');
    const dices = document.getElementsByClassName('dice');
    const processBar = document.getElementsByClassName('processBar');
    const actions = document.getElementsByClassName('actions');
    const overlay = document.getElementById('overlay');
    const circleL = document.getElementsByClassName('circleL');
    const circleR = document.getElementsByClassName('circleR');

    let gameData = {
    dice: ['1die.jpg', '2die.jpg', '3die.jpg', 
        '4die.jpg', '5die.jpg', '6die.jpg'],
    players: ['player 1', 'player 2'],
    score: [0, 0],
    roll1: 0,
    roll2: 0,
    rollSum: 0,
    index: 0,
    gameEnd: 49
    };

    //sound related
    const rolldiceSound = new Audio('sounds/rolldice.wav');
    const failureSound = new Audio('sounds/failure.wav');

    startGame.addEventListener('click', function(){
        gameData.index = Math.round(Math.random());
        overlay.style.right = gameData.index * 50 + '%';
        players[gameData.index].className = "player currentPlayer";
        players[Math.abs(1-gameData.index)].className = "player pausedPlayer";

        document.getElementById('introduction').className = 'hidden';

        setUpTurn();
        
    });

    //change player when conditions are met
    function changePlayer(){
        gameData.index ? (gameData.index=0) : (gameData.index=1);
        players[gameData.index].className = "player currentPlayer";
        players[Math.abs(1-gameData.index)].className = "player pausedPlayer";
        overlay.style.right = gameData.index * 50 + '%';
    }

    function setUpTurn(){
        gameInfo[gameData.index].innerHTML = `<p>Roll the dice for the ${gameData.players[gameData.index]}</p>`;
        actions[gameData.index].innerHTML = `<button id="roll">Roll</button>
            <button id="pass">Pass</button>`;
        actions[Math.abs(1-gameData.index)].innerHTML = `<button>Roll</button>
            <button>Pass</button>`;
        document.getElementById('roll').addEventListener('click', function(){
            rolldiceSound.play();
            throwDice();
        });
    }

    function throwDice(){
        gameData.roll1 = Math.floor(Math.random()*6)+1;
        gameData.roll2 = Math.floor(Math.random()*6)+1;
        gameInfo[gameData.index].innerHTML = `<p>Roll the dice for the ${gameData.players[gameData.index]}</p>`;
        dices[gameData.index].innerHTML = `<img src=images/${gameData.dice[gameData.roll1-1]}>
                            <img src=images/${gameData.dice[gameData.roll2-1]}>`;
        gameData.rollSum = gameData.roll1 + gameData.roll2;

        if(gameData.rollSum === 2){
            gameInfo[gameData.index].innerHTML = '<p>Oh snap! Snake eyes!</p>';
            setTimeout(function(){failureSound.play();}, 500);
            gameData.score[gameData.index] = 0;
            changePlayer();
            setTimeout(setUpTurn, 500);
            showCurrentScore();
        }
        else if(gameData.roll1 ===1 || gameData.roll2 ===1){
            gameInfo[gameData.index].innerHTML = `<p>Sorry, one of your rolls was a one, switching to ${gameData.players[Math.abs(1-gameData.index)]}</p>`;
            changePlayer();
            setTimeout(setUpTurn, 500);
            showCurrentScore();
        }
        else {
            gameData.score[gameData.index] = gameData.score[gameData.index] + gameData.rollSum;
            gameData.rollSum = 0;
            actions[gameData.index].innerHTML = `<button id="rollagain">Roll</button>
            <button id="pass">Pass</button>`;

            document.getElementById('rollagain').addEventListener('click',function(){
                rolldiceSound.play();
                throwDice();
            });
            document.getElementById('pass').addEventListener('click', function(){
                changePlayer();
                setUpTurn();
            })

            checkWinningCondition();
        }


        function checkWinningCondition(){
            if(gameData.score[gameData.index] > gameData.gameEnd){
 
                document.getElementById('introduction').innerHTML = `
                <article>
                <h1>Congratulation ${gameData.players[gameData.index]}!</h1>
                <p>You win with ${gameData.score[gameData.index]} points!</p>
                <button id="quit">Start a New Game</button>
                </article>`;
                document.getElementById('introduction').className = 'showing';
                document.getElementById('quit').addEventListener('click', function(){
                    location.reload();
                    gameData.index = Math.round(Math.random());
                    players[gameData.index].className = "player currentPlayer";
                    players[Math.abs(1-gameData.index)].className = "player pausedPlayer";
                    setUpTurn();
                });
            }
            else{
                showCurrentScore();
            }
        }
    }

    function showCurrentScore(){
        score[gameData.index].innerHTML = `<p>${gameData.score[gameData.index]*2}<span>%</span></p>`;
        processBar[gameData.index].style.height = gameData.score[gameData.index] * 2 + 'vh';//rectangle process bar
        if(gameData.score[gameData.index]<=25){ //circular process bar
            circleR[gameData.index].style.transform = `rotate(${7.2*gameData.score[gameData.index] - 135}deg)`;
            circleL[gameData.index].style.transform = `rotate(-135deg)`;
        }else if(gameData.score[gameData.index]>25 && gameData.score[gameData.index]<=50){
            circleR[gameData.index].style.transform = `rotate(45deg)`;
            if(gameData.score[gameData.index] - gameData.roll1 - gameData.roll2<25){
                setTimeout(function(){circleL[gameData.index].style.transform = `rotate(${7.2*gameData.score[gameData.index] - 315}deg)`;}, 500);
            }else{
                circleL[gameData.index].style.transform = `rotate(${7.2*gameData.score[gameData.index] - 315}deg)`;
            }
        }else if(gameData.score[gameData.index]>50){
            circleL[gameData.index].style.transform = `rotate(45deg)`;
        }
    }

})();