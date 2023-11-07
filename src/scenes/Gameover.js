class GameOver extends Phaser.Scene {
    constructor() {
        super('gameOverScene');
    }
    
    preload(){
        this.load.image('gameoverscreen', './assets/gameover.png');
    }
    
    create(data){
        // const playerScore = this.game.config.data.playerScore;
        console.log(data);

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
          this.field= this.add.tileSprite(0,0, config.width, config.height,  'gameoverscreen').setOrigin(0,0);
          this.instructions = this.add.text(config.width/3, config.height/1.7, "Your Harvest was "+ data +" plants", overConfig).setOrigin(0,0);

          this.startgame = this.add.text(config.width/8, config.height/1.4, "Game over buddy!, press R to restart or press B to go back to the title screen", overConfig).setOrigin(0,0);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyB = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);



    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(keyR)){
            this.scene.start('playScene');
        }
        if (Phaser.Input.Keyboard.JustDown(keyB)){
            this.scene.start('titleScene');
        }
            
        
    }

}