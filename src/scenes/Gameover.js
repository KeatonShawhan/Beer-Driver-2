class GameOver extends Phaser.Scene {
    constructor() {
        super('gameOverScene');
    }
    create(){
        let overConfig = {
            fontFamily: 'Ancient Modern Tales',
            fontSize: '25px',
            // backgroundColor: '#F3B141',
            color: '#8fc75a',
            padding: {
              top: 5,
              bottom: 5,
            },
          }
        this.startgame = this.add.text(config.width/3, config.height/1.4, "Game over buddy!, press R to restart", overConfig).setOrigin(0,0);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);



    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(keyR)){
            this.scene.start('playScene');
        }
    }

}