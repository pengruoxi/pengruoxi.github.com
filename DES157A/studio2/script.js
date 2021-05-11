(function () {
    "use strict";
    console.log("reading js");


    //change page

    const showZeroBtn = document.querySelector('.showZero');
    const showOneBtn = document.querySelectorAll('.showOne');
    const showTwoBtn = document.querySelector('.showTwo');
    showZeroBtn.addEventListener('click', function(){
        document.getElementById('zero').className = "page showing";
        document.getElementById('one').className = "page hidden";
    });
    
    showOneBtn.forEach(function(eachBtn){
        eachBtn.addEventListener('click', function(){
            document.getElementById('zero').className = "page hidden";
            document.getElementById('one').className = "page showing";
            document.getElementById('two').className = "page hidden";
        });
    })

    showTwoBtn.addEventListener('click', function(){
        document.getElementById('one').className = "page hidden";
        document.getElementById('two').className = "page showing";
    });

    //change image by time
    let currentImage = 0;
    const myPhotos = ["image1.jpg", "image2.jpg", "image3.jpg", "image4.jpg"];

    const slide = document.getElementById('myimage');

        setInterval(function(){
            currentImage++;
            if(currentImage > myPhotos.length-1){currentImage = 0;}
            slide.src = `image/${myPhotos[currentImage]}`;
        },2000);
    
})();