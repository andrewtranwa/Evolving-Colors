class Plant {
    constructor(other, automata) {
        this.automata = automata;
        this.hue = other.hue;
        this.size = 10;
		this.grid = 100;

        this.x = other.x;
        this.y = other.y;

        this.growth = 0;
    }    

	mutate() {
		let newX = this.x - 1 + randomInt(3);
		if (newX >= this.grid) newX = newX % this.grid;
		else if (newX < 0) newX = this.grid + (newX % this.grid);
	
		let newY = this.y - 1 + randomInt(3);
		if (newY >= this.grid) newY = newY % this.grid;
		else if (newY < 0) newY = this.grid + (newY % this.grid);
	
		let hue = this.hue - 10 + randomInt(21);
		if (hue >= 360) hue = hue % 360;
		else if (hue < 0) hue = 360 + (hue % 360);
	
		return {hue: hue, x: newX, y: newY};
	}

    update() {
        const growthrate = parseInt(document.getElementById("plantgrowth").value);

        if (growthrate <= 0) return; 

        const growthIncrement = growthrate * 0.5;  

        if (this.growth < 80) this.growth += growthIncrement;

        if (this.growth >= 80) {
            const other = this.mutate(); 

            if (!this.automata.plants[other.x][other.y]) {
                this.automata.plants[other.x][other.y] = new Plant(other, this.automata);
                this.growth -= 80;
            } 
        }
    }

    draw(ctx) {
        ctx.fillStyle = `hsl(${this.hue}, 100%, 50%)`;
        ctx.fillRect(this.x*this.size, this.y*this.size, this.size, this.size);
        ctx.strokeRect(this.x*this.size, this.y*this.size, this.size, this.size);
    }

};