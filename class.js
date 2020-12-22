
class Grass {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiply = 0;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }


    chooseCell(char) {
        var found = [];
        for (let i in this.directions) {
            let x = this.directions[i][0] 
            let y = this.directions[i][1]; 
            if (x >= 0 && x < matrix[0].length-1 && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == char) {
                    found.push(this.directions[i]); 
                }
            }
        }
        return found;
    }


    mul() {
        this.multiply++ 
        let emptyCells = this.chooseCell(0)
        var emptyCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]; 
        if (emptyCell && this.multiply >= 8) {
            let newX = emptyCell[0]; 
            let newY = emptyCell[1]; 
            matrix[newY][newX] = 1; 
            let newGrass = new Grass(newX, newY)
            grassArr.push(newGrass); 
            this.multiply = 0;
        }
    }
}
class GrassEater {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.directions = [];
        this.energy = 8;
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(ch) {
        this.getNewCoordinates()  
        var found = [];
        for (let i in this.directions) {
            let x = this.directions[i][0]
            let y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == ch) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    move() { 
        let emptyCells = this.chooseCell(0) 
        let emptyCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        if (emptyCell && this.energy >= 0) { 
            let newX = emptyCell[0]; 
            let newY = emptyCell[1]; 
            matrix[newY][newX] = 2; 

            matrix[this.y][this.x] = 0;
            this.x = newX 
            this.y = newY 
        }

    }
    mul() {
        let emptyCells = this.chooseCell(0)
        let emptyCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        if (emptyCell && this.energy >= 12) {
            let newX = emptyCell[0];
            let newY = emptyCell[1];
            matrix[newY][newX] = 2; 
            let newGrassEater = new GrassEater(newX, newY)
            grassEaterArr.push(newGrassEater);
            this.energy -= 4;
        }
    }
    eat() {
        let emptyCells = this.chooseCell(1) 
        let emptyCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        if (emptyCell) {
            this.energy++
            let newX = emptyCell[0]; 
            let newY = emptyCell[1]; 
            matrix[newY][newX] = 2
            matrix[this.y][this.x] = 0;


            for (let i = 0; i < grassArr.length; i++) {
                if (grassArr[i].x == this.x && grassArr[i].y == this.y) {
                    grassArr.splice(i, 1);
                }
            }
            this.x = newX;
            this.y = newY;
        }
        else {
            this.move();
        }
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (let i = 0; i < grassEaterArr.length; i++) {
            if (grassEaterArr[i].x == this.x && grassEaterArr[i].y == this.y) {
                grassEaterArr.splice(i, 1);
            }
        }
    }
}
class Predator {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.directions = [];
        this.energy = 12;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(ch) {
        this.getNewCoordinates()
        var found = [];
        for (let i in this.directions) {
            let x = this.directions[i][0]
            let y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == ch) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    move() {
        this.energy--;
        let emptyCells1 = this.chooseCell(1) 
        let emptyCells0 = this.chooseCell(0) 

        let arr = emptyCells0.concat(emptyCells1) 

        let emptyCell = arr[Math.floor(Math.random() * arr.length)]; 
        if (emptyCell && this.energy >= 0) {
            if (matrix[emptyCell[1]][emptyCell[0]] == 0) {
                let newX = emptyCell[0];
                let newY = emptyCell[1];
                matrix[newY][newX] = 3
                matrix[this.y][this.x] = 0;
                this.x = newX
                this.y = newY
            } else if (matrix[emptyCell[1]][emptyCell[0]] == 1) {
                let newX = emptyCell[0];
                let newY = emptyCell[1];
                matrix[newY][newX] = 3
                matrix[this.y][this.x] = 1;
                this.x = newX
                this.y = newY
            }
        }
        else if (this.energy < 0) {
            this.die();
        }
    }
    mul() {
        let emptyCells0= this.chooseCell(0)
        let emptyCells1 = this.chooseCell(1)
        let emptyCells = emptyCells0.concat(emptyCells1)
        let emptyCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        if (emptyCell && this.energy >= 15) {
            let newX = emptyCell[0];
            let newY = emptyCell[1];
            matrix[newY][newX] = 3;
            let newPredator = new Predator(newX, newY)
            predatorArr.push(newPredator);
            this.energy -= 4;
        }
        else {
            this.eat();
        }
    }
    eat() {
        let emptyCells = this.chooseCell(2)
        let emptyCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        if (emptyCell) {
            this.energy += 2
            let newX = emptyCell[0];
            let newY = emptyCell[1];
            matrix[newY][newX] = 3;
            matrix[this.y][this.x] = 0;
            for (let i = 0; i < grassEaterArr.length; i++) {
                if (grassEaterArr[i].x == this.x && grassEaterArr[i].y == this.y) {
                    grassEaterArr.splice(i, 1);

                }
            }
            this.x = newX
            this.y = newY
        }
        else {
            this.move();
        }
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (let i = 0; i < predatorArr.length; i++) {
            if (predatorArr[i].x == this.x && predatorArr[i].y == this.y) {
                predatorArr.splice(i, 1);

            }
        }

    }
}
class Switcher{
    constructor(x,y){
        this.x = x
        this.y = y
        this.directions = []
        this.moving = true
        this.connected = false
    }
    getCoords(){
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ]
    }
    chooseCell(ch) {
        this.getCoords()
        var found = [];
        for (let i in this.directions) {
            let x = this.directions[i][0]
            let y = this.directions[i][1]
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == ch) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    choose_rand_place(ch){
        let emptyCells = this.chooseCell(ch)
        let emptyCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
        return emptyCell
    }
    move(){
        this.getCoords()
        let emptyCell0 = this.chooseCell(0)
        let emptyCell1 = this.chooseCell(1)
        let emptyCell2 = this.chooseCell(2)
        let emptyCell3 = this.chooseCell(3)
        let emptyCell = emptyCell0.concat(emptyCell1,emptyCell2,emptyCell3);
        let newX = emptyCell[0]; 
        let newY = emptyCell[1]; 
        matrix[this.y][this.x] = 0;
        matrix[newY][newX] = 4; 

        this.x = newX 
        this.y = newY 
        
    }
    switch(){
        let gen = Math.floor(Math.random()*11)
        if(gen == 10){
            for(let i = 0; i < grassArr.length; i++){
                if(grassArr[i].x == this.x && grassArr[i].y == this.y){
                    grassArr.splice(i,1)
                    let newX = this.choose_rand_place(0)[0]
                    let newY = this.choose_rand_place(0)[1]
                    if(grassEaterArr.length < predatorArr.length){
                        let newGrassEater = new GrassEater(newX,newY)
                        grassEaterArr.push(newGrassEater)
                        console.log('grass --> grass eater')
                    }else{
                        let newPredator = new Predator(newX,newY)
                        predatorArr.push(newPredator)
                        console.log('grass --> predator')
                    }
                }  
            } 
            for(let i = 0;i<grassEaterArr.length;i++){
                if(grassEaterArr[i].x == this.x && grassEaterArr[i].y == this.y){
                    grassEaterArr.splice(i,1)
                    let newX = this.choose_rand_place(0)[0]
                    let newY = this.choose_rand_place(0)[1]
                    if(grassArr.length < predatorArr.length){
                        let newGrass = new Grass(newX,newY)
                        grassArr.push(newGrass)
                        console.log('grass eater --> grass ')

                    }else{
                        let newPredator = new Predator(newX,newY)
                        predatorArr.push(newPredator)
                        console.log('grass eater --> predator')
                    }
                }
                
            }
            for(let i = 0;i< predatorArr.length;i++){
                if(predatorArr[i].x == this.x && predatorArr[i].y == this.y){
                    predatorArr.splice(i,1)
                    let newX = this.choose_rand_place(0)[0]
                    let newY = this.choose_rand_place(0)[1]
                    if(grassArr.length < grassEaterArr.length){
                        let newGrass = new Grass(newX,newY)
                        grassArr.push(newGrass)
                        console.log('predator --> grass')
                    }else{
                        let newGrassEater = new GrassEater(newX,newY)
                        grassEaterArr.push(newGrassEater)
                        console.log('predator --> grass eater')
                    }
                }
            }
        }

    }
    
}
class Tsunami{
    getInteger(min, max) {
        return Math.floor(Math.random() * (max - min) ) + min;
    }

    destroy(){
        var y1 = this.getInteger(0,matrix[0].length/2)
        var y2 = this.getInteger(matrix[0].length/2,40)
        var x1 = this.getInteger(0,matrix.length/2)
        var x2 = this.getInteger(matrix.length/2,matrix.length)
        for(let y = y1; y <= y2; y++){
            for(let x = x1; x <= x2; x++){
                if (matrix[y][x] == 1){
                    for(let i = 0;i< grassArr.length;i++){
                        if(grassArr[i].x == x && grassArr[i].y == y){
                            grassArr.splice(i,1)
                            
                        }
                    }
                    matrix[y][x] = 0
                }
                else if(matrix[y][x] == 2){
                    for(let i = 0;i< grassEaterArr.length;i++){
                        if(grassEaterArr[i].x == x && grassEaterArr[i].y == y){
                            grassEaterArr.splice(i,1)
                        }
                    }
                    matrix[y][x] = 0
                }
                else if(matrix[y][x] == 3){
                    for(let i = 0;i< predatorArr.length;i++){
                        if(predatorArr[i].x == x && predatorArr[i].y == y){
                            predatorArr.splice(i,1)
                        }
                    }
                    matrix[y][x] = 0
                }
                // else if(matrix[y][x] == 4){
                //     matrix[y][x] = 0
                //     while(matrix[y][x] != 0){
                //         y = Math.floor(Math.random()*matrix.length)
                //         x = Math.floor(Math.random()*matrix[y].length)
                //     }
                //     matrix[y][x] = 4
                // }
                
            }
        }
        //return true
    }
}

