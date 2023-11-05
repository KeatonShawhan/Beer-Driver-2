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
            debug: true,
        }

    },
    render:{
        pixelArt: true
    },
    scene: [Title, Play, GameOver]
}
let game = new Phaser.Game(config);
let keyUP, keyDOWN, keyR;   