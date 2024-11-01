class Title extends Phaser.Scene {
    constructor() {
        super('titleScene');
    }

    
    preload(){
        this.load.image('background', "./assets/background.png");

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

        const imageWidth = 256;
        const imageHeight = 144;
      
        // Calculate scale factors
        const scaleX = config.width / imageWidth;
        const scaleY = config.height / imageHeight;
      
        // Choose the smaller scale factor to fit image within bounds
        const scale = Math.min(scaleX, scaleY);
      
        this.city = this.add.tileSprite(0, 50, imageWidth, imageHeight, 'background').setOrigin(0, 0).setScale(scale);

        this.title = this.add.text(config.width/2, config.height/2.5, "Beer Driver", titleConfig).setOrigin(0.5,0);


        // Add background and apply scaling
        this.instructions = this.add.text(config.width/9.5, config.height/1.7, "Press the UP and DOWN arrow keys to dodge obstacles and collect your harvest!", titleConfig).setOrigin(0,0);
        this.dodge = this.add.text(config.width/9.5, config.height/1.2, "Press the RIGHT arrow key for credits!", titleConfig).setOrigin(0,0);

        this.startgame = this.add.text(config.width/1.9, config.height/1.4, "   Press the UP arrow key to start!", titleConfig).setOrigin(0,0);
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(this.cursors.up)){
            this.scene.start('playScene');
        }
        if (Phaser.Input.Keyboard.JustDown(this.cursors.right)){
            this.scene.start('creditsScene');
        }


    }










}