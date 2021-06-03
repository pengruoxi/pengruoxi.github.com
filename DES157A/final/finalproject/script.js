(function(){
    'use strict';

    const startGame = document.getElementById('startgame'); 
    const players = document.getElementsByClassName('player');
    const gameInfo = document.getElementById('gameInfo');
    const score = document.getElementsByClassName('score');
    const dices = document.getElementById('dice');
    const actions = document.getElementsByClassName('actions');
    const circleL = document.getElementsByClassName('circleL');
    const circleR = document.getElementsByClassName('circleR');
    const playerNames = document.querySelectorAll('form p input');
    const p1Colors = document.querySelectorAll('#p1Color div');
    const p2Colors = document.querySelectorAll('#p2Color div');

    let gameData = {
    dice: ['1die.jpg', '2die.jpg', '3die.jpg', 
        '4die.jpg', '5die.jpg', '6die.jpg'],
    players:[playerNames[0].value, playerNames[1].value],
    score: [0, 0],
    roll1: 0,
    roll2: 0,
    rollSum: 0,
    index: 0,
    gameEnd: 49,
    p1ColorsScheme:['#a3cdd9', '#f2cc39', '#50ccd4'],
    p2ColorsScheme:['#8c4660', '#7988d9', '#f2aeae'],
    p1Color:'#a3cdd9',
    p2Color:'#8c4660'
    };

    //sound related
    const rolldiceSound = new Audio('sounds/rolldice.wav');
    const failureSound = new Audio('sounds/failure.wav');


    colorInitialize();

    startGame.addEventListener('click', function(){
        gameData.index = Math.round(Math.random());
        players[gameData.index].className = "player currentPlayer";
        players[Math.abs(1-gameData.index)].className = "player pausedPlayer";

        document.getElementById('introduction').className = 'hidden';
        document.getElementById('colorChoosing').style.display = 'none';
        document.getElementById('arrow').style.display = 'none';
        
        document.querySelector('#pl1 h1').innerHTML = playerNames[0].value;
        gameData.players[0]=playerNames[0].value;
        document.querySelector('#pl2 h1').innerHTML = playerNames[1].value;
        gameData.players[1]=playerNames[1].value;

        colorChange();

        setUpTurn();
        
    });

    //change player when conditions are met
    function changePlayer(){
        gameData.index ? (gameData.index=0) : (gameData.index=1);
        players[gameData.index].className = "player currentPlayer";
        players[Math.abs(1-gameData.index)].className = "player pausedPlayer";
    }

    function setUpTurn(){
        gameInfo.innerHTML = `<p>Roll the dice for the ${gameData.players[gameData.index]}</p>`;
        actions[gameData.index].innerHTML = `<button id="roll">Roll</button>
            <button id="pass">Pass</button>`;
        actions[Math.abs(1-gameData.index)].innerHTML = ``;
        document.getElementById('roll').addEventListener('click', function(){
            rolldiceSound.play();
            throwDice();
        });
    }

    function throwDice(){
        gameData.roll1 = Math.floor(Math.random()*6)+1;
        gameData.roll2 = Math.floor(Math.random()*6)+1;
        gameInfo.innerHTML = `<p>Roll the dice for the ${gameData.players[gameData.index]}</p>`;
        dices.innerHTML = `<img src=images/${gameData.dice[gameData.roll1-1]}>
                            <img src=images/${gameData.dice[gameData.roll2-1]}>`;
        gameData.rollSum = gameData.roll1 + gameData.roll2;

        if(gameData.rollSum === 2){
            gameInfo.innerHTML = '<p>Oh snap! Snake eyes!</p>';
            setTimeout(function(){failureSound.play();}, 500);
            gameData.score[gameData.index] = 0;
            showCurrentScore();
            changePlayer();
            setTimeout(setUpTurn, 500);
        }
        else if(gameData.roll1 ===1 || gameData.roll2 ===1){
            gameInfo.innerHTML = `<p>Sorry, one of your rolls was a one, switching to ${gameData.players[Math.abs(1-gameData.index)]}</p>`;
            showCurrentScore();
            changePlayer();
            setTimeout(setUpTurn, 500);
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


    //color change
    function colorInitialize(){
        for(let i=0; i<3 ;i++){
            p1Colors[i].addEventListener('click', function(){
                for(let j=0; j<3 ;j++){
                    p1Colors[j].style.borderColor = 'transparent';
                }
                p1Colors[i].style.borderColor = '#404048';
                gameData.p1Color = gameData.p1ColorsScheme[i];
            });
    
            p2Colors[i].addEventListener('click', function(){
                for(let j=0; j<3 ;j++){
                    p2Colors[j].style.borderColor = 'transparent';
                }
                p2Colors[i].style.borderColor = '#404048';
                gameData.p2Color = gameData.p2ColorsScheme[i];
            });
        }
    }
    

    function colorChange(){
        document.querySelector('#pl1 h1').style.borderColor = gameData.p1Color;
        document.querySelector('#pl1 .score').style.borderColor = gameData.p1Color;
        document.querySelector('#pl1 .score').style.color = gameData.p1Color;

        document.querySelector('#pl2 h1').style.borderColor = gameData.p2Color;
        document.querySelector('#pl2 .score').style.borderColor = gameData.p2Color;
        document.querySelector('#pl2 .score').style.color = gameData.p2Color;
    }

    //menu related

    const openIntro = document.getElementById("openIntro");
    const changePlayerInfo = document.getElementById("changePlayerInfo");
    const menuQuit = document.getElementById("menuQuit");
    const colorChoosing = document.getElementById('colorChoosing');

    openIntro.addEventListener('click', function(){
        document.getElementById('introduction').className = 'showing';
        document.getElementById('gamecontrol').innerHTML = '<button id="back">Back to Game</button>';

        document.getElementById('back').addEventListener('click', function(){
            document.getElementById('introduction').className = 'hidden';
        });
    });

    changePlayerInfo.addEventListener('click', function(){
        colorChoosing.id='colorChoosingInGame';
        colorChoosing.style.display='block';
        document.getElementById('change').className='showing';
        document.getElementById('overlayAll').className='showing';

        document.getElementById('applyChange').addEventListener('click', function(){
            colorInitialize();
            colorChange();

            document.querySelector('#pl1 h1').innerHTML = playerNames[0].value;
            gameData.players[0]=playerNames[0].value;
            document.querySelector('#pl2 h1').innerHTML = playerNames[1].value;
            gameData.players[1]=playerNames[1].value;
            colorChoosing.id='colorChoosing';
            colorChoosing.style.display='none';
            document.getElementById('change').className='hidden';
            document.getElementById('overlayAll').className='hidden';
        });
    });

    menuQuit.addEventListener('click', function(){
        location.reload();
        gameData.index = Math.round(Math.random());
        players[gameData.index].className = "player currentPlayer";
        players[Math.abs(1-gameData.index)].className = "player pausedPlayer";
        setUpTurn();
    });

})();