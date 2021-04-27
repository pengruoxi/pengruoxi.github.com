(function () {
    "use strict";
    console.log("reading js");

    //function that create random int from min number to max number
    function randomInt(min, max){
        return Math.floor( (max - min + 1) * Math.random() ) + min;
    }

    // Roll primary attributes
    const attributes = document.querySelectorAll('#primaryAttributes input')
    document.querySelector('.random').addEventListener('click', function(event){
        for(let i=0;i<attributes.length;i++){
            var data = ( randomInt(1,6)+randomInt(1,6)+randomInt(1,6) )*5;
            if(i==3 || i==4 || i==7){
                data = ( randomInt(1,6)+randomInt(1,6)+ 6 )*5;
            }
            attributes[i].value = data;
        }
    });

    //change page

    document.querySelector('.towardOne').addEventListener('click', function(event){
        event.preventDefault();
        document.getElementById('one').className = 'page showing';
        document.getElementById('two').className = 'page hidden';
    });

    document.querySelector('.towardTwo').addEventListener('click', function(event){
        event.preventDefault();
        document.getElementById('one').className = 'page hidden';
        document.getElementById('two').className = 'page showing';
    });

    //Mad Lib Generator

    const sc1Tag = document.querySelector('#sc1');
    const sc2Tag = document.querySelector('#sc2');
    const atbName = ["Strength","Constitution","Dexterity","Size","Intelligence","Power","Appearance","Education"];
    document.querySelector('.towardTwo').addEventListener('click', function(event){
        for(let i=0;i<attributes.length;i++){
            const newP = document.createElement('p');
            const pText = document.createTextNode(`Your ${atbName[i]} is ${attributes[i].value}`);
            newP.appendChild(pText);
            sc1Tag.appendChild(newP);
        }

        const name = document.getElementById('#name');
        const age = document.getElementById('#age');
        const occupation = document.getElementById('#occupation');
        const time = document.getElementById('#time');
        const pText2 = document.createTextNode(`${name.value} is a ${age.value}-year-old ${occupation.value}. And the character's story happend in ${time.value}`);
        sc2Tag.appendChild(pText2);
    });
    

})();