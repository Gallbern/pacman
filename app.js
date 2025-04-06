document.addEventListener('DOMContentLoaded', () => { // Decimos a JS que ejecute todo en cuanto se carge la página

    const scoreDisplay = document.getElementById('score') // Seleccionamos el elemento por ID score del HTML y lo almacenamos en una constante
    const width = 28 // La anchura y altura de la rejilla en la que se ejecuta el juego no cambia, por eso la almacenamos en una constante
    let score = 0 // La puntuación la inicializamos en 0 pero la almacenamos en una variable ya que irá cambiando
    const grid = document.querySelector('.grid') //seleccionamos con querySelector todos los elementos de clase grid en el HTML

    const layout = [ //creamos una array que definirá el escenario de juego en base a la explicación más abajo con 28x 28 items

        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 3, 1, 5, 1, 1, 0, 1, 1, 1, 6, 1, 0, 1, 1, 0, 1, 6, 1, 1, 1, 0, 1, 1, 5, 1, 3, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1,
        1, 5, 1, 1, 6, 1, 0, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 0, 1, 6, 1, 1, 5, 1,
        1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 2, 2, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
        4, 4, 4, 4, 4, 4, 0, 0, 0, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 0, 0, 0, 4, 4, 4, 4, 4, 4,
        1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
        1, 1, 5, 1, 6, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 6, 1, 5, 1, 1,
        1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 0, 1, 1, 6, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 6, 1, 1, 0, 1,
        1, 3, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 3, 1,
        1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1,
        1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 1, 1, 1, 1, 1, 1, 6, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 6, 1, 1, 1, 1, 1, 0, 1,
        1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
    ]


    // 0- pac-dot
    // 1- wall
    // 2- ghost-lair
    // 3- power-pellet
    // 4- empty

    const squares = [] //creamos array vacía para almacenar los squares



    //creamos la función que no permite dibujar los cuadrados que formarán el escenario
    function createBoard() {

        for (let i = 0; i < layout.length; i++) { //recorremos la longitud de la array layout
            const square = document.createElement('div') //creamos una constante que simplemente genera un div
            square.id = i
            grid.appendChild(square) //a la constante grid le añadimos el nuevvo cuadrado
            squares.push(square) // por cada div que creamos también añadimos un elemento a la array squares
            //añadimos los números correspondientes al layout en la array squares

            if (layout[i] === 0) {
                squares[i].classList.add('pac-dot')
            }
            if (layout[i] === 1) {
                squares[i].classList.add('wall')
            }
            if (layout[i] === 2) {
                squares[i].classList.add('ghost-lair')
            }
            if (layout[i] === 3) {
                squares[i].classList.add('power-pellet')
            }

            if (layout[i] === 5) {
                squares[i].classList.add('wall2') // muro con escudo
            }

            if (layout[i] === 6) {
                squares[i].classList.add('wall3') // muro con antorcha
            }


        }
    }

    createBoard() //llamamos a la función


    /* background music */

    // Crear un nuevo elemento de audio
    const bgMusic = new Audio("audio/main_theme.wav");
    bgMusic.loop = true;     // Habilitar el loop
    bgMusic.volume = 0.1;
    document.addEventListener("keydown", function() { // Reproducir el audio después de una interacción del usuario
        bgMusic.play();
    }, { once: true }); // Solo se ejecuta una vez




    //Create Characters

    //Create Pac-man
    let pacmanCurrentIndex = 490 //definimos el índice para pasarle a la array squares que será la posición actual de pac-man- Posición incial 490
    squares[pacmanCurrentIndex].classList.add('pac-man') //añadimos la clase pac-man al índice correspondiente
    //move Pac-man
    function movePacman(e) { //función para mover a pac-man. E for Event
        // console.log(e.key) //para sacar por consola la tecla que se ha apretado
        squares[pacmanCurrentIndex].classList.remove('pac-man') //quitamos la clase pac-man al índice actual
        switch (e.key) { //creamos un switch para mover a pac-man dependiendo de la tecla que se aprete

            case 'ArrowLeft': //si se apreta la flecha izquierda
                if (pacmanCurrentIndex % width !== 0 && // Si el módulo de pacmanCurrentIndex y la anchura NO es 0
                    // cuando el módulo es 0 significa que estamos en el borde izquierdo
                    // Es decir, e el index 28, 28/28=1. En el index 29, 29/28 = 1,035714286, no tiene resto 0 y por tanto no es el borde izquierdo
                    !squares[pacmanCurrentIndex - 1].classList.contains('wall') &&
                    !squares[pacmanCurrentIndex - 1].classList.contains('ghost-lair')) {
                    pacmanCurrentIndex -= 1
                }

                if (squares[pacmanCurrentIndex - 1] === squares[363]) {
                    pacmanCurrentIndex = 391
                }

                break
            case 'ArrowRight': //si se apreta la flecha derecha
                if (
                    pacmanCurrentIndex % width < width - 1 && // Si el módulo de pacmanCurrentIndex y la anchura es menor a la anchura menos 1
                    //en caso de que el módulo de 27 quiere decir que estamos en el borde derecho
                    !squares[pacmanCurrentIndex + 1].classList.contains('wall') &&
                    !squares[pacmanCurrentIndex + 1].classList.contains('ghost-lair')
                ) {
                    pacmanCurrentIndex += 1
                }
                if (squares[pacmanCurrentIndex + 1] === squares[392]) {
                    pacmanCurrentIndex = 364
                }

                break
            case 'ArrowUp': //si se apreta la flecha arriba
                if (
                    pacmanCurrentIndex - width >= 0 && //si el índice actual es menor a 28 estamos en la primera fila y no podemos ir más arriba
                    !squares[pacmanCurrentIndex - width].classList.contains('wall') &&
                    !squares[pacmanCurrentIndex - width].classList.contains('ghost-lair')
                ) {
                    pacmanCurrentIndex -= 28
                }
                break

            case 'ArrowDown': //si se apreta la flecha abajo
                if (
                    pacmanCurrentIndex + width < width * width && // si el índice de pacman + 28 es menor que el total de los cuadrados No estamos en al última fila y podemos movernos para abajo
                    !squares[pacmanCurrentIndex + width].classList.contains('wall') &&
                    !squares[pacmanCurrentIndex + width].classList.contains('ghost-lair')
                ) {
                    pacmanCurrentIndex += 28
                }

                break
        }

        squares[pacmanCurrentIndex].classList.add('pac-man') //añadimos la clase pac-man al índice correspondiente 

        /* Comprobaciones*/
        pacDotEaten() //llamamos a la función pacDotEaten para cuando Pac-Man se coma un punto
        powerPelletEaten() //llamamos a la función powerPelletEaten para cuando Pac-Man se coma una bolita de poder
        checkForWin() //llamamos a la función checkForWin para cuando Pac-Man gane
        checkForGameOver() //llamamos a la función checkForGameOver para cuando Pac-Man pierda

    }

    document.addEventListener('keyup', movePacman) //hacemos que en caso de que se pulse cualquier tecla se ejecute la función movePacman

    // Función que se ejecuta cuando Pac-Man se come un punto
    function pacDotEaten() {
        if (squares[pacmanCurrentIndex].classList.contains('pac-dot')) { // si el índice actual de pac-man es igual a un punto
            const audioEat = new Audio("audio/eatingsfx.wav"); // creamos nuevo audio
            audioEat.play(); //reproducimos audio
            score++ //aumentamos 1 punto
            scoreDisplay.innerHTML = score //actualizamos el valor de la puntuación en el HTML
            squares[pacmanCurrentIndex].classList.remove('pac-dot')
        }

    }
    // Función que se ejecuta cuando Pac-Man se come una bola de poder
    function powerPelletEaten() {
        if (squares[pacmanCurrentIndex].classList.contains('power-pellet')) { // si el índice actual de pac-man es igual a un punto
            const audioEatPP = new Audio("audio/Power_Pellet.wav"); // creamos nuevo audio
            audioEatPP.play(); //reproducimos audio
            score += 10 //aumentamos 10 puntos
            scoreDisplay.innerHTML = score //actualizamos el valor de la puntuación en el HTML
            squares[pacmanCurrentIndex].classList.remove('power-pellet')

            ghosts.forEach(ghost => ghost.isScared = true)
            setTimeout(unscareGhosts, 10000)

        }


    }

    // función para des asustar a los fantasmas

    function unscareGhosts() {
        ghosts.forEach(ghost => ghost.isScared = false)
    }

    /*CREACIÓN DE FANTASMAS*/

    //Creamos el constructor de fantasmas - Explicar un poco de POO? - Mostrar en DOM objetos y atributos
    class Ghost {
        constructor(className, startIndex, speed) {
            this.className = className
            this.startIndex = startIndex
            this.speed = speed
            this.currentIndex = startIndex
            this.isScared = false
            this.timerId = NaN
        }
    }

    /*instanciamos los fantasmas dentro de una array*/
    const ghosts = [
        new Ghost('blinky', 348, 250),
        new Ghost('pinky', 376, 400),
        new Ghost('inky', 351, 300),
        new Ghost('clyde', 379, 500)
    ]

    //console.log(ghosts) // para explucar objetos y atributos en DOM

    /*dibujamos los fantasmas en el DOM */

    ghosts.forEach(ghost => { //recorremos la array
        squares[ghost.currentIndex].classList.add(ghost.className) //para cada elemento de la array hacemos que se añada la clase en HTML
        squares[ghost.currentIndex].classList.add('ghost') //añadimos clase genérica ghost para poder seleccionar todos de golpe
    })

    //Forma alternativa usando bucle for
    // for (let i = 0; i < ghosts.length; i++) {
    //     squares[ghosts[i].currentIndex].classList.add(ghosts[i].className) //para cada elemento de la array hacemos que se añada la clase en HTML
    //     squares[ghosts[i].currentIndex].classList.add('ghost')
    //  }

    /* Movimiento de los fantasmas*/

    ghosts.forEach(ghost => moveGhost(ghost)) // recorremomos la array de fantasmas y llamamos a la función moveGhost

    function moveGhost(ghost) {
        const directions = [-1, 1, width, -width] //creamos constante con las posibles direcciones de movimiento de los fantasmas
        //directions.lenght = 4
        //Math.floor -> redondea el número al entero más cercano a la baja
        //Math.random -> genera un número aleatorio entre 0 y 1    
        let direction = directions[Math.floor(Math.random() * directions.length)] //devuelve un valor entre 0 y 3

        ghost.timerId = setInterval(function() {
            //comprobar si el siguiente cuadrado está libre para poderse mover
            if (
                !squares[ghost.currentIndex + direction].classList.contains('wall') &&
                !squares[ghost.currentIndex + direction].classList.contains('ghost')


            ) { //si está libre, se ejecuta el movimiento random

                squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost') //quitamos la clase del fantasma
                ghost.currentIndex += direction //añadimos la dirección a la posición actual del fantasma
                squares[ghost.currentIndex].classList.add(ghost.className, 'ghost') //añadimos la clase del fantasma
            } else direction = directions[Math.floor(Math.random() * directions.length)] //si no está libre, se genera una nueva dirección random

            if (ghost.isScared) {
                squares[ghost.currentIndex].classList.add('scared-ghost') //añadimos la clase del fantasma asustado solo si su atributo es true
            }

            //función para cuando pac-man come a fantasma actualmente asustado
            if (ghost.isScared && squares[ghost.currentIndex].classList.contains('pac-man')) { //si el fantasma está asustado y pac-man está en su posición
                const audioEatDE = new Audio("audio/DragonEaten.wav"); // creamos nuevo audio
                audioEatDE.play(); //reproducimos audio
                score += 100 // pac-man gana 100 puntos
                scoreDisplay.innerHTML = score //actualizamos el valor de la puntuación en el HTML
                squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost') //quitamos la clase del fantasma
                ghost.currentIndex = ghost.startIndex // asignamos posición inicial al fantasma
                ghost.isScared = false
                squares[ghost.currentIndex].classList.add(ghost.className, 'ghost') // asignamos la clase del fantasma para que aparezca
            }

            checkForGameOver() //llamamos a la función checkForGameOver para cuando Pac-Man pierde

        }, ghost.speed) //el fantasma se mueve más o menos rápido dependiendo de su atributo de velocidad 

    }

    /* Comprobación de si se ha perdido el juego - Fantasma se come a Pac-man */
    function checkForGameOver() {
        if (
            squares[pacmanCurrentIndex].classList.contains('ghost') && //si el índice actual de pac-man también tiene un fantasma
            !squares[pacmanCurrentIndex].classList.contains('scared-ghost')//si el fantasma NO está asustado

        ) {
            ghosts.forEach(ghost => clearInterval(ghost.timerId)) //paramos a todos los fantasmas
            bgMusic.pause()
            const audioGO = new Audio("audio/pacman-is-dead.wav"); // creamos nuevo audio
            audioGO.play(); //reproducimos audio
            document.removeEventListener('keyup', movePacman) //dejamos de responder a las pulsaciones de teclas y de mover a Pacman
            setTimeout(function() { alert('Game Over') }, 1500) //lanzamos mensaje de Game Over
        }
    }
    /* Comprobación de si se ha ganado el juego - Pac-man come todas las bolas o llega a 274 puntos */
    function checkForWin() {
        if (score >= 274) {
            bgMusic.pause()
            const audioWin = new Audio("audio/winsound.wav"); // creamos nuevo audio
            audioWin.play(); //reproducimos audio
            ghosts.forEach(ghost => clearInterval(ghost.timerId)) //paramos a todos los fantasmas
            document.removeEventListener('keyup', movePacman) //dejamos de responder a las pulsaciones de teclas y de mover a Pacman
            setTimeout(function() { alert('You have WON') }, 1500) //lanzamos mensaje de Victoria
        }
    }


    /*Comprobación de victoria alternativo*/

    // function checkForWin() {
    //     const remainingPellets = grid.querySelectorAll(".pac-dot, .power-pellet");
    //     if (remainingPellets.length === 0) {
    //         ghosts.forEach(ghost => clearInterval(ghost.timerId)) //paramos a todos los fantasmas
    //         document.removeEventListener('keyup', movePacman) //dejamos de responder a las pulsaciones de teclas y de mover a Pacman
    //         setTimeout(function() { alert('You have WON') }, 500) //lanzamos mensaje de Victoria
    //     }
    // }



})