class Devil extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texure, frame){
        super(scene, x, y, texure, frame);
        this.parentScene = scene; 
        
        this.parentScene.add.existing(this);
        this.parentScene.physics.add.existing(this);
        this.setImmovable();
       

    }
    
    
    update(){
       
        
        if (Phaser.Input.Keyboard.JustDown(keyUP) && this.y >= config.height / 3) {
            console.log("up pressed")
            this.y-= config.height/5*1.7;
        }

        if (Phaser.Input.Keyboard.JustDown(keyDOWN) && this.y < config.height /3 * 2){
            console.log("down pressed");
            this.y+=config.height/5*1.7;
        }
    }





}