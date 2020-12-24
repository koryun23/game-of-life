let matrix = []
function matrixGen(matY, matX, grass, grassEat, gazan,lake) {
    for (let i = 0; i < matY; i++) {
        matrix[i] = [];
        for (let j = 0; j < matX; j++) {
            matrix[i][j] = 0; // սկզբում բոլոր վանդակները լցնում ենք 0-ներում
        }
    }

    for (let i = 0; i < grass; i++) { // հետո ըստ արգումենտի թվի, լուփ ա պտտվելու

        var y = Math.floor(Math.random() * matY) //ամեն անգամ ռենդմ y ընտրի
        var x = Math.floor(Math.random() * matX) //ամեն անգամ ռենդմ x ընտրի
        if (matrix[y][x] == 0) { // ասում ա եթե 0 -ա ուրեմն վերագրի մեկ
            matrix[y][x] = 1
        } //այսինքն եթե գռասսին տանք 40 թիվը, 40 հատ տարբեր տեղերում կստեղծվի խոտ
    }
    for (let i = 0; i < grassEat; i++) { //նույնը մնացածը
        var y = Math.floor(Math.random() * matY)
        var x = Math.floor(Math.random() * matX)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 2;
        }
    }
    for (let i = 0; i < gazan; i++) {
        var y = Math.floor(Math.random() * matY)
        var x = Math.floor(Math.random() * matX)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 3;
        }
    }
    for(let i = 0;i< lake;i++){
        var y = Math.floor(Math.random() * matY)
        var x = Math.floor(Math.random() * matX)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 4;
        }
    }
}

matrixGen(40, 40, 1000, 500, 50,20); // էստեղ էլ կանրում ենք ֆունկցիան 

let grassArr = []
let grassEaterArr = []
let predatorArr = []
let switcherArr = []
let side = 15;
function setup(){
    createCanvas(matrix[0].length * side,matrix.length*side);
    background('black');
    frameRate(10)
    for(let y = 0;y < matrix.length;y++){
        for(let x = 0; x < matrix[y].length;x++){
            if (matrix[y][x] == 1){
                let newGrass = new Grass(x,y)
                grassArr.push(newGrass)
                console.log(grassArr)
            }else if(matrix[y][x] == 2){
                let newGrassEater = new GrassEater(x,y)
                grassEaterArr.push(newGrassEater)
                console.log(grassEaterArr)
            }
            else if(matrix[y][x] == 3){
                let newPredator = new Predator(x,y)
                predatorArr.push(newPredator)

            }
            else if(matrix[y][x] == 4){
                let newSwitcher = new Switcher(x,y)
                switcherArr.push(newSwitcher)
            }
        }
    }
}

function draw(){
    for(let y = 0; y < matrix.length; y++){
        for(let x = 0; x < matrix[0].length;x++){
            if (matrix[y][x] == 0){
                fill('grey')
            }
            else if(matrix[y][x] == 1){
                fill('green')
            }
            else if(matrix[y][x] == 2){
                fill('yellow')
            }
            else if(matrix[y][x] == 3){
                fill('red')
            }
            else if(matrix[y][x] == 4){
                fill('blue')
            }
            rect(x*side,y*side,side,side)
        }

    }
    for(let i = 0;i < predatorArr.length;i++){
        predatorArr[i].mul()
        predatorArr[i].eat()
        
    }
    for(let i = 0;i < grassArr.length;i++){
        grassArr[i].mul();

    }

    for(let i = 0;i < grassEaterArr.length;i++){
        grassEaterArr[i].mul(); 
        grassEaterArr[i].eat(); 
    }
    for(let i = 0;i<switcherArr.length;i++){
        switcherArr[i].move()
    }

    gen = Math.floor(Math.random()* 15)
    if(gen == 10){
        tsunami = new Tsunami()
        tsunami.destroy()
    }



}

