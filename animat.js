class Animat {
	constructor(other, automata) {
		this.automata = automata;
		this.hue = other.hue;
		
		this.x = other.x;
		this.y = other.y;

		this.energy = 50;

		this.dimension = 100;
		this.size = 10;
	}	

	move() {
		let x = this.x;
		let y = this.y;
	
		let best = Infinity;
		const empty = [];
	
		for (let i = -1; i < 2; i++) {
			const newX = (this.x + i + this.dimension) % this.dimension;
			for (let j = -1; j < 2; j++) {
				const newY = (this.y + j + this.dimension) % this.dimension;
				const plant = this.automata.plants[newX][newY];
	
				if (!plant) {
					empty.push({x: newX, y: newY});
					if (Infinity < best) {  
						best = Infinity;   
						x = newX;
						y = newY;
					}
				} else {
					const diff = Math.abs(this.hue - plant.hue);
					if (diff < best) {
						best = diff;
						x = newX;
						y = newY;
					}
				}
			}
		}
	
		this.x = x;
		this.y = y;
	}
	
	mutate() {
		const randomOffset = (offset) => Math.floor(Math.random() * offset) - 1; 
	
		const newX = (this.x + randomOffset(3) + this.dimension) % this.dimension;
		const newY = (this.y + randomOffset(3) + this.dimension) % this.dimension;
		const hue = (this.hue + randomOffset(21) + 360) % 360;
	
		return { hue: hue, x: newX, y: newY };
	}

	reproduce() {
		if(this.energy > 80) {
			this.energy -= 80;

			gameEngine.addEntity(new Animat(this.mutate(),this.automata));
		}
	}

	die() {
		this.removeFromWorld = true;
	}

	update() {
		this.move();
		this.eat();
		this.reproduce();
		if(this.energy < 1 || Math.random() < 0.01) this.die();
	}

	hueDifference(plant) {
		let diff;
		if (plant) {
			diff = Math.abs(this.hue - plant.hue);
		} else {
			diff = 180;
		}
		if (diff > 180) {
			diff = 360 - diff; 
		}
		return (90 - diff) / 90;
	}
	
	eat() {
		const growthrate = parseInt(document.getElementById("animatgrowth").value);
		const selectivity = parseInt(document.getElementById("animatselection").value);
		const plant = this.automata.plants[this.x][this.y];
		const diff = this.hueDifference(plant);
	
		if(plant && diff >= selectivity) {
			this.automata.plants[this.x][this.y] = null;
			this.energy += 80 / growthrate * diff;
		}
	}

	draw(ctx) {
		ctx.fillStyle = `hsl(${this.hue}, 75%, 50%)`; 
		ctx.strokeStyle = "light gray";
		ctx.beginPath();
		ctx.arc((this.x + 0.5) * this.size, (this.y + 0.5) * this.size, this.size / 2 - 1, 0, 2 * Math.PI);
		ctx.fill();
		ctx.stroke();
	}
	
};