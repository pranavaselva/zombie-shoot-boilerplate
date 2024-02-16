// Iteration 1: Declare variables required for this game
let timer = 60;
let Game = document.getElementById("game-body");
let zombiess = ['./assets/zombie-1.png',
           './assets/zombie-2.png',
           './assets/zombie-3.png',
           './assets/zombie-4.png',
           './assets/zombie-5.png',
           './assets/zombie-6.png'
        ];

// Iteration 1.2: Add shotgun sound
Game.addEventListener("click",function(){
    let gunBgm = new Audio("./assets/shotgun.wav");
    gunBgm.play();
    gunBgm.volume = 0.3; 
});


// Iteration 1.3: Add background sound
let bgm = new Audio('./assets/bgm.mp3');
bgm.volume = 0.2;
bgm.play();
bgm.loop = true;


// Iteration 1.4: Add lives
let addLives = 0;


// Iteration 2: Write a function to make a zombie
let zombieID = 0; 
function createZombie(){
    let randomZombie = zombiess[Math.floor(Math.random() * 6)];
    Game.innerHTML += `<img src='${randomZombie}' alt='${randomZombie}' class='zombie-image' id='zombie-${zombieID}'/>`;

    let zombiePlace = document.getElementById("zombie-"+zombieID);
    let translaterandom = Math.floor(Math.random() * (80 - 20)) + 20;

    zombiePlace.style.transform = `translateX(${translaterandom}vw)`;
    let secondrandom = Math.floor(Math.random() * (7 - 2)) + 2;

    zombiePlace.style.animationDuration = `${secondrandom}s`;
    zombiePlace.addEventListener("click", function(){
        deleteZombie(zombiePlace);
    });
}


// Iteration 3: Write a function to check if the player missed a zombie
function deleteZombie(zombiePlace){
    zombiePlace.style.display = "none";
    zombieID++;
    createZombie();
}


// Iteration 4: Write a function to destroy a zombie when it is shot or missed
// Iteration 5: Creating timer
setInterval(function(){
    timer = timer - 1;
    document.getElementById("timer").innerHTML = timer;

    let missedZombie = document.getElementById("zombie-" + zombieID);
    if (missedZombie) {
        let top = missedZombie.getBoundingClientRect().top;
        if (top <= 0){
            addLives++;
            if (addLives == 4){
                window.location.href = './game-over.html';
                console.log('Game-Over');
            }
            deleteZombie(missedZombie);
        }
    }

    if (timer == 0){
        window.location.href = './win.html';
        console.log('Winner');
    }
}, 1000);


// Iteration 6: Write a code to start the game by calling the first zombie
createZombie();

// Iteration 7: Write the helper function to get random integer
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}