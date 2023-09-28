document.addEventListener("DOMContentLoaded", () => {
    const grid = document.querySelector(".grid")
    const scoreDisplay = document.getElementById("score")
    const width = 28 //* 28 x 28 = 784 squares.

    //* layout of grid and what is in the squares.
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

    //* starting position of pacman
    let pacmanCurrentIndex = 490
    squares[pacmanCurrentIndex].classList.add("pac-man")

    //* move pacman
    function movePacman(event) {
        squares[pacmanCurrentIndex].classList.remove("pac-man")

        switch(event.keyCode) {
            /**
             * A = 65
             * W = 87
             * S = 83
             * D = 68
             * 
             * 37	Arrow Left
             * 38	Arrow Up
             * 39	Arrow Right
             * 40  	Arrow Down
             */
            case 37:
                if(pacmanCurrentIndex % width !== 0 && 
                    !squares[pacmanCurrentIndex -1].classList.contains("wall") &&
                    !squares[pacmanCurrentIndex -1].classList.contains("ghost-lair")) pacmanCurrentIndex -=1
                break
            case 38:
                if(pacmanCurrentIndex - width >= 0 && 
                    !squares[pacmanCurrentIndex -width].classList.contains("wall") &&
                    !squares[pacmanCurrentIndex -width].classList.contains("ghost-lair")) pacmanCurrentIndex -=width
                break
            case 39:
                if(pacmanCurrentIndex % width < width -1 && 
                    !squares[pacmanCurrentIndex +1].classList.contains("wall") && 
                    !squares[pacmanCurrentIndex +1].classList.contains("ghost-lair")) pacmanCurrentIndex +=1
                break
            case 40:
                if(pacmanCurrentIndex + width < width * width && 
                    !squares[pacmanCurrentIndex +width].classList.contains("wall") && 
                    !squares[pacmanCurrentIndex +width].classList.contains("ghost-lair")) pacmanCurrentIndex +=width
                break
        }
    }

    squares[pacmanCurrentIndex].classList.add("pac-man")

    //pacDotEaten()
    //powerPelletEaten()
    //checkForGameOver()
    //checkForWin()

    document.addEventListener("keydown", movePacman)

})