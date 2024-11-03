class Water extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texure, velocity){
        super(scene, x, y, texure);
        this.parentScene = scene; 
       

        this.parentScene.add.existing(this);
        this.parentScene.physics.add.existing(this);
        this.setVelocityX(velocity);
        this.spawed = true;
        this.score = 1;

    }
   
    update(){
            if (this.spawed && this.x < config.width/1.5){
            console.log("spawed");
            this.parentScene.addwater(this.parent, this.velocity);
            this.spawed = false;

        }

        if (this.x < this.width){
            this.destroy();
            //lower fog intensity
            if (this.parentScene.fog.intensity > 0.1){
                this.parentScene.fog.decreaseFog();
            }
        }


    
    
    
    }







}
