class Police extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y , texure, velocity){
        
        super(scene, x , y,  texure);
        this.parentScene = scene;

        this.parentScene.add.existing(this);
        this.parentScene.physics.add.existing(this);
        this.setVelocityX(velocity);
        this.setImmovable();
        this.spawned = false;
       

    }


    update(){
        if (!this.spawned && this.x < config.width/1.5){
            console.log("added")
            this.parentScene.addpolice(this.parent, this.velocity);
            this.spawned = true;


        }
        if (this.x < this.width){
            this.destroy();
        }


    
    
    
    }




}