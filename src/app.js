document.addEventListener("DOMContentLoaded", () => {
    const grid = document.querySelector(".grid")
    const scoreDisplay = document.getElementById("score")
    const width = 28 // 28 x 28 = 784 squares.
    let score = 0

    // layout of grid and what is in the squares.
    const layout = [
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
        4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
        1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
        1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
        1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
        1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
        1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
        1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
        1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
    ]
    // 0 - pac-dots
    // 1 - wall
    // 2 - ghost-lair
    // 3 - power-pellet
    // 4 - empty

    const squares = []

    //* draw the grid and render it.
    function createBoard() {
        for (let i = 0; i < layout.length; i++) {
            const square = document.createElement('div')
            grid.appendChild(square)
            squares.push(square)
    
            //add layout to the board
            if(layout[i] === 0) {
                squares[i].classList.add("pac-dot")
            } else if (layout[i] === 1) {
                squares[i].classList.add("wall")
            } else if (layout[i] === 2) {
                squares[i].classList.add("ghost-lair")
            } else if (layout[i] === 3) {
                squares[i].classList.add("power-pellet")
            }
        }
    }

    createBoard()

    // starting position of pacman
    let pacmanCurrentIndex = 490
    squares[pacmanCurrentIndex].classList.add("pac-man")

    // move pacman
    function movePacman(e) {
        squares[pacmanCurrentIndex].classList.remove("pac-man")

        switch(e.keyCode) {
            /**
             * A = 65
             * W = 87
             * S = 83
             * D = 68
             * 37	Arrow Left
             * 38	Arrow Up
             * 39	Arrow Right
             * 40  	Arrow Down
             */
            case 37:
                if(pacmanCurrentIndex % width !== 0 && 
                    !squares[pacmanCurrentIndex -1].classList.contains("wall") &&
                    !squares[pacmanCurrentIndex -1].classList.contains("ghost-lair")) pacmanCurrentIndex -=1

                    //check if pacman is in the left exit
                    if(pacmanCurrentIndex -1 === 363) {
                        pacmanCurrentIndex = 391
                    }
                break;
            case 38:
                if(pacmanCurrentIndex - width >= 0 && 
                    !squares[pacmanCurrentIndex -width].classList.contains("wall") &&
                    !squares[pacmanCurrentIndex -width].classList.contains("ghost-lair")) pacmanCurrentIndex -=width
                break;
            case 39:
                if(pacmanCurrentIndex % width < width -1 && 
                    !squares[pacmanCurrentIndex +1].classList.contains("wall") && 
                    !squares[pacmanCurrentIndex +1].classList.contains("ghost-lair")) pacmanCurrentIndex +=1

                    //check if pacman is in the right exit
                    if(pacmanCurrentIndex +1 === 392) {
                        pacmanCurrentIndex = 364
                    }
                break;
            case 40:
                if(pacmanCurrentIndex + width < width * width && 
                    !squares[pacmanCurrentIndex +width].classList.contains("wall") && 
                    !squares[pacmanCurrentIndex +width].classList.contains("ghost-lair")) pacmanCurrentIndex +=width
                break;
        }
    }

    squares[pacmanCurrentIndex].classList.add("pac-man")

    // what happens when pacman eats a pac-dot
    function pacDotEaten() {
        if(squares[pacmanCurrentIndex].classList.contains("pac-dot")) {
            score++
            scoreDisplay.innerHTML = score
            squares[pacmanCurrentIndex].classList.remove("pac-dot")
        }
    }

    //what happens when you eat a power pellet
    function powerPelletEaten() {
        if (squares[pacmanCurrentIndex].classList.contains("power-pellet")) {
            score += 10
            ghosts.forEach(ghost => ghost.isScared = true)
            setTimeout(unScaredGhosts, 10000)
            squares[pacmanCurrentIndex].classList.remove("power-pellet")
        }
    }

    //make the ghosts stop appearing as scared (aquamarine)
    function unScaredGhosts() {
        ghosts.forEach(ghosts => ghost.isScared = false)
    }


    //create our Ghost template
    class Ghost {
        constructor(className, startIndex, speed) {
            this.className = className
            this.startIndex = startIndex
            this.speed = speed
            this.currentIndex = startIndex
            this.timerID = NaN
            this.isScared = false
        }
    }

    ghosts = [
        new Ghost("blinky", 348, 250),
        new Ghost("pinky", 376, 400),
        new Ghost("inky", 351, 300),
        new Ghost("clyde", 379, 500)
    ]

    //draw my ghosts onto the grid
    ghosts.forEach(ghost => {
        squares[ghost.currentIndex].classList.add(ghost.className)
        squares[ghost.currentIndex].classList.add("ghost")
    })

    //move all the ghosts randomly
    ghosts.forEach(ghost => moveGhost(ghost))

    //write the function to move the ghosts
    function moveGhost(ghost) {
    const directions = [-1, +1, width, -width]
    let direction = directions[Math.floor(Math.random() * directions.length)]
        ghost.timerID = setInterval(function(){
            //if the next square your ghost is going to go in does NOT contain a wall and a ghost, you can go there
            if (!squares[ghost.currentIndex + direction].classList.contains("wall") && !squares[ghost.currentIndex + direction].classList.contains("ghost")) {
                //you can go here
                //remove all ghost related classes
                squares[ghost.currentIndex].classList.remove(ghost.className, "ghost", "scared-ghost")

                //change the currentindex to the new safe square
                ghost.currentIndex += direction

                //redraw the ghost in the new safe space
                squares[ghost.currentIndex].classList.add(ghost.className, "ghost")

                //else find a new direction to try
            } else direction = directions[Math.floor(Math.random() * directions.length)]
        }, ghost.speed)
    }


    
    //checkForGameOver()
    //checkForWin()

    document.addEventListener("keydown", movePacman)

})