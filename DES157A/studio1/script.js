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
    const name = document.querySelector('#name');
    const description = document.querySelector('#description');
    const occupation = document.querySelector('#occupation');
    const background = document.querySelector('#background');
    const atbName = ["Strength","Constitution","Dexterity","Size","Intelligence","Power","Appearance","Education"];

    //change elements when change pages
    document.querySelector('.towardTwo').addEventListener('click', function(event){
        for(let i=0;i<attributes.length;i++){
            const newP = document.createElement('p');
            const pText = document.createTextNode(`The character's ${atbName[i]} is ${attributes[i].value}`);
            newP.appendChild(pText);
            sc1Tag.appendChild(newP);
        }

        const newP = document.createElement('p');
        const pText = document.createTextNode(`The character's name is ${name.value}. People will said that he/she is a ${description.value} person. And now he/she is working as a ${occupation.value}. ${background.value}`);
        newP.appendChild(pText);
        sc2Tag.appendChild(newP);
        console.log(name.value);
    });

    //delete useless elements when change pages
    document.querySelector('.towardOne').addEventListener('click', function(event){
        let pAmount = attributes.length;
        while(pAmount > 0){
            pAmount--;
            var allP = document.querySelectorAll('#sc1 p');
            sc1Tag.removeChild(sc1Tag.children[allP.length-1]);
        }
        sc2Tag.removeChild(sc2Tag.children[0]);
    });


})();