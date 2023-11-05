class Play extends Phaser.Scene {
    constructor(){
        super("playScene");

    }

    
    preload(){
        //this.load.image('rocket', './assets/fasterspaceship.png');
        this.load.spritesheet('devilspritesheet', './assets/devilspritesheet.png', {
            frameWidth: 200,
        frameHeight: 200,
        });
        this.load.image('rock', './assets/rock.png');
        this.load.image('weed', './assets/weed.png');
        this.load.image('background', "./assets/devilsharvest.jpg")

    }

    create(){
        this.field= this.add.tileSprite(0,0, config.width, config.height,  'background').setOrigin(0,0);
        this.blockgroup = this.add.group({
            runChildUpdate: true
        })

        this.lettucegroup = this.add.group({
            runChildUpdate: true
        })

        this.time.delayedCall(2500, () => {
            this.addblock();
        });

        this.time.delayedCall(2500, () => {
            this.addlettuce();
        });
        this.gameover = false;

        
        this.devil1 = new Devil(this, config.height/3, config.width/3.3, 'devilspritesheet', 0);
        this.anims.create({
            key: 'devilrun',
            frames: this.anims.generateFrameNumbers('devilspritesheet', {
                start: 0,
                end: 5 - 1,
            }),
            frameRate: 5,
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
            fixedWidth: 100
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
        graphics.strokeLineShape(lane1);
        graphics.strokeLineShape(lane2);
        this.playerscore = 0;
        this.scoreDisplay = this.add.text(config.width/1.3, config.height/12, "Harvest: 0" , scoreConfig);

       
        
    }

    update(){
        if (this.gameover){
            this.scene.start('gameOverScene');
        }
        if (!this.gameover) {this.devil1.update()
            this.physics.world.collide(this.devil1, this.blockgroup, this.blockcollision, null, this)
            this.physics.world.collide(this.devil1, this.lettucegroup, this.lettucecollision, null, this)
            this.field.tilePositionX += 3;
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
        this.lettucegroup.add(lettuce);
    }



    blockcollision(){
        console.log("collided")
        this.gameover = true;
    }

    lettucecollision(player, weed){
        weed.destroy();

        console.log("smoke za");
        this.playerscore+=weed.score;
        console.log(this.playerscore);

        this.scoreDisplay.text = ("Harvest: " +this.playerscore);

    }



}