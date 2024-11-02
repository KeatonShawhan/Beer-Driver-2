class Fog extends Phaser.GameObjects.Rectangle {
    constructor(scene, x, y, width, height) {
        super(scene, x, y, width, height, 0xffffff); // Initialized fog rectangle
        this.parentScene = scene;
        this.parentScene.add.existing(this);
        this.setOrigin(0, 0);
        this.setAlpha(0.1); // Initial semi-transparent state
        this.setDepth(100); // Ensure it's rendered on top
        this.intensity = 0.1; // Initial fog intensity
        this.maxIntensity = 0.9; // Maximum fog intensity
        this.intensityStep = 0.05; // Correctly initialize intensity step
        
        // New properties for scaling
        this.scaleFactor = 1.0;
        this.maxScaleFactor = 1.5;
        this.scaleStep = 0.1; // How much to increase scale on each button click
    }
    
    increaseFog() {
        // Increase the intensity up to max
        if (this.intensity < this.maxIntensity) {
            this.intensity += this.intensityStep;
            this.intensity = Math.min(this.intensity, this.maxIntensity); // Clamp to max
            console.log(this.intensity);
            this.scene.tweens.add({
                targets: this,
                alpha: this.intensity,
                scaleX: this.scaleFactor,
                scaleY: this.scaleFactor,
                duration: 500,
                ease: 'Linear'
            });
        }

        // Scale the fog object to enlarge it over the screen
        if (this.scaleFactor < this.maxScaleFactor) {
            this.scaleFactor += this.scaleStep;
            this.scaleFactor = Math.min(this.scaleFactor, this.maxScaleFactor);
        }
    }
    
    resetFog() {
        this.intensity = 0.1;
        this.scaleFactor = 1.0;
        this.setAlpha(this.intensity);
        this.setScale(1.0);
    }
}