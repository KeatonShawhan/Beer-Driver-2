class Title extends Phaser.Scene {
    constructor() {
        super('titleScene');
    }

    
    preload(){
        this.load.image('titlescreen', './assets/titlebackground.png');

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

          this.field= this.add.tileSprite(0,0, config.width, config.height,  'titlescreen').setOrigin(0,0);
          this.instructions = this.add.text(config.width/9, config.height/1.7, "Press the UP and DOWN arrow keys to dodge obstacles and collect your harvest!", titleConfig).setOrigin(0,0);
          this.startgame = this.add.text(config.width/3, config.height/1.4, "Press the UP arrow key to start!", titleConfig).setOrigin(0,0);
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(this.cursors.up)){
            this.scene.start('playScene');
        }
    }










}