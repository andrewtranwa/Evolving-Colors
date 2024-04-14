class Automata {
	constructor() {
		this.plants = [];
		this.length = 100;
        this.width = 100;
        this.plants = Array.from({length: this.length}, () => 
        Array.from({width: this.width}, () => null));
	}	

	clearPlants() {
		for(let i = 0; i < this.width; i++) {
			for(let j = 0; j < this.length; j++) {
				this.plants[i][j] = null;
			}
		}
	}

	addPlant() {
		let i = randomInt(this.width);
		let j = randomInt(this.length);
		let color = randomInt(360);
		this.plants[i][j] = new Plant({hue: color, x: i, y: j}, this)
	}

	update() {
		for(let i = 0; i < this.width; i++) {
			for(let j = 0; j < this.length; j++) {
				if(this.plants[i][j]) {
					this.plants[i][j].update();
				}
				if(Math.random() < 0.001) {
					this.plants[i][j] = null;
				} 
			}
		}
	}

	draw(ctx) {
		for(let i = 0; i < this.width; i++) {
			for(let j = 0; j < this.length; j++) {
				if(this.plants[i][j])
				this.plants[i][j].draw(ctx);
			}
		}
	}
	
};