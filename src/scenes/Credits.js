class Credits extends Phaser.Scene {
    constructor() {
        super('creditsScene');
    }

    
    preload(){
        this.load.image('background', "./assets/devilsharvest.jpg")

    }
    create(){
        let titleConfig = {
            fontFamily: 'Ancient Modern Tales',
            fontSize: '25px',
            // backgroundColor: '#F3B141',
            color: '#8fc75a',
            padding: {
              top: 5,
              bottom: 5,
            },
          }

          this.cursors = this.input.keyboard.createCursorKeys();  

          this.field= this.add.tileSprite(0,0, config.width, config.height,  'background').setOrigin(0,0);
          this.credits = this.add.text(config.width/2.5, config.height/9, "Credits: ", titleConfig).setOrigin(0,0);
          this.name = this.add.text(config.width/2.5, config.height/5, "Game Design and Art: Yash Malegaonkar", titleConfig).setOrigin(0,0);
          this.music = this.add.text(config.width/2.5, config.height/3, "Music: Pixabay (links in github) ", titleConfig).setOrigin(0,0);


          this.startgame = this.add.text(config.width/2.5, config.height/1.3, "Press the left arrow key to go back!", titleConfig).setOrigin(0,0);
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(this.cursors.left)){
            this.scene.start('titleScene');
        }
    }










}