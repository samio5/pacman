//! GHOST MOVEMENT original
    //* move all the ghosts randomly
    ghosts.forEach(ghost => moveGhost(ghost))

    //* write the function to move the ghosts
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

            //if the ghost is currently scared, change their color and behaviour
            if (ghost.isScared) {
                squares[ghost.currentIndex].classList.add("scared-ghost")
            }

            //if the ghost is scared and pacman runs towards it
            if (ghost.isScared && squares[ghost.currentIndex].classList.contains("pacman")) {
                squares[ghost.currentIndex].classList.remove(ghost.className, "ghost", "scared-ghost")
                ghost.currentIndex = ghost.startIndex
                score += 100
                squares[ghost.currentIndex].classList.add(ghost.className, "ghost")
            }
            checkForGameOver()
        }, ghost.speed)
    }

    ______________________________________________________________________________________________________________________

    //! GHOST LOGIC
    //*add logic to ghost movement to hunt for pacman
    //*get coordinates of ghosts and pacman

    function getCoordinates (index) {
        return [index % width, Math.floor(index / width)]
    }

    console.log(getCoordinates(502))


//^ GHOST MOVEMENT BASED ON LOGIC
    function moveGhost(ghost) {
        const directions = [-1, +1, +width, -width]
        let direction = directions[Math.floor(Math.random() * directions.length)]
        //* ghosttimerid is zero
        let ghostTimerID = NaN

        ghostTimerID = setInterval(function() {
            if (!squares[ghost.currentIndex + direction].classList.contains("wall")) {
                //* remove ghost class
                squares[ghost.currentIndex].classList.remove(ghost.className, "ghost", "scared-ghost")

                //* check if the new space is closer to pacman
                const [ghostX, ghostY] = getCoordinates(ghost.currentIndex)
                console.log(ghostX)
                const [pacmanX, pacmanY] = getCoordinates(pacmanCurrentIndex)
                const [ghostNewX, ghostNewY] = getCoordinates(ghost.currentIndex + direction)

                function isXCordCloser() {
                    if ((ghostNewX - pacmanX) > (ghostX - pacmanX)) {
                        return true
                    } else return false
                }

                function isYCordCloser() {
                    if ((ghostNewY - pacmanY) > (ghostY - pacmanY)) {
                        return true
                    } else return false
                }

                if (isXCordCloser () || isYCordCloser()) {
                    ghost.currentIndex += direction
                    squares(ghost.currentIndex).classList.add(ghost.className, "ghost", "scared-ghost")
                } else {
                    squares(ghost.currentIndex).classList.add(ghost.className, "ghost", "scared-ghost")
                    directions[Math.floor(Math.random() * directions.length)]
                }

                // ghost.currentIndex += direction
                squares[ghost.currentIndex].classList.add(ghost.className, "ghost", "scared-ghost")
            } else direction = directions[Math.floor(Math.random() * directions.length)]

            //* stop game when pacman is present in the same square as ghost, essentially ghost eats pacman
            if (squares[ghost.currentIndex].classList.contains("pac-man")) clearInterval(ghostTimerID)
        }, 300)
    }
    moveGhostLogic()