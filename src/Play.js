class Play extends Phaser.Scene {
    constructor(){
        super("playScene");

    }

    
    preload(){
        this.load.image('rock', './assets/rock.png');
        this.load.atlas('devilspritesheet', './assets/deviltexuresheet.png', './assets/devilss.json')
        this.load.spritesheet('car', './assets/car.png', { frameWidth: 37, frameHeight: 18 });
        this.load.image('water', './assets/water.png');
        this.load.image('background', "./assets/background.png")
        this.load.image('foreground', "./assets/foreground.png")
        this.load.image('police', './assets/police.png');
        this.load.image('hearts', './assets/hearts.png');
        this.load.audio('backgroundsound', ['./assets/background.mp3']);
        this.load.audio('pickup', ['./assets/pickup.mp3']);
        this.load.audio('damage', ['./assets/hurt.mp3']);
        this.load.audio('popodamage' , ['./assets/policehit.mp3'])
        this.load.audio('death' , ['./assets/death.mp3'])
        this.load.image('fog', './assets/secondFog.png');
        this.load.image('prebar', './assets/basicbar.png');
        this.load.image('postbar', './assets/filledbar.png');

    }

    create(){

        const imageWidth = 256;
        const imageHeight = 144;
      
        // Calculate scale factors
        const scaleX = config.width / imageWidth;
        const scaleY = config.height / imageHeight;
      
        // Choose the smaller scale factor to fit image within bounds
        const scale = Math.min(scaleX, scaleY);
      
        this.cityB = this.add.tileSprite(0, 50, imageWidth, imageHeight, 'background').setOrigin(0, 0).setScale(scale);

        this.cityF = this.add.tileSprite(0, 50, imageWidth, imageHeight, 'foreground').setOrigin(0, 0).setScale(scale);

        this.bgm = this.sound.add('backgroundsound', { 
            mute: false,
            volume: 1,
            rate: 1,
            loop: true 
        });
        this.bgm.play();

        this.pickupm = this.sound.add('pickup', {
            mute:false,
            volume:10,
            rate:1,
            loop: false

        });

        this.damagem = this.sound.add('damage', {
            mute:false,
            volume:10,
            rate:1,
            loop: false

        });

        this.policedamagem = this.sound.add('popodamage', {
            mute:false,
            volume:10,
            rate:1,
            loop: false

        });

        this.deathm = this.sound.add('death', {
            mute:false,
            volume:10,
            rate:1,
            loop: false

        });


        
        
        
        
        
        this.blockgroup = this.add.group({
            runChildUpdate: true
        })

        this.watergroup = this.add.group({
            runChildUpdate: true
        })

        this.policegroup = this.add.group({
            runChildUpdate: true
        })

        this.time.delayedCall(1500, () => {
            this.addblock();
        });

        this.time.addEvent({
            delay: 25000,
            callback: () => {
                if (this.playerscore > 15) {
                    this.addpolice();
                } else {
                    console.log("nvmm");
                }
            },
            callbackScope: this,
            loop: true, 
        });

        this.playerHealth = 3;
        this.gameover = false;
        this.healthbar = this.add.sprite(80, 35, 'hearts');
        
        this.time.addEvent({
            delay: 9, 
            callback: () => {
                const maskWidth = this.healthbar.displayWidth * (this.playerHealth / 3); // Adjust as needed
                const mask = this.make.graphics();
                mask.fillStyle(0x000000); 
                mask.fillRect(0, 0, maskWidth, this.healthbar.displayHeight);
                this.healthbar.setMask(mask.createGeometryMask());
            },
            callbackScope: this,
            loop: true, 
        });


        this.emptyBar = this.add.sprite(80, 80, 'prebar');
        this.filledBar = this.add.sprite(80, 80, 'postbar');
        this.mask = this.make.graphics();
        this.mask.fillStyle(0xffffff); 
        this.mask.fillRect(0, 0, 0, this.filledBar.height); 
        this.filledBar.setMask(this.mask.createGeometryMask());
        
        this.car = new Car(this, config.height/3, config.width/2, 'car', 0);
        this.car.setScale(2);
        this.car.setBodySize(this.car.width / 3, this.car.height / 3, this.car.width / 3, this.car.height / 3);

        this.anims.create({
            key: 'carmove',
            frames: [
                { key: 'car', frame: 0 },
                { key: 'car', frame: 1 },
            ],
            frameRate: 5,
            repeat: -1,
        }); 
        this.car.play('carmove');

        let scoreConfig = {
            fontFamily: 'Ancient Modern Tales',
            fontSize: '30px',
            // backgroundColor: '#F3B141',
            color: '#a9ed69',
            align: 'right',
            padding: {
              top: 5,
              bottom: 5,
            },
          }

    
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        let line1, line2, line3;
        line1 = config.height / 3;
        // line2 = config.height / 2;
        line2 = config.height / 3 * 2;

        let graphics = this.add.graphics();
        graphics.lineStyle(3, 0xFACADE);

        let lane1 = new Phaser.Geom.Line(0, line1, config.width, line1);
        let lane2 = new Phaser.Geom.Line(0, line2, config.width, line2);
        // graphics.strokeLineShape(lane1);
        // graphics.strokeLineShape(lane2);
        this.playerscore = 0;
        this.scoredup = 0;

        // this.scoreDisplay = this.add.text(config.width/1.2, config.height/12, "Beers: 0" , scoreConfig);
        if (this.playerscore == 1){
            console.log("heyy");
        }

       
        this.dizzinessLevel = 6;
        this.beers = 0;
        this.dizzinessWobble = 3; // Tracks the sway angle
        
        // Set up a looping tween for the wobble
        this.wobbleTween = this.tweens.add({
            targets: this.cameras.main,
            angle: { from: -2, to: 2 }, // Tilt angle range for wobble
            duration: 500, // Time for one side of the wobble
            yoyo: true,
            repeat: -1
        });

        if (!this.fog) {
            this.fog = new Fog(this, 0, 0, config.width, config.height);
        }
        
       
        this.remainingTime = 60;

        // Add countdown timer display
        let timerConfig = {
            fontFamily: 'Ancient Modern Tales',
            fontSize: '30px',
            color: '#a9ed69',
            align: 'center',
        };
        this.timerText = this.add.text(config.width / 2, config.height / 15, `Time: ${this.remainingTime}`, timerConfig).setOrigin(0.5);

        // Create a timed event that updates every second
        this.time.addEvent({
            delay: 1000, // 1 second
            callback: this.updateTimer,
            callbackScope: this,
            loop: true
        });

        // (rest of your setup as before, including the BEER ME button, etc.)...


        
    }
    updateTimer() {
        // Decrement the time
        this.remainingTime--;

        // Update the timer display
        this.timerText.setText(`Time: ${this.remainingTime}`);

        // Check if the time has run out
        if (this.remainingTime <= 0) {
            this.endGame();
        }
    }

    endGame() {
        // End the game, stop sounds, etc.
        this.gameover = true;
        this.bgm.stop();
        this.deathm.play();

        // Start the game over or end screen, pass any necessary data
        this.scene.start('gameOverScene', { beers: this.beers });
    }

    

    update() {
        if (this.gameover) {
            console.log(this.scoredup);
            this.scene.start('gameOverScene', this.beers);
        }
    
        if (!this.gameover) {
            // Handle devil movement with 2x:1y ratio
            

                
            this.blockgroup.getChildren().forEach(block => {
                const driftX = Phaser.Math.Between(-1, 1) * this.dizzinessLevel * 0.2;
                const driftY = Phaser.Math.Between(-1, 1) * this.dizzinessLevel * 0.2;
                block.x += Phaser.Math.Between(-driftX, driftX);
                block.y = Phaser.Math.Clamp(block.y + driftY, 280, 430); // Ensure blocks stay within bounds
                block.x -= 1*(60/this.remainingTime);
            });
            
            this.car.update();
            this.physics.world.collide(this.car, this.blockgroup, this.blockcollision, null, this);
            this.physics.world.collide(this.car, this.watergroup, this.watercollision, null, this);
            this.physics.world.collide(this.car, this.policegroup, this.policecollision, null, this);
    
            this.cityF.tilePositionX += 1;
            this.cityB.tilePositionX += 0.1;
        }
    }

    addblock() {
      // Set Y boundaries
      const minY = 280;
      const maxY = 430;
      
      // Generate a random Y position within the range
      let randomY = Phaser.Math.Between(minY, maxY);
      
      // Spawn the block at the random Y position
      let block = new Block(this, config.width - 10, randomY, 'car', -100);
      block.angle = 180;
      block.setFlipY(true);
      block.getBounds();
      block.setBodySize(block.width, block.height, block.width / 4, block.height / 4);
      let randomTint = Phaser.Display.Color.RandomRGB().color;
      block.setTint(randomTint);
      block.setScale(2);

      this.blockgroup.add(block);
  }

  
  addpolice() {
      // Set Y boundaries
      const minY = 280;
      const maxY = 430;
  
      // Generate a random Y position within the range
      let randomY = Phaser.Math.Between(minY, maxY);
  
      // Spawn the police at the random Y position
      let police = new Police(this, config.width - 10, randomY, 'police', -100);
      police.getBounds();
      police.setBodySize(police.width / 3, police.height / 3, police.width / 4, police.height / 4);
  
      this.policegroup.add(police);
  }



    blockcollision(player, block){
        console.log("collided")
        this.damagem.play()
        if (this.playerscore>10){
            this.playerHealth++;
            this.playerscore =1;
            this.mask.clear(); 


        }
        
        if (this.playerHealth <= 1){
            this.gameover = true;
            this.bgm.pause();
            this.deathm.play();

        } else{
            this.playerHealth--;
            block.destroy();

        }
        
    }
    policecollision(player, police){
        this.policedamagem.play()

        if (this.playerHealth <= 1){
        this.gameover = true;
            this.bgm.pause();
            this.deathm.play();
        } else{
            this.playerHealth--;
            police.destroy();
    }
}

}