class Devil extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texure, frame){
        super(scene, x, y, texure, frame);
        this.parentScene = scene; 
        
        this.parentScene.add.existing(this);
        this.parentScene.physics.add.existing(this);
        this.setImmovable();
       

    }
    
    
    update(){
       
        const moveSpeedX = 2;
        const moveSpeedY = 1;

        if (keyUP.isDown) {
            // Move the devil up and right when key is held down
            this.x += moveSpeedX;
            this.y -= moveSpeedY;
        } 
        if(keyDOWN.isDown) {
            // Move back in reverse direction when key is released
            this.x -= moveSpeedX;
            this.y += moveSpeedY;
        }
    }





}