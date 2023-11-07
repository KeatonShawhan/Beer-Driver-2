//https://pixabay.com/sound-effects/doorhit-98828/
//https://pixabay.com/music/christmas-christmas-holidays-medium-172984/
/*
The programming technique that I am kinda proud of would be the use of the mask in order to change the 
fill amounts of the hearts whenever I lost them, and also the use of masking in order to fill and refill
the bar. I also made it so the bar acts like a 4th heart if its filled and you have three hearts. I did this by checking
a few conditions, and then if the bar was full and the player had 3 hearts, the bar would 
be stored until the player lost a life, and then reset, leaving the player with full hearts
Its in the play.js where I set up a mask

As for the creative tilt, I think I am most proud how the health system works. Since you can lose a heart anytime you bump
into something, at the end that would get too broken if there were only three chances. 
Especially because after you collect a certain number of points, the police start to spawn as well
by adding a bar that fills as you collect lettuce, and every 10 you collect, it will give
you a chance to get a life back, or hold that bar until you do lose a life. 
I am also proud, even though the animation doesnt look great, of how the whole
art style came togther, especially as this was the first time I have ever made
my own assets. 



*/


let config = {
    type: Phaser.AUTO,
    height: 500,
    width: 800,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
        }

    },
    render:{
        pixelArt: true
    },
    scene: [Title, Credits, Play, GameOver]
}
let game = new Phaser.Game(config);
let keyUP, keyDOWN, keyR, keyB;