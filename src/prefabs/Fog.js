class Fog extends Phaser.GameObjects.Image {
    constructor(scene, x, y, width, height) {
        super(scene, x, y, 'fog'); // Use the fog image
        this.parentScene = scene;
        this.parentScene.add.existing(this);

        // Start at the right middle of the canvas
        this.setPosition(scene.scale.width, scene.scale.height / 2); 
        this.setOrigin(1, 0.5); // Set origin to right middle for leftward expansion

        this.setAlpha(0.1); // Initial semi-transparent state
        this.setDepth(100); // Ensure it's rendered on top
        this.intensity = 0.1; // Initial fog intensity
        this.maxIntensity = 2.0; // Maximum fog intensity
        this.intensityStep = 0.05;

        // Adjusted properties for scaling
        this.scaleFactor = 1.0;
        this.maxScaleFactor = 2.5; // Increased to ensure full canvas coverage
        this.scaleStep = 0.1;
    }
    
    increaseFog() {
        if (this.intensity < this.maxIntensity) {
            this.intensity += this.intensityStep;
            this.intensity = Math.min(this.intensity, this.maxIntensity);
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

        // Increase the scale factor to cover the entire canvas
        if (this.scaleFactor < this.maxScaleFactor) {
            this.scaleFactor += this.scaleStep;
            this.scaleFactor = Math.min(this.scaleFactor, this.maxScaleFactor);
        }
    }

    decreaseFog() {
        if (this.intensity > 0) {
            this.intensity -= this.intensityStep;
            this.intensity = Math.max(this.intensity, 0); // Ensure intensity doesn’t go negative
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

        // Adjust scale factor if necessary
        if (this.scaleFactor > 1.0) {
            this.scaleFactor -= this.scaleStep;
            this.scaleFactor = Math.max(this.scaleFactor, 1.0);
        }
    }

    resetFog() {
        this.intensity = 0.1;
        this.scaleFactor = 1.0;
        this.setAlpha(this.intensity);
        this.setScale(1.0);
    }
}
