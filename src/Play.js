
class Play extends Phaser.Scene {
    constructor(){
        super("playScene");

    }

    
    preload(){
        //this.load.image('rocket', './assets/fasterspaceship.png');
        // this.load.spritesheet('devilspritesheet', './assets/devilspritesheet.png', {
        //     frameWidth: 200,
        // frameHeight: 200,
        // });
        this.load.image('rock', './assets/rock.png');
        this.load.atlas('devilspritesheet', './assets/deviltexuresheet.png', './assets/devilss.json')
        this.load.image('weed', './assets/weed.png');
        this.load.image('background', "./assets/devilsharvest.jpg")
        this.load.image('police', './assets/police.png');
        this.load.image('hearts', './assets/hearts.png');
        this.load.audio('backgroundsound', ['./assets/background.mp3']);
        this.load.audio('pickup', ['./assets/pickup.mp3']);
        this.load.audio('damage', ['./assets/hurt.mp3']);
        this.load.audio('popodamage' , ['./assets/policehit.mp3'])
        this.load.audio('death' , ['./assets/death.mp3'])

        this.load.image('prebar', './assets/basicbar.png');
        this.load.image('postbar', './assets/filledbar.png');



    }

    create(){
        this.field= this.add.tileSprite(0,0, config.width, config.height,  'background').setOrigin(0,0);
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

        this.lettucegroup = this.add.group({
            runChildUpdate: true
        })

        this.policegroup = this.add.group({
            runChildUpdate: true
        })

        this.time.delayedCall(2500, () => {
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

        this.time.delayedCall(2500, () => {
            this.addlettuce();
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
        
        this.devil1 = new Devil(this, config.height/3, config.width/3.3, 'devilspritesheet', 0);
        this.devil1.setBodySize(this.devil1.width / 3, this.devil1.height / 3, this.devil1.width / 3, this.devil1.height / 3);

        this.anims.create({
            key: 'devilrun',
            frames: [
                { key: 'devilspritesheet', frame: 'f' },
                { key: 'devilspritesheet', frame: 's' },
                { key: 'devilspritesheet', frame: 'third' },
                { key: 'devilspritesheet', frame: 'fourth' },
                { key: 'devilspritesheet', frame: 'fifth' },
            ],
            frameRate: 8,
            repeat: -1,
        }); 
        this.devil1.play('devilrun');

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

        this.scoreDisplay = this.add.text(config.width/1.2, config.height/12, "Harvest: 0" , scoreConfig);
        if (this.playerscore == 1){
            console.log("heyy");
        }

       


      //add button that says BEER ME

      let beerMeButton = this.add.text(config.width / 2, config.height / 2, "BEER ME", scoreConfig).setOrigin(0.5);
      //everytime you press the button, the console prints "BEER ME"
      beerMeButton.setInteractive();

      beerMeButton.on('pointerdown', () => {
          console.log("BEER ME");
      });
        
    }


    update() {
        if (this.gameover) {
            console.log(this.scoredup);
            this.scene.start('gameOverScene', this.scoredup);
        }
    
        if (!this.gameover) {
            // Handle devil movement with 2x:1y ratio
    
            this.devil1.update();
            this.physics.world.collide(this.devil1, this.blockgroup, this.blockcollision, null, this);
            this.physics.world.collide(this.devil1, this.lettucegroup, this.lettucecollision, null, this);
            this.physics.world.collide(this.devil1, this.policegroup, this.policecollision, null, this);
    
            //this.field.tilePositionX += 3;
        }
    }

    addblock(){
        let loc1 , loc2, loc3; 
        loc1 = config.height/2+config.height/3
        loc2 = config.height/2;
        loc3 = config.height/2-config.height/3;
        let ran = Math.round(Math.random() * 100 % 2)
        let spawnloc = [loc1, loc2, loc3];
        console.log(spawnloc[ran], ran)
        let block = new Block(this, config.width-10  , spawnloc[ran],   'rock', -100);
        block.getBounds()
        block.setBodySize(block.width / 2, block.height / 2, block.width / 4, block.height / 4);

        this.blockgroup.add(block);
    }

    addlettuce(){
        let loc1 , loc2, loc3; 
        loc1 = config.height/2+config.height/3
        loc2 = config.height/2;
        loc3 = config.height/2-config.height/3;
        let ran = Math.round(Math.random() * 100 % 2)
        let spawnloc = [loc1, loc2, loc3];
        let lettuce = new Lettuce(this, config.width-10, spawnloc[ran] , "weed", -90)
        lettuce.getBounds()
        lettuce.setBodySize(lettuce.width / 2, lettuce.height / 2, lettuce.width / 4, lettuce.height / 4);

        this.lettucegroup.add(lettuce);
    }

    addpolice(){
        let loc1 , loc2, loc3; 
        loc1 = config.height/2+config.height/3
        loc2 = config.height/2;
        loc3 = config.height/2-config.height/3;
        let ran = Math.round(Math.random() * 100 % 2)
        let spawnloc = [loc1, loc2, loc3];
        let police = new Police(this, config.width-10, spawnloc[ran] , "police", -100)
        police.getBounds()
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

    lettucecollision(player, weed){
        weed.destroy();
        this.pickupm.play();
        this.scoredup+=weed.score;
        this.playerscore+=weed.score;
        const maxPoints = 10; 
        const maskWidth = (this.playerscore / maxPoints) * this.filledBar.width; // Calculate the mask width

        this.mask.clear();
        this.mask.fillStyle(0xffffff); // Set the mask color (white)
        this.mask.fillRect(0, 0, maskWidth, this.filledBar.height);

        if (this.playerscore >= maxPoints && this.playerHealth != 3 ){
            console.log("we are here baby");
            this.playerHealth++;
            this.playerscore=1;
            this.mask.clear()
        }

        console.log("smoke za");
        

        this.scoreDisplay.text = ("Harvest: " +this.scoredup);

    }



}