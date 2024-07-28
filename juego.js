Logica();
function Logica() {
    const canvas = document.getElementById("Juego");
    const context = canvas.getContext("2d");
    const fps = 40;
    const width = 800;
    const height = 300;
    const gv = 2;
    const vX = 9;

    let numSpaceBar = 0;
    let gameOver = false;

    const dinoWidth = 100;
    const dinoHeight = 100;
    const dinoPosIniX = 100;

    const wallWidth = 40;

    let Puntaje = 0;

    const modelGround = {
        posX: 0,
        height: 50,
    };

    //random para obtener un espaciado aleatorio
    const space = () => {
        return 1000;
    };

    const dinoModel = {
        posY: 150,
        pixelJump: 22,
    };

    //Obstaculos 
    const modelWall = {
        posCX: width,
        oaheight: 50,
        clbheight: 75,
        width: 50,
    };

    const jump = () => {
        if (gameOver) {
            modelWall.posCX = width;
            dinoModel.posY = 150;
            Puntaje = 0;

            if (numSpaceBar > 1) {
                gameOver = false;
                numSpaceBar = 0;
            }
            numSpaceBar += 1;
        } else {
            dinoModel.posY = dinoModel.posY - dinoModel.pixelJump;
        }
    };

    //Dibuja el dinosaurio gv pixeles de desplazamiento
    const gravityCanvas = () => {
        if (dinoModel.posY < height - dinoHeight - modelGround.height) {
            dinoModel.posY -= dinoModel.pixelJump;
            dinoModel.pixelJump -= gv;
        } else {
            dinoModel.posY = 150;
            dinoModel.pixelJump = 22;
        }
    };

    //Logica de choque, verifica que los puntos no esten dentro del rango del ancho del dinosaurio
    const isAlive = (wallPosX, wallHeight) => {
        if (dinoPosIniX <= wallPosX &&
            wallPosX <= dinoPosIniX + dinoHeight &&
            dinoModel.posY + dinoWidth > wallHeight) {
            gameOver = true;
        }
    };

    //evento par reconocer cuando se preciona barra espaciadora
    document.addEventListener("keydown", (event) => {
        const key = event.keyCode || event.code;
        if (key === "Space" || key == 32) {
            jump();
        }
    });

    const clear = () => {
        canvas.width = width;
        canvas.height = height;
    };

    const loadImageDino = () => {
        const dino = new Image();
        dino.src = "./img/trex.png";
        context.drawImage(
            dino,
            0,
            0,
            207,
            219,
            dinoPosIniX,
            dinoModel.posY,
            dinoHeight,
            dinoWidth
        );
    };

    const loadImagC = () => {
        const c = new Image();
        c.src = "./img/C.png";
        context.drawImage(
            c,
            0,
            0,
            modelWall.width,
            modelWall.clbheight,
            modelWall.posCX,
            height - modelGround.height - modelWall.clbheight,
            modelWall.width,
            modelWall.clbheight
        );
        isAlive(modelWall.posCX, 175);
        isAlive(modelWall.posCX + wallWidth, 235);

        //logica que agrea un obstaculo
        if (modelWall.posCX < -modelWall.width) {
            modelWall.posCX = modelWall.posCX + space();
        } else {
            modelWall.posCX -= vX;
        }
    };

    const loadGround = () => {
        const ground = new Image();
        ground.src = "./img/suelo.png";
        context.drawImage(ground, modelGround.posX, 0, 1600, 12, 0, 235, 1600, 12);

        if (modelGround.posX > width) {
            modelGround.posX = 0;
        } else {
            modelGround.posX += vX;
        }
    };

    const stats = () => {
        context.font = "30px impact";
        context.fillStyle = "#515151";
        context.fillText("Puntaje: " + Puntaje, 600, 50);
        Puntaje += 1;
    };

    const main = () => {
        gravityCanvas();
        loadImageDino();
        loadGround();
        loadImagC();
        stats();
    };

    setInterval(() => {
        if (!gameOver) {
            clear();
            main();
        } else {
            context.font = "50px impact";
            context.fillStyle = "#515151";
            context.fillText("Game Over", 250, 50);
        }
    }, 1000 / fps);
}

